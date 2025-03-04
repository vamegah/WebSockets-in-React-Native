// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UsernameScreen from './UsernameScreen';
import ChatScreen from './ChatScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UsernameScreen">
        <Stack.Screen name="UsernameScreen" component={UsernameScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: 'Chat Room' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}