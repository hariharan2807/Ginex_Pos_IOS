import {View, Text} from 'react-native';
import React from 'react';
import tailwind from '@tailwind';
export default function InitialScreen() {
  console.log('working');
  return (
    <View
      style={[
        tailwind('bg-secondary items-center'),
        {justifyContent: 'center'},
      ]}>
      <Text style={[tailwind('font-20 text-primary')]}>hari haran</Text>
      <Text style={[tailwind('font-20')]}>hari haran</Text>
      <Text style={[tailwind('font-20')]}>hari haran</Text>
      <Text style={[tailwind('font-20')]}>hari haran</Text>
      <Text style={[tailwind('font-20')]}>hari haran</Text>
      <Text style={[tailwind('font-20')]}>hari haran</Text>
      <Text style={[tailwind('font-20')]}>hari haran</Text>
      <Text style={[tailwind('font-20 text-primary')]}>hari haran</Text>
      <Text>hari haran</Text>
      <Text>hari haran</Text>
      <Text>hari haran</Text>
      <Text>hari haran</Text>
    </View>
  );
}
