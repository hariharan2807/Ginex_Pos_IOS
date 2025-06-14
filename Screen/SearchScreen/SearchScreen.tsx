import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tailwind from '@tailwind';
import {TextInputCom, TopBar} from '@sharedComponents';
import {useNavigation, useRoute} from '@react-navigation/native';
import assets_manifest from '@assets';
import {
  getDeleteProductremote,
  getDeleteSubCategoryremote,
  getInventrySearchProductremote,
  getProductStatusremote,
  getSingleProductremote,
  getStockSearchProductremote,
  getUpdateStockProductremote,
} from '@remote/userRemote';
import {GetLoginData} from '../../workers/localStorage';
import Modal from 'react-native-modal';
import {errorBox} from '../../workers/utils';

export default function SearchScreen() {
  const navigation = useNavigation();

  const route = useRoute();
  const {height} = useWindowDimensions();
  const [name, setName] = useState('');
  const [dataVal, setDataValue] = useState([]);
  const [switchStates, setSwitchStates] = useState<{[key: string]: boolean}>(
    {},
  );
  const [logout, setLogOut] = useState(false);
  const [qty, setQty] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [logoutdata, setLogOutdata] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [selectedDeleteid, setSelectedDeleteId] = useState('');
  const [loading, setLoading] = useState(false);

  const Operation = [
    {name: 'Addition', id: 1},
    {name: 'Subtraction', id: 2},
  ];
  console.log('type====>', route?.params?.type);
  useEffect(() => {
    setSelectedId(Operation?.[0]);
  }, []);
  const handleSearch = (text: string) => {
    setName(text);
    InventryData(text);
    // const searchText = text.trim().toLowerCase();

    // if (searchText === '') {
    //   setDataValue([]);
    //   return;
    // }
    // if (route?.params?.type == 1) {
    // } else {
    // }
  };
  const InventryData = async text => {
    const Data1 = await GetLoginData();

    let Response = null;

    if (route?.params?.type == 1) {
      Response = await getInventrySearchProductremote({
        search_text: text,
        status: Data1?.status,
      });
    } else if (route?.params?.type == 2) {
      Response = await getStockSearchProductremote({
        search_text: text,
        status: Data1?.status,
      });
    }
    console.log('Data--------->Response', Response);

    if (Response?.status) {
      setDataValue(Response?.data);
    } else {
      setDataValue([]);
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
      //   props?.GetSubCategory();
      console.log('data=======', response);
    } else {
      console.log('responseresponseresponseresponseresponse', response);
    }
  };
  const DeleteCat = (id: any) => {
    setDeleteProduct(true);
    setSelectedDeleteId(id);
  };
  const SigProducData = async (id: any) => {
    const Data = await GetLoginData();
    const Response = await getSingleProductremote({
      product_id: id,
      status: Data?.status,
    });
    if (Response?.status) {
      navigation?.navigate('AddProductScreen', {
        cat: route?.params?.cat,
        type: 1,
        data: Response?.data,
        itemsubcat: route?.params?.itemsubcat,
      });
      // navigation?.goBack();
    }
  };
  const ONPressDel1 = async () => {
    console.log('selectedDeleteid', selectedDeleteid);
    const Data = await getDeleteProductremote({
      product_id: JSON.stringify(selectedDeleteid),
    });
    console.log('Data----->', Data);
    if (Data?.status) {
      setDeleteProduct(false);
      handleSearch(name);
      //   props?.GetSubCategory();
    } else {
      errorBox(Data?.res?.message);
    }
  };
  const OpenModalFunc = (i: any) => {
    setLogOut(true);
    setLogOutdata(i);
  };
  const Qty = async () => {
    const Data = await GetLoginData();

    if (!qty) {
      errorBox('Please Enter Quantity ');
      return;
    }
    setLoading(true);
    const Response = await getUpdateStockProductremote({
      status: Data?.status,
      stock_id: logoutdata?.id,
      stock_quantity: qty,
      operation: selectedId?.id == 1 ? 'add' : 'subtract',
    });
    setLoading(false);

    if (Response?.status) {
      setLoading(false);
      setLogOut(false);
      setQty('');
      handleSearch(name);
    } else {
      setLoading(false);

      errorBox(Response?.res?.message);
    }
  };
  return (
    <View style={[tailwind('h-full'), {}]}>
      <TopBar text={route?.params?.text} type={1} />
      <View style={[tailwind('bg-primary '), {}]}>
        <View style={[tailwind('mt-3 px-3 py-3'), {}]}>
          <View
            style={[
              tailwind(
                'px-5 mx-3 bg-white rounded-full py-2 border flex-row border-white',
              ),
              {},
            ]}>
            <Image
              source={assets_manifest?.search}
              style={[tailwind(''), {height: 30, width: 30}]}
              //   tintColor={'white'}
            />
            <TextInput
              placeholder="Search by name or number"
              onChangeText={txt => {
                handleSearch(txt);
              }}
              value={name}
              style={[tailwind('text-black mx-2 font-15 font-bold'), {}]}
              placeholderTextColor={'black'}
            />
          </View>
        </View>
      </View>
      <ScrollView
        style={[tailwind(''), {}]}
        contentContainerStyle={[tailwind(''), {paddingBottom: height / 3}]}>
        {route?.params?.type == 1 &&
          (dataVal?.length ? (
            dataVal?.map((i: any, index: any) => {
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

                  <View style={[tailwind('flex-row'), {marginLeft: 'auto'}]}>
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
            route?.params?.type == 1&&
            <View
              style={[
                tailwind('items-center'),
                {justifyContent: 'center', marginTop: '70%'},
              ]}>
              <Image
                source={assets_manifest?.search}
                style={[tailwind(''), {height: 50, width: 50}]}
              />
              <Text style={[tailwind('mt-3 font-bold font-15'), {}]}>
                No Item Available
              </Text>
            </View>
          ))}
        <View style={[tailwind('px-3 mt-3'), {}]}>
          {route?.params?.type == 2 && dataVal?.length > 0 ? (
            dataVal.map((i: any, index: number) => (
              <View
                style={[
                  tailwind(
                    'white-shadow rounded-xl ml-3 mr-3 mb-3 mt-3  px-3 py-3',
                  ),
                  {},
                ]}
                key={index}>
                <Text style={[tailwind(''), {width: '70%'}]} numberOfLines={2}>
                  {i?.product_name}{' '}
                  {i?.product_variation_name &&
                    `- ${i?.product_variation_name}`}
                </Text>
                <View
                  style={[
                    tailwind('flex-row items-center '),
                    {marginLeft: 'auto'},
                  ]}>
                  <View
                    style={[
                      tailwind('rounded-full mr-3 items-center'),
                      {
                        justifyContent: 'center',
                        // height: 40,
                        // width: 40,
                        // backgroundColor: '#d5e3fd',
                      },
                    ]}>
                    <Text
                      style={[
                        tailwind('font-bold'),
                        {
                          color:
                            i?.low_stock_alert >= i?.stock_count
                              ? 'red'
                              : 'green',
                        },
                      ]}>
                      {i?.stock_count}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[tailwind(''), {}]}
                    onPress={() => {
                      OpenModalFunc(i);
                    }}>
                    <Image
                      style={[tailwind(''), {height: 25, width: 25}]}
                      source={assets_manifest?.editing}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            route?.params?.type == 2&&
            <View
              style={[
                tailwind('items-center'),
                {justifyContent: 'center', marginTop: '70%'},
              ]}>
              <Image
                source={assets_manifest?.search}
                style={[tailwind(''), {height: 50, width: 50}]}
              />
              <Text style={[tailwind('mt-3 font-bold font-15'), {}]}>
                No Item Available
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

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
      <Modal
        backdropOpacity={0.15}
        onBackdropPress={() => setLogOut(true)}
        style={[
          tailwind(' h-full items-center justify-center '),
          {backgroundColor: 'transparent'},
        ]}
        isVisible={logout}>
        <View style={[tailwind('rounded-xl   '), {backgroundColor: '#ffffff'}]}>
          <TouchableOpacity
            onPress={() => {
              setLogOut(false);
            }}>
            <Image
              source={assets_manifest?.close}
              style={[
                tailwind(''),
                {
                  height: 30,
                  width: 30,
                  marginLeft: 'auto',
                },
              ]}
            />
          </TouchableOpacity>
          <View style={[tailwind('px-5 py-5'), {}]}>
            <Text style={[tailwind('font-15 font-semi'), {}]}>
              Low Stock Alert ({logoutdata?.low_stock_alert})
            </Text>
            <View
              style={[
                tailwind('flex-row  items-center mt-5'),
                {width: '100%', justifyContent: 'space-between'},
              ]}>
              <TextInputCom
                text={qty}
                setText={setQty}
                title="Enter Quantity *"
              />
            </View>
            <View
              style={[
                tailwind('flex-row mx-3 mt-5'),
                // {backgroundColor: 'pink'},
              ]}>
              {Operation.map(option => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => setSelectedId(option)}
                  style={[
                    tailwind('flex-row items-center '),
                    {width: '50%', justifyContent: 'center'},
                  ]}>
                  {/* Outer Circle */}
                  <View
                    style={[
                      tailwind(
                        'w-5 h-5 rounded-full border-2 mr-2 items-center justify-center',
                      ),
                      selectedId?.id === option.id
                        ? tailwind('border-blue-500')
                        : tailwind('border-gray-400'),
                    ]}>
                    {selectedId?.id === option.id && (
                      <View
                        style={tailwind('w-3 h-3 bg-blue-500 rounded-full')}
                      />
                    )}
                  </View>

                  {/* Label */}
                  <Text style={tailwind('text-black text-base')}>
                    {option.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              onPress={Qty}
              style={[tailwind('px-3 py-3 mt-5 rounded-full  bg-primary')]}>
              <Text
                style={[
                  tailwind('font-16 text-white font-bold text-center'),
                  {},
                ]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
