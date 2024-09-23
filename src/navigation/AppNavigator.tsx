import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import ChangeLanguageScreen from '../screens/ChangeLanguageScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='OnBoarding' screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="OnBoarding"
          component={OnBoardingScreen} />
        <Stack.Screen
          name="ChangeLanguage"
          component={ChangeLanguageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
