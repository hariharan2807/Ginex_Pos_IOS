import React, {useState} from 'react';
import {Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
import {TopBar} from '../../sharedComponents/atoms/TopBar';
import Feather from 'react-native-vector-icons/Feather';
import {errorBox} from '../../workers/utils';
import {
  getChangePasswordremote,
  getEditProfileremote,
} from '@remote/userRemote';
import {TextInput} from 'react-native-paper';
import { useSelector } from 'react-redux';
export default function ChangePasswordScreen() {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(true);
  const [Repeatpassword, setRepeatPassword] = useState('');
  const [Repeatvisible1, setRepeatVisible1] = useState(true);

  const [reportPass, setReportPass] = useState('');
  const [Repeatereportpass, setRepeatereportpass] = useState('');
  const [RepeateRepeatvisible, setRepeateRepeatVisible] = useState(true);
  const [RepeateRepeatvisible1, setRepeateRepeatVisible1] = useState(true);
  const AdminState = useSelector(state => state.user.user_info);

  const NavigateTo = () => {
    navigation.navigate('');
  };
  const AccountPass = async () => {
    if (!password) {
      return errorBox('Please Enter Password for Account');
    } else if (!Repeatpassword) {
      return errorBox('Password Mismatched, Please Enter Password for Account');
    } else if (password !== Repeatpassword) {
      return errorBox('Passwords do not match. Please try again.');
    }
    const Response = await getChangePasswordremote({
      password: password,
    });
    console.log('getChangePasswordremote', Response);
    if (Response?.status) {
      navigation?.goBack();
    }
  };
  const ReportPass = async () => {
    if (!reportPass) {
      return errorBox('Please Enter Password for Report');
    } else if (!Repeatereportpass) {
      return errorBox('Password Mismatched, Please Enter Password for Account');
    } else if (reportPass !== Repeatereportpass) {
      return errorBox('Passwords do not match. Please try again.');
    }
    const Response = await getEditProfileremote({
      name: AdminState?.name,
      mobile_number: AdminState?.user_phone_number,
      email_address: AdminState?.user_email,
      report_password: reportPass,
      address: AdminState?.address,
      gpay_number: AdminState?.gpay_number,
      footer_text1: AdminState?.footer_text1,
      footer_text2: AdminState?.footer_text2,
      bill_number_prefix: AdminState?.bill_number_prefix,
      customized_bill_title: AdminState?.customized_bill_title,
      reseller_code: AdminState?.reseller_code,
      printer_size: AdminState?.printer_size_id,
      discount_type: AdminState?.discount_type,
      incharge_name: AdminState?.incharge_name,
      printer_connection: AdminState?.printer_connection,
    });
    if (Response?.status) {
      navigation?.goBack();
    }
  };
  console.log("AdminState",AdminState)
  return (
    <View style={[tailwind('h-full')]}>
      <TopBar text="Change Password" type={1}/>
      <View style={[tailwind('mt-5 px-3 py-3'), {}]}>
        <Text style={[tailwind('font-20 font-semi text-primary'), {}]}>
          Account Password
        </Text>
        {/* <View

          style={[tailwind('flex-row px-4 py-4 rounded-full border mt-5'), {}]}>
          <TextInput
            placeholder="Password *"
            onChangeText={txt => {
              setPassword(txt);
            }}
            secureTextEntry={visible ? true : false}
            value={password}
            style={[tailwind(' text-black font-16 font-bold'), {width: '90%'}]}
            placeholderTextColor={'black'}
            // numberOfLines={10}
          />
          <TouchableOpacity
            style={[tailwind(''), {marginLeft: 'auto'}]}
            onPress={() => {
              if (visible == false) {
                setVisible(true);
              } else {
                setVisible(false);
              }
            }}>
            <Feather
              name={visible ? 'eye' : 'eye-off'}
              color={'black'}
              size={20}
            />
          </TouchableOpacity>
        </View> */}
        <TextInput
          mode="outlined"
          label="  Password *"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={visible}
          style={{
            borderRadius: 50,
            backgroundColor: 'white',
            marginTop: 20,
          }}
          outlineColor="#B0B0B0"
          activeOutlineColor="#001a4f"
          theme={{
            roundness: 50, // applies to ripple and internal elements
          }}
          right={
            <TextInput.Icon
              icon={() => (
                <Feather
                  name={visible ? 'eye-off' : 'eye'}
                  size={20}
                  color="gray"
                />
              )}
              onPress={() => setVisible(prev => !prev)}
            />
          }
        />
        {/* <View
          style={[tailwind('flex-row px-4 py-4 rounded-full border mt-5'), {}]}>
          <TextInput
            placeholder="Repeat Password *"
            onChangeText={txt => {
              setRepeatPassword(txt);
            }}
            secureTextEntry={Repeatvisible1 ? true : false}
            value={Repeatpassword}
            style={[tailwind(' text-black font-16 font-bold'), {width: '90%'}]}
            placeholderTextColor={'black'}
            // numberOfLines={10}
          />
          <TouchableOpacity
            style={[tailwind(''), {marginLeft: 'auto'}]}
            onPress={() => {
              if (Repeatvisible1 == false) {
                setRepeatVisible1(true);
              } else {
                setRepeatVisible1(false);
              }
            }}>
            <Feather
              name={Repeatvisible1 ? 'eye' : 'eye-off'}
              color={'black'}
              size={20}
            />
          </TouchableOpacity>
        </View> */}
        <TextInput
          mode="outlined"
          label="  Repeat Password *"
          value={Repeatpassword}
          onChangeText={setRepeatPassword}
          secureTextEntry={Repeatvisible1}
          style={{
            borderRadius: 50,
            backgroundColor: 'white',
            marginTop: 20,
          }}
          outlineColor="#B0B0B0"
          activeOutlineColor="#001a4f"
          theme={{
            roundness: 50, // applies to ripple and internal elements
          }}
          right={
            <TextInput.Icon
              icon={() => (
                <Feather
                  name={Repeatvisible1 ? 'eye-off' : 'eye'}
                  size={20}
                  color="gray"
                />
              )}
              onPress={() => setRepeatVisible1(prev => !prev)}
            />
          }
        />
        <TouchableOpacity
          onPress={AccountPass}
          style={[
            tailwind(
              ' bg-secondary border-yellow border px-3 py-3 rounded-full mt-5',
            ),
            //   {backgroundColor: '#d9f1fc'},
          ]}>
          <Text
            style={[
              tailwind('font-bold font-18 text-white text-center'),
              //   {textTransform: 'uppercase'},
            ]}>
            Update
          </Text>
        </TouchableOpacity>

        <Text style={[tailwind('font-20 font-semi text-primary mt-5'), {}]}>
          Report Password
        </Text>
        {/* <View
          style={[tailwind('flex-row px-4 py-4 rounded-full border mt-5'), {}]}>
          <TextInput
            placeholder="Password *"
            onChangeText={txt => {
              setReportPass(txt);
            }}
            secureTextEntry={RepeateRepeatvisible ? true : false}
            value={reportPass}
            style={[tailwind(' text-black font-16 font-bold'), {width: '90%'}]}
            placeholderTextColor={'black'}
            // numberOfLines={10}
          />
          <TouchableOpacity
            style={[tailwind(''), {marginLeft: 'auto'}]}
            onPress={() => {
              if (RepeateRepeatvisible == false) {
                setRepeateRepeatVisible(true);
              } else {
                setRepeateRepeatVisible(false);
              }
            }}>
            <Feather
              name={RepeateRepeatvisible ? 'eye' : 'eye-off'}
              color={'black'}
              size={20}
            />
          </TouchableOpacity>
        </View> */}
        <TextInput
          mode="outlined"
          label="  Password for Report*"
          value={reportPass}
          onChangeText={setReportPass}
          secureTextEntry={RepeateRepeatvisible}
          style={[
            tailwind('rounded-full bg-white mt-5 '),
            {
              // borderRadius: 50,
              // backgroundColor: 'white',
              // marginTop: 20,
            },
          ]}
          outlineColor="#B0B0B0"
          activeOutlineColor="#001a4f"
          theme={{
            roundness: 50, // applies to ripple and internal elements
          }}
          right={
            <TextInput.Icon
              icon={() => (
                <Feather
                  name={RepeateRepeatvisible ? 'eye-off' : 'eye'}
                  size={20}
                  color="gray"
                />
              )}
              onPress={() => setRepeateRepeatVisible(prev => !prev)}
            />
          }
        />
        {/* <View
          style={[tailwind('flex-row px-4 py-4 rounded-full border mt-5'), {}]}>
          <TextInput
            placeholder="Repeat Password *"
            onChangeText={txt => {
              setRepeatereportpass(txt);
            }}
            secureTextEntry={RepeateRepeatvisible1 ? true : false}
            value={Repeatereportpass}
            style={[tailwind(' text-black font-16 font-bold'), {width: '90%'}]}
            placeholderTextColor={'black'}
            // numberOfLines={10}
          />
          <TouchableOpacity
            style={[tailwind(''), {marginLeft: 'auto'}]}
            onPress={() => {
              if (RepeateRepeatvisible1 == false) {
                setRepeateRepeatVisible1(true);
              } else {
                setRepeateRepeatVisible1(false);
              }
            }}>
            <Feather
              name={RepeateRepeatvisible1 ? 'eye' : 'eye-off'}
              color={'black'}
              size={20}
            />
          </TouchableOpacity>
        </View> */}
        <TextInput
          mode="outlined"
          label="  Repeat Password *"
          value={Repeatereportpass}
          onChangeText={setRepeatereportpass}
          secureTextEntry={RepeateRepeatvisible1}
          style={[
            tailwind('rounded-full bg-white mt-5 '),
            {
              // borderRadius: 50,
              // backgroundColor: 'white',
              // marginTop: 20,
            },
          ]}
          outlineColor="#B0B0B0"
          activeOutlineColor="#001a4f"
          theme={{
            roundness: 50, // applies to ripple and internal elements
          }}
          right={
            <TextInput.Icon
              icon={() => (
                <Feather
                  name={RepeateRepeatvisible1 ? 'eye-off' : 'eye'}
                  size={20}
                  color="gray"
                />
              )}
              onPress={() => setRepeateRepeatVisible1(prev => !prev)}
            />
          }
        />
        <TouchableOpacity
            onPress={ReportPass}
          style={[
            tailwind(
              ' bg-secondary border-yellow border px-3 py-3 rounded-full mt-5',
            ),
            //   {backgroundColor: '#d9f1fc'},
          ]}>
          <Text
            style={[
              tailwind('font-bold font-18 text-white text-center'),
              //   {textTransform: 'uppercase'},
            ]}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
