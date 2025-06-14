import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import tailwind from '@tailwind';
import {useNavigation} from '@react-navigation/native';
import assets_manifest from '@assets';
import {GetLoginData} from '../../workers/localStorage';
import {
  getGetCategoryemote,
  getMyProfileremote,
  getPOSGetCategoryemote,
  getPOSProductremote,
  getPOSSubCategoryremote,
} from '@remote/userRemote';
import {Loadingcomp, ProductComp, TopBar} from '@sharedComponents';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';
import {SaveUserInfo} from '@store/actions';
import {
  decrementAction,
  incrementAction,
} from '../../store/actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
export default function PosScreen() {
  let CartState = useSelector(state => state.user.cart);

  const Care = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [cat, setCat] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [selecteditem, setSelecteditem] = useState(null);
  const [itemsubcat, setItemSubCat] = useState([]);
  const [selecteditemsub, setSelecteditemsub] = useState(null);
  const [data, setData] = useState(null);

  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const NavigateTo = () => {
    navigation.navigate('');
  };
  useEffect(() => {
    GetCategory();
    MyProfile();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading1(true);
      //   console.log('selecteditemsub', selecteditemsub?.category_status);
      // if (!selecteditem?.category_id || !selecteditemsub?.subcategory_id) return;
      const Data = await GetLoginData(); // move this inside
      const products = await getPOSProductremote({
        category_id: selecteditem?.category_id,
        status: Data?.status,
        sub_category_id:
          selecteditemsub != null && selecteditemsub?.category_status != 0
            ? selecteditemsub?.subcategory_id
            : '',
      });
      // setLoading1(false);
  
      if (products?.status) {
        setAllProduct(products?.data);
        setLoading1(false);
      } else {
        setLoading1(false);
        setAllProduct([]);
      }
    };
    fetchProducts();
  }, [selecteditemsub, selecteditem]);
  const GetCategory = async () => {
    setLoading(true);
    const Data = await GetLoginData();
    const Response = await getPOSGetCategoryemote({status: Data?.status});
    setLoading(false);
    if (Response) {
      setLoading(false);
      setCat(Response?.data);
      const firstCat = Response?.data?.[0];
      setSelecteditem(firstCat);
      AllSubItemCat(firstCat);
    } else {
      setLoading(false);
      setCat([]);
    }
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
  const Res = cat?.filter(i => i?.subcategory_status == 1 || '');
  const AllSubItemCat = (data: any) => {
    setSelecteditem(data);
    setLoading(true);
    if (data?.category_id && data?.sub_category_status === '1') {
      setLoading(false);
      console.log('sub_category_statussub_category_status');
      GetItemAllSubCategory(data?.category_id);
    } else {
      setLoading(false);
      setItemSubCat([]);
      setSelecteditemsub(null);
    }
  };
  const GetItemAllSubCategory = async (category_id: any) => {
    const Data = await GetLoginData();
    setLoading1(true);
    const Response = await getPOSSubCategoryremote({
      status: Data?.status,
      category_id: category_id,
    });
    setLoading1(false);
    if (Response) {
      setLoading1(false);
      console.log('ResponseResponseResponseResponse', Response?.data);
      const subcategories = Response?.data || [];
      const firstSub = subcategories[0] || null;
      setItemSubCat(subcategories);
      setSelecteditemsub(firstSub);
      console.log('Selected subcategory:', firstSub);
    } else {
      setLoading1(false);
      setItemSubCat([]);
      setSelecteditemsub(null);
    }
  };
  const Refresh = () => {
    GetCategory();
    MyProfile();
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
  const handleCall = () => {
    Care?.current?.close();
    const phoneNumber = '+1234567890'; // Include country code if needed
    Linking.openURL(`tel:${data?.customer_care_mobile}`);
  };
  const increment = useCallback((payload: any): void => {
    dispatch(incrementAction(payload));
  }, []);

  const decrement = useCallback((uuid: any): void => {
    dispatch(decrementAction(uuid));
  }, []);

  if (loading) {
    return <Loadingcomp />;
  }

  return (
    <View
      style={[
        tailwind('items-center h-full'),
        {backgroundColor: 'white', height: '100%'},
      ]}>
      <TopBar
        text="hi"
        type={0}
        Refresh={Refresh}
        itemsubcat={itemsubcat}
        cat={cat}
        Care={Care}
        search={1}
      />
      <View style={[tailwind('flex-row w-full mt-5'), {}]}>
        <ScrollView
          style={{width: '10%', backgroundColor: '#F2F2F2'}}
          contentContainerStyle={tailwind('pb-40')}
          showsVerticalScrollIndicator={false}>
          {cat?.map((i: any, index: number) => (
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

        <View style={[tailwind(''), {width: '80%', paddingLeft: 10}]}>
          {loading1 ? (
            <View
              style={[
                tailwind('flex items-center'),
                {justifyContent: 'center', marginTop: '100%'},
              ]}>
              <ActivityIndicator color={'#001a4f'} size={'large'} />
              <Text>Loading</Text>
            </View>
          ) : (
            <View style={[tailwind(''), {}]}>
              <View style={[tailwind('flex-row'), {}]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {itemsubcat?.map((item: any, index: number) => (
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
              <KeyboardAvoidingView
                style={{}}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View style={[tailwind(''), {}]}>
                  {/* <ScrollView
                    style={[tailwind('mt-3 ')]}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      // paddingBottom: CartState?.length && 300,
                      height: '100%',
                    }}> */}
                  {loading1 && (
                    <View
                      style={[
                        tailwind('flex items-center'),
                        {justifyContent: 'center', marginTop: '70%'},
                      ]}>
                      <ActivityIndicator color={'#001a4f'} size={'large'} />
                      <Text>Loading</Text>
                    </View>
                  )}
                  (
                  <View>
                    <FlatList
                      data={allProduct}
                      style={[tailwind(''), {height: '95%'}]}
                      keyExtractor={(item, index) =>
                        item?.product_id?.toString() || index.toString()
                      }
                      contentContainerStyle={{
                        paddingBottom: 200,
                        paddingTop: 12,
                      }}
                      ListEmptyComponent={() => (
                        <View
                          style={[
                            tailwind('items-center '),
                            {
                              justifyContent: 'center',
                              height: '95%',
                              marginTop: '50%',
                            },
                          ]}>
                          <Image
                            source={assets_manifest?.search}
                            style={[tailwind(''), {height: 50, width: 50}]}
                          />
                          <Text style={[tailwind('mt-3'), {}]}>
                            No Item Available
                          </Text>
                        </View>
                      )}
                      ListFooterComponent={() =>
                        loading1 ? (
                          <View
                            style={[
                              tailwind('flex items-center'),
                              {justifyContent: 'center', marginVertical: 20},
                            ]}>
                            <ActivityIndicator
                              color={'#001a4f'}
                              size={'large'}
                            />
                            <Text>Loading</Text>
                          </View>
                        ) : null
                      }
                      renderItem={({item, index}) => {
                        console.log("Product------>",item)
                        return(
                          <ProductComp
                          key={index}
                          product_price={
                            item?.product_price?.[0]?.product_price
                          }
                          whole_sale_price={
                            item?.product_price?.[0]?.whole_sale_price
                          }
                          whole_sale_price_status={
                            data?.whole_sale_price_status
                          }
                          category_id={item?.category_id}
                          product_tax={item?.product_tax}
                          mrp_price={item?.product_price?.[0]?.mrp_price}
                          mrp_price_status={data?.mrp_price_status}
                          product_name={item?.product_name}
                          seq_no={item?.seq_no}
                          low_stock_alert={item?.low_stock_alert}
                          stock_count={item?.stock_count}
                          increment={increment}
                          decrement={decrement}
                          product_id={item?.product_id}
                          image={item?.product_image}
                          product_priceindex={item?.product_price?.[0]}
                        />
                        )
                      
                      }}
                    />
                  </View>
                  )
                  {CartState?.length && (
                    <View
                      style={[
                        tailwind(
                          'flex-row items-center  rounded-full justify-between px-4 py-3',
                        ),
                        {
                          position: 'absolute',
                          bottom: !itemsubcat?.length ? 0 : 80,
                          left: 0,
                          right: 0,
                          backgroundColor: '#001a4f',
                          borderTopWidth: 1,
                          borderColor: '#ddd',
                          elevation: 10,
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 2},
                          shadowOpacity: 0.2,
                          shadowRadius: 4,
                        },
                      ]}>
                      <View>
                        <Text style={tailwind('font-semi text-white')}>
                          {CartState.length} items
                        </Text>
                        <Text
                          style={tailwind('text-white font-bold font-16 mt-1')}>
                          ₹ {''}
                          {CartState.reduce(
                            (sum, item) => sum + item.quantity * item.price,
                            0,
                          ).toFixed(2)}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => navigation.navigate('Cart')}
                        style={tailwind('bg-white px-4 py-2 rounded-full')}>
                        <Text style={tailwind('text-primary font-bold')}>
                          View Bill ➤
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {/* </ScrollView> */}
                </View>
              </KeyboardAvoidingView>
            </View>
          )}
        </View>
      </View>

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
    </View>
  );
}
