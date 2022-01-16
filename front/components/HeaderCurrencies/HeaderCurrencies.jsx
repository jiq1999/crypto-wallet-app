import { Box, Input, ScrollView, VStack,Text,ZStack } from 'native-base';
import * as React from 'react';
import { useState } from 'react';

import Criptos from './Criptos';


export default function HeaderCurrencies({navigation}) {




const [aux, setAux] = useState([
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "SOLUSDT",
  "ADAUSDT",
  "XRPUSDT",
  "LUNAUSDT",
  "DOTUSDT",
  "AVAXUSDT",
  "DOGEUSDT",
  "1000SHIBUSDT",
  "MATICUSDT",
  "LINKUSDT",
  "LTCUSDT",
  "ALGOUSDT",
  "XLMUSDT",
  "NEARUSDT",
  "ATOMUSDT",
  ])



  return (<>
    <Box mt="20px"
    width={375}
    maxWidth="100%"
    alignSelf="center"
    
    >   


        <Box h="40" mb="-5" >
        <ZStack mt="2.5"  >
         <Box
            bg="indigo.600"
            mt="5"
            size="20"
            width={350}
            rounded="md"
            shadow={5}
          />
          <Box
            bg="#FFEC00"
            mt="7"
            ml="3"
           
            size="20"
            width={350}
            rounded="md"
            shadow={7}
          />
          
          <Box
            bg="darkBlue.900"
            mt="9"
            ml="5"
            size="20"
            width={350}
            rounded="md"
            shadow={9}
            alignItems="center"
          >

          <Text fontSize="4xl" mt="8px" fontWeight="bold" color="#ffffff">TOKENS</Text>
          </Box>
        </ZStack>
      </Box>

      <Box >

      <Input placeholder='Buscar token'></Input>

      </Box>
        
      

    </Box> 
         
         <ScrollView py="1">
        <VStack>
         {aux?.map((element, index)=>{
          return <Criptos key ={index} token={element}  nav={navigation} />
        })} 
        </VStack>
      </ScrollView>
      
      </>
  );
}