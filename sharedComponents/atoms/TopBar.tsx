import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import assets_manifest from '@assets';
interface prototype {
  text: string;
}
export const TopBar = (props: prototype) => {
  const navigation = useNavigation();
  return (
    <View style={[tailwind('bg-primary py-3'), {}]}>
      <View style={[tailwind('flex-row items-center px-3'), {}]}>
        <TouchableOpacity
          onPress={() => {
            navigation?.goBack();
          }}
          style={[
            tailwind('bg-secondary rounded-full  py-2 items-center'),
            {width: '10%', justifyContent: 'center'},
          ]}>
          {/* <Image
                resizeMode="contain"
                style={[tailwind(''), {height: 20, tintColor: 'white'}]}
                source={assets_manifest.Right}
              /> */}
          <Entypo name="chevron-left" color={'white'} size={20} />
        </TouchableOpacity>

        <Image
          resizeMode="contain"
          style={[tailwind(''), {height: 20, width: '50%'}]}
          source={assets_manifest.Text}
        />
        {props?.text ? (
          <Text
            style={[
              tailwind('text-white font-20 font-bold'),
              {marginLeft: 'auto'},
            ]}>
            {props?.text}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
