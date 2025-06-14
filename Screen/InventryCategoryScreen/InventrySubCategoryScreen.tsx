import {View, Text, TouchableOpacity, Image} from 'react-native';
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
  getEditCategoryremote,
  getEditSubCategoryremote,
  getSubCategoryAddremote,
} from '@remote/userRemote';
import {GetLoginData} from '../../workers/localStorage';
import DropDownPicker from 'react-native-dropdown-picker';

export default function InventrySubCategoryScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [subcat, setSubCat] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null); // This holds only the selected value (like id/index)
  const [valueObj, setValueObj] = useState(null); // This holds the full object
  console.log('route?.params?', route?.params?.selected);
  // Convert route param data to dropdown format
  const updatedData = route?.params?.data.map((item, index) => ({
    ...item,
    value: item.category_id, // use unique identifier instead of index
    label: item.category_name,
  }));

  // Set initial value when component mounts
  useEffect(() => {
    if (updatedData.length > 0) {
      setValue(updatedData[0].value); // Set value to the first item's `value`
      setValueObj(updatedData[0]); // Save full object
    }
    if (route?.params?.selected) {
      setSubCat(route?.params?.selected?.subcategory_name);
    }
    if (route?.params?.category_id) {
      console.log('category_name', route.params?.category_id, updatedData);
      const Selected = updatedData?.find(
        i => i?.category_id == route.params?.category_id,
      );

      console.log('Selected', Selected);
      setValueObj(Selected);
      setValue(Selected?.value); // Set value to the first item's `value`
    }
  }, [route?.params?.data]);
  console.log('value', value, valueObj);
  const NewCat = async () => {
    const Data = await GetLoginData();
    if (!subcat) {
      errorBox('Please Enter SubCategory Name');
      return;
    } else if (!valueObj) {
      errorBox('Please Choose Category');
    }
    const Response = await getSubCategoryAddremote({
      category_id: valueObj?.category_id,
      sub_category_name: subcat,
      status: Data?.status,
    });
    if (Response?.status) {
      navigation?.goBack();
    } else {
      console.log('Response', Response);
      errorBox(Response?.res?.message);
    }
  };
  const EditCat = async () => {
    const Data = await GetLoginData();

    const Response = await getEditSubCategoryremote({
      category_id: valueObj?.category_id,
      sub_category_id: route?.params?.subcategory_id,
      status: Data?.status,
      sub_category_name: subcat,
    });
    console.log("Response",Response)
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
          label="   SubCategory Name *"
          onChangeText={txt => setSubCat(txt)}
          value={subcat}
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
        <DropDownPicker
          open={open}
          value={value}
          items={updatedData}
          setOpen={setOpen}
          setValue={callback => {
            const selectedValue =
              typeof callback === 'function' ? callback(value) : callback;

            const fullItem = updatedData.find(
              item => item.value === selectedValue,
            );
            setValueObj(fullItem);
            setValue(selectedValue);
          }}
          placeholder={valueObj?.label || 'Select Category'}
          style={[
            tailwind('px-4 mt-3'),
            {
              borderRadius: 25,
              borderColor: '#3B6EB5',
              backgroundColor: 'white',
            },
          ]}
          dropDownContainerStyle={{
            borderRadius: 10,
            borderColor: '#ccc',
          }}
        />
        <TouchableOpacity
          onPress={() => {
            if (route?.params?.category_id && route?.params?.subcategory_id) {
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
          <Text
            style={[
              tailwind('font-bold font-18 text-white text-center'),
              {textTransform: 'uppercase'},
            ]}>
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
