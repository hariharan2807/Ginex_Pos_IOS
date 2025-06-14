import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
  ScrollView,
  useWindowDimensions,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import tailwind from '@tailwind';
import {Loadingcomp, TextInputCom, TopBar} from '@sharedComponents';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';
import assets_manifest from '@assets';
import {useFocusEffect} from '@react-navigation/native';
import {GetLoginData} from '../../workers/localStorage';
import {
  getCategoryremote,
  getItemsallCategoryremote,
  getItemsallSubCategoryremote,
  getLowStockListremote,
  getMyProfileremote,
  getStockProductremote,
  getUpdateStockProductremote,
} from '@remote/userRemote';
import {SaveUserInfo} from '../../store/actions';
import {errorBox} from '../../workers/utils';
import Modal from 'react-native-modal';

export default function StockScreen() {
  const Care = useRef(null);
  const [data, setData] = useState(null);
  const {width, height} = useWindowDimensions();

  const Poll = [
    {name: 'Stock List', status: 1},
    {name: 'Low Stock List', status: 1},
  ];
  const [selectedval, setSelectedVal] = useState(Poll?.[0]);
  const [name, setName] = useState('');
  const [cat, setCat] = useState([]);
  const [selecteditem, setSelecteditem] = useState(null);
  const [selecteditemsub, setSelecteditemsub] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [productNameSearch, setproductNameSearch] = useState([]);
  const [qty, setQty] = useState('');
  const [cat1, setCat1] = useState([]);
  const [subcat, setSubCat] = useState([]);
  const [subcat1, setSubCat1] = useState([]);
  const [itemsubcat, setItemSubCat] = useState([]);
  const [logout, setLogOut] = useState(false);
  const [logoutdata, setLogOutdata] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const [allProduct, setAllProduct] = useState([]);
  const [allProductlow, setAllProductlow] = useState([]);
  const [allProductlow1, setAllProductlow1] = useState([]);
  const Operation = [
    {name: 'Addition', id: 1},
    {name: 'Subtraction', id: 2},
  ];
  const Res = cat?.filter(i => i?.subcategory_status == 1 || '');

  useFocusEffect(
    useCallback(() => {
      GetItemsCategory();
      MyProfile();
      LowStockList();
      setSelectedId(Operation?.[0]);
    }, []),
  );
  const fetchProducts = async () => {
    setLoading1(true);
    console.log('selecteditemsub', selecteditemsub?.category_status);

    const Data = await GetLoginData();
    const products = await getStockProductremote({
      category_id: selecteditem?.category_id,
      status: Data?.status,
      sub_category_id:
        selecteditemsub != null && selecteditemsub?.category_status != 0
          ? selecteditemsub?.subcategory_id
          : '',
    });

    if (products?.status) {
      console.log('data------->', products?.data);
      setAllProduct(products?.data);
      setproductNameSearch(products?.data);
    } else {
      setAllProduct([]);
      setproductNameSearch([]);
    }

    setLoading1(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [selecteditemsub, selecteditem]);
  const Refresh = () => {
    GetItemsCategory();
    AllSubItemCat(selecteditem);
    LowStockList();
  };
  const MyProfile = async () => {
    const Data = await GetLoginData();
    const Response = await getMyProfileremote({status: Data?.status});
    if (Response) {
      setData(Response);
      SaveUserInfo(Response);
    } else {
      Response(null);
      SaveUserInfo(null);
    }
  };
  const WhatApp = () => {
    Care?.current?.close();

    Linking.openURL(`https://wa.me/${data?.whatapp_number}`);
  };
  const handleEmail = async () => {
    Care?.current?.close();

    const email = 'support@example.com';
    const subject = 'Customer Support';
    const body = 'Hi, I need help with...';
    const url = `mailto:${
      data?.customer_care_mail
    }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      Linking.openURL(url);
    } else {
      Alert.alert(
        'Mail app not found',
        'No mail app is installed or configured. Please set up an email app to use this feature.',
      );
    }
  };
  const handleSearch = (text: string) => {
    setName(text);

    const searchText = text.trim().toLowerCase();

    if (searchText === '') {
      setCat(cat1); // reset to full list
      setSubCat(subcat1);
      setAllProduct(productNameSearch); // Reset from full backup
      setAllProductlow(allProductlow1); // Reset from full backup
      return;
    }

    if (selectedval?.name === 'Stock List') {
      const filtered = productNameSearch.filter(item =>
        item?.product_name?.toLowerCase()?.includes(searchText),
      );
      setAllProduct(filtered); // Show filtered items
    } else if (selectedval?.name === 'Low Stock List') {
      const filtered = allProductlow1.filter(item =>
        item?.product_name?.toLowerCase()?.includes(searchText),
      );
      setAllProductlow(filtered); // Show filtered items
    }
  };

  const handleCall = () => {
    Care?.current?.close();
    const phoneNumber = '+1234567890'; // Include country code if needed
    Linking.openURL(`tel:${data?.customer_care_mobile}`);
  };
  const renderButton = (item, key) => {
    const isSelected = item?.name === selectedval?.name;
    return (
      <TouchableOpacity
        key={key}
        onPress={() => setSelectedVal(item)}
        style={[
          tailwind('p-2 rounded-full '),
          {
            borderWidth: isSelected ? 1 : 0,
            borderColor: isSelected ? '#3B6EB5' : 'white',
          },
        ]}>
        <Text
          style={[
            tailwind('px-1 font-15 font-bold'),
            {color: isSelected ? '#3B6EB5' : 'black'},
          ]}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const GetItemsCategory = async () => {
    setLoading(true);
    const Data = await GetLoginData();
    const Response = await getItemsallCategoryremote({status: Data?.status});
    setLoading(false);

    if (Response) {
      const firstCat = Response?.data?.[0];
      setCat(Response?.data);
      setCat1(Response?.data);
      setSelecteditem(firstCat);
      console.log('firstCat', firstCat);
      const hasActiveSubcategory = Response?.data?.some(
        sub => sub?.sub_category_status === '1',
      );
      // console.log('firstCat?.category_id',firstCat?.category_id,hasActiveSubcategory);
      if (firstCat?.category_id && hasActiveSubcategory) {
        GetItemAllSubCategory(firstCat?.category_id);
      }
    } else {
      setCat([]);
      setCat1([]);
      setSelecteditem(null);
    }
  };
  const AllSubItemCat = (data: any) => {
    setSelecteditem(data);
    if (data?.category_id && data?.sub_category_status === '1') {
      console.log('sub_category_statussub_category_status');
      GetItemAllSubCategory(data?.category_id);
    } else {
      setItemSubCat([]);
      setSelecteditemsub(null);
    }
    // if (data?.category_id) {
    //   GetItemAllSubCategory(data?.category_id);
    // }
  };
  const GetItemAllSubCategory = async (category_id: any) => {
    const Data = await GetLoginData();
    setLoading(true);
    const Response = await getItemsallSubCategoryremote({
      status: Data?.status,
      category_id: category_id,
    });
    setLoading(false);
    if (Response) {
      setLoading(false);
      const subcategories = Response?.data || [];
      const firstSub = subcategories[0] || null;
      setItemSubCat(subcategories);
      setSelecteditemsub(firstSub);
      console.log('Selected subcategory:', firstSub);
    } else {
      setLoading(false);
      setItemSubCat([]);
      setSelecteditemsub(null);
    }
  };
  const LowStockList = async () => {
    const Data = await GetLoginData();
    setLoading(true);

    const DataResponse = await getLowStockListremote({
      status: Data?.status,
    });
    setLoading(false);

    if (DataResponse?.status) {
      setLoading(false);

      const low_stock_alert = DataResponse?.data?.filter(i => {
        const lowAlert = Number(i?.low_stock_alert);
        const stockCount = Number(i?.stock_count);
        return !isNaN(lowAlert) && !isNaN(stockCount) && lowAlert >= stockCount;
      });
      console.log('getLowStockListremote', DataResponse?.data);

      setAllProductlow1(low_stock_alert);
      setAllProductlow(low_stock_alert);
    } else {
      setLoading(false);

      setAllProductlow1([]);
      setAllProductlow([]);
      // errorBox('invalid getLowStockListremote');
      console.log('getLowStockListremote', DataResponse);
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

      if (selectedval?.name == 'Stock List') {
        fetchProducts(); // ✅ Now it works here too
        LowStockList();
        Refresh();
      } else {
        LowStockList();
        Refresh();
      }
    } else {
      setLoading(false);

      errorBox(Response?.res?.message);
    }
  };
  if (loading) {
    return <Loadingcomp />;
  }
  return (
    <View style={[tailwind('h-full bg-white'), {}]}>
      <TopBar text="hi" type={0} Refresh={Refresh} Care={Care} search={2}/>
      <View style={tailwind('flex-row flex-wrap px-3 py-3')}>
        {Poll.map((item, index) => renderButton(item, index))}
      </View>
      {selectedval?.name == 'Stock List' && (
        <View style={[tailwind('flex-row w-full'), {}]}>
          {/* Left: Categories */}
          <ScrollView
            style={{width: '10%', backgroundColor: '#F2F2F2'}}
            contentContainerStyle={tailwind('pb-40')}
            showsVerticalScrollIndicator={false}>
            {cat?.map((i: any, index: number) => {
              console.log('i========>', i, selecteditem);
              return (
                <TouchableOpacity
                  key={i?.category_id || index}
                  onPress={() => {
                    AllSubItemCat(i);
                  }}
                  style={[
                    tailwind('rounded-xl items-center mb-4 p-2'),
                    {
                      borderWidth: 1,
                      borderColor:
                        i?.category_id === selecteditem?.category_id
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
                      // height: width / 8.8,
                      // width: width / 8.8,
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
              );
            })}
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
                  itemsubcat?.map((item: any, index: number) => (
                    <View style={[tailwind(''), {}]}>
                      <TouchableOpacity
                        key={item?.subcategory_id || index}
                        onPress={() => setSelecteditemsub(item)}
                        style={[
                          tailwind('rounded-xl px-4 py-2 mb-2 mr-2'),
                          {
                            borderWidth: 1,
                            borderColor:
                              item?.subcategory_id ===
                              selecteditemsub?.subcategory_id
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
                                selecteditemsub?.subcategory_id
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
            <View style={[tailwind('h-full'), {}]}>
              <View
                style={[
                  tailwind('px-5 mx-3 rounded-full py-2 border flex-row'),
                  {},
                ]}>
                <Image
                  source={assets_manifest?.search}
                  style={[tailwind(''), {height: 30, width: 30}]}
                />
                <TextInput
                  placeholder="Search by name"
                  onChangeText={txt => {
                    handleSearch(txt);
                  }}
                  value={name}
                  style={[tailwind('text-black mx-2 font-15 font-bold'), {}]}
                  placeholderTextColor={'black'}
                />
              </View>
              <ScrollView
                style={[tailwind(''), {}]}
                contentContainerStyle={[
                  tailwind(''),
                  {paddingBottom: height / 3},
                ]}>
                {loading1 ? (
                  <View
                    style={[
                      tailwind('flex items-center'),
                      {justifyContent: 'center', marginTop: '70%'},
                    ]}>
                    <ActivityIndicator color={'#001a4f'} size={'large'} />
                    <Text>Loading</Text>
                  </View>
                ) : allProduct?.length ? (
                  allProduct?.map((i: any, index: any) => {
                    return (
                      <View
                        style={[
                          tailwind(
                            'white-shadow rounded-xl ml-3 mr-3 mb-3 mt-3  px-3 py-3',
                          ),
                          {},
                        ]}
                        key={index}>
                        <Text
                          style={[tailwind(''), {width: '70%'}]}
                          numberOfLines={2}>
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
              </ScrollView>
            </View>
          </View>
        </View>
      )}
      {selectedval?.name == 'Low Stock List' && (
        <View style={[tailwind('h-full px-3 py-3'), {}]}>
          <View
            style={[
              tailwind('px-5 mx-3 rounded-full py-2 border flex-row'),
              {},
            ]}>
            <Image
              source={assets_manifest?.search}
              style={[tailwind(''), {height: 30, width: 30}]}
            />
            <TextInput
              placeholder="Search by name"
              onChangeText={txt => {
                handleSearch(txt);
              }}
              value={name}
              style={[
                tailwind('text-black mx-2  font-15 font-bold'),
                {flex: 1},
              ]}
              placeholderTextColor={'black'}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {allProductlow?.length ? (
              allProductlow?.map((i: any, index: any) => {
                return (
                  <View
                    style={[
                      tailwind(
                        'white-shadow rounded-xl mb-3 mt-3 flex-row px-3 py-3',
                      ),
                      {},
                    ]}
                    key={index}>
                    <Text
                      style={[tailwind(''), {width: '70%'}]}
                      numberOfLines={2}>
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
                            height: 40,
                            width: 40,
                            backgroundColor: '#d5e3fd',
                          },
                        ]}>
                        <Text style={[tailwind('font-bold'), {color: 'red'}]}>
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
                );
              })
            ) : (
              <View
                style={[
                  tailwind('items-center'),
                  {justifyContent: 'center', marginTop: '50%'},
                ]}>
                <Text style={tailwind('text-center text-gray-500 mt-5')}>
                  No low stock items found.
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}

      <Portal>
        <Modalize
          ref={Care}
          useNativeDriver={true}
          modalTopOffset={100}
          adjustToContentHeight={true}>
          <View style={[tailwind('px-3 py-3'), {}]}>
            <View
              // onPress={() => {
              //   Care?.current?.open();
              // }}
              style={[
                tailwind('flex-row items-center mt-3 py-3  '),
                // {backgroundColor: 'yellow'},
              ]}>
              <Text style={[tailwind('mt-1 ml-2 font-semi font-15'), {}]}>
                How can we Help?
              </Text>
              <TouchableOpacity
                style={[tailwind(''), {marginLeft: 'auto'}]}
                onPress={() => {
                  Care?.current?.close();
                }}>
                <Image
                  source={assets_manifest?.close}
                  style={[tailwind(''), {height: 30, width: 30}]}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                tailwind(''),
                {height: 1, width: '100%', backgroundColor: 'gray'},
              ]}
            />

            <View style={[tailwind(' py-4'), {}]}>
              <TouchableOpacity
                style={[tailwind('flex-row items-center '), {}]}
                onPress={handleCall}>
                <Image
                  source={assets_manifest?.call}
                  style={[tailwind(''), {height: 30, width: 30}]}
                />
                <Text style={[tailwind('mt-1 ml-2 font-semi font-15'), {}]}>
                  Call US
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                tailwind(''),
                {height: 1, width: '100%', backgroundColor: 'gray'},
              ]}
            />

            <View style={[tailwind(' py-4'), {}]}>
              <TouchableOpacity
                style={[tailwind('flex-row items-center'), {}]}
                onPress={() => {
                  WhatApp();
                }}>
                <Image
                  source={assets_manifest?.whatsapp}
                  style={[tailwind(''), {height: 30, width: 30}]}
                />
                <Text style={[tailwind('mt-1 ml-2 font-semi font-15'), {}]}>
                  Whatsapp
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                tailwind(''),
                {height: 1, width: '100%', backgroundColor: 'gray'},
              ]}
            />
            <View style={[tailwind(' py-4'), {}]}>
              <TouchableOpacity
                style={[tailwind('flex-row items-center'), {}]}
                onPress={handleEmail}>
                <Image
                  source={assets_manifest?.mail}
                  style={[tailwind(''), {height: 30, width: 30}]}
                />
                <Text style={[tailwind('mt-1 ml-2 font-semi font-15'), {}]}>
                  Email Us
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modalize>
      </Portal>
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
