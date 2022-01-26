import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Button, Center, Container, FormControl, Icon, Input, Stack, Text, WarningOutlineIcon, Box, Divider } from "native-base";
import { AntDesign } from "@expo/vector-icons"
import { validatePassword } from "../Utils/Utils";

export default function PasswordReset({navigation}) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [tokenPassword, setTokenPassword] = useState("");
    const [tokenValidate, setTokenValidate] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState({
        password:"",
        confirmPassword: "",
    });

    function validateData(arg){
        switch(arg){
            case "password":
                validatePassword(password) 
                    ? setError({...error, password: ""}) 
                    : setError({...error, password: "Please enter a 6 to 16 characters password, with at least one number and one capital letter."});
            break;

            case "confirmPassword":
                validatePassword(confirmPassword)
                    ? setError({...error, confirmPassword: ""})
                    : setError({...error, confirmPassword: "Please enter a 6 to 16 characters password, with at least one number and one capital letter."});
            break;
        }
    }

    async function resetPassword() {
        setMessage("Loading...");
        try {
             await axios({
                method: "post",
                data: {
                  token: tokenPassword,
                  password: password,
                  confirmPassword: confirmPassword,
                },
                withCredentials: true,
                url: `http://${IP_HOST}:3001/password/resetpassword`,
              });
            setTokenValidate(true);
            setMessage("password changed")
        } catch (e) {console.log(e)};
    }

    useEffect(()=>{validateData("password")},[password]);

    useEffect(()=>{validateData("confirmPassword")},[confirmPassword]);

    return (
        <>
            <Box style={styles.container} height={windowsHeight} >
                <Center>
                    <FormControl>
                        <Stack>
                            <Text fontSize="xl">Put your new password</Text>

                            <Input 
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                type="password"
                                color="coolGray.900"
                                backgroundColor= '#e4e4e7'
                                size= "lg"
                                borderRadius="4px"
                                w="250px"
                                InputLeftElement={
                                    <Icon as={<AntDesign name="key" size={24} color="black" />}
                                        size={5}
                                        ml="2"
                                        color="muted.400"
                                    />
                                } 
                                borderColor= "#dark.900" borderWidth="2"
                            />

                            <FormControl.HelperText >
                                {error.password}
                            </FormControl.HelperText>  

                            <Input 
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                type="password"
                                color="coolGray.900"
                                backgroundColor="#e4e4e7"
                                size= "lg" 
                                borderRadius="4px"
                                w= "250px"
                                InputLeftElement={
                                    <Icon
                                        as={<AntDesign name="key" size={24} color="black" />}
                                        size={5}
                                        ml="2"
                                        color="muted.400"
                                    />
                                }
                                borderColor="#dark.900"
                                borderWidth="2"
                            />

                            <FormControl.HelperText>
                                {error.confirmPassword}
                            </FormControl.HelperText>

                            { 
                                password === confirmPassword 
                                    ? <Text fontSize="xl">The passwords match</Text> 
                                    : <Text fontSize="xl">The passwords must match</Text>
                            }

                            { 
                                error.password === "" 
                                    ? <Button
                                        onPress={resetPassword}
                                        size="sm" 
                                        borderRadius="4px"
                                        bg= 'theme.50'
                                        color= 'theme.100'
                                        _text={{fontSize:"md"}}
                                        borderColor= "darkBlue.50"
                                        borderWidth="1"
                                    >
                                        Reset the password
                                    </Button> 

                                    : <Text fontSize="xl">The password is not right</Text> 
                            } 
                            <Text>{message}</Text>

                            <Divider my="4" bg='#ecfeff' />

                            <Button  
                                onPress={() => navigation.navigate("Login") } 
                                _text={{fontSize:"md"}}
                                borderColor="darkBlue.50"
                                borderWidth="1"
                                bg= 'theme.50'
                                color= 'theme.100'
                            >
                                Go to back
                            </Button>                                        
                        </Stack>
                    </FormControl>
                </Center>
            </Box>
        </>
    )
}

const windowsHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#18181b',
      
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
