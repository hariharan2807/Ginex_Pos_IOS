/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import CustomBottomTab from '../sharedComponents/atoms/CustomBottomTab';
import {Account, Inventry, POS, Report, Stock} from './StackNavigation';

const config = {headerShown: false};

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigation(props: any) {
  return (
    <BottomTab.Navigator initialRouteName='POS'
      screenOptions={config}
      tabBar={props => <CustomBottomTab {...props} />}>
      <BottomTab.Screen name="Inventry" component={Inventry} />
      <BottomTab.Screen name="Stock" component={Stock} />
      <BottomTab.Screen name="POS" component={POS} />
      <BottomTab.Screen name="Report" component={Report} />
      <BottomTab.Screen name="Setting" component={Account} />
    </BottomTab.Navigator>
  );
}
