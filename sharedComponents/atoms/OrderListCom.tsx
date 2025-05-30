import React, {useRef} from 'react';
import {
  Text,
  View,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
import assets_manifest from '@assets';
export const OrderListCom = (props: BluePrintComponentType) => {
  const ref = useRef<FlatList>(null);
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[tailwind('flex-row rounded-xl mx-3 px-3 py-3 bg-white mb-3'), {}]}
      key={props?.index}>
      <View style={[tailwind(''), {width: '80%'}]}>
        <View style={[tailwind('flex-row'), {}]}>
          <View>
            <Text style={[tailwind('font-13 font-semi text-gray'), {}]}>
              Order ID{' '}
            </Text>
            <Text style={[tailwind('mt-1 text-black font-bold font-14'), {}]}>
              {props?.order_id}{' '}
            </Text>
          </View>
          <View
            style={[
              tailwind(''),
              {marginLeft: 'auto', alignItems: 'flex-end'},
            ]}>
            <Text style={[tailwind('font-13 font-semi text-gray'), {}]}>
              Time{' '}
            </Text>
            <Text style={[tailwind('mt-1 text-black font-bold font-14'), {}]}>
              {props?.booking_time}{' '}
            </Text>
          </View>
        </View>
        <View
          style={[ 
            tailwind('my-3'),
            {
              height: 1,
              width: '100%',
              backgroundColor: 'silver',
            },
          ]}
        />
        <View style={[tailwind('flex-row'), {}]}>
          <View>
            <Text style={[tailwind('font-13 font-semi text-gray'), {}]}>
              Payment Method{' '}
            </Text>
            <Text style={[tailwind('mt-1 text-black font-bold font-14'), {}]}>
              {props?.payment_mode}{' '}
            </Text>
          </View>
          <View
            style={[
              tailwind(''),
              {marginLeft: 'auto', alignItems: 'flex-end'},
            ]}>
            <Text style={[tailwind('font-13 font-semi text-gray'), {}]}>
              Amount{' '}
            </Text>
            <Text style={[tailwind('mt-1 text-black font-bold font-14'), {}]}>
              ₹{props?.paid_amount}{' '}
            </Text>
          </View>
        </View>
        <View style={[tailwind('flex-row items-center mt-2'), {}]}>
          <Text style={[tailwind('font-medium font-13 text-gray'), {}]}>
            Staff :
          </Text>
          <Text style={[tailwind('font-bold font-14 text-black'), {}]}>
            {props?.emp_name}
          </Text>
        </View>
      </View>

      <View
        style={[
          tailwind('flex-row items-center'),
          {width: '20%', justifyContent: 'space-evenly'},
        ]}>
        <TouchableOpacity
          onPress={() => {
            props?.setPrintdata(true);
          }}>
          <Image
            source={assets_manifest?.printer}
            style={[tailwind(''), {height: 25, width: 25, tintColor: 'red'}]}
            tintColor={'red'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props?.setDeletedata(true);
          }}>
          <Image
            source={assets_manifest?.delete}
            style={[tailwind(''), {height: 25, width: 25}]}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
interface BluePrintComponentType {
  index: any;
  i: any;
  emp_name: string;
  order_id: string;
  booking_time: string;
  payment_mode: string;
  paid_amount: string;
  setDeletedata: any;
  setPrintdata: any;
}
