import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import tailwind from '@tailwind';
import {useSelector} from 'react-redux';
import assets_manifest from '../../constants/assets_manifest';
import {GetLoginData, getTokenuser} from '../../workers/localStorage';
import {useNavigation} from '@react-navigation/native';
import {SaveUserInfo} from '@store/actions';
import {getMyProfileremote} from '@remote/userRemote';
export default function InitialScreen() {
  const navigation = useNavigation();

  console.log('working');
  // const AdminState = useSelector(state => state.app.ip);
  useEffect(() => {
    Intial();
  }, []);

  const Intial = async () => {
    const token = await getTokenuser();
    console.log('hhghuhjhhfdsgrxgchgcfrxsrx', token);
    // const Data = await GetLoginData();
    // const Response = await getMyProfileremote({status: Data?.status});
    // if (Response) {
    //   console.log('Response', Response);
    //   SaveUserInfo(Response);
    // } else {
    //   SaveUserInfo(null);
    // }

    setTimeout(() => {
      if (token == null) {
        navigation.reset({
          routes: [
            {
              name: 'LoginTypeScreen',
            },
          ],
        });
      } else {
        // dispatch(SaveDate(SaveDateValue));
        navigation.reset({
          routes: [
            {
              name: 'BottomTabNavigation',
            },
          ],
        });
        // setLoading(false);
      }
    }, 2000);
  };
  return (
    <View style={[tailwind('h-full'), {}]}>
      <Image
        source={assets_manifest?.Splash}
        style={[tailwind(''), {height: '100%', width: '100%'}]}
      />
    </View>
  );
}
