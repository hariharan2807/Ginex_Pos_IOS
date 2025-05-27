import tailwind from '@tailwind';
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {saveIpAction} from '../../store/actions/appActions';
import {GetLoginData} from '../../workers/localStorage';
import {getMyProfileremote} from '@remote/userRemote';
import {SaveUserInfo} from '@store/actions';
export default function InventryScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(saveIpAction('hari haran Boobathi Haasini'));
  }, []);
  useEffect(() => {
    MyProfile();
  }, []);
  const MyProfile = async () => {
    const Data = await GetLoginData();
    console.log('Data-------->', Data?.status);
    const Response = await getMyProfileremote({status: Data?.status});
    if (Response) {
      console.log('Response', Response);
      SaveUserInfo(Response);
    } else {
      SaveUserInfo(null);
    }
  };
  return <View style={[tailwind('h-full bg-secondary')]}></View>;
}
