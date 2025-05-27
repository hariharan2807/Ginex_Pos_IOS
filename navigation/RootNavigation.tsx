/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import InitialScreen from '../Screen/InitialScreen';
import BottomTabNavigation from './BottomTabNavigation';
import LoginScreen from '../Screen/LoginScreen';
import LoginTypeScreen from '../Screen/LoginTypeScreen';
import RegisterScreen from '../Screen/RegisterScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import EditProfileScreen from '../Screen/EditProfileScreen';
import PlansPricingScreen from '../Screen/PlansPricingScreen';
// import BottomTabNavigation from './BottomTabNavigation';
import {Host} from 'react-native-portalize';
import ChangePasswordScreen from '../Screen/ChangePasswordScreen';

// import TomorrowOrderScreen from '../Screen/TomorrowOrderScreen';

const RootNavigator = createNativeStackNavigator();

export default function RootNavigation() {
  const StackConfig = {headerShown: false};
  return (
    <NavigationContainer>
      <Host>
        <RootNavigator.Navigator
          initialRouteName="InitialScreen"
          screenOptions={StackConfig}>
          <RootNavigator.Screen
            component={InitialScreen}
            name="InitialScreen"
          />

          <RootNavigator.Screen
            name="BottomTabNavigation"
            component={BottomTabNavigation}
          />
          <RootNavigator.Screen
            name="LoginTypeScreen"
            component={LoginTypeScreen}
          />
          <RootNavigator.Screen name="LoginScreen" component={LoginScreen} />
          <RootNavigator.Screen
            name="RegisterScreen"
            component={RegisterScreen}
          />
          <RootNavigator.Screen
            name="ProfileScreen"
            component={ProfileScreen}
          />
          <RootNavigator.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
          <RootNavigator.Screen
            name="PlansPricingScreen"
            component={PlansPricingScreen}
          />
             <RootNavigator.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}
          />
          
        </RootNavigator.Navigator>
      </Host>
    </NavigationContainer>
  );
}
