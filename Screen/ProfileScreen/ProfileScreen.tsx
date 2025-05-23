import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import tailwind from '@tailwind';
import {TopBar} from '../../sharedComponents/atoms/TopBar';
import {getMyProfileremote} from '@remote/userRemote';
import {GetLoginData} from '../../workers/localStorage';
import assets_manifest from '@assets';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [printer, setPrinter] = useState(1);
  const [password, setPassword] = useState(false);
  const [passwordcode, setPasswordcode] = useState('');
  const [visible, setVisible] = useState(true);

  const PrinterConnection = [
    {id: 1, name: 'Bluetooth', img: assets_manifest?.Bluetooth},
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
  ];
  // useEffect(()=>{
  //     MyProfile();
  // },[])
  const MyProfile = async () => {
    const Data = await GetLoginData();
    console.log('Data', Data?.status);
    const Response = await getMyProfileremote({status: Data?.status});
    if (Response) {
      console.log('Response', Response);
    }
  };
  return (
    <View style={[tailwind('h-full bg-white'), {}]}>
      <TopBar text="Setting" />
      <View
        style={[
          tailwind('mx-3 my-3 white-shadow px-5 py-3 rounded-xl mt-5'),
          {},
        ]}>
        <Text style={[tailwind('font-bold font-15'), {}]}>Adaikalm</Text>
        <Text style={[tailwind('font-medium font-14 mt-1'), {}]}>Adaikalm</Text>

        <Text style={[tailwind('mt-1 font-regular font-14'), {}]}>
          1234567890
        </Text>
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
      <Modal
        backdropOpacity={0.15}
        onBackdropPress={() => setPassword(true)}
        style={[
          tailwind(' h-full items-center justify-center '),
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
          <View
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
          </View>
          <TouchableOpacity
            // onPress={() => Onpress(1)}
            style={[tailwind('px-3 py-3 mt-3 rounded-full  bg-secondary')]}>
            <Text style={[tailwind('font-16 text-white text-center'), {}]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
