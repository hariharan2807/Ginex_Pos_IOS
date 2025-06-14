import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';

import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import assets_manifest from '@assets';
import {
  getDeleteProductremote,
  getProductStatusremote,
  getSingleProductremote,
} from '@remote/userRemote';
import {GetLoginData} from '../../../workers/localStorage';
import {errorBox} from '../../../workers/utils';
export const InventryItems = (props: BluePrintComponentType) => {
  const ref = useRef<FlatList>(null);
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const NavigateTo = () => {
    navigation.navigate('');
  };
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [selectedDeleteid, setSelectedDeleteId] = useState('');

  const [switchStates, setSwitchStates] = useState<{[key: string]: boolean}>(
    {},
  );

  const Res = props?.cat?.filter(i => i?.subcategory_status == 1 || '');
  const SigProducData = async (id: any) => {
    const Data = await GetLoginData();
    console.log('id========>', id);
    const Response = await getSingleProductremote({
      product_id: id,
      status: Data?.status,
    });
    console.log('ResponseResponseResponse', Response?.data);
    if (Response?.status) {
      navigation?.navigate('AddProductScreen', {
        unit:props?.unit,
        cat: props?.cat,
        type: 1,
        data: Response?.data,
        itemsubcat: props?.itemsubcat,
      });
    }
  };
  const toggleSwitch = async (productId: string) => {
    console.log('productId', productId);
    setSwitchStates(prev => {
      const current = prev[productId?.product_id];
      const newStatus = current !== undefined ? !current : false; // default to false if undefined
      return {...prev, [productId?.product_id]: newStatus};
    });

    // setSwitchStates(newStatus);
    const Data = await GetLoginData();

    let response;

    response = await getProductStatusremote({
      status: Data?.status,
      product_variation_id: productId?.product_variation_id,
      product_id: productId?.product_id,
      product_status: productId?.product_status == 1 ? 0 : 1,
    });

    if (response?.status) {
      props?.GetSubCategory();
      console.log('data=======', response);
    } else {
      console.log('responseresponseresponseresponseresponse', response);
    }
  };
  const DeleteCat = (id: any) => {
    setDeleteProduct(true);
    setSelectedDeleteId(id);
  };
  const ONPressDel1 = async () => {
    console.log('selectedDeleteid', selectedDeleteid);
    const Data = await getDeleteProductremote({
      product_id: JSON.stringify(selectedDeleteid),
    });
    console.log('Data----->', Data);
    if (Data?.status) {
      setDeleteProduct(false);
      props?.GetSubCategory();
    } else {
      errorBox(Data?.res?.message);
    }
  };
  return (
    <View style={[tailwind('flex-row w-full h-full'), {}]}>
      {/* Left: Categories */}
      <ScrollView
        style={{width: '10%', backgroundColor: '#F2F2F2'}}
        contentContainerStyle={tailwind('pb-40')}
        showsVerticalScrollIndicator={false}>
        {props?.cat?.map((i: any, index: number) => (
          <TouchableOpacity
            key={i?.category_id || index}
            onPress={() => {
              props?.GetItemAllSubCategory(i);
            }}
            style={[
              tailwind('rounded-xl items-center mb-4 p-2'),
              {
                borderWidth: 1,
                borderColor:
                  i?.category_id === props?.selecteditem?.category_id
                    ? '#001a4f'
                    : 'transparent',
                // backgroundColor: 'white',
              },
            ]}>
            <Image
              source={
                i?.category_image
                  ? {uri: i.category_image}
                  : assets_manifest?.loading
              }
              defaultSource={assets_manifest?.loading}
              style={{
                height: width / 15,
                width: width / 15,
                borderRadius: 8,
                resizeMode: 'contain',
                marginBottom: 6,
              }}
            />
            <Text
              style={[
                tailwind('text-center font-medium'),
                {width: width / 5.5, fontSize: 12},
              ]}
              numberOfLines={2}>
              {i?.category_name}
            </Text>
          </TouchableOpacity>
        ))}
        <View style={[tailwind(''), {height: 20}]} />
      </ScrollView>

      {/* Right: Subcategories */}
      <View style={[tailwind('h-full'), {width: '80%', paddingLeft: 10}]}>
        <View style={[tailwind('flex-row'), {}]}>
          <ScrollView
            horizontal
            // style={{maxHeight: 50}}
            showsHorizontalScrollIndicator={false}
            // contentContainerStyle={tailwind('p-2 py-3')}
          >
            {Res &&
              props?.itemsubcat?.map((item: any, index: number) => (
                <View style={[tailwind(''), {}]}>
                  <TouchableOpacity
                    key={item?.subcategory_id || index}
                    onPress={() => props?.setSelecteditemsub(item)}
                    style={[
                      tailwind('rounded-xl px-4 py-2 mb-2 mr-2'),
                      {
                        borderWidth: 1,
                        borderColor:
                          item?.subcategory_id ===
                          props?.selecteditemsub?.subcategory_id
                            ? '#3B6EB5'
                            : '#ccc',
                        backgroundColor: 'white',
                      },
                    ]}>
                    <Text
                      style={[
                        tailwind('text-sm text-black'),
                        {
                          color:
                            item?.subcategory_id ===
                            props?.selecteditemsub?.subcategory_id
                              ? '#3B6EB5'
                              : 'black',
                        },
                      ]}>
                      {item?.subcategory_name}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
          </ScrollView>
        </View>

        {/* </ScrollView> */}
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={[tailwind(''), {flex: 1}]}>
            <View
              style={[
                tailwind('px-5 mt-3 mx-3 rounded-full py-2 border flex-row'),
                {},
              ]}>
              <Image
                source={assets_manifest?.search}
                style={[tailwind(''), {height: 30, width: 30}]}
              />
              <TextInput
                placeholder="Search by name"
                onChangeText={txt => {
                  props?.handleSearch(txt);
                }}
                value={props?.name}
                style={[tailwind('text-black mx-2 font-15 font-bold'), {}]}
                placeholderTextColor={'black'}
              />
            </View>
            <ScrollView
              style={[tailwind('mt-3'), {}]}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 300}}>
              {props?.loading ? (
                <View
                  style={[
                    tailwind('flex items-center'),
                    {justifyContent: 'center', marginTop: '70%'},
                  ]}>
                  <ActivityIndicator color={'#001a4f'} size={'large'} />
                  <Text>Loading</Text>
                </View>
              ) : props?.allProduct?.length ? (
                props?.allProduct?.map((i: any, index: any) => {
                  const isEnabled =
                    switchStates[i?.product_id] !== undefined
                      ? switchStates[i?.product_id]
                      : i?.product_status == 1;
                  return (
                    <View
                      key={index}
                      style={[
                        tailwind('white-shadow rounded-xl px-3 py-4 mx-3 mt-3'),
                        {},
                      ]}>
                      <Text>{i?.product_name}</Text>

                      <View
                        style={[tailwind('flex-row'), {marginLeft: 'auto'}]}>
                        <TouchableOpacity
                          onPress={() => {
                            SigProducData(i?.product_id);
                          }}>
                          <Image
                            source={assets_manifest?.editing}
                            style={[tailwind('mr-3'), {height: 25, width: 25}]}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            DeleteCat(i?.product_id);
                          }}>
                          <Image
                            source={assets_manifest?.delete}
                            style={[tailwind('mr-3'), {height: 25, width: 25}]}
                          />
                        </TouchableOpacity>
                        <Switch
                          value={isEnabled}
                          onValueChange={() => toggleSwitch(i)}
                        />
                      </View>
                    </View>
                  );
                })
              ) : (
                <View
                  style={[
                    tailwind('items-center'),
                    {justifyContent: 'center', marginTop: '70%'},
                  ]}>
                  <Text>No Item Available</Text>
                </View>
              )}
              {/* <View style={[tailwind(''), {height: 500}]} /> */}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
      <Modal
        backdropOpacity={0.15}
        onBackdropPress={() => setDeleteProduct(true)}
        style={[
          tailwind(' h-full items-center justify-center '),
          {backgroundColor: 'transparent'},
        ]}
        isVisible={deleteProduct}>
        <View
          style={[
            tailwind('rounded-xl  px-5 py-5 '),
            {backgroundColor: '#ffffff'},
          ]}>
          <Text style={[tailwind('font-15 font-semi'), {}]}>
            Are your sure want to delete this Product?
          </Text>
          <View
            style={[
              tailwind('flex-row  items-center mt-5'),
              {width: '100%', justifyContent: 'space-between'},
            ]}>
            <TouchableOpacity
              onPress={() => setDeleteProduct(false)}
              style={[
                tailwind('py-3  rounded-full  border'),
                {width: '48%', borderColor: '#001a4f'},
              ]}>
              <Text
                style={[
                  tailwind('font-16 text-primary text-center font-semi'),
                  {},
                ]}>
                CANCEL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={ONPressDel1}
              style={[
                tailwind(' py-3  rounded-full  bg-primary'),
                {width: '48%'},
              ]}>
              <Text
                style={[
                  tailwind('font-16 font-semi text-white text-center'),
                  {},
                ]}>
                DELETE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
interface BluePrintComponentType {
  cat: any;
  selecteditem: any;
  setSelecteditem: any;
  subcat: any;
  selecteditemsub: any;
  setSelecteditemsub: any;
  GetItemAllSubCategory: () => void;
  itemsubcat: any;
  allProduct: any;
  loading: boolean;
  setAllProduct: any;
  handleSearch: () => void;
  name: any;
  setDeleteProduct: any;
  deleteProduct: any;
  GetSubCategory: () => void;
  unit:any
}
