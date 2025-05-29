import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
import {TopBar} from '@sharedComponents';
import DropDownPicker from 'react-native-dropdown-picker';
import {getProductBasedremote} from '@remote/userRemote';
import {GetLoginData} from '../../workers/localStorage';
import assets_manifest from '@assets';

export default function ItemWiseReportScreen() {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [printerSizeId, setPrintersizeId] = useState(null);
  const [data, setData] = useState([]);
  const NavigateTo = () => {
    navigation.navigate('');
  };

  const weeks = [
    {name: 'Today', id: 1, label: 'Today', value: '1'},
    {name: 'Yesterday', id: 2, label: 'Yesterday', value: '2'},
    {name: 'This Week', id: 3, label: 'This Week', value: '3'},
    {name: 'This Month', id: 4, label: 'This Month', value: '4'},
  ];
  useEffect(() => {
    setPrintersizeId('1');
  }, []);
  useEffect(() => {
    ProductList();
  }, [printerSizeId]);
  const selectedItem = weeks.find(item => item.value === printerSizeId);

  console.log('selectedItem', selectedItem);
  const ProductList = async () => {
    const Status = await GetLoginData();
    const Response = await getProductBasedremote({
      status: Status?.status,
      report_date: printerSizeId,
    });
    console.log('ProductListProductList', Response);
    if (Response?.status) {
      setData(Response?.data);
    } else {
      setData([]);
    }
  };
  return (
    <View style={[tailwind('h-full bg-white')]}>
      <TopBar text={'Item Wise Report'} type={2} />
      <Text style={[tailwind('font-bold font-18 mt-3 px-3 py-3')]}>
        Select Options
      </Text>
      <View style={[tailwind(' px-3'), {}]}>
        <DropDownPicker
          open={open}
          value={printerSizeId}
          items={weeks}
          setOpen={setOpen}
          setValue={setPrintersizeId}
          placeholder="Select Printer Size"
          style={[
            tailwind('px-4'),
            {
              borderRadius: 25,
              borderColor: '#001a4f',
              backgroundColor: 'white',
            },
          ]}
          dropDownContainerStyle={{
            borderRadius: 10,
            borderColor: '#ccc',
          }}
        />
        <View style={[tailwind('mt-3 mb-5'), {}]}>
          <Text style={[tailwind('font-16 font-semi text-black'), {}]}>
            Report ({selectedItem?.name})
          </Text>
        </View>

        <FlatList
          data={data}
          //   style={tailwind('items-center')}
          contentContainerStyle={{paddingBottom: 100}}
          renderItem={({item, index}) => {
            console.log('item------>', item);
            return (
              <View>
                <View
                  key={index}
                  style={[
                    tailwind(
                      'mx-3 my-3 flex-row items-center  white-shadow px-5 py-3 rounded-xl mt-5',
                    ),
                    {},
                  ]}>
                  <Text
                    numberOfLines={2}
                    style={[
                      tailwind('font-17 font-bold'),
                      {width: item?.product_variation_name ? '49%' : '80%'},
                    ]}>
                    {' '}
                    {item?.product_name}
                  </Text>
                  <View  style={[tailwind(''),{width:"2%"}]}/>
                  {item?.product_variation_name && (
                    <Text
                      numberOfLines={2}
                      style={[tailwind('font-17 font-bold'), {width: '39%'}]}>
                      - {item?.product_variation_name}
                    </Text>
                  )}

                  <Text
                    style={[
                      tailwind('font-17 font-bold'),
                      {marginLeft: 'auto'},
                    ]}>
                    {item?.sale_count}
                  </Text>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={tailwind('mt-10 items-center')}>
              <Image
                source={assets_manifest?.search}
                style={{height: 50, width: 50}}
              />
              <Text style={[tailwind('mt-3 font-16 font-bold text-black'), {}]}>
                No Report Data Found
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
}
