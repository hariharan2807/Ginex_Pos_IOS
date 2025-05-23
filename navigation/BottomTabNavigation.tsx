/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CustomBottomTab from '../sharedComponents/atoms/CustomBottomTab';
import { Account, Dashboard, Order } from './StackNavigation';

const config = {headerShown: false};

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigation(props: any) {
  return (
    <BottomTab.Navigator
      screenOptions={config}
      tabBar={props => <CustomBottomTab {...props} />}>
      <BottomTab.Screen name="Dashboard" component={Dashboard} />
      <BottomTab.Screen name="Order" component={Order} />
      <BottomTab.Screen name="Account" component={Account} />
    </BottomTab.Navigator>
  );
}
