/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import InitialScreen from '../Screen/InitialScreen';
import BottomTabNavigation from './BottomTabNavigation';
// import BottomTabNavigation from './BottomTabNavigation';

// import TomorrowOrderScreen from '../Screen/TomorrowOrderScreen';

const RootNavigator = createNativeStackNavigator();

export default function RootNavigation() {
  const StackConfig = {headerShown: false};
  return (
    <NavigationContainer>
      {/* <Host> */}
        <RootNavigator.Navigator
          initialRouteName="BottomTabNavigation"
          screenOptions={StackConfig}>
          <RootNavigator.Screen
            component={InitialScreen}
            name="InitialScreen"
          />
    
        <RootNavigator.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
      />
        </RootNavigator.Navigator>
      {/* </Host> */}
    </NavigationContainer>
  );
}
