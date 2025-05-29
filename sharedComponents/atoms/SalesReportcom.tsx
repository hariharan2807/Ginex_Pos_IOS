import React, {useRef} from 'react';
import {Text, View, useWindowDimensions, FlatList, Image} from 'react-native';
import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
import assets_manifest from '@assets';
export const SalesReportcom = (props: BluePrintComponentType) => {
  const ref = useRef<FlatList>(null);
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const NavigateTo = () => {
    navigation.navigate('');
  };
  return (
    <View style={[tailwind('')]}>
      <View
        style={[
          tailwind('flex-row flex-wrap mt-3'),
          {justifyContent: 'space-between'},
        ]}>
        <View style={[tailwind('py-2'), {width: '48%'}]}>
          <View
            style={[
              tailwind('bg-white flex-row py-4 px-2 rounded-lg items-center '),
              {
                borderWidth: 1,
                borderColor: '#001a4f',
              },
            ]}>
            <Image
              source={assets_manifest?.bag}
              style={[
                tailwind(''),
                {
                  height: 30,
                  width: 30,
                  tintColor: '#001a4f',
                  resizeMode: 'cover',
                },
              ]}
            />
            <View style={[tailwind('ml-3'), {}]}>
              <Text style={tailwind('text-black  text-base')}>
                Cash Payment
              </Text>
              <Text style={tailwind('text-black text-sm')}>
                ₹ {props?.today_cash_sales_amount}
              </Text>
            </View>
          </View>
        </View>
        <View style={[tailwind('py-2'), {width: '48%'}]}>
          <View
            style={[
              tailwind('bg-white flex-row py-4 px-2 rounded-lg items-center '),
              {
                borderWidth: 1,
                borderColor: '#001a4f',
              },
            ]}>
            <Image
              source={assets_manifest?.bag}
              style={[
                tailwind(''),
                {
                  height: 30,
                  width: 30,
                  tintColor: '#001a4f',
                  resizeMode: 'cover',
                },
              ]}
            />
            <View style={[tailwind('ml-3'), {}]}>
              <Text style={tailwind('text-black  text-base')}>UPI</Text>
              <Text style={tailwind('text-black text-sm')}>
                ₹ {props?.today_upi_sales_amount}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
interface BluePrintComponentType {
  today_cash_sales_amount: any;
  today_upi_sales_amount: any;
}
