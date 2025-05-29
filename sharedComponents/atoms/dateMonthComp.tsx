import React, {useRef} from 'react';
import {Text, View, useWindowDimensions, FlatList, Image} from 'react-native';
import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
import assets_manifest from '@assets';
export const DateMonthComp = (props: BluePrintComponentType) => {
  const ref = useRef<FlatList>(null);
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const NavigateTo = () => {
    navigation.navigate('');
  };
  return (
    <View style={[tailwind('')]}>
      <View style={[tailwind('mx-3 mt-2'), {}]}>
        <View style={[tailwind(''), {width: '100%'}]}>
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
              source={assets_manifest?.bag}
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
            <View style={[tailwind('ml-3'), {width: '100%'}]}>
              <Text style={tailwind('text-black font-bold text-base')}>
                Today Sale Amount
              </Text>
              <Text style={tailwind('text-black text-sm')} numberOfLines={1}>
                ₹ {props?.total_sales_amount}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={[
          tailwind('flex-row mx-3 flex-wrap mt-3'),
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
                ₹ {props?.total_cash_sales_amount}
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
              <Text style={tailwind('text-black  text-base')}>UPI Payment</Text>
              <Text style={tailwind('text-black text-sm')}>
                ₹ {props?.total_upi_sales_amount}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={[
          tailwind('flex-row mx-3 flex-wrap mt-1'),
          {justifyContent: 'space-between'},
        ]}>
        <View style={[tailwind('py-2'), {width: '48%'}]}>
          <View
            style={[
              tailwind('bg-white flex-row py-4 px-2 rounded-lg items-center '),
              {
                borderWidth: 1,
                borderColor: 'orange',
              },
            ]}>
            <Image
              source={assets_manifest?.inventry1}
              style={[
                tailwind(''),
                {
                  height: 30,
                  width: 30,
                  tintColor: 'orange',
                  resizeMode: 'cover',
                },
              ]}
            />
            <View style={[tailwind('ml-3'), {}]}>
              <Text style={tailwind('text-black  text-base')}>Total Order</Text>
              <Text style={tailwind('text-black text-sm')}>
                ₹ {props?.total_orders}
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
                borderColor: 'orange',
              },
            ]}>
            <Image
              source={assets_manifest?.inventry1}
              style={[
                tailwind(''),
                {
                  height: 30,
                  width: 30,
                  tintColor: 'orange',
                  resizeMode: 'cover',
                },
              ]}
            />
            <View style={[tailwind('ml-3'), {width: '100%'}]}>
              <Text
                style={[tailwind('text-black  text-base'), {width: '70%'}]}
                numberOfLines={1}>
                Cash + UPI Orders
              </Text>
              <Text style={tailwind('text-black text-sm')}>
                ₹ {props?.total_cash_upi_orders}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={[
          tailwind('flex-row mx-3 flex-wrap mt-1'),
          {justifyContent: 'space-between'},
        ]}>
        <View style={[tailwind('py-2'), {width: '48%'}]}>
          <View
            style={[
              tailwind('bg-white flex-row py-4 px-2 rounded-lg items-center '),
              {
                borderWidth: 1,
                borderColor: 'orange',
              },
            ]}>
            <Image
              source={assets_manifest?.inventry1}
              style={[
                tailwind(''),
                {
                  height: 30,
                  width: 30,
                  tintColor: 'orange',
                  resizeMode: 'cover',
                },
              ]}
            />
            <View style={[tailwind('ml-3'), {}]}>
              <Text style={tailwind('text-black  text-base')}>Cash Orders</Text>
              <Text style={tailwind('text-black text-sm')}>
                ₹ {props?.total_cash_orders}
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
                borderColor: 'orange',
              },
            ]}>
            <Image
              source={assets_manifest?.inventry1}
              style={[
                tailwind(''),
                {
                  height: 30,
                  width: 30,
                  tintColor: 'orange',
                  resizeMode: 'cover',
                },
              ]}
            />
            <View style={[tailwind('ml-3'), {width: '100%'}]}>
              <Text style={tailwind('text-black  text-base')}>UPI Orders</Text>
              <Text style={tailwind('text-black text-sm')}>
                ₹ {props?.total_upi_orders}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
interface BluePrintComponentType {
  total_sales_amount: string;
  total_cash_sales_amount: string;
  total_upi_sales_amount: string;
  total_orders: string;
  total_cash_upi_orders: string;
  total_cash_orders: string;
  total_upi_orders: string;
}
