import React from 'react';
import { Text, View,useWindowDimensions } from 'react-native';
import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
export default function PosScreen() {
const {height, width} = useWindowDimensions();
const navigation = useNavigation();
const NavigateTo=()=>  {
navigation.navigate('')}
return (
<View style={[tailwind('h-full items-center '),{backgroundColor:"yellow"}]}>
<Text style={[tailwind('font-regular font-15')]}>POSScreen</Text>
</View>
)
}