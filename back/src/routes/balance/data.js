const axios = require("axios");
const Web3 = require("web3");
const web3 = new Web3(process.env.INFURA_URL);
const StellarSDK = require("stellar-sdk");
const server = new StellarSDK.Server("https://horizon-testnet.stellar.org");
const Binance = require("node-binance-api");
const binance = new Binance();
const { Key, Staking, User } = require("../../db.js").models;

module.exports = async function(req, res, next) {
    try {
        const keys = await Key.findOne({ where: { userId: req.user.id } });
        const prices = await binance.futuresPrices();

        const dbEthereumStaking = await Staking.findAll({ where: { userId: req.user.id, blockchain: "ethereum" } });
        const ethereumEther = (await web3.eth.getBalance(keys.ethereum[0]))/10**18;
        const ethereumEtherStakingAmount = dbEthereumStaking.filter(stake => stake.currency === "ETH")[0]?.amount;
        const ethereumCurrencies = [{
            currency: "ETH",
            amount: ethereumEther,
            staking: ethereumEtherStakingAmount ? ethereumEtherStakingAmount.toString() : "0"
        }];
        await Promise.all(["HNR", "BTC", "USDT", "BNB", "ADA", "SOL"].map(async currency => {
            const tokenContract = await require("../../solidity")(currency);
            const amount = (await tokenContract.methods.balanceOf(keys.ethereum[0]).call()) / 10**4;
            const stakingAmount = dbEthereumStaking.filter(stake => stake.currency === currency)[0]?.amount;
            ethereumCurrencies.push({
                currency,
                amount: amount.toString(), 
                staking: stakingAmount ? stakingAmount.toString() : "0"
            });
        }));
        let ethereumStaking = 0;
        let ethereumCrypto = 0;
        for (let i = 0; i < ethereumCurrencies.length; i++) {
            if (ethereumCurrencies[i].currency === "USDT") {
                ethereumCrypto += Number(ethereumCurrencies[i].amount);
                ethereumStaking += Number(ethereumCurrencies[i].staking);
            } else if (ethereumCurrencies[i].currency === "HNR") {
                ethereumCrypto += Number(ethereumCurrencies[i].amount) * 4000;
                ethereumStaking += Number(ethereumCurrencies[i].staking) * 4000;
            } else {
                ethereumCrypto += Number(ethereumCurrencies[i].amount) * prices[`${ethereumCurrencies[i].currency}USDT`];
                ethereumStaking += Number(ethereumCurrencies[i].staking) * prices[`${ethereumCurrencies[i].currency}USDT`];
            }
        }

        const stellarAccount = await server.loadAccount(keys.stellar[0]);
        const stellarCurrencies = stellarAccount.balances
            .filter(currency => currency.asset_code !== undefined && currency.asset_code !== "USD" && currency.balance > 0)
            .map(currency => { return { currency: currency.asset_code, amount: currency.balance } });
        const stellarStake = await Staking.findAll({ where: { publicKey: keys.stellar[0]}})
        let stellarCrypto = 0;
        let stellarStaking = 0;
        for (let i = 0; i < stellarCurrencies.length; i++) {
            stellarCrypto += stellarCurrencies[i].amount * prices[`${stellarCurrencies[i].currency}USDT`];
            stellarStake.forEach(data => {
                if(data.currency === stellarCurrencies[i].currency) {
                    stellarCurrencies[i].staking = data.amount;
                    stellarStaking += parseFloat(data.amount) * prices[`${stellarCurrencies[i].currency}USDT`];
                }
            })
        }

        return res.status(200).send({
            ethereum: {
                cryptoBalance: ethereumCrypto.toString(),
                stakingBalance: ethereumStaking.toString(),
                currencies: ethereumCurrencies
            },
            stellar: {
                cryptoBalance: stellarCrypto.toString(),
                stakingBalance: stellarStaking.toString(),
                currencies: stellarCurrencies
            },
            funds: {
                balance: req.user.usd === null ? "0" : req.user.usd.toString()
            }
        });
    } catch(error) { next(error) }
};
