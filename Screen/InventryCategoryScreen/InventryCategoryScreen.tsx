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
import {getAddCategoryremote, getEditCategoryremote} from '@remote/userRemote';
import {GetLoginData} from '../../workers/localStorage';

export default function InventryCategoryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [catName, setCatname] = useState('');
  const [picture, setPicture] = useState(null);
  const [logout, setLogOut] = useState(false);
  const [category_image, setcategory_image] = useState('');
  console.log('oute?.params?.category_image', route?.params?.category_image);
  useEffect(() => {
    if (route?.params?.category_id != '') {
      setcategory_image(route?.params?.category_image);
      setCatname(route?.params?.category_name);
    }
  }, []);
  console.log('category_imagecategory_image', category_image);
  const onImageLibraryPress = useCallback(async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      quality: 0.8,
      maxHeight: 1000,
      maxWidth: 800,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response;
        if (uri) {
          setPicture(uri);
        }
      }
    });
  }, []);
  // console.log('8081', picture?.assets[0]);
  //   const loadApiImage = () => {
  //     const imageUrl = 'https://yourserver.com/path/image.jpg';
  //     setPicture({
  //       uri: imageUrl,
  //       fileName: 'api-image.jpg',
  //       type: 'image/jpeg',
  //     });
  //   };
  const Onpress = () => {
    setPicture(null);
    setcategory_image('')
    setLogOut(false);
  };
  const NewCat = async () => {
    const Data = await GetLoginData();
    if (!catName) {
      errorBox('Please Enter Category Name');
      return;
    } else if (!picture?.uri) {
      if (!(picture?.name || picture?.assets[0].fileName)) {
        errorBox('Selected Your Category Image ');
        return;
      }
    }
    const formdata = new FormData();
    formdata.append('category_name', catName);
    formdata.append('category_image', {
      uri: picture.uri || picture?.assets[0].uri,
      name: picture.name || picture?.assets[0].fileName,
      type: picture.type || picture?.assets[0].type,
    });
    formdata.append('status', Data?.status);
    const Response = await getAddCategoryremote(formdata);
    if (Response?.status) {
      navigation?.goBack();
    } else {
      console.log('Response', Response);
      errorBox(Response?.res?.message);
    }
  };
  const EditCat = async () => {
    const Data = await GetLoginData();

    const formdata = new FormData();
    formdata.append('category_name', catName);
    if (picture?.assets?.[0]?.uri) {
      const asset = picture.assets[0];
      formdata.append('category_image', {
        uri: asset.uri,
        name: asset.fileName || 'image.jpg',
        type: asset.type || 'image/jpeg',
      });
    } else {
      // If no new image, send the existing image URL if API expects it
      // You can send it as a string or skip this entirely if backend handles it
      formdata.append('category_image', ""); // adjust key if needed
    }
    formdata.append('status', Data?.status);
    formdata.append('category_id', route?.params?.category_id);
    const Response = await getEditCategoryremote(formdata)
    if(Response?.status){
      navigation?.goBack();
    }
    else{
      errorBox(Response?.res?.message);
    }
    console.log("getEditCategoryremote",Response)
  };
  return (
    <View style={[tailwind('h-full'), {}]}>
      <TopBar text={route?.params?.text} type={1} />
      <View style={[tailwind('mx-3'), {}]}>
        <TextInput
          mode="outlined"
          label="   Category Name *"
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

        <View style={[tailwind('white-shadow rounded-xl px-3 py-4 mt-3'), {}]}>
          <TouchableOpacity
            onPress={onImageLibraryPress}
            style={[tailwind(''), {}]}>
            <View style={[tailwind('flex-row'), {}]}>
              <Text style={[tailwind('font-15 font-medium text-black'), {}]}>
                {' '}
                Add Category Image
              </Text>
              <Text style={[tailwind(''), {marginLeft: 'auto'}]}> + </Text>
            </View>
          </TouchableOpacity>

          {(picture?.assets?.[0]?.uri || category_image) && (
            <View style={[tailwind('mt-3')]}>
              <Text style={[tailwind('font-15 text-black font-bold')]}>
                Upload Images
              </Text>
              <View style={{width: 100}}>
                <Image
                  source={{
                    uri: picture?.assets?.[0]?.uri || category_image,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginTop: 10,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setLogOut(true);
                  }}
                  style={{
                    position: 'absolute',
                    right: 1,
                    top: 20,
                  }}>
                  <Image
                    style={{height: 20, width: 20}}
                    source={assets_manifest?.close}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            if(route?.params?.category_id){
              EditCat();
            }
            else{
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
            tailwind('rounded-xl  px-5 py-5 '),
            {backgroundColor: '#ffffff'},
          ]}>
          <Text style={[tailwind('font-15 font-semi'), {}]}>
            Are your sure want to remove the image?
          </Text>
          <View
            style={[
              tailwind('flex-row  items-center mt-5'),
              {width: '100%', justifyContent: 'space-between'},
            ]}>
            <TouchableOpacity
              onPress={() => setLogOut(false)}
              style={[
                tailwind('py-3  rounded-full  border'),
                {width: '48%', borderColor: '#001a4f'},
              ]}>
              <Text
                style={[
                  tailwind('font-16 text-primary text-center font-semi'),
                  {},
                ]}>
                NO
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={Onpress}
              style={[
                tailwind(' py-3  rounded-full  bg-primary'),
                {width: '48%'},
              ]}>
              <Text
                style={[
                  tailwind('font-16 font-semi text-white text-center'),
                  {},
                ]}>
                YES
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
