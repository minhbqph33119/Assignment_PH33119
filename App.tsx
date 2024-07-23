import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Welcome from './src/screen/welcome';
import Login from './src/screen/login';
import Signup from './src/screen/signup';
import BottomAppBar from './src/screen/bottomAppBar';
import { Provider } from 'react-redux';
import store from './src/redux/store';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name='BottomAppBar' component={BottomAppBar} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})