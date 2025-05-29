import React from 'react';
import { Text, View,useWindowDimensions } from 'react-native';
import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
import { TopBar } from '@sharedComponents';
export default function CustomizedReportScreeen() {
const {height, width} = useWindowDimensions();
const navigation = useNavigation();
const NavigateTo=()=>  {
navigation.navigate('')}
return (
<View style={[tailwind('h-full items-center ')]}>
 <TopBar text={'Customized Report'} type={1}/>
<Text style={[tailwind('font-regular font-15')]}>Customized Report Screeen</Text>
</View>
)
}