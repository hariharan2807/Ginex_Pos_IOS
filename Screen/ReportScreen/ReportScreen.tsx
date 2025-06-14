import tailwind from '@tailwind';
import {View, Text, Image, ScrollView, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TopBar} from '../../sharedComponents/atoms/TopBar';
import assets_manifest from '@assets';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Reportcom,
  ReportListcom,
  SalesReportcom,
  Loadingcomp,
} from '@sharedComponents';
import {getReportemote} from '@remote/userRemote';
import {GetLoginData} from '../../workers/localStorage';
import {useDispatch} from 'react-redux';
import {SaveReportdata} from '@store/actions';

export default function ReportScreen() {
  const [loading, setLoading] = useState(false);
  const [dataVal, setDataVal] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    ReportData();
  }, []);
  const ReportData = async () => {
    setLoading(true);
    const Data = await GetLoginData();
    const Response = await getReportemote({
      status: Data?.status,
    });
    setLoading(false);

    if (Response?.status) {
      setLoading(false);
      setDataVal(Response?.data);
      dispatch(SaveReportdata(Response?.data));
    } else {
      setLoading(false);

      setDataVal(null);
    }
  };
  if (loading) {
    return <Loadingcomp />;
  }
  return (
    <View style={[tailwind('h-full'), {backgroundColor: 'white'}]}>
      <TopBar text="" type={2} />
      <ScrollView>
        <View style={[tailwind('py-3'), {}]}>
          <Text style={[tailwind('px-3 font-18 font-bold text-black mt-3'), {}]}>
            Sales Wise Report
          </Text>
          <Reportcom
            today_sales_amount={dataVal?.today_sales_amount}
            yesterday_sales_amount={dataVal?.yesterday_sales_amount}
            week_sales_amount={dataVal?.week_sales_amount}
            month_sales_amount={dataVal?.month_sales_amount}
          />

          <View style={[tailwind('mt-2'), {}]}>
            <Text style={[tailwind('px-3  font-18 font-bold text-black mt-3'), {}]}>
              Today Sales
            </Text>
            <View  style={[tailwind('px-3 '),{}]}>
            <SalesReportcom
              today_cash_sales_amount={dataVal?.today_cash_sales_amount}
              today_upi_sales_amount={dataVal?.today_upi_sales_amount}
            />
            </View>
         
            <View style={[tailwind(''), {}]}>
              <ReportListcom
                text1={'Order Wise Report'}
                screen1={'OrderwiseReportScreen'}
                text2={'Item Wise Report'}
                screen2={'ItemWiseReportScreen'}
                text3={'Date & Month Wise Report'}
                screen3={'DateMonthReportScreen'}
                text4={'Customized Report'}
                screen4={'CustomizedReportScreeen'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
