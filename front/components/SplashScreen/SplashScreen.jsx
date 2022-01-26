import { Box, Button, Container, Image, Text, Center, Divider } from "native-base";
import {  Dimensions, StatusBar} from "react-native";

export default function SplashScreen ({navigation}) {
    return (
        <Box h= '100%' w= '100%' backgroundColor= 'theme.100' alignItems= "center">
            <StatusBar barStyle="light-content"/>
            {/* <Box backgroundColor= '#000e21'>
                <Image
                source={require('../../assets/icon.png')}
                resizeMode="stretch" height={height_logo}
                width={height_logo} alt="logo"
                />
            </Box> */}
            <Box alignItems= "center" mb= "0">
                <Box >
                    <Text fontSize= "lg">Stay connected with everyone!</Text>
                    <Text fontSize= "lg" >Sign in with account</Text>
                </Box>
                <Box mt= "450px" >
                <Divider my="4" bg='#ecfeff' />
                    <Button onPress={()=>navigation.navigate('Login')} bg= 'theme.50' color= 'theme.100'
                        _text={{fontSize:"md"}} borderRadius= "4px" alignContent={"center"}
                        justifyContent={"center"} w= "250" borderColor= "darkBlue.50" borderWidth="1">Get Started</Button>
                </Box>
            </Box>
        </Box>

    )
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

