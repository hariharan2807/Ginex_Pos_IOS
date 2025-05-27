import tailwind from '@tailwind';
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import assets_manifest from '../../constants/assets_manifest';
import Entypo from 'react-native-vector-icons/Entypo';
export default function RegisterScreen() {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  return (
    <View style={[tailwind('bg-primary'),{height:"100%"}]}>
      <View style={[tailwind('items-center mt-3'), {height: "50%"}]}>
        <View style={[tailwind('flex-row items-center px-3'), {}]}>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('LoginTypeScreen');
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
            style={[tailwind(''), {height: 30, width: '90%'}]}
            source={assets_manifest.Text}
          />
        </View>

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
          tailwind('bg-white p-5'),
          {
            height: "50%",
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          },
        ]}>
        <View style={[tailwind('items-center  '), {marginTop: '5%'}]}>
          <Text style={[tailwind('font-28 '), {fontWeight: 'bold'}]}>
            Billing Made Easy,
          </Text>
          <Text style={[tailwind('font-28'), {fontWeight: 'bold'}]}>
            Simple & Fast
          </Text>
        </View>
        <View style={[tailwind('mt-5'), {marginTop: '10%'}]}>
          <TextInput
            placeholder="Mobile Number *"
            onChangeText={txt => {
              setMobile(txt);
            }}
            value={mobile}
            style={[
              tailwind(
                'px-4 py-4 rounded-full border text-black font-16 font-bold',
              ),
              {},
            ]}
            placeholderTextColor={'black'}
            numberOfLines={10}
          />
          <TouchableOpacity
            style={[tailwind(''), {}]}
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}>
            <Text
              style={[
                tailwind('font-bold font-13 mt-3 text-black'),
                // {textTransform: 'uppercase'},
              ]}>
              Exciting User?, Login Here
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            // onPress={() => {
            //   navigation?.navigate('RegisterScreen');
            // }}
            style={[
              tailwind(
                ' bg-secondary border-primary border px-3 py-3 rounded-full mt-5',
              ),
              //   {backgroundColor: '#d9f1fc'},
            ]}>
            <Text
              style={[
                tailwind('font-bold font-18 text-white text-center'),
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
