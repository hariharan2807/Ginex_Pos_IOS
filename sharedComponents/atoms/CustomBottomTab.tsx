import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Easing,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AccountFocusIcon,
  AccountIcon,
  CartFocusIcon,
  CartIcon,
  DashBoard,
  DashBoardFill,
  ReportIcon,
  ReportIconFill,
  SearchFocusIcon,
  SearchIcon,
  SettingFillIcon,
  SettingIcon,
} from '../../asset/icons';
import tailwind from '../../tailwind';
import Modal from 'react-native-modal';
import assets_manifest from '@assets';
import Feather from 'react-native-vector-icons/Feather';
import {errorBox} from '../../workers/utils';
import LinearGradient from 'react-native-linear-gradient';
import {GetLoginData} from '../../workers/localStorage';
import {
  getCheckReportPasswordremote,
  getMyProfileremote,
} from '@remote/userRemote';
import {SaveUserInfo} from '../../store/actions';
import {useDispatch} from 'react-redux';

export default function CustomBottomTab({state, descriptors, navigation}: any) {
  const [showTab, setShowTab] = useState(true);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inputText, setInputText] = useState('');
  //   const CartState = useSelector(state => state.user.cart);
  const [password, setPassword] = useState(false);
  const [passwordcode, setPasswordcode] = useState('');
  const [visible, setVisible] = useState(true);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () =>
      setShowTab(false),
    );
    const hide = Keyboard.addListener('keyboardDidHide', () =>
      setShowTab(true),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  // if (focusedOptions.tabBarVisible === false) {
  //     return null;
  // }
  // if (showTab === false) {
  //   return null;
  // }
  const ReportOnpress = async () => {
    if (!passwordcode) {
      errorBox('Please Enter Password');
      return;
    }
    const Data = await GetLoginData();
    const Response = await getCheckReportPasswordremote({
      password: passwordcode,
      status: Data?.status,
    });
    if (Response?.status) {
      setPassword(false);
      // setReport(false);
      setPasswordcode('');
      // setReportCode('');

      navigation?.navigate('Report');
      // infoBox('ok');
      // console.log('infoBox', Response);
    } else {
      console.log('errorBox', Response?.res?.message);
      errorBox(Response?.res?.message);
    }
  };
  const MyProfile = async () => {
    const Data = await GetLoginData();
    console.log('Data-------->', Data?.status);
    const Response = await getMyProfileremote({status: Data?.status});
    console.log('MyProfile', Response);
    if (Response) {
      console.log('ResponseSaveUserInfo', Response);
      dispatch(SaveUserInfo(Response));
      if (Response?.stock_status === '1') {
        navigation?.navigate('Stock');
      } else {
        errorBox('Access Restricted by Admin');
      }
    } else {
      errorBox('Profile Api Fail');
    }
  };
  return (
    <View style={tailwind('flex flex-row bg-white items-center')}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (index === 3) {
            setPassword(true); // Show modal for index 2
            return;
          }
          if (index === 1) {
            MyProfile();
            return;
          }

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
            // console.log(route);
            // try {
            //   navigation.navigate(route.state.routeNames[0]);
            // } catch {
            //   navigation.navigate(route.name);
            // }
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{flex: 1}}>
            <View
              style={[
                tailwind(
                  'flex flex-col justify-center  items-center py-3 relative',
                ),
                {borderColor: 'lightgray'},
              ]}>
              {index === 0 ? (
                isFocused ? (
                  <View>
                    <DashBoardFill />
                    {/* <HomeIconFocus /> */}
                  </View>
                ) : (
                  <View>
                    <DashBoard />
                    {/* <HomeIcon /> */}
                  </View>
                )
              ) : index === 1 ? (
                isFocused ? (
                  <View>
                    <SearchFocusIcon />
                  </View>
                ) : (
                  <View>
                    <SearchIcon />
                  </View>
                )
              ) : index === 3 ? (
                isFocused ? (
                  <View>
                    <ReportIconFill />
                  </View>
                ) : (
                  <View style={[tailwind(''), {}]}>
                    <ReportIcon />
                  </View>
                )
              ) : index === 2 ? (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10,
                  }}>
                  {/* Outer spinning border only */}
                  <Animated.View
                    style={[styles.spinner, {transform: [{rotate: spin}]}]}>
                    <LinearGradient
                      colors={[
                        '#FF0000',
                        '#00FF00',
                        '#0000FF',
                        '#FF00FF',
                        '#00FFFF',
                      ]}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 1}}
                      style={styles.outerCircle}
                    />
                  </Animated.View>

                  {/* Static Center Content */}
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('POS')}
                    style={[
                      styles.button,
                      {backgroundColor: isFocused ? '#3B6EB5' : 'white'},
                    ]}>
                    <Image
                      source={require('../../asset/image/Pos.png')}
                      style={{
                        width: 35,
                        height: 35,
                        tintColor: isFocused ? 'white' : 'black',
                      }}
                      resizeMode="contain"
                    />
                    {!isFocused && (
                      <Text style={[tailwind('mt-2'), {}]}> {label}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ) : index === 4 ? (
                isFocused ? (
                  <View>
                    <SettingFillIcon />
                  </View>
                ) : (
                  <View>
                    <SettingIcon />
                  </View>
                )
              ) : null}
              <Text
                style={[
                  tailwind(`text-white pt-1 text-xs font-bold font-15`),
                  {color: `${isFocused ? '#3B6EB5' : '#7B7B7B'}`},
                ]}>
                {label}
              </Text>
            </View>
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
            tailwind('rounded-xl  px-5 py-5'),
            {backgroundColor: '#ffffff', width: '100%'},
          ]}>
          <TouchableOpacity
            onPress={() => {
              setPassword(false);
              setPasswordcode('');
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
            Please enter the Password to access this report
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
            onPress={ReportOnpress}
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
const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    width: 105,
    height: 105,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    width: 125,
    height: 125,
    borderRadius: 70,
    padding: 10,
  },
  button: {
    borderRadius: 70,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // stays on top of the rotating border
  },
});
