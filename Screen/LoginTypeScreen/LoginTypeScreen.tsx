import tailwind from '@tailwind';
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import assets_manifest from '../../constants/assets_manifest';
import {useNavigation} from '@react-navigation/native';
export default function LoginTypeScreen() {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  console.warn("hi---->")
  return (
    <View style={[tailwind('h-full bg-primary')]}>
      <View style={[tailwind('items-center mt-3'), {height: height / 2}]}>
        <Image
          resizeMode="contain"
          style={[tailwind(''), {height: 30, width: '50%'}]}
          source={assets_manifest.Text}
        />
        <Image
          source={assets_manifest?.Login_type}
          style={[
            tailwind('mt-5'),
            {
              height: height / 2.5,
              width: width / 1.5,
              resizeMode: 'contain',
              justifyContent: 'center',
            },
          ]}
        />
      </View>
      <View
        style={[
          tailwind('bg-white p-3'),
          {
            height: height,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          },
        ]}>
        <View style={[tailwind('items-center '), {marginTop: '5%'}]}>
          <Text style={[tailwind('font-28 '), {fontWeight: 'bold'}]}>
            Billing Made Easy,
          </Text>
          <Text style={[tailwind('font-28'), {fontWeight: 'bold'}]}>
            Simple & Fast
          </Text>
        </View>
        <View style={[tailwind(''), {marginTop: '10%'}]}>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('LoginScreen');
            }}
            style={[tailwind('bg-secondary px-3 py-3 rounded-full'), {}]}>
            <Text
              style={[
                tailwind('font-bold font-18 text-white text-center'),
                {textTransform: 'uppercase'},
              ]}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('RegisterScreen');
            }}
            style={[
              tailwind('border-primary border px-3 py-3 rounded-full mt-5'),
              {backgroundColor: '#d9f1fc'},
            ]}>
            <Text
              style={[
                tailwind('font-bold font-18 text-primary text-center'),
                {textTransform: 'uppercase'},
              ]}>
              register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
