import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import assets_manifest from '@assets';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
interface prototype {
  text: string;
  type: number;
  Refresh: () => void; 
  Care:any
}
export const TopBar = (props: prototype) => {
  const navigation = useNavigation();
  if (props?.type == 1) {
    return (
      <View style={[tailwind('bg-primary py-3'), {}]}>
        <View style={[tailwind('flex-row items-center px-3'), {width: '100%'}]}>
          <View style={[tailwind('flex-row items-center'), {width: '50%'}]}>
            <TouchableOpacity
              onPress={() => {
                navigation?.goBack();
              }}
              style={[
                tailwind('bg-secondary rounded-full  py-2 items-center'),
                {width: '20%', justifyContent: 'center'},
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
              style={[tailwind(''), {height: 20, width: '80%'}]}
              source={assets_manifest.Text}
            />
          </View>
          <View style={[tailwind(''), {width: '50%'}]}>
            <Text
              style={[
                tailwind('text-white font-20 font-bold'),
                {marginLeft: 'auto'},
              ]}>
              {props?.text}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={[tailwind('bg-primary py-3'), {}]}>
      <View style={[tailwind('flex-row items-center px-3'), {width: '100%'}]}>
        <View style={[tailwind('flex-row items-center'), {width: '50%'}]}>
          <TouchableOpacity
            onPress={() => {
              navigation?.goBack();
            }}
            style={[
              tailwind('bg-secondary rounded-full  py-2 items-center'),
              {width: '20%', justifyContent: 'center'},
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
            style={[tailwind(''), {height: 20, width: '80%'}]}
            source={assets_manifest.Text}
          />
        </View>
        <View style={[tailwind('flex-row items-center'), {marginLeft: 'auto'}]}>
          <TouchableOpacity style={[tailwind('ml-1'), {}]}>
            <Image
              resizeMode="contain"
              style={[
                tailwind(''),
                {height: 25, width: 25, tintColor: 'white'},
              ]}
              source={assets_manifest.search}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[tailwind('ml-1'), {}]} onPress={props?.Refresh}>
            <EvilIcons name="refresh" color={'white'} size={40} />
          </TouchableOpacity>
          <TouchableOpacity style={[tailwind('ml-1'), {}]} onPress={()=>{
            props?.Care?.current?.open()
          }}>
            <Image
              source={assets_manifest?.headset}
              style={[
                tailwind(''),
                {height: 25, width: 25, tintColor: 'white'},
              ]}
              tintColor="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
