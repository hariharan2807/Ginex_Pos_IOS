import tailwind from '@tailwind';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {TopBar} from '../../sharedComponents/atoms/TopBar';
import * as ImagePicker from 'react-native-image-picker';
import {errorBox, getStoragePermission} from '../../workers/utils';
import assets_manifest from '@assets';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {GetLoginData} from '../../workers/localStorage';
import {
  getEditProfileremote,
  getMyProfileremote,
  getPrinterListremote,
} from '@remote/userRemote';
import {TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

export default function EditProfileScreen() {
  const [imageUri, setImageUri] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [address, setAddress] = useState('');
  const [printer, setPrinter] = useState('1');
  const [printer1, setPrinter1] = useState('');
  const [printerSize, setPrinterSize] = useState('');
  const [selectedPrinter, setSelectedPrinter] = useState(null); // ✅ new state to store full object
  const [printerSizeId, setPrintersizeId] = useState('');
  const [percentage, setPercentage] = useState('0');
  const [hederText, setHeaderText] = useState('');
  const [billTitle, setBillTitle] = useState('');
  const [billnumber, setBillnumber] = useState('');
  const [footer1, setFooter1] = useState('');
  const [footer2, setFooter2] = useState('');
  const [incharge_name, setincharge_name] = useState('');
  const [open, setOpen] = useState(false);
  const [printer_connection, setPrinter_connection] = useState('');
  const [drop, setDrop] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const PrinterConnection = [
    {id: 0, name: 'English', img: assets_manifest?.Bluetooth},
    {id: 1, name: 'Other', img: assets_manifest?.usb},
  ];
  const DiscountType = [
    {id: 1, name: 'Total', img: assets_manifest?.Bluetooth},
    {id: 2, name: 'Indivitual', img: assets_manifest?.usb},
  ];
  useEffect(() => {
    if (!isEnabled) {
      setPercentage('0');
    }
  }, [isEnabled]);
  useFocusEffect(
    useCallback(() => {
      MyProfile();
      PrinterList();
    }, []),
  );
  const MyProfile = async () => {
    const Data = await GetLoginData();
    console.log('Data-------->', Data?.status);
    const Response = await getMyProfileremote({status: Data?.status});
    if (Response) {
      //   console.log('Response=-=-=-=-=-=-=-res', Response);
      if (Response?.tax_status == 0) {
        setIsEnabled(false);
      }
      if (Response?.shop_language == 0) {
        setPrinter(Response?.shop_language);
      }
      setUserProfile(Response);
      setName(Response?.name);
      setEmail(Response?.user_email);
      setPhone(Response?.user_phone_number);
      setCode(Response?.reseller_code);
      setAddress(Response?.address);
      setFooter1(Response?.footer_text1);
      setFooter2(Response?.footer_text2);
      setPrinterSize(Response?.printer_size);
      setPrintersizeId(Response?.printer_size_id);
      setBillnumber(Response?.bill_number_prefix);
      setBillTitle(Response?.customized_bill_title);
      setHeaderText(Response?.gpay_number);
      setincharge_name(Response?.incharge_name);
      setPrinter_connection(Response?.printer_connection);
      setPrinter1(Response?.discount_type);
      console.log('Response', Response);
    } else {
      setUserProfile(null);
    }
  };
  const PrinterList = async () => {
    const Response = await getPrinterListremote();
    console?.log('Response======-=-=-=-=-=-=-=-=-=-=res', Response?.data);
    if (Response?.status) {
      const updatedData = Response?.data?.map(item => ({
        ...item,
        label: item.printer_size, // New label field
        value: item.printer_size, // New value field (can be used in dropdown)
      }));
      setDrop(updatedData);
    }
  };
  const openImagePicker = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1024,
        maxHeight: 1024,
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const uri = response.assets?.[0]?.uri;
          if (uri) {
            setImageUri(uri);
          }
        }
      },
    );
  };
  const EditProfile = async () => {
    if (!name) {
      errorBox('Please Enter Name');
      return;
    } else if (!incharge_name) {
      errorBox('Please Enter Incharge Name');
      return;
    } else if (!email) {
      errorBox('Please Enter Email');
      return;
    } else if (!phone) {
      errorBox('Please Enter Phone Number');
      return;
    } else if (!address) {
      errorBox('Please Enter Address');
      return;
    } else if (
      userProfile?.tax_status != 0 &&
      userProfile?.product_tax_status != 0
    ) {
      console.log('datataatattatatataat');
      if (!percentage && percentage == '0') {
        errorBox('Please Enter Percentage');
        return;
      }
    }
    const Response = await getEditProfileremote({
      name: name,
      mobile_number: phone,
      email_address: email,
      report_password: userProfile?.report_password,
      address: address,
      gpay_number: hederText,
      footer_text1: footer1,
      footer_text2: footer2,
      bill_number_prefix: billnumber,
      customized_bill_title: billTitle,
      reseller_code: code,
      printer_size: printerSizeId,
      discount_type: printer1,
      incharge_name: incharge_name,
      printer_connection: printer_connection,
    });
    console.log('Response', Response);
  };
  console.log('selectedPrinterprinter1', printer1);
  return (
    <View style={[tailwind('h-full bg-white'), {}]}>
      <TopBar text="Edit Profile" type={1}/>
      <ScrollView>
        <View style={[tailwind('mt-5 px-3 py-5'), {}]}>
          <Text style={[tailwind('font-20 font-semi'), {}]}>Edit Profile</Text>
          <TouchableOpacity
            onPress={openImagePicker}
            style={[tailwind('items-center'), {}]}>
            {imageUri ? (
              <Image
                source={{uri: imageUri}}
                defaultSource={assets_manifest?.Bluetooth}
                style={[
                  tailwind('rounded-full'),
                  {width: 130, height: 130, marginTop: 20},
                ]}
              />
            ) : (
              <Image
                source={assets_manifest?.mail}
                defaultSource={assets_manifest?.Bluetooth}
                style={[
                  tailwind('rounded-full'),
                  {width: 130, height: 130, marginTop: 20},
                ]}
              />
            )}
            <TouchableOpacity
              onPress={() => {
                // setLogoutModal(true);
                openImagePicker();

                // openCamera
                // onImageLibraryPress();
              }}
              style={[
                tailwind('items-center px-3 py-3 flex-row rounded-xl'),
                {
                  top: -25,
                  zIndex: 1,
                  // paddingLeft: 60,
                  width: '25%',
                  backgroundColor: 'silver',
                  justifyContent: 'center',
                },
              ]}>
              <Text style={[tailwind('mr-1'), {}]}>EDIT</Text>

              <Image
                source={assets_manifest?.editing}
                style={[tailwind(''), {height: 15, width: 15}]}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View style={[tailwind('px-3'), {}]}>
          <TextInput
            mode="outlined"
            label="   Shop/Business Name *"
            onChangeText={txt => setName(txt)}
            value={name}
            numberOfLines={1}
            placeholderTextColor="black"
            style={[
              tailwind('text-black font-16 font-bold'),
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
          <TextInput
            mode="outlined"
            label="   Incharge Name *"
            onChangeText={txt => setincharge_name(txt)}
            value={incharge_name}
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
          <TextInput
            mode="outlined"
            label="   Email Address *"
            onChangeText={txt => setEmail(txt)}
            value={email}
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
          <TextInput
            mode="outlined"
            label="   Mobile Number *"
            onChangeText={txt => setPhone(txt)}
            value={phone}
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
          <TextInput
            mode="outlined"
            label="   Reseller Code *"
            onChangeText={txt => setCode(txt)}
            value={code}
            editable={code == '' ? true : false}
            // disabled={code==''?false:true}
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
          <TextInput
            mode="outlined"
            label="   Address *"
            onChangeText={txt => setAddress(txt)}
            value={address}
            numberOfLines={1}
            placeholderTextColor="black"
            style={[
              tailwind('text-black font-16 font-bold mt-3'),
              {
                borderRadius: 30,
                backgroundColor: 'white', // Optional: ensure background doesn't override border radius
                height: 100, // ✅ Increase this as needed
                textAlignVertical: 'top', // ✅ Align text to top
              },
            ]}
            multiline={true}
            outlineColor="#B0B0B0" // gray when not focused
            activeOutlineColor="#001a4f" // pink when focused (e.g., hot pink)
            theme={{
              roundness: 20, // applies to ripple and internal elements
            }}
          />
        </View>
        <View style={[tailwind('flex-row px-3 py-3 mt-2'), {}]}>
          <Text style={[tailwind('font-17 font-semi'), {}]}>Shop Language</Text>

          <View
            style={[tailwind('flex-row items-center '), {marginLeft: 'auto'}]}>
            {PrinterConnection?.map((i: any, index: any) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    tailwind('flex-row py-1  px-2 items-center'),
                    {
                      backgroundColor: printer == i?.id ? 'white' : '#d8dad7',
                      marginLeft: 'auto',
                      borderWidth: 1,
                      borderColor: printer == i?.id ? '#001a4f' : '#d8dad7',
                      borderTopLeftRadius: i?.id == 0 ? 10 : 0,
                      borderBottomLeftRadius: i?.id == 0 ? 10 : 0,
                      borderTopRightRadius: i?.id == 1 ? 10 : 0,
                      borderBottomRightRadius: i?.id == 1 ? 10 : 0,
                    },
                  ]}
                  onPress={() => {
                    setPrinter(i?.id);
                  }}>
                  <Text style={[tailwind('font-15 ml-2 font-semi'), {}]}>
                    {i?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[tailwind('flex-row px-3 py-3 mt-2'), {}]}>
          <Text style={[tailwind('font-17 font-semi'), {}]}>Discount Type</Text>

          <View
            style={[tailwind('flex-row items-center '), {marginLeft: 'auto'}]}>
            {DiscountType?.map((i: any, index: any) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    tailwind('flex-row py-1  px-2 items-center'),
                    {
                      backgroundColor: printer1 == i?.id ? 'white' : '#d8dad7',
                      marginLeft: 'auto',
                      borderWidth: 1,
                      borderColor: printer1 == i?.id ? '#001a4f' : '#d8dad7',
                      borderTopLeftRadius: i?.id == 1 ? 10 : 0,
                      borderBottomLeftRadius: i?.id == 1 ? 10 : 0,
                      borderTopRightRadius: i?.id == 2 ? 10 : 0,
                      borderBottomRightRadius: i?.id == 2 ? 10 : 0,
                    },
                  ]}
                  onPress={() => {
                    setPrinter1(i?.id);
                  }}>
                  <Text style={[tailwind('font-15 ml-2 font-semi'), {}]}>
                    {i?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {userProfile?.tax_status != 0 &&
          userProfile?.product_tax_status != 1 && (
            <View style={[tailwind('flex-row px-3 py-3'), {}]}>
              <Text style={[tailwind('font-17 font-semi'), {}]}>
                Tax Status
              </Text>
              <View style={[tailwind(''), {marginLeft: 'auto'}]}>
                <Switch
                  trackColor={{false: '#ccc', true: '#81b0ff'}}
                  thumbColor={'#001a4f'}
                  ios_backgroundColor="#ccc"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
          )}
        {isEnabled && (
          <View style={[tailwind('px-3 mb-3'), {}]}>
            <TextInput
              mode="outlined"
              label="   Reseller Code *"
              onChangeText={txt => setPercentage(txt)}
              value={percentage}
              numberOfLines={1}
              placeholderTextColor="black"
              style={[
                tailwind('text-black font-16 font-bold '),
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
          </View>
        )}
        <View style={[tailwind('mx-3 mt-2'), {}]}>
          <Text style={[tailwind('font-17 font-semi'), {}]}>Printer Size</Text>
          <View style={[tailwind('mt-3'), {}]}>
            <DropDownPicker
              open={open}
              value={printerSize}
              items={drop}
              setOpen={setOpen}
              setValue={callback => {
                const selectedValue =
                  typeof callback === 'function'
                    ? callback(printerSize)
                    : callback;
                setPrinterSize(selectedValue);

                // ✅ find and store full object
                const fullItem = drop.find(
                  item => item.value === selectedValue,
                );
                console?.log('fullItem', fullItem);
                setPrintersizeId(fullItem?.id);
                setSelectedPrinter(fullItem);
              }}
              setItems={setDrop}
              placeholder="Select Printer Size"
              style={[
                tailwind('px-4'),
                {
                  borderRadius: 25,
                  borderColor: '#ccc',
                  backgroundColor: 'white',
                },
              ]}
              dropDownContainerStyle={{
                borderRadius: 10,
                borderColor: '#ccc',
              }}
            />
          </View>
        </View>
        <View style={[tailwind('mx-3 mt-3'), {}]}>
          <Text style={[tailwind('font-17 font-semi'), {}]}>Edit Billing</Text>
          <TextInput
            mode="outlined"
            label="   Header Text"
            onChangeText={txt => setHeaderText(txt)}
            value={hederText}
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
          <TextInput
            mode="outlined"
            label="   Bill Title *"
            onChangeText={txt => setBillTitle(txt)}
            value={billTitle}
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
          <TextInput
            mode="outlined"
            label="   Bill Number Prefix ( EG: ORD - ORD83 ) "
            onChangeText={txt => setBillnumber(txt)}
            value={billnumber}
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
          <TextInput
            mode="outlined"
            label="   Footer Text 1"
            onChangeText={txt => setFooter1(txt)}
            value={footer1}
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
          <TextInput
            mode="outlined"
            label="   Footer Text 2"
            onChangeText={txt => setFooter2(txt)}
            value={footer2}
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
        </View>
        <TouchableOpacity
          onPress={() => EditProfile()}
          style={[
            tailwind(
              ' bg-secondary border-primary border mx-3 px-3 py-3 rounded-full mt-5',
            ),
            //   {backgroundColor: '#d9f1fc'},
          ]}>
          <Text
            style={[
              tailwind('font-bold font-18 text-white text-center'),
              {textTransform: 'uppercase'},
            ]}>
            Update
          </Text>
        </TouchableOpacity>
        <View style={[tailwind('h-20'), {}]} />
      </ScrollView>
    </View>
  );
}
