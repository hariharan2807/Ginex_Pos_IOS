/* eslint-disable prettier/prettier */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ProfileScreen from '../Screen/ProfileScreen';
import ReportScreen from '../Screen/ReportScreen';
import InventryScreen from '../Screen/InventryScreen';
import StockScreen from '../Screen/StockScreen';
import POSScreen from '../Screen/PosScreen';
import {
  CustomizedReportScreeen,
  DateMonthReportScreen,
  ItemWiseReportScreen,
  OrderwiseReportScreen,
} from '../Screen/ReportListScreen';
import { InventryCategoryScreen ,InventrySubCategoryScreen} from '../Screen/InventryCategoryScreen';

const ReportStack = createNativeStackNavigator();
const POSStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();
const StockStack = createNativeStackNavigator();
const InventryStack = createNativeStackNavigator();

const StackConfig = {headerShown: false};

export function Report(props: any) {
  return (
    <ReportStack.Navigator screenOptions={StackConfig}>
      <ReportStack.Screen name="ReportScreen" component={ReportScreen} />

      <ReportStack.Screen
        name="ItemWiseReportScreen"
        component={ItemWiseReportScreen}
      />
      <ReportStack.Screen
        name="OrderwiseReportScreen"
        component={OrderwiseReportScreen}
      />

      <ReportStack.Screen
        name="DateMonthReportScreen"
        component={DateMonthReportScreen}
      />
      <ReportStack.Screen
        name="CustomizedReportScreeen"
        component={CustomizedReportScreeen}
      />
    </ReportStack.Navigator>
  );
}
export function POS(props: any) {
  return (
    <POSStack.Navigator screenOptions={StackConfig}>
      <POSStack.Screen name="POSScreen" component={POSScreen} />
    </POSStack.Navigator>
  );
}
export function Account(props: any) {
  return (
    <AccountStack.Navigator screenOptions={StackConfig}>
      <AccountStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </AccountStack.Navigator>
  );
}
export function Stock(props: any) {
  return (
    <StockStack.Navigator screenOptions={StackConfig}>
      <StockStack.Screen name="StockScreen" component={StockScreen} />
    </StockStack.Navigator>
  );
}
export function Inventry(props: any) {
  return (
    <InventryStack.Navigator screenOptions={StackConfig} initialRouteName='InventryScreen'>
      <InventryStack.Screen name="InventryScreen" component={InventryScreen} />
      <InventryStack.Screen
        name="InventryCategoryScreen"
        component={InventryCategoryScreen}
      />
        <InventryStack.Screen
        name="InventrySubCategoryScreen"
        component={InventrySubCategoryScreen}
      />
      
    </InventryStack.Navigator>
  );
}
