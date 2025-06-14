import tailwind from '@tailwind';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Switch,
  Linking,
  Alert,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {saveIpAction} from '../../store/actions/appActions';
import {GetLoginData} from '../../workers/localStorage';
import {
  getAllProductremote,
  getCategoryremote,
  getCategoryStatusremote,
  getDeleteCategoryremote,
  getDeleteSubCategoryremote,
  getItemsallCategoryremote,
  getItemsallSubCategoryremote,
  getMyProfileremote,
  getSubCategoryremote,
  getSubCategoryStatusremote,
  getUnitremote,
} from '@remote/userRemote';
import {SaveUserInfo} from '@store/actions';
import {Loadingcomp, TopBar} from '@sharedComponents';
import assets_manifest from '@assets';
import Entypo from 'react-native-vector-icons/Entypo';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {errorBox} from '../../workers/utils';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';
import LinearGradient from 'react-native-linear-gradient';
import {InventryItems} from './Block/InventryItems';
export default function InventryScreen() {
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [cat, setCat] = useState([]);
  const [unit, setUnit] = useState([]);
  const [unit1, setUnit1] = useState([]);

  const [selecteditem, setSelecteditem] = useState(null);
  const [selecteditemsub, setSelecteditemsub] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [productNameSearch, setproductNameSearch] = useState([]);
  // const [deleteProduct, setDeleteProduct] = useState(false);
  const [cat1, setCat1] = useState([]);
  const [subcat, setSubCat] = useState([]);
  const [subcat1, setSubCat1] = useState([]);
  const [itemsubcat, setItemSubCat] = useState([]);
  const [logout, setLogOut] = useState(false);
  const [logout1, setLogOut1] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const Care = useRef(null);
  const [selectedDeleteid, setSelectedDeleteId] = useState('');
  const Poll = [
    {name: 'Items', status: 1},
    {name: 'Sub-Category', status: 1},
    {name: 'Category', status: 1},
  ];
  const [selectedval, setSelectedVal] = useState(Poll?.[0]);
  useEffect(() => {
    setName('');
  }, [selectedval]);
  useFocusEffect(
    useCallback(() => {
      GetCategory();
      GetItemsCategory();
      GetSubCategory();
      MyProfile();
      GetUnit();
    }, []),
  );
  useEffect(() => {
    // console.log("selecteditem",selecteditem)
    AllSubItemCat(selecteditem);
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading1(true);
      console.log('selecteditemsub', selecteditemsub?.category_status);
      // if (!selecteditem?.category_id || !selecteditemsub?.subcategory_id) return;
      const Data = await GetLoginData(); // move this inside
      const products = await getAllProductremote({
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
        setproductNameSearch(products?.data);
        setLoading1(false);
      } else {
        setLoading1(false);
        setAllProduct([]);
        setproductNameSearch([]);
      }
    };
    fetchProducts();
  }, [selecteditemsub, selecteditem]);

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
  const GetCategory = async () => {
    setLoading(true);
    const Data = await GetLoginData();
    const Response = await getCategoryremote({status: Data?.status});
    setLoading(false);
    if (Response) {
      setLoading(false);
      setCat(Response?.data);
      setCat1(Response?.data);
    } else {
      setLoading(false);
      setCat([]);
      setCat1([]);
    }
  };
  const GetUnit = async () => {
    setLoading(true);
    const Data = await GetLoginData();
    const Response = await getUnitremote({status: Data?.status});
    setLoading(false);
    if (Response) {
      setLoading(false);
      console.log('data------->', Response);
      setUnit(Response?.data);
      setUnit1(Response?.data);
    } else {
      setLoading(false);
      setUnit([]);
      setUnit1([]);
    }
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
  const GetSubCategory = async () => {
    setLoading(true);
    const Data = await GetLoginData();
    const Response = await getSubCategoryremote({status: Data?.status});
    setLoading(false);
    if (Response) {
      setLoading(false);
      setSubCat(Response?.data);
      setSubCat1(Response?.data);
    } else {
      setLoading(false);
      setSubCat([]);
      setSubCat1([]);
    }
  };
  const AllSubItemCat = (data: any) => {
    setSelecteditem(data);
    // const hasActiveSubcategory = cat?.some(
    //   (sub) => sub?.sub_category_status === 1
    // );
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
    const Response = await getItemsallSubCategoryremote({
      status: Data?.status,
      category_id: category_id,
    });
    if (Response) {
      const subcategories = Response?.data || [];
      const firstSub = subcategories[0] || null;
      setItemSubCat(subcategories);
      setSelecteditemsub(firstSub);

      console.log('Selected subcategory:', firstSub);
    } else {
      setItemSubCat([]);
      setSelecteditemsub(null);
    }
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
  const DeleteCat = (id: any) => {
    setLogOut(true);
    setSelectedDeleteId(id);
  };
  const DeleteCat1 = (id: any) => {
    setLogOut1(true);
    setSelectedDeleteId(id);
  };
  const ONPressDel = async () => {
    const Data = await getDeleteCategoryremote({
      category_id: JSON.stringify(selectedDeleteid),
    });
    if (Data?.status) {
      setLogOut(false);
      GetCategory();
      GetItemsCategory();
    }
  };
  const ONPressDel1 = async () => {
    const Data = await getDeleteSubCategoryremote({
      sub_category_id: JSON.stringify(selectedDeleteid),
    });
    if (Data?.status) {
      setLogOut1(false);
      GetSubCategory();
    } else {
      errorBox(Data?.res?.message);
    }
  };
  interface prototype {
    i: any;
    category_status: any;
    category_id: string;
    category_name: string;
    category_image: string;
    cat: number;
    type: number;
  }
  const CategoryList = (props: prototype) => {
    console.log("category_idcategory_idcategory_idcategory_id",props?.category_id)
    const [isEnabled, setIsEnabled] = useState(props?.category_status == 1);
    useEffect(() => {
      setIsEnabled(props?.category_status == 1);
    }, [props?.category_status]);
    const toggleSwitch = async () => {
      const newStatus = !isEnabled;
      setIsEnabled(newStatus);
      try {
        const Data = await GetLoginData();

        let response;
        if (props.cat === 1) {
          response = await getCategoryStatusremote({
            category_id: props.category_id,
            status: Data?.status,
            category_status: newStatus ? 1 : 0,
          });
        } else {
          response = await getSubCategoryStatusremote({
            subcategory_id: props.category_id,
            status: Data?.status,
            subcategory_status: newStatus ? 1 : 0,
          });
        }

        if (response?.status) {
          props.cat === 1 ? GetCategory() : GetSubCategory();
        } else {
          setIsEnabled(!newStatus); // revert switch if API failed
        }
      } catch (error) {
        setIsEnabled(!newStatus); // revert switch on error
      }
    };

    return (
      <View
        style={[
          tailwind('px-3 rounded-xl py-3 bg-white white-shadow mb-2 mx-3 mt-3'),
          {},
        ]}>
        <Text>{props?.category_name}</Text>
        <View style={[tailwind('flex-row'), {marginLeft: 'auto'}]}>
          <TouchableOpacity
            onPress={() => {
              if (props?.cat == 1) {
                navigation?.navigate('InventryCategoryScreen', {
                  text: 'Edit Category',
                  category_id: props?.category_id,
                  category_name: props?.category_name,
                  category_image: props?.category_image,
                });
              } else if (props?.cat == 2) {
                navigation?.navigate('InventrySubCategoryScreen', {
                  text: 'Edit Category',
                  category_id: props?.i?.category_id,
                  category_name: props?.category_name,
                  category_image: props?.category_image,
                  data: cat,
                  selected: props?.i,
                  subcategory_id: props?.i?.subcategory_id,
                });
              }
              else if (props?.cat == 3) {
                console?.log("props?.i?.category_id",props?.i)
                navigation?.navigate('InventryUnitScreen', {
                  text: 'Edit Unit',
                  category_id: props?.i?.unit_id,
                  category_name: props?.i?.unit_name,
                
                });
              }
            }}>
            <Image
              source={assets_manifest?.editing}
              style={[tailwind('mr-3'), {height: 25, width: 25}]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (props?.cat == 1) {
                DeleteCat(props?.category_id);
              } else {
                DeleteCat1(props?.category_id);
              }
            }}>
            <Image
              source={assets_manifest?.delete}
              style={[tailwind('mr-3'), {height: 25, width: 25}]}
            />
          </TouchableOpacity>
          {props?.type !== 1 && (
            <Switch
              trackColor={{false: '#ccc', true: 'green'}}
              thumbColor={'white'}
              ios_backgroundColor="#ccc"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          )}
        </View>
      </View>
    );
  };

  const handleSearch = (text: string) => {
    setName(text);

    const searchText = text.trim().toLowerCase();

    if (searchText === '') {
      setCat(cat1); // reset to full list
      setSubCat(subcat1); // reset to full list
      setAllProduct(productNameSearch);
      setUnit(unit1);
      return;
    }

    if (selectedval?.name === 'Category') {
      const filtered = cat1.filter(item =>
        item?.category_name.toLowerCase().includes(searchText),
      );
      setCat(filtered);
    } else if (selectedval?.name === 'Sub-Category') {
      const filtered = subcat1.filter(item =>
        item?.subcategory_name.toLowerCase().includes(searchText),
      );
      setSubCat(filtered);
    } else if (selectedval?.name === 'Items') {
      const filtered = productNameSearch.filter(item =>
        item?.product_name.toLowerCase().includes(searchText),
      );
      setAllProduct(filtered);
    } else if (selectedval?.name === 'Unit') {
      const filtered = unit.filter(item =>
        item?.product_name.toLowerCase().includes(searchText),
      );
      setAllProduct(filtered);
    }
  };

  const Refresh = () => {
    GetCategory();
    GetItemsCategory();
    GetSubCategory();
    GetUnit();
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

  if (loading) {
    return <Loadingcomp />;
  }
  return (
    <View style={[tailwind('h-full bg-white')]}>
      <TopBar
        text="hi"
        type={0}
        Refresh={Refresh}
        itemsubcat={itemsubcat}
        cat={cat}
        Care={Care}
        search={1}
      />
      <View style={[tailwind('flex-row px-3 py-3'), {}]}>
        <View style={tailwind('flex-row flex-wrap px-3 py-3')}>
          {Poll.map((item, index) => renderButton(item, index))}
          {data?.unit_status != 0 &&
            renderButton({name: 'Unit', status: 1}, 'Unit')}
        </View>
      </View>
      {selectedval?.name == 'Category' && (
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
          <ScrollView>
            {cat?.length ? (
              cat?.map((i: any, index: number) => {
                return (
                  <View style={[tailwind(''), {}]} key={index}>
                    <CategoryList
                      category_image={i?.category_image}
                      category_name={i?.category_name}
                      i={i}
                      category_status={i?.category_status}
                      category_id={i?.category_id}
                      cat={1}
                    />
                  </View>
                );
              })
            ) : (
              <View
                style={[
                  tailwind('items-center h-full'),
                  {justifyContent: 'center'},
                ]}>
                <Image
                  source={assets_manifest?.search}
                  style={[
                    tailwind('items-center'),
                    {height: 50, width: 50, justifyContent: 'center'},
                  ]}
                />
                <Text
                  style={[tailwind('font-bold text-black font-15 mt-2'), {}]}>
                  No Report Data Found
                </Text>
              </View>
            )}
            <View style={[tailwind('h-40'), {}]} />
          </ScrollView>
        </View>
      )}
      {selectedval?.name == 'Sub-Category' && (
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
          <ScrollView>
            {subcat?.length ? (
              subcat?.map((i: any, index: any) => {
                return (
                  <View style={[tailwind(''), {}]} key={index}>
                    <CategoryList
                      category_image={i?.subcategory_image}
                      category_name={i?.subcategory_name}
                      i={i}
                      category_status={i?.subcategory_status}
                      category_id={i?.subcategory_id}
                      cat={2}
                    />
                  </View>
                );
              })
            ) : (
              <View
                style={[
                  tailwind('items-center h-full'),
                  {justifyContent: 'center'},
                ]}>
                <Image
                  source={assets_manifest?.search}
                  style={[
                    tailwind('items-center'),
                    {height: 50, width: 50, justifyContent: 'center'},
                  ]}
                />
                <Text
                  style={[tailwind('font-bold text-black font-15 mt-2'), {}]}>
                  No Report Data Found
                </Text>
              </View>
            )}
            <View style={[tailwind('h-40'), {}]} />
          </ScrollView>
        </View>
      )}
      {selectedval?.name == 'Items' &&
        (cat?.length ? (
          <InventryItems
            setSelecteditemsub={setSelecteditemsub}
            selecteditemsub={selecteditemsub}
            itemsubcat={itemsubcat}
            GetItemAllSubCategory={AllSubItemCat}
            cat={cat}
            selecteditem={selecteditem}
            setSelecteditem={setSelecteditem}
            setAllProduct={setAllProduct}
            allProduct={allProduct}
            loading={loading1}
            handleSearch={handleSearch}
            name={name}
            GetSubCategory={Refresh}
            unit={unit}
            // setDeleteProduct={setDeleteProduct}
            // deleteProduct={deleteProduct}
          />
        ) : (
          <View style={[tailwind('items-center h-full')]}>
            <Image
              source={assets_manifest?.search}
              style={[
                tailwind('items-center'),
                {height: 50, width: 50, justifyContent: 'center'},
              ]}
            />
            <Text style={[tailwind('font-bold text-black font-15 mt-2'), {}]}>
              No Availanle Items Found
            </Text>
          </View>
        ))}
      {selectedval?.name == 'Unit' && (
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
          <ScrollView>
            {unit?.length ? (
              unit?.map((i: any, index: number) => {
                return (
                  <View style={[tailwind(''), {}]} key={index}>
                    <CategoryList
                      type={1}
                      category_image={i?.category_image}
                      category_name={i?.unit_name}
                      i={i}
                      category_status={i?.unit_status}
                      category_id={i?.unit_id}
                      cat={3}
                    />
                  </View>
                );
              })
            ) : (
              <View
                style={[
                  tailwind('items-center h-full'),
                  {justifyContent: 'center'},
                ]}>
                <Image
                  source={assets_manifest?.search}
                  style={[
                    tailwind('items-center'),
                    {height: 50, width: 50, justifyContent: 'center'},
                  ]}
                />
                <Text
                  style={[tailwind('font-bold text-black font-15 mt-2'), {}]}>
                  No Report Data Found
                </Text>
              </View>
            )}
            <View style={[tailwind('h-40'), {}]} />
          </ScrollView>
        </View>
      )}

      <TouchableOpacity
        onPress={() => {
          if (selectedval?.name == 'Category') {
            navigation?.navigate('InventryCategoryScreen', {
              text: 'Add Category',
              category_id: '',
            });
          } else if (selectedval?.name == 'Sub-Category') {
            navigation?.navigate('InventrySubCategoryScreen', {
              text: 'Add SubCategory',
              category_id: '',
              data: cat,
            });
          } else if (selectedval?.name == 'Items') {
            navigation?.navigate('AddProductScreen', {
              cat: cat,
              itemsubcat: itemsubcat,
              type: 0,
              unit:unit
            });
          } else if (selectedval?.name == 'Unit') {
            navigation?.navigate('InventryUnitScreen', {
              unit: unit,
              text: 'Add Unit',
            });
          }
        }}
        style={[
          tailwind('mr-3 mb-3 rounded-xl'),
          {backgroundColor: 'green', position: 'absolute', bottom: 1, right: 1},
        ]}>
        <Entypo name="plus" color={'white'} size={60} />
      </TouchableOpacity>
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
            Are your sure want to delete this Product?
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
                CANCEL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={ONPressDel}
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
        onBackdropPress={() => setLogOut1(true)}
        style={[
          tailwind(' h-full items-center justify-center '),
          {backgroundColor: 'transparent'},
        ]}
        isVisible={logout1}>
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
              onPress={() => setLogOut1(false)}
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
