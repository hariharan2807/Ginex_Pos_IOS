import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
import {ReportCountCom, ReportListcom, TopBar} from '@sharedComponents';
import DropDownPicker from 'react-native-dropdown-picker';
import {getSalesBasedremote} from '@remote/userRemote';
import {GetLoginData} from '../../workers/localStorage';
import assets_manifest from '@assets';
import {DateMonthComp} from '../../sharedComponents/atoms/dateMonthComp';

export default function DateMonthReportScreen() {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const [open, setOpen] = useState(false);
  const [printerSizeId, setPrintersizeId] = useState(null);
  const [printerSizeId1, setPrintersizeId1] = useState(null);
  const [data, setData] = useState(null);
  const Date1 = [
    {name: 'Month', id: 1},
    {name: 'Date', id: 2},
  ];
  const weeks = [
    {name: 'January', id: 1, label: 'January', value: '1'},
    {name: 'February', id: 2, label: 'February', value: '2'},
    {name: 'March', id: 3, label: 'March', value: '3'},
    {name: 'April', id: 4, label: 'April', value: '4'},
    {name: 'May', id: 5, label: 'May', value: '5'},
    {name: 'June', id: 6, label: 'June', value: '6'},
    {name: 'July', id: 7, label: 'July', value: '7'},
    {name: 'August', id: 8, label: 'August', value: '8'},
    {name: 'September', id: 9, label: 'September', value: '9'},
    {name: 'October', id: 10, label: 'October', value: '10'},
    {name: 'November', id: 11, label: 'November', value: '11'},
    {name: 'December', id: 12, label: 'December', value: '12'},
  ];
  useEffect(() => {
    setSelectedId(Date1?.[0]?.id);
    // Get current month (0-based, so +1)
    const currentMonth = (new Date().getMonth() + 1).toString();
    setPrintersizeId(currentMonth);
    const fullItem = weeks.find(item => item.value === currentMonth);
    setPrintersizeId1(fullItem);
  }, []);
  useEffect(() => {
    SalesData();
  }, [printerSizeId1]);
  const SalesData = async () => {
    const Status = await GetLoginData();
    const lowercasedName = printerSizeId1?.name?.toLowerCase(); // "a4size"

    const Response = await getSalesBasedremote({
      status: Status?.status,
      date: null,
      month: printerSizeId1 ? lowercasedName : null,
    });
    if (Response?.status) {
      setData(Response?.data);
    } else {
      setData(null);
    }
    console?.log('Responsedsdsdsdsdsdsdsw', Response);
  };
  console?.log('data', data);
  return (
    <View style={[tailwind('h-full  ')]}>
      <TopBar text={'Date & Month Report'} type={1} />
      <ScrollView>
        <View
          style={[
            tailwind('flex-row mx-3 mt-5'),
            // {backgroundColor: 'pink'},
          ]}>
          {Date1.map(option => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedId(option.id)}
              style={[
                tailwind('flex-row items-center '),
                {width: '50%', justifyContent: 'center'},
              ]}>
              {/* Outer Circle */}
              <View
                style={[
                  tailwind(
                    'w-5 h-5 rounded-full border-2 mr-2 items-center justify-center',
                  ),
                  selectedId === option.id
                    ? tailwind('border-blue-500')
                    : tailwind('border-gray-400'),
                ]}>
                {/* Inner Circle */}
                {selectedId === option.id && (
                  <View style={tailwind('w-3 h-3 bg-blue-500 rounded-full')} />
                )}
              </View>

              {/* Label */}
              <Text style={tailwind('text-black text-base')}>
                {option.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={[tailwind('mt-3 mx-3'), {}]}>
          <Text style={[tailwind('font-15 text-black font-medium'), {}]}>
            Select Date
          </Text>
          <DropDownPicker
            open={open}
            value={printerSizeId1?.id}
            items={weeks}
            setOpen={setOpen}
            // setValue={setPrintersizeId}
            setValue={callback => {
              const selectedValue =
                typeof callback === 'function'
                  ? callback(printerSizeId)
                  : callback;
              setPrintersizeId(selectedValue);
              const fullItem = weeks.find(item => item.value === selectedValue);
              console?.log('fullItem', fullItem);
              setPrintersizeId(fullItem?.id);
              setPrintersizeId1(fullItem);
            }}
            placeholder={printerSizeId1?.name}
            style={[
              tailwind('px-4 mt-3'),
              {
                borderRadius: 25,
                borderColor: '#3B6EB5',
                backgroundColor: 'white',
              },
            ]}
            dropDownContainerStyle={{
              borderRadius: 10,
              borderColor: '#ccc',
            }}
          />
        </View>
        <View style={[tailwind('mt-2 mx-3 '), {}]}>
          <Text>Report - ({printerSizeId1?.name})</Text>
        </View>
        <View style={[tailwind(''), {}]}>
          <DateMonthComp
            total_sales_amount={data?.total_sales_amount}
            total_cash_sales_amount={data?.total_cash_sales_amount}
            total_upi_sales_amount={data?.total_upi_sales_amount}
            total_orders={data?.total_orders}
            total_cash_upi_orders={data?.total_cash_upi_orders}
            total_cash_orders={data?.total_cash_orders}
            total_upi_orders={data?.total_upi_orders}
          />
          <ReportListcom
            text1={'Sales Wise Report'}
            screen1={'ReportScreen'}
            text2={'Order Wise Report'}
            screen2={'OrderwiseReportScreen'}
            text3={'Item Wise Report'}
            screen3={'ItemWiseReportScreen'}
            text4={'Customized Report'}
            screen4={'CustomizedReportScreeen'}
          />
        </View>
      </ScrollView>
    </View>
  );
}
