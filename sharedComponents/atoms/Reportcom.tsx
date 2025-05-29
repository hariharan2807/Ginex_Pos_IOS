import React, {useRef} from 'react';
import {Text, View, useWindowDimensions, FlatList, Image} from 'react-native';
import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
import assets_manifest from '@assets';
export const Reportcom = (props: BluePrintComponentType) => {
  const ref = useRef<FlatList>(null);
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const NavigateTo = () => {
    navigation.navigate('');
  };
  return (
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
            source={assets_manifest?.rupee}
            style={[
              tailwind('ml-2'),
              {
                height: 40,
                width: 40,
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
              ₹ {props?.today_sales_amount}
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
            source={assets_manifest?.rupee}
            style={[
              tailwind('ml-2'),
              {
                height: 40,
                width: 40,
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
              ₹ {props?.yesterday_sales_amount}
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
            source={assets_manifest?.rupee}
            style={[
              tailwind('ml-2'),
              {
                height: 40,
                width: 40,
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
              ₹ {props?.week_sales_amount}
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
            source={assets_manifest?.rupee}
            style={[
              tailwind('ml-2'),
              {
                height: 40,
                width: 40,
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
              ₹ {props?.month_sales_amount}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
interface BluePrintComponentType {
  today_sales_amount: string;
  yesterday_sales_amount: string;
  week_sales_amount: string;
  month_sales_amount: string;
}
