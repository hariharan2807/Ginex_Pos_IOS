import tailwind from '@tailwind';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

import assets_manifest from '../../constants/assets_manifest';
import {errorBox, infoBox} from '../../workers/utils';
import {getLoginremote} from '@remote/userRemote';
import {Pinklog} from '@constants/API_constants';
import {SaveLoginData, SaveToken} from '../../workers/localStorage';
import {useDispatch} from 'react-redux';
import {saveJWTTokenAction} from '../../store/actions/userActions';

export default function LoginScreen() {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const LoginData = async (data: any) => {
    if (!mobile) {
      errorBox('Please Enter UserName or Mobile Number');
      return;
    } else if (!password) {
      errorBox('Please Enter Password');
      return;
    }
    setLoading(true);
    let obj = {login: mobile, password: password, status: data};
    const Response = await getLoginremote(obj);
    setLoading(false);
    console.log('ResponseResponseResponse', Response);
    if (Response?.status) {
      try {
        dispatch(saveJWTTokenAction(Response?.token));
        await SaveLoginData(Response);
        await SaveToken(Response?.token);

        navigation.reset({
          index: 0,
          routes: [{name: 'BottomTabNavigation'}],
        });
      } catch (e) {
        console.error('Failed during login setup', e);
      }
    } else if (Response?.statusCode == 404 || Response?.statusCode == 400) {
      errorBox(Response?.res?.message);

      console.log('Data', Response);
    } else {
      setData(Response);
      // setOpen(false);
      setOpen(true);
    }
  };
  const Onpress = (data: any) => {
    setOpen(false);
    setTimeout(() => {
      setData(null);
      LoginData(data);
    }, 300);
  };
  console.log('data------>', data);
  return (
    <View style={[tailwind('bg-primary'),{height:"100%"}]}>
      <View style={[tailwind('items-center mt-3'), {height: "50%"}]}>
        <View style={[tailwind('flex-row items-center px-3'), {}]}>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('LoginTypeScreen');
            }}
            style={[
              tailwind('bg-secondary rounded-full  py-2 items-center'),
              {width: '10%', justifyContent: 'center'},
            ]}>
            {/* <Image
                resizeMode="contain"
                style={[tailwind(''), {height: 20, tintColor: 'white'}]}
                source={assets_manifest.Right}
              /> */}
            <Entypo name="chevron-left" color={'white'} size={20} />
          </TouchableOpacity>

          <Image
            resizeMode="contain"
            style={[tailwind(''), {height: 30, width: '90%'}]}
            source={assets_manifest.Text}
          />
        </View>

        <Image
          source={assets_manifest?.Login_type}
          style={[
            tailwind('mt-5'),
            {
              height: height / 2.5,
              width: width / 1.5,
              resizeMode: 'contain',
              justifyContent: 'center',
            },
          ]}
        />
      </View>
      <View
        style={[
          tailwind('bg-white p-5'),
          {
            height: "50%",
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          },
        ]}>
        <View style={[tailwind('items-center  '), {marginTop: '2%'}]}>
          <Text style={[tailwind('font-28 '), {fontWeight: 'bold'}]}>
            Billing Made Easy,
          </Text>
          <Text style={[tailwind('font-28'), {fontWeight: 'bold'}]}>
            Simple & Fast
          </Text>
        </View>
        <View style={[tailwind('mt-5'), {}]}>
          <TextInput
            placeholder="Username or Mobile Number *"
            onChangeText={txt => {
              setMobile(txt);
            }}
            value={mobile}
            style={[
              tailwind(
                'px-4 py-4 rounded-full border text-black font-16 font-bold',
              ),
              {},
            ]}
            placeholderTextColor={'black'}
            numberOfLines={10}
          />
          <View
            style={[
              tailwind('flex-row px-4 py-4 rounded-full border mt-5'),
              {},
            ]}>
            <TextInput
              placeholder="Password *"
              onChangeText={txt => {
                setPassword(txt);
              }}
              secureTextEntry={visible ? true : false}
              value={password}
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
          <View style={[tailwind('flex-row mt-3'), {}]}>
            <TouchableOpacity style={[tailwind(''), {}]}>
              <Text style={[tailwind('font-14 font-semi text-black'), {}]}>
                Forget Password?{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[tailwind(''), {marginLeft: 'auto'}]}
              onPress={() => {
                navigation?.navigate('RegisterScreen');
              }}>
              <Text style={[tailwind('font-14 font-semi text-black'), {}]}>
                Register New User?{' '}
              </Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <TouchableOpacity
              //   onPress={() => {
              //     LoginData(0);
              //   }}
              style={[
                tailwind(
                  ' bg-secondary border-primary border px-3 py-3 rounded-full mt-5 items-center',
                ),
                //   {backgroundColor: '#d9f1fc'},
              ]}>
              <ActivityIndicator color={'white'} size={'small'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => LoginData(0)}
              style={[
                tailwind(
                  ' bg-secondary border-primary border px-3 py-3 rounded-full mt-5',
                ),
                //   {backgroundColor: '#d9f1fc'},
              ]}>
              <Text
                style={[
                  tailwind('font-bold font-18 text-white text-center'),
                  {textTransform: 'uppercase'},
                ]}>
                login
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Modal
        backdropOpacity={0.15}
        onBackdropPress={() => setOpen(false)}

        style={[
          tailwind(' h-full items-center justify-center '),
          {backgroundColor: 'transparent'},
        ]}
        
        isVisible={open}>
        <View
          style={[
            tailwind('rounded-xl mx-3 px-5 py-5 items-center'),
            {backgroundColor: '#ffffff'},
          ]}>
          <Text style={[tailwind('font-17 font-semi'), {}]}>
            {data?.res?.message}
          </Text>
          <View
            style={[
              tailwind('flex-row mt-5'),
              {justifyContent: 'space-between', width: '100%'},
            ]}>
            <TouchableOpacity
              onPress={() => {
                setOpen(false);
              }}
              style={[
                tailwind('px-2 py-2 rounded-full border'),
                {width: '48%'},
              ]}>
              <Text style={[tailwind('font-16 text-primary text-center'), {}]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Onpress(1)}
              style={[
                tailwind('px-2 py-2 rounded-full border bg-primary'),
                {width: '48%', marginLeft: 'auto'},
              ]}>
              <Text style={[tailwind('font-16 text-white text-center'), {}]}>
                YES
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
