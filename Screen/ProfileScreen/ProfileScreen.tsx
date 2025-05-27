import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  FlatList,
  Button,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import tailwind from '@tailwind';
import {TopBar} from '../../sharedComponents/atoms/TopBar';
import {
  getCheckReportPasswordremote,
  getEditProfileremote,
  getMyProfileremote,
} from '@remote/userRemote';
import {
  GetLoginData,
  RemoveLoginData,
  removePersistedUser,
  removeTokenUser,
  Removetrip_id,
} from '../../workers/localStorage';
import assets_manifest from '@assets';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import {BleManager} from 'react-native-ble-plx';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {LogoutIcon} from '../../asset/icons';
import RNRestart from 'react-native-restart';
import {errorBox, infoBox} from '../../workers/utils';
import {SaveUserInfo} from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput} from 'react-native-paper';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const AdminState = useSelector(state => state.user.user_info);
  const manager = new BleManager();
  const Care = useRef(null);
  const navigation = useNavigation();
  const [printer, setPrinter] = useState('');
  const [password, setPassword] = useState(false);
  const [report, setReport] = useState(false);
  const [passwordcode, setPasswordcode] = useState('');
  const [reportcode, setReportCode] = useState('');
  const [logout, setLogOut] = useState(false);
  const [visible, setVisible] = useState(true);
  const [devices, setDevices] = useState({});
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const PrinterConnection = [
    {id: 1, name: 'BLUETOOTH', img: assets_manifest?.Bluetooth},
    {id: 2, name: 'USB', img: assets_manifest?.usb},
  ];
  const OtherDetails = [
    {
      id: 1,
      name: 'Edit Profile',
      img: assets_manifest?.editing,
      screen: 'EditProfileScreen',
    },
    {
      id: 2,
      name: 'Plans & Pricing',
      img: assets_manifest?.plan,
      screen: 'PlansPricingScreen',
    },
    {id: 3, name: 'Change Password', img: assets_manifest?.lock, screen: ''},
    {id: 4, name: 'Please Select Your Printer', img: assets_manifest?.printer},
    {id: 5, name: 'Report', img: assets_manifest?.report, screen: ''},
  ];
  useFocusEffect(
    useCallback(() => {
      MyProfile(); // Call your function when screen is focused
    }, []),
  );

  const MyProfile = async () => {
    const Data = await GetLoginData();
    console.log('Data-------->', Data?.status);
    const Response = await getMyProfileremote({status: Data?.status});
    if (Response) {
      console.log('ResponseSaveUserInfo', Response);
      dispatch(SaveUserInfo(Response));
      setUserProfile(Response);
      const matchedPrinter = PrinterConnection?.find(
        item => item?.name === Response?.printer_connection,
      );

      if (matchedPrinter) {
        setPrinter(matchedPrinter.id); // or setPrinter(matchedPrinter) if you need the object
      }
    } else {
      setUserProfile(null);
    }
  };
  const CheckReport = async (type: any) => {
    console.log('type----->', type);
    const Data = await GetLoginData();
    if (!passwordcode) {
      return errorBox('Invalid Password');
    }
    const Response = await getCheckReportPasswordremote({
      password: passwordcode,
      status: Data?.status,
    });
    console.log('ResponseResponsedata', Response);
    if (Response?.status) {
      setPassword(false);
      setReport(false);
      setPasswordcode('');
      setReportCode('');
      if (type == 1) {
        navigation?.navigate('ChangePasswordScreen');
      } else {
        navigation?.navigate('Report');
      }
      // infoBox('ok');
      // console.log('infoBox', Response);
    } else {
      console.log('errorBox', Response?.res?.message);
      errorBox(Response?.res?.message);
    }
  };
  console.log('devices', devices);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      scanAndConnect();
    } else {
      requestAndroidPermissions().then(scanAndConnect);
    }

    return () => manager.destroy();
  }, []);

  const requestAndroidPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
    }
  };

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('Scan error:', error);
        return;
      }

      if (device && device.name && !devices[device.id]) {
        console.log('Found:', device.name);
        setDevices(prev => ({...prev, [device.id]: device}));
      }
    });

    // Stop scan after 10 seconds
    setTimeout(() => {
      manager.stopDeviceScan();
    }, 10000);
  };

  const connectToDevice = async device => {
    try {
      const connected = await manager.connectToDevice(device.id);
      await connected.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connected);
      alert(`Connected to ${connected.name}`);
    } catch (error) {
      alert('Connection failed: ' + error.message);
    }
  };
  const WhatApp = () => {
    Care?.current?.close();

    Linking.openURL('https://wa.me/+919384542122');
  };
  const handleEmail = async () => {
    Care?.current?.close();

    const email = 'support@example.com';
    const subject = 'Customer Support';
    const body = 'Hi, I need help with...';
    const url = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      Linking.openURL(url);
    } else {
      Alert.alert(
        'Mail app not found',
        'No mail app is installed or configured. Please set up an email app to use this feature.',
      );
    }
  };
  const handleCall = () => {
    Care?.current?.close();
    const phoneNumber = '+1234567890'; // Include country code if needed
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const HandleLogOut = async () => {
    await removeTokenUser();
    await RemoveLoginData();
    RNRestart?.restart();
  };
  const EditProfile = async (name: any) => {
    const Response = await getEditProfileremote({
      name: userProfile?.name,
      mobile_number: userProfile?.user_phone_number,
      email_address: userProfile?.user_email,
      report_password: userProfile?.report_password,
      address: userProfile?.address,
      gpay_number: userProfile?.gpay_number,
      footer_text1: userProfile?.footer_text1,
      footer_text2: userProfile?.footer_text2,
      bill_number_prefix: userProfile?.bill_number_prefix,
      customized_bill_title: userProfile?.customized_bill_title,
      reseller_code: userProfile?.reseller_code,
      printer_size: userProfile?.printer_size_id,
      discount_type: userProfile?.discount_type,
      incharge_name: userProfile?.incharge_name,
      printer_connection: name,
    });
    console.log('ResponseEditProfile', Response);
    if (Response?.status) {
      MyProfile();
    }
  };
  console.log('AdminState', AdminState?.user_phone_number);
  return (
    <View style={[tailwind('h-full bg-white'), {}]}>
      <TopBar text="Setting" type={1}/>
      <ScrollView>
        <View
          style={[
            tailwind('mx-3 my-3 white-shadow px-5 py-3 rounded-xl mt-5'),
            {},
          ]}>
          {userProfile?.name && (
            <Text style={[tailwind('font-bold font-15'), {}]}>Adaikalm</Text>
          )}
          {userProfile?.incharge_name && (
            <Text style={[tailwind('font-medium font-14 mt-1'), {}]}>
              {userProfile?.incharge_name}
            </Text>
          )}
          {userProfile?.user_phone_number && (
            <Text style={[tailwind('mt-1 font-regular font-14'), {}]}>
              {userProfile?.user_phone_number}
            </Text>
          )}
        </View>
        <View
          style={[
            tailwind(
              'mx-3 my-3 flex-row items-center white-shadow px-5 py-3 rounded-xl mt-5',
            ),
            {},
          ]}>
          <Text style={[tailwind('font-bold font-15'), {width: '30%'}]}>
            Printer Connection
          </Text>
          <View
            style={[tailwind('flex-row items-center '), {marginLeft: 'auto'}]}>
            {PrinterConnection?.map((i: any, index: any) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    tailwind('flex-row py-1  px-2 items-center'),
                    {
                      backgroundColor: printer == i?.id ? 'white' : 'silver',
                      marginLeft: 'auto',
                      borderWidth: 1,
                      borderColor: printer == i?.id ? '#001a4f' : 'gray',
                      borderTopLeftRadius: i?.id == 1 ? 10 : 0,
                      borderBottomLeftRadius: i?.id == 1 ? 10 : 0,
                      borderTopRightRadius: i?.id == 2 ? 10 : 0,
                      borderBottomRightRadius: i?.id == 2 ? 10 : 0,
                    },
                  ]}
                  onPress={() => {
                    EditProfile(i?.name);
                    setPrinter(i?.id);
                  }}>
                  <Image
                    source={i?.img}
                    style={[tailwind(''), {height: 25, width: 25}]}
                    tintColor={i?.id == 1 ? 'blue' : 'red'}
                  />
                  <Text style={[tailwind('font-15 ml-2 font-semi'), {}]}>
                    {i?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {OtherDetails?.map((i: any, index: any) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (i?.id === 1 || i?.id == 2) {
                  navigation?.navigate(i?.screen);
                } else if (i?.id == 3) {
                  setPassword(true);
                } else if (i?.id == 5) {
                  setReport(true);
                }
              }}
              style={[
                tailwind(
                  'mx-3 my-3 flex-row items-center  white-shadow px-5 py-3 rounded-xl mt-5',
                ),
                {},
              ]}>
              <Image
                source={i?.img}
                style={[tailwind(''), {height: 25, width: 25}]}
              />
              <Text style={[tailwind('mt-1 ml-2 font-semi font-15'), {}]}>
                {i?.name}
              </Text>
            </TouchableOpacity>
          );
        })}
        <View
          style={[
            tailwind('mx-3 my-3  white-shadow px-5 py-3 rounded-xl mt-5'),
            {},
          ]}>
          <TouchableOpacity
            style={[tailwind('flex-row items-center mt-3'), {}]}>
            <Image
              source={assets_manifest?.plan}
              style={[tailwind(''), {height: 25, width: 25}]}
            />
            <Text style={[tailwind('mt-1 ml-2 font-semi font-15'), {}]}>
              Terms & Conditions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Care?.current?.open();
            }}
            style={[tailwind('flex-row items-center mt-3 py-3'), {}]}>
            <Image
              source={assets_manifest?.headset}
              style={[tailwind(''), {height: 25, width: 25}]}
            />
            <Text style={[tailwind('mt-1 ml-2 font-semi font-15'), {}]}>
              Customer Care - POS
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            setLogOut(true);
          }}
          style={[
            tailwind(
              'mx-3 my-3 flex-row items-center  white-shadow px-5 py-3 rounded-xl mt-5',
            ),
            {},
          ]}>
          <LogoutIcon />
          <Text
            style={[tailwind('mt-1 ml-2 font-semi font-15'), {color: 'red'}]}>
            Logout
          </Text>
        </TouchableOpacity>
        <Modal
          backdropOpacity={0.15}
          onBackdropPress={() => setPassword(true)}
          style={[
            tailwind(' h-full justify-center '),
            {backgroundColor: 'transparent'},
          ]}
          isVisible={password}>
          <View
            style={[
              tailwind('rounded-xl mx-3 px-5 py-5 '),
              {backgroundColor: '#ffffff'},
            ]}>
            <TouchableOpacity
              onPress={() => {
                setPassword(false);
              }}>
              <Image
                source={assets_manifest?.close}
                style={[
                  tailwind(''),
                  {
                    height: 20,
                    width: 20,
                    // position: 'absolute',
                    // top: -10,
                    // right: 1,
                    marginLeft: 'auto',
                  },
                ]}
              />
            </TouchableOpacity>
            <Text style={[tailwind('font-17 font-semi'), {}]}>
              Please enter the Password to access this option
            </Text>
            {/* <View
              style={[
                tailwind('flex-row px-3 py-3 rounded-full border mt-5'),
                {},
              ]}>
              <TextInput
                placeholder="Enter Password *"
                onChangeText={txt => {
                  setPasswordcode(txt);
                }}
                secureTextEntry={visible ? true : false}
                value={passwordcode}
                style={[
                  tailwind(' text-black font-16 font-bold'),
                  {width: '90%'},
                ]}
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
              label="  Enter Password *"
              value={passwordcode}
              onChangeText={setPasswordcode}
              secureTextEntry={visible}
              style={[
                tailwind('rounded-full bg-white mt-5'),
                {
                  // height: 20,
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
                      name={visible ? 'eye-off' : 'eye'}
                      size={20}
                      color="gray"
                    />
                  )}
                  onPress={() => setVisible(prev => !prev)}
                />
              }
            />
            <TouchableOpacity
              onPress={() => {
                CheckReport(1);
              }}
              style={[tailwind('px-3 py-3 mt-3 rounded-full  bg-secondary')]}>
              <Text style={[tailwind('font-16 text-white text-center'), {}]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          backdropOpacity={0.15}
          onBackdropPress={() => setReport(true)}
          style={[
            tailwind(' h-full  justify-center '),
            {backgroundColor: 'transparent'},
          ]}
          isVisible={report}>
          <View
            style={[
              tailwind('rounded-xl mx-3 px-5 py-5 '),
              {backgroundColor: '#ffffff'},
            ]}>
            <TouchableOpacity
              onPress={() => {
                setReport(false);
              }}>
              <Image
                source={assets_manifest?.close}
                style={[
                  tailwind(''),
                  {
                    height: 20,
                    width: 20,
                    // position: 'absolute',
                    // top: -10,
                    // right: 1,
                    marginLeft: 'auto',
                  },
                ]}
              />
            </TouchableOpacity>
            <Text style={[tailwind('font-17 font-semi'), {}]}>
              Please enter the Password to access this option
            </Text>
            {/* <View
              style={[
                tailwind('flex-row px-3 py-3 rounded-full border mt-5'),
                {},
              ]}>
              <TextInput
                placeholder="Enter Password *"
                onChangeText={txt => {
                  setReportCode(txt);
                }}
                secureTextEntry={visible ? true : false}
                value={reportcode}
                style={[
                  tailwind(' text-black font-16 font-bold'),
                  {width: '90%'},
                ]}
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
              label="  Enter Password *"
              value={passwordcode}
              onChangeText={txt => {
                setPasswordcode(txt);
              }}
              secureTextEntry={visible}
              style={[
                tailwind('rounded-full bg-white mt-5'),
                {
                  // height: 20,
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
                      name={visible ? 'eye-off' : 'eye'}
                      size={20}
                      color="gray"
                    />
                  )}
                  onPress={() => setVisible(prev => !prev)}
                />
              }
            />
            <TouchableOpacity
              onPress={() => {
                CheckReport(2);
              }}
              style={[tailwind('px-3 py-3 mt-3 rounded-full  bg-secondary')]}>
              <Text style={[tailwind('font-16 text-white text-center'), {}]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          backdropOpacity={0.15}
          onBackdropPress={() => setLogOut(true)}
          style={[
            tailwind(' h-full items-center justify-center '),
            {backgroundColor: 'transparent'},
          ]}
          isVisible={logout}>
          <View
            style={[
              tailwind('rounded-xl mx-3 px-5 py-5 '),
              {backgroundColor: '#ffffff'},
            ]}>
            <Text style={[tailwind('font-15 font-semi'), {}]}>
              Are your sure, You want to Logout?
            </Text>
            <View
              style={[
                tailwind('flex-row  items-center mt-5'),
                {width: '100%', justifyContent: 'space-between'},
              ]}>
              <TouchableOpacity
                onPress={() => {
                  HandleLogOut();
                }}
                style={[
                  tailwind('py-3  rounded-full  border'),
                  {width: '48%', borderColor: '#001a4f'},
                ]}>
                <Text
                  style={[
                    tailwind('font-16 text-primary text-center font-semi'),
                    {},
                  ]}>
                  Logout
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLogOut(false)}
                style={[
                  tailwind(' py-3  rounded-full  bg-primary'),
                  {width: '48%'},
                ]}>
                <Text
                  style={[
                    tailwind('font-16 font-semi text-white text-center'),
                    {},
                  ]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Portal>
          <Modalize
            ref={Care}
            useNativeDriver={true}
            modalTopOffset={100}
            adjustToContentHeight={true}>
            <View style={[tailwind('px-3 py-3'), {}]}>
              <View
                // onPress={() => {
                //   Care?.current?.open();
                // }}
                style={[
                  tailwind('flex-row items-center mt-3 py-3  '),
                  // {backgroundColor: 'yellow'},
                ]}>
                <Text style={[tailwind('mt-1 ml-2 font-semi font-15'), {}]}>
                  How can we Help?
                </Text>
                <TouchableOpacity
                  style={[tailwind(''), {marginLeft: 'auto'}]}
                  onPress={() => {
                    Care?.current?.close();
                  }}>
                  <Image
                    source={assets_manifest?.close}
                    style={[tailwind(''), {height: 30, width: 30}]}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  tailwind(''),
                  {height: 1, width: '100%', backgroundColor: 'gray'},
                ]}
              />

              <View style={[tailwind(' py-4'), {}]}>
                <TouchableOpacity
                  style={[tailwind('flex-row items-center '), {}]}
                  onPress={handleCall}>
                  <Image
                    source={assets_manifest?.call}
                    style={[tailwind(''), {height: 30, width: 30}]}
                  />
                  <Text style={[tailwind('mt-1 ml-2 font-semi font-15'), {}]}>
                    Call US
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  tailwind(''),
                  {height: 1, width: '100%', backgroundColor: 'gray'},
                ]}
              />

              <View style={[tailwind(' py-4'), {}]}>
                <TouchableOpacity
                  style={[tailwind('flex-row items-center'), {}]}
                  onPress={() => {
                    WhatApp();
                  }}>
                  <Image
                    source={assets_manifest?.whatsapp}
                    style={[tailwind(''), {height: 30, width: 30}]}
                  />
                  <Text style={[tailwind('mt-1 ml-2 font-semi font-15'), {}]}>
                    Whatsapp
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  tailwind(''),
                  {height: 1, width: '100%', backgroundColor: 'gray'},
                ]}
              />
              <View style={[tailwind(' py-4'), {}]}>
                <TouchableOpacity
                  style={[tailwind('flex-row items-center'), {}]}
                  onPress={handleEmail}>
                  <Image
                    source={assets_manifest?.mail}
                    style={[tailwind(''), {height: 30, width: 30}]}
                  />
                  <Text style={[tailwind('mt-1 ml-2 font-semi font-15'), {}]}>
                    Email Us
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modalize>
        </Portal>
      </ScrollView>
    </View>
  );
}
