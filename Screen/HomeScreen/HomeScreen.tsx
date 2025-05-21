import tailwind from '@tailwind';
import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {saveIpAction} from '../../store/actions/appActions';
export default function HomeScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(saveIpAction('hari haran Boobathi Haasini'));
  });
  return <View style={[tailwind('h-full bg-primary')]}></View>;
}
