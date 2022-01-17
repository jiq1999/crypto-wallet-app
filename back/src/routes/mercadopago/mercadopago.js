const mercadopago = require("mercadopago");
const {TOKEN_MERCADOPAGO} = process.env;
mercadopago.configure({
    access_token: TOKEN_MERCADOPAGO
})

module.exports = (req, res, next) => {
    try{
        let preference = {
            items: [
                {
                    title: req.body.title,
                    unit_price: Number(req.body.unit_price),
                    quantity: Number(req.body.quantity)
                }
            ],
            back_urls: {
                "success": "http://localhost:3001/payment/feedback",
                "failure": "http://localhost:3001/payment/feedback",
                "pending": "http://localhost:3001/payment/feedback"
            },
            auto_return: "approved",
                 
        }
    
        mercadopago.preferences.create(preference)

        .then((response) => {
            console.log("PROCESS PAYMENT", response)
            res.json({
                id: response.body.id   
            })
            
        })

    }catch(error){next(error)}
}