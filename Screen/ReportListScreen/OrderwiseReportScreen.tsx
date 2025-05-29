import React from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
import {ReportCountCom, ReportListcom, TopBar} from '@sharedComponents';
import {useSelector} from 'react-redux';
export default function OrderwiseReportScreen() {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const NavigateTo = () => {
    navigation.navigate('');
  };
  // const DataList=useSelector((state)=>state.user.report_list)
  const AdminState = useSelector(state => state.user.report_list);

  console?.log('AdminState', AdminState);
  return (
    <View style={[tailwind('h-full  ')]}>
      <TopBar text={'Orderwise Report'} type={1} />
      <ReportCountCom
        yesterday_orders_count={AdminState?.yesterday_orders_count}
        month_orders_count={AdminState?.month_orders_count}
        week_orders_count={AdminState?.week_orders_count}
        today_orders_count={AdminState?.today_orders_count}
        title='Order Wise Report'
      />
      <View style={[tailwind('py-3'), {}]}>
              <ReportListcom
                text1={'Sales Wise Report'}
                screen1={'ReportScreen'}
                text2={'Item Wise Report'}
                screen2={'ItemWiseReportScreen'}
                text3={'Date & Month Wise Report'}
                screen3={'DateMonthReportScreen'}
                text4={'Customized Report'}
                screen4={'CustomizedReportScreeen'}
              />
            </View>
    </View>
  );
}
