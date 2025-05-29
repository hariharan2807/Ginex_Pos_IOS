import React, {useRef} from 'react';
import {
  Text,
  View,
  useWindowDimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
import assets_manifest from '@assets';
import Entypo from 'react-native-vector-icons/Entypo';

export const ReportListcom = (props: BluePrintComponentType) => {
  const ref = useRef<FlatList>(null);
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const NavigateTo = () => {
    navigation.navigate('');
  };
  return (
    <View style={[tailwind('py-2 px-3'), {width: '100%'}]}>
      <TouchableOpacity
        onPress={() => {
          navigation?.navigate(props?.screen1);
        }}
        style={[
          tailwind(' flex-row py-4 px-2  rounded-lg items-center '),
          {
            borderWidth: 1,
            borderColor: '#dfe4fa',
            backgroundColor: '#dfe4fa',
          },
        ]}>
        <Image
          source={
            props?.text1 == 'Sales Wise Report'
              ? assets_manifest?.bag
              : assets_manifest?.rupee
          }
          style={[
            tailwind(''),
            {
              height: 30,
              width: 30,
              tintColor: '#001a4f',
            }
          ]}
          tintColor={'#001a4f'}
        />
        <View style={[tailwind('ml-3'), {}]}>
          <Text style={tailwind('font-bold font-16  text-black')}>
            {props?.text1}
          </Text>
        </View>
        <View style={[tailwind(''), {marginLeft: 'auto'}]}>
          <Entypo name="chevron-right" size={20} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation?.navigate(props?.screen2);
        }}
        style={[
          tailwind(' flex-row py-4 px-2 mt-3 rounded-lg items-center '),
          {
            borderWidth: 1,
            borderColor: '#fceed3',

            backgroundColor: '#fceed3',
          },
        ]}>
        <Image
          source={props?.text2 == 'Order Wise Report'?assets_manifest?.rupee:assets_manifest?.inventry}
          style={[
            tailwind(''),
            {
              height: 30,
              width: 30,
              // resizeMode: 'cover',
            },
          ]}
          tintColor={'orange'}

        />
        <View style={[tailwind('ml-3'), {}]}>
          <Text style={tailwind('font-bold font-16  text-black')}>
            {props?.text2}
          </Text>
        </View>
        <View style={[tailwind(''), {marginLeft: 'auto'}]}>
          <Entypo
            name="chevron-right"
            // }
            size={20}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation?.navigate(props?.screen3);
        }}
        style={[
          tailwind(' flex-row py-4 px-2 mt-3 rounded-lg items-center '),
          {
            borderWidth: 1,
            borderColor: '#fcd6e3',
            backgroundColor: '#fcd6e3',
          },
        ]}>
        <Image
          source={props?.text3 == 'Item Wise Report'?assets_manifest?.inventry1:assets_manifest?.calendar}
          style={[
            tailwind(''),
            {
              height: 30,
              width: 30,
            },
          ]}
          tintColor={'red'}
        />
        <View style={[tailwind('ml-3'), {}]}>
          <Text style={tailwind('font-bold font-16  text-black')}>
            {props?.text3}
          </Text>
        </View>
        <View style={[tailwind(''), {marginLeft: 'auto'}]}>
          <Entypo name="chevron-right" size={20} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation?.navigate(props?.screen4);
        }}
        style={[
          tailwind(' flex-row py-4 mt-3 px-2 rounded-lg items-center '),
          {
            borderWidth: 1,
            borderColor: '#dbf3f5',
            backgroundColor: '#dbf3f5',
          },
        ]}>
        <Image
          source={assets_manifest?.braker}
          style={[
            tailwind(''),
            {
              height: 30,
              width: 30,
            },
          ]}
        />
        <View style={[tailwind('ml-3'), {}]}>
          <Text style={tailwind('font-bold font-16  text-black')}>
            {props?.text4}
          </Text>
        </View>
        <View style={[tailwind(''), {marginLeft: 'auto'}]}>
          <Entypo name="chevron-right" size={20} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
interface BluePrintComponentType {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  screen1: string;
  screen2: string;
  screen3: string;
  screen4: string;
}
