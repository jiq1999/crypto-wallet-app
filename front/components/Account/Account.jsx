import * as React from 'react';
import { Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { Logout } from '../../redux/actions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonChatBot from '../ChatBot/ButtonChatBot';
import { Box, Container, View } from 'native-base';

export default function Account({ navigation }) {

  const dispatch = useDispatch();

  async function onLogout () {
    try {
      await AsyncStorage.removeItem('userToken');
      dispatch(Logout());
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
    <Box>
      <Button title='My Data' onPress={() => navigation.navigate("MyData")} />
      <Button title="My tags" onPress={() => navigation.navigate("MyTags")} />
      <Button title="Security" onPress={() => navigation.navigate("Security")} />
      <Button title="Settings" onPress={() => navigation.navigate("Settings")} />
      <Button title="Help" onPress={() => navigation.navigate("Help")} />
      <Button title="Contacts" onPress={() => navigation.navigate("ContactsIndex")} />
      <Button title="Log out" onPress={onLogout} /> 
    </Box>

    </>
  );
}