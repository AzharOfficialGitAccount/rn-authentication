import React, { useEffect, useState } from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen'
import AsyncStorage from '@react-native-community/async-storage';
const Stack = createStackNavigator();

const App = () => {
  const [isloggedin, setLogged] = useState(null)

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      setLogged(true)
    } else {
      setLogged(false)
    }
  }
  useEffect(() => {
    detectLogin()
  }, [])


  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
      >

        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />


      </Stack.Navigator>
    </NavigationContainer>

  );
};


export default App;