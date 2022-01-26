import * as React from 'react';

import { useDispatch, useSelector } from "react-redux"
import { getDataUser, getDatuSER } from '../../redux/actions';
import axios from 'axios';
import { IP_HOST } from "@env"
import {
  Heading,
  AspectRatio,
  Image,
  Center,
  HStack,
  NativeBaseProvider,
  Button,
  Box,
  Stack,
  Pressable,
  ChevronLeftIcon,
  Text,
} from "native-base"

export default function MyData({ navigation }) {
  const userData = useSelector(state => state.userData);



  return (
    <NativeBaseProvider>
      <Box
        mt="50px"
        py="1"
        rounded="md"
        alignSelf="center"
        width={375}
        maxWidth="100%"
      >
        <Stack direction="row" alignItems="center">
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeftIcon color="darkBlue.900" size="9" />
          </Pressable>
          <Text ml="70px" fontSize="xl" color="darkBlue.900" fontWeight="bold" >My Data </Text>
        </Stack>
      </Box>

      <Box
        maxW="lg"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <AspectRatio width="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: userData.img
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            PROFILE
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {`${userData.firstname} ${userData.lastname}`}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {userData.email}
            </Text>
          </Stack>

          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
              >
                Phone: {userData.phone}
              </Text>
            </HStack>
          </HStack>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
              >
                <Button onPress={() => navigation.navigate("EditDataUser")}>Editar Perfil</Button>
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </NativeBaseProvider>
  );
}
