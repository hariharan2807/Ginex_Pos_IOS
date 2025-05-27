import tailwind from '@tailwind';
import {View, Text} from 'react-native';
import React from 'react';
import { TopBar } from '../../sharedComponents/atoms/TopBar';
export default function ReportScreen() {
  return <View style={[tailwind('h-full'), {backgroundColor: 'pink'}]}>
    <TopBar text='' type={2}/>
    
  </View>;
}
