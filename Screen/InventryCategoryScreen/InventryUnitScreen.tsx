import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import tailwind from '@tailwind';
import {TopBar} from '@sharedComponents';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import {errorBox, getStoragePermission} from '../../workers/utils';
import * as ImagePicker from 'react-native-image-picker';
import assets_manifest from '@assets';
import Modal from 'react-native-modal';
import {
  getAddCategoryremote,
  getAddUnitremote,
  getEditCategoryremote,
  getEditUnitremote,
} from '@remote/userRemote';
import {GetLoginData} from '../../workers/localStorage';

export default function InventryUnitScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const [catName, setCatname] = useState(
    route?.params?.category_name ? route?.params?.category_name : '',
  );
  const [picture, setPicture] = useState(null);
  const [logout, setLogOut] = useState(false);
  const [category_image, setcategory_image] = useState('');

  const NewCat = async () => {
    setLoading(true);
    const Data = await GetLoginData();
    if (!catName) {
      errorBox('Please Enter Unit Name');
      return;
    }

    const Response = await getAddUnitremote({
      status: Data?.status,
      unit_name: catName,
    });
    setLoading(false);

    if (Response?.status) {
      setLoading(false);
      navigation?.goBack();
    } else {
      setLoading(false);
      console.log('Response', Response);
      errorBox(Response?.res?.message);
    }
  };
  const EditCat = async () => {
    const Data = await GetLoginData();

    const Response = await getEditUnitremote({
      status: Data?.status,
      unit_name: catName,
      unit_id: route?.params?.category_id,
    });
    if (Response?.status) {
      navigation?.goBack();
    } else {
      errorBox(Response?.res?.message);
    }
    console.log('getEditCategoryremote', Response);
  };
  return (
    <View style={[tailwind('h-full'), {}]}>
      <TopBar text={route?.params?.text} type={1} />
      <View style={[tailwind('mx-3'), {}]}>
        <TextInput
          mode="outlined"
          label="   Unit Name *"
          onChangeText={txt => setCatname(txt)}
          value={catName}
          numberOfLines={1}
          placeholderTextColor="black"
          style={[
            tailwind('text-black font-16 font-bold mt-3'),
            {
              borderRadius: 50,
              backgroundColor: 'white', // Optional: ensure background doesn't override border radius
            },
          ]}
          outlineColor="#B0B0B0" // gray when not focused
          activeOutlineColor="#001a4f" // pink when focused (e.g., hot pink)
          theme={{
            roundness: 50, // applies to ripple and internal elements
          }}
        />

        <TouchableOpacity
          onPress={() => {
            if (route?.params?.category_id) {
              EditCat();
            } else {
              NewCat();
            }
          }}
          style={[
            tailwind(
              ' bg-secondary border-primary border px-3 py-3 rounded-full mt-5',
            ),
            //   {backgroundColor: '#d9f1fc'},
          ]}>
          {loading ? (
            <ActivityIndicator color={'white'} size={'large'} />
          ) : (
            <Text
              style={[
                tailwind('font-bold font-18 text-white text-center'),
                {textTransform: 'uppercase'},
              ]}>
              SAVE
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
