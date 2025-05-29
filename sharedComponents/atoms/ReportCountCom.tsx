import React, {useRef} from 'react';
import {Text, View, useWindowDimensions, FlatList, Image} from 'react-native';
import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
import assets_manifest from '@assets';
export const ReportCountCom = (props: BluePrintComponentType) => {
  const ref = useRef<FlatList>(null);
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const NavigateTo = () => {
    navigation.navigate('');
  };
  return (
    <View>
      <Text style={[tailwind('px-3 py-3 font-18 font-bold'), {}]}>
        {props?.title}
      </Text>
      <View style={[tailwind('flex-row flex-wrap mt-3'), {}]}>
        <View style={[tailwind('p-2'), {width: '50%'}]}>
          <View
            style={[
              tailwind('bg-white flex-row py-4 rounded-lg items-center '),
              {
                borderWidth: 1,
                borderColor: '#001a4f',
                width: '100%',
              },
            ]}>
            <Image
              source={assets_manifest?.inventry1}
              style={[
                tailwind('ml-2'),
                {
                  height: 35,
                  width: 35,
                  tintColor: '#001a4f',
                  resizeMode: 'contain',
                },
              ]}
            />
            <View style={[tailwind('ml-3'), {width: '60%'}]}>
              <Text style={tailwind('text-black font-bold text-base')}>
                Today
              </Text>
              <Text style={tailwind('text-black text-sm')} numberOfLines={1}>
                {props?.today_orders_count}
              </Text>
            </View>
          </View>
        </View>
        <View style={[tailwind('p-2'), {width: '50%'}]}>
          <View
            style={[
              tailwind('bg-white flex-row py-4 rounded-lg items-center '),
              {
                borderWidth: 1,
                borderColor: 'orange',
                width: '100%',
              },
            ]}>
            <Image
              source={assets_manifest?.inventry1}
              style={[
                tailwind('ml-2'),
                {
                  height: 35,
                  width: 35,
                  tintColor: 'orange',

                  resizeMode: 'contain',
                },
              ]}
            />
            <View style={[tailwind('ml-3'), {width: '60%'}]}>
              <Text style={tailwind('text-black font-bold text-base')}>
                Yesterday
              </Text>
              <Text numberOfLines={1} style={tailwind('text-black text-sm')}>
                {props?.yesterday_orders_count}
              </Text>
            </View>
          </View>
        </View>
        <View style={[tailwind('p-2'), {width: '50%'}]}>
          <View
            style={[
              tailwind('bg-white flex-row py-4 rounded-lg items-center '),
              {
                borderWidth: 1,
                borderColor: 'red',
                width: '100%',
              },
            ]}>
            <Image
              source={assets_manifest?.inventry1}
              style={[
                tailwind('ml-2'),
                {
                  height: 35,
                  width: 35,
                  tintColor: 'red',
                  resizeMode: 'contain',
                },
              ]}
            />
            <View style={[tailwind('ml-3'), {width: '60%'}]}>
              <Text style={tailwind('text-black font-bold font-14')}>
                This Weak
              </Text>
              <Text numberOfLines={1} style={tailwind('text-black text-sm')}>
                {props?.week_orders_count}
              </Text>
            </View>
          </View>
        </View>
        <View style={[tailwind('p-2'), {width: '50%'}]}>
          <View
            style={[
              tailwind('bg-white flex-row py-4  rounded-lg items-center '),
              {
                borderWidth: 1,
                borderColor: 'skyblue',
                width: '100%',
              },
            ]}>
            <Image
              source={assets_manifest?.inventry1}
              style={[
                tailwind('ml-2'),
                {
                  height: 35,
                  width: 35,
                  tintColor: 'skyblue',
                  resizeMode: 'contain',
                },
              ]}
            />
            <View style={[tailwind('ml-3'), {width: '60%'}]}>
              <Text style={tailwind('text-black font-bold font-14')}>
                This Month
              </Text>
              <Text numberOfLines={1} style={tailwind('text-black text-sm')}>
                {props?.month_orders_count}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
interface BluePrintComponentType {
  yesterday_orders_count: string;
  month_orders_count: string;
  week_orders_count: string;
  today_orders_count: string;
  title: string;
}
