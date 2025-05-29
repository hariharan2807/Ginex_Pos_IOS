import React, {useRef} from 'react';
import {Text, View, useWindowDimensions, FlatList, Image, ActivityIndicator} from 'react-native';
import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
import assets_manifest from '@assets';
import { TopBar } from './TopBar';
export const Loadingcomp = (props: BluePrintComponentType) => {
  const ref = useRef<FlatList>(null);
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const NavigateTo = () => {
    navigation.navigate('');
  };
  return (
    <View style={[tailwind(''), {}]}>
        <TopBar text="" type={2} />
        <View
          style={[tailwind('h-full items-center'), {justifyContent: 'center'}]}>
          <ActivityIndicator color={'#001a4f'} size={'large'} />
          <Text style={[tailwind('mt-2'), {}]}>Loading....</Text>
        </View>
      </View>
  );
};
interface BluePrintComponentType {}
