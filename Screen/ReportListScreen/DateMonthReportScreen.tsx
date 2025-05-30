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
import {
  Loadingcomp,
  OrderListCom,
  ReportCountCom,
  ReportListcom,
  TopBar,
} from '@sharedComponents';
import DropDownPicker from 'react-native-dropdown-picker';
import {getOrderListremote, getSalesBasedremote} from '@remote/userRemote';
import {GetLoginData} from '../../workers/localStorage';
import assets_manifest from '@assets';
import {DateMonthComp} from '../../sharedComponents/atoms/dateMonthComp';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';

export default function DateMonthReportScreen() {
  const {height, width} = useWindowDimensions();
  const [date12, setDate12] = useState(new Date()); // 👈 Default to current date
  const [fromdate, setFromDate] = useState(new Date());
  const [Dob, setDob] = useState('');
  const [orderList, setOrderList] = useState([]);
  const [printdata, setPrintdata] = useState(false);
  const [deletedata, setDeletedata] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Open1, setOpen1] = useState(false);
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
    setSelectedId(Date1?.[1]?.id);
    const today = new Date();
    setDob(formatDate(today.toISOString().substring(0, 10)));
    // Get current month (0-based, so +1)
    const currentMonth = (new Date().getMonth() + 1).toString();
    setPrintersizeId(currentMonth);
    const fullItem = weeks.find(item => item.value === currentMonth);
    const Data = fullItem?.name?.toLowerCase();
    setPrintersizeId1(fullItem);
    SalesData(Data);
    AnotherOneApi(Dob);
  }, []);
  useEffect(() => {
    SalesData(printerSizeId1);
    AnotherOneApi(Dob);
  }, [printerSizeId1, selectedId, Dob]);
  const SalesData = async (printerSizeId1: any) => {
    const Status = await GetLoginData();
    const lowercasedName = printerSizeId1?.name?.toLowerCase(); // "a4size"
    setLoading(true);

    const Response = await getSalesBasedremote({
      status: Status?.status,
      date: selectedId == 1 ? null : Dob,
      month: selectedId == 2 ? null : lowercasedName,
    });
    setLoading(false);

    if (Response?.status) {
      setLoading(false);

      setData(Response?.data);
    } else {
      setLoading(false);

      setData(null);
    }
  };
  const AnotherOneApi = async (Dob: any) => {
    const Status = await GetLoginData();
    setLoading(true);
    const Response12 = await getOrderListremote({
      status: Status?.status,
      date: selectedId == 1 ? null : Dob,
    });
    setLoading(false);

    if (Response12?.status) {
      setOrderList(Response12?.data);
      setLoading(false);
    } else {
      setLoading(false);

      setOrderList([]);
    }
  };
  const formatDate = (dateStr: any) => {
    const [year, month, day] = dateStr.split('-');
    return `${year}-${month}-${day}`;
  };
  if (loading) {
    return <Loadingcomp />;
  }
  console.log('DOB', Dob);
  return (
    <View style={[tailwind('h-full  ')]}>
      <TopBar text={'Date & Month Report'} type={2} />
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
        {selectedId == '1' ? (
          <View style={[tailwind(''), {}]}>
            <View style={[tailwind('mt-3 mx-3'), {}]}>
              <Text style={[tailwind('font-15 text-black font-medium'), {}]}>
                Select Month
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
                  const fullItem = weeks.find(
                    item => item.value === selectedValue,
                  );
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
          </View>
        ) : (
          <View style={[tailwind(''), {}]}>
            <View style={[tailwind('mt-3 mx-3'), {}]}>
              <Text style={[tailwind('font-15 text-black font-medium'), {}]}>
                Select Date
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setOpen1(true);
                }}
                style={[
                  tailwind('px-4 flex-row border py-4 mt-3'),
                  {
                    borderRadius: 25,
                    borderColor: '#3B6EB5',
                    backgroundColor: 'white',
                  },
                ]}>
                <Text style={[tailwind(''), {}]}>{Dob}</Text>
                <View style={[tailwind(''), {marginLeft: 'auto'}]}>
                  <Image
                    source={assets_manifest?.calendar}
                    style={[tailwind(''), {height: 25, width: 25}]}
                    tintColor={'#3B6EB5'}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={[tailwind('mt-2 mx-3 '), {}]}>
              <Text>Report - ({Dob})</Text>
            </View>
            {orderList?.length ? (
              <View>
                <DateMonthComp
                  total_sales_amount={data?.total_sales_amount}
                  total_cash_sales_amount={data?.total_cash_sales_amount}
                  total_upi_sales_amount={data?.total_upi_sales_amount}
                  total_orders={data?.total_orders}
                  total_cash_upi_orders={data?.total_cash_upi_orders}
                  total_cash_orders={data?.total_cash_orders}
                  total_upi_orders={data?.total_upi_orders}
                />
                {orderList?.map((i: any, index: any) => {
                  return (
                    <OrderListCom
                      i={i}
                      paid_amount={i?.paid_amount}
                      index={index}
                      emp_name={i?.emp_name}
                      payment_mode={i?.payment_mode}
                      booking_time={i?.booking_time}
                      order_id={i?.order_id}
                      setDeletedata={setDeletedata}
                      setPrintdata={setPrintdata}
                    />
                  );
                })}
              </View>
            ) : (
              <View style={[tailwind(''), {}]}>
                <View
                  style={[
                    tailwind('items-center'),
                    {height: '30%', justifyContent: 'center'},
                  ]}>
                  <Image
                    source={assets_manifest?.search}
                    style={[
                      tailwind('items-center'),
                      {height: 50, width: 50, justifyContent: 'center'},
                    ]}
                  />
                  <Text>No Report Data Found</Text>
                </View>
                <View style={[tailwind(''), {}]}>
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
              </View>
            )}
          </View>
        )}
        <DatePicker
          modal
          mode="date"
          open={Open1}
          date={fromdate}
          onConfirm={date => {
            setOpen1(false);
            setFromDate(date);
            setDob(formatDate(date?.toISOString().substring(0, 10)));
          }}
          onCancel={() => {
            setOpen1(false);
          }}
        />
        {/* //Print// */}
        <Modal
          backdropOpacity={0.15}
          onBackdropPress={() => setPrintdata(true)}
          style={[
            tailwind(' h-full items-center justify-center '),
            {backgroundColor: 'transparent'},
          ]}
          isVisible={printdata}>
          <View
            style={[
              tailwind('rounded-xl px-5 py-5 '),
              {backgroundColor: '#ffffff'},
            ]}>
            <Text style={[tailwind('font-17 font-semi'), {}]}>
              Are you sure want to print this order?
            </Text>
            <View
              style={[
                tailwind('flex-row  mt-3'),
                {justifyContent: 'space-between'},
              ]}>
              <TouchableOpacity
                onPress={() => {
                  setPrintdata(false);
                }}
                style={[
                  tailwind('px-3 py-3 mt-3 rounded-full  border bg-white'),
                  {width: '48%', borderColor: '#001a4f'},
                ]}>
                <Text
                  style={[
                    tailwind('font-16 text-primary font-bold text-center'),
                  ]}>
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={ReportOnpress}
                style={[
                  tailwind('px-3 py-3 mt-3 rounded-full  bg-primary'),
                  {width: '48%'},
                ]}>
                <Text
                  style={[
                    tailwind('font-16 text-white font-bold text-center'),
                    {},
                  ]}>
                  PRINT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* //Delete// */}
        <Modal
          backdropOpacity={0.15}
          onBackdropPress={() => setDeletedata(true)}
          style={[
            tailwind(' h-full items-center justify-center '),
            {backgroundColor: 'transparent'},
          ]}
          isVisible={deletedata}>
          <View
            style={[
              tailwind('rounded-xl px-5 py-5 '),
              {backgroundColor: '#ffffff'},
            ]}>
            <Text style={[tailwind('font-17 font-semi'), {}]}>
              Are you sure want to delete this order?
            </Text>
            <View
              style={[
                tailwind('flex-row  mt-3'),
                {justifyContent: 'space-between'},
              ]}>
              <TouchableOpacity
                onPress={() => {
                  setDeletedata(false);
                }}
                style={[
                  tailwind('px-3 py-3 mt-3 rounded-full  border bg-white'),
                  {width: '48%', borderColor: '#001a4f'},
                ]}>
                <Text
                  style={[
                    tailwind('font-16 text-primary font-bold text-center'),
                  ]}>
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={ReportOnpress}
                style={[
                  tailwind('px-3 py-3 mt-3 rounded-full  bg-primary'),
                  {width: '48%'},
                ]}>
                <Text
                  style={[
                    tailwind('font-16 text-white font-bold text-center'),
                    {},
                  ]}>
                  DELETE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}
