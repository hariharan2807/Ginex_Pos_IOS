/* eslint-disable prettier/prettier */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import InitialScreen from '../Screen/InitialScreen';
import HomeScreen from '../Screen/HomeScreen';
import ProfileScreen from '../Screen/ProfileScreen';

const HomeStack = createNativeStackNavigator();
const OrderStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();
const StackConfig = {headerShown: false};

export function Dashboard(props: any) {
  return (
    <HomeStack.Navigator screenOptions={StackConfig}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}
export function Order(props: any) {
  return (
    <OrderStack.Navigator screenOptions={StackConfig}>
           <AccountStack.Screen
        name="InitialScreen"
        component={InitialScreen}
      />
      {/* <OrderStack.Screen name="OrderScreen" component={OrderScreen} /> */}
    </OrderStack.Navigator>
  );
}
export function Account(props: any) {
  return (
    <AccountStack.Navigator screenOptions={StackConfig}>
      <AccountStack.Screen name="ProfileScreen" component={ProfileScreen} />
      {/* <AccountStack.Screen
        name="TomorrowOrderScreen"
        component={InitialScreen}
      /> */}
    </AccountStack.Navigator>
  );
}
