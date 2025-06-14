import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import tailwind from '@tailwind';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Loadingcomp, TopBar} from '@sharedComponents';
import {TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {GetLoginData} from '../../workers/localStorage';
import {
  getAddProductremote,
  getCategorySubCatergoryremote,
  getEditProductremote,
  getItemsallSubCategoryremote,
  getMyProfileremote,
} from '@remote/userRemote';
import assets_manifest from '@assets';
import Modal from 'react-native-modal';
import {errorBox} from '../../workers/utils';

export default function AddProductScreen() {
  const timeoutRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isEditing, setIsEditing] = useState(false);
  const [isEditing1, setIsEditing1] = useState(false);
const [loading,setLoading]=useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const [itemName, setItemName] = useState('');
  const [open, setOpen] = useState(false);
  const [unitopen, setUnitOpen] = useState(false);

  const [open1, setOpen1] = useState(false);
  const [selecteditemsub, setSelecteditemsub] = useState(null);
  const [selecteditem, setSelecteditem] = useState(null);

  const [value, setValue] = useState(null); // This holds only the selected value (like id/index)
  const [valueObj, setValueObj] = useState(null);
  const [unitvalueObj, setUnitValueObj] = useState(null);
  const [unitvalue, setunitValue] = useState(null); // This holds only the selected value (like id/index)

  const [value1, setValue1] = useState(null); // This holds only the selected value (like id/index)
  const [valueObj1, setValueObj1] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [add, setAdd] = useState(false);
  const [itemVariationname, setVariationname] = useState('');
  const [itemSalesPrice, setItemSalesPrice] = useState('');
  const [itemLowStock, setItemLowStack] = useState('');
  const [itemStockQuanity, setItemStackQuanity] = useState('');
  const [itemStockMRP, setItemMRP] = useState('');
  const [itemwholesale, setItemWholeSale] = useState('');
  const [itemTax, setItemTax] = useState('');
  const [itemSKU, setItemSKU] = useState('');
  const [visible, setVisible] = useState(false);
  const [errorToastData, seterrorToastData] = useState('');
  const [itemsubcat, setItemSubCat] = useState([]);

  const route = useRoute();
  const NavigateTo = () => {
    navigation.navigate('');
  };
  const [Variation, setVariation] = useState([]);
  const unitpdatedData = useMemo(() => {
    return (
      route?.params?.unit?.map(item => ({
        ...item,
        value: item.unit_id,
        label: item.unit_name,
      })) || []
    );
  }, [route?.params?.unit]);
  const updatedData = useMemo(() => {
    return (
      route?.params?.cat?.map(item => ({
        ...item,
        value: item.category_id,
        label: item.category_name,
      })) || []
    );
  }, [route?.params?.cat]);

  const updatedData1 = useMemo(() => {
    if (!Array.isArray(itemsubcat)) return [];

    return itemsubcat.map(item => ({
      ...item,
      value: item?.subcategory_id ?? '', // Ensure fallback
      label: item?.subcategory_name ?? '', // Ensure fallback
    }));
  }, [itemsubcat]);

  // console.log("route?.params?.data",route?.params?.data[0]?.product_price
  // )
  // This will run once on mount
  useEffect(() => {
    MyProfile();
    console.log('fullItem----1');

    if (updatedData.length > 0) {
      console.log('fullItem----2');

      if (route?.params?.type == 1 && route?.params?.data?.[0]?.category_id) {
        const fullItem = updatedData.find(
          item => item.category_id === route?.params?.data?.[0]?.category_id,
        );
        console.log('fullItem----3', fullItem);
        setValueObj(fullItem);
        setValue(fullItem.value);
      } else {
        setValue(updatedData[0].value);
        setValueObj(updatedData[0]);
      }
    }
    console.log(
      'updatedData1updatedData1updatedData1updatedData1',
      updatedData1,
    );
    // if (updatedData1.length > 0) {
    //   console.log('fullItemfullItem----1');

    //   if (
    //     route?.params?.type == 1 &&
    //     route?.params?.data?.[0]?.sub_categoryid
    //   ) {
    //     console.log('fullItemfullItem----2',route?.params?.data?.[0]?.sub_categoryid);

    //     const fullItem = updatedData1.find(
    //       item =>
    //         item.subcategory_id === route?.params?.data?.[0]?.sub_categoryid,
    //     );
    //     console.log('fullItemfullItem----3', fullItem);
    //     setSelecteditemsub(fullItem);
    //     setSelecteditem(fullItem?.value);
    //   }
    //   setValue1(updatedData1[0].value);
    //   setValueObj1(updatedData1[0]);
    // }
    if (unitpdatedData.length > 0) {
      setunitValue(unitpdatedData[0].value);
      setUnitValueObj(unitpdatedData?.[0]);
    }
    // Handle edit mode
    if (route?.params?.type === 1 && route?.params?.data?.length > 0) {
      const editItem = route.params.data[0];
      setItemName(editItem.product_name);
      setVariation(editItem.product_price);

      const matchedCategory = updatedData.find(
        item => item.value === editItem.category_id,
      );

      if (matchedCategory) {
        setValue(matchedCategory.value);
        setValueObj(matchedCategory);
        AllSubItemCat(matchedCategory);
      }

      if (editItem.sub_categoryid) {
        const matchedSubCat = updatedData1.find(
          item => item.value === editItem.sub_categoryid,
        );
        if (matchedSubCat) {
          setValue1(matchedSubCat.value);
          setValueObj1(matchedSubCat);
        }
      }
    } else if (updatedData.length > 0) {
      AllSubItemCat(updatedData[0]);
    }
  }, []);
  useEffect(() => {
    console.log('route?.params?.dataonluyyyy', route?.params?.data);
    console.log(
      'route?.params?.data?.[0]?.product_tax',
      route?.params?.data?.[0]?.product_tax,
    );
    if (
      route?.params?.type === 1 &&
      itemsubcat.length > 0 &&
      route?.params?.data?.[0]?.sub_categoryid !== null
    ) {
      const subCatId = route?.params?.data?.[0]?.sub_categoryid;
      const matchedSubCat = itemsubcat.find(
        item => item.subcategory_id === subCatId,
      );
      if (matchedSubCat) {
        const mapped = {
          ...matchedSubCat,
          value: matchedSubCat.subcategory_id,
          label: matchedSubCat.subcategory_name,
        };
        setSelecteditemsub(mapped);
        setSelecteditem(mapped.value);
        setValue1(mapped.value);
        setValueObj1(mapped);
      }
      setItemTax(route?.params?.data?.[0]?.product_tax);
      setItemSKU(route?.params?.data?.[0]?.sku);
    } else if (route?.params?.data?.[0]) {
      setItemTax(route?.params?.data?.[0]?.product_tax);
      setItemSKU(route?.params?.data?.[0]?.sku);
    } else {
      const first = itemsubcat[0];
      const mappedFirst = {
        ...first,
        value: first?.subcategory_id,
        label: first?.subcategory_name,
      };
      setSelecteditemsub(mappedFirst);
      setSelecteditem(mappedFirst.value);
      setValue1(mappedFirst.value);
      setValueObj1(mappedFirst);
    }
  }, [itemsubcat, route?.params?.data]);

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        timeoutRef.current = setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setVisible(false);
          });
        }, 2000);
      });
    } else {
      fadeAnim.setValue(0);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [visible]);
  const removeVariationAtIndex = indexToRemove => {
    setVariation(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const MyProfile = async () => {
    const Data = await GetLoginData();
    const Response = await getMyProfileremote({status: Data?.status});
    if (Response) {
      setProfile(Response);
      if (route?.params?.type == 1) {
        setIsEnabled(
          route?.params?.data?.[0]?.stock_status == '1' ? true : false,
        );
        return;
      } else {
        setIsEnabled(Response?.stock_status === '1');
        return;
      }
    } else {
      setProfile(null);
    }
  };
  const toggleSwitch = async () => {
    const newStatus = !isEnabled;
    setIsEnabled(newStatus);
  };
  const SaveData = async () => {
    setLoading(true);

    if (!itemSalesPrice) {
      setVisible(true);
      seterrorToastData('Enter Item sale Price');
      return;
    }
    const MRP = profile?.mrp_price_status === '1';
    if (MRP) {
      if (!itemStockMRP) {
        setVisible(true);
        seterrorToastData('Enter Item MRP Price');
        return;
      }
    }
    const wholePrice = profile?.whole_sale_price_status === '1';
    if (wholePrice) {
      if (!itemwholesale) {
        setVisible(true);
        seterrorToastData('Enter Item Whole Sale Price');
        return;
      }
    }
    const UnitDetails = profile?.unit_status === '1';
    if (UnitDetails) {
      if (!unitvalueObj) {
        setVisible(true);
        seterrorToastData('Select Unit ');
        return;
      }
    }

    const shouldValidateStock = profile?.stock_status === '1' && isEnabled;

    // 🔍 Stock validation only if needed
    if (shouldValidateStock) {
      if (!itemLowStock) {
        setVisible(true);
        seterrorToastData('Enter Item Low Stock Alert');
        return;
      }
      if (!itemStockQuanity) {
        setVisible(true);
        seterrorToastData('Enter Item Stock Quantity');
        return;
      }
    }

    // 💡 For disabled stock or status != 1, force clear stock fields
    const stockFields = shouldValidateStock
      ? {
          low_stock_alert: itemLowStock.toString(),
          stock_quantity: itemStockQuanity.toString(),
        }
      : {
          low_stock_alert: '',
          stock_quantity: '',
        };
    const MRPData = MRP
      ? {
          mrp_price: itemStockMRP,
        }
      : {
          mrp_price: '',
        };
    const WholeSale = wholePrice
      ? {
          whole_sale_price: itemwholesale,
        }
      : {
          whole_sale_price: '',
        };
    const Unit = UnitDetails
      ? {
          unit_id: unitvalueObj?.unit_id.toString(),
          unit_name: unitvalueObj?.unit_name.toString(),
        }
      : {
          unit_id: '',
          unit_name: '',
        };
    const itemObj = {
      product_variation_id: 0,
      product_variation: itemVariationname,
      product_price: itemSalesPrice,
      ...stockFields,
      ...MRPData,
      ...WholeSale,
      ...Unit,
      // unit_id: '',
      // unit_name: '',
    };
    setLoading(false);

    if (isEditing) {
      setLoading(false);

      // ✏️ Update existing variation
      setVariation(prev =>
        prev.map((v, idx) => (idx === editIndex ? itemObj : v)),
      );
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setLoading(false);

      // ➕ Add new variation
      setVariation(prev => [...prev, itemObj]);
    }
    setLoading(false);

    // 🧹 Clear fields
    setAdd(false);
    setItemLowStack('');
    setItemMRP('');
    setItemSKU('');
    setItemSalesPrice('');
    setItemStackQuanity('');
    // setItemTax('');
    setItemWholeSale('');
    setVariationname('');
    console.log('itemObj --->', itemObj);
  };

  const handleEdit = (item, index) => {
    setLoading(true);

    console.log('item.low_stock_alertdataaa', item);
    setIsEditing(true);
    setEditIndex(index);
    setItemSalesPrice(item.product_price);
    setVariationname(item.product_variation);
    setItemLowStack(item.low_stock_alert.toString());
    setItemStackQuanity(item.stock_quantity);
    setItemMRP(item.mrp_price);
    setItemWholeSale(item.whole_sale_price);
    // setItemTax(item.product_tax);
    setItemSKU(item.sku);
    if (item.stock_quantity != '') {
      console.log('if-----------');
      setIsEditing1(true);
      // setItemLowStack(
      //   item.low_stock_alert ? JSON.stringify(item.low_stock_alert) : '',
      // );
    } else {
      console.log('if-----------else', item.low_stock_alert);

      setIsEditing1(false);
    }
    if (item?.unit_id) {
      const fullItem = unitpdatedData.find(i => i.value === item?.unit_id);
      console.log('fullItem', fullItem);
      setUnitValueObj(fullItem);
      setunitValue(fullItem.value);
    }
    setAdd(true); // Show your input form if hidden
    setLoading(false);

  };
  const Remove = () => {
    setItemLowStack('');
    setItemMRP('');
    setItemSKU('');
    setItemSalesPrice('');
    setItemStackQuanity('');
    setItemTax('');
    setItemWholeSale('');
    setVariationname('');
    setAdd(false);
  };

  const Confirm = async () => {
    setLoading(true);

    const Data = await GetLoginData();
    if (!itemName) {
      errorBox('Enter Item Name ');
      return;
    } else if (Variation?.length == 0) {
      errorBox('Add Variation');
      return;
    } else if (valueObj?.sub_category_status === '1') {
      if (!selecteditem) {
        errorBox('Please Select Sub Category');
        return;
      }
    }
    const TaxDetails = profile?.product_tax_status === '1';
    if (TaxDetails) {
      if (!itemTax) {
        setVisible(true);
        seterrorToastData('Enter Item Tax');
        return;
      }
    }
    const Tax = TaxDetails
      ? {
          product_tax: itemTax,
          // stockQuantity: itemStockQuanity,
        }
      : {
          product_tax: '',
          // stockQuantity: '',
        };
        setLoading(true);

    const Response = await getAddProductremote({
      product_name: itemName,
      category_id: valueObj?.category_id,
      sku: itemSKU,
      product_tax: Tax?.product_tax,
      sub_categoryid: valueObj?.category_id
        ? selecteditemsub?.subcategory_id
        : '',
      description: '',
      stock_status: isEnabled ? 1 : 0,
      product_price: Variation,
      status: Data?.status,
    });
    setLoading(false);

    if (Response?.status) {
      setLoading(false);

      navigation.goBack();
    } else {
      setLoading(false);

      console.log('Response?.data', Response);
      errorBox(Response?.res?.message);
    }
  };
  const EditConfirm = async (id: any) => {
    setLoading(true);

    const Data = await GetLoginData();
    if (!itemName) {
      errorBox('Enter Item Name ');
      return;
    } else if (Variation?.length == 0) {
      errorBox('Add Variation');
      return;
    } else if (valueObj?.sub_category_status === '1') {
      if (!selecteditem) {
        errorBox('Please Select Sub Category');
        return;
      }
    }
    const TaxDetails = profile?.product_tax_status === '1';
    if (TaxDetails) {
      if (!itemTax) {
        setVisible(true);
        seterrorToastData('Enter Item Tax');
        return;
      }
    }
    const Tax = TaxDetails
      ? {
          product_tax: itemTax,
          // stockQuantity: itemStockQuanity,
        }
      : {
          product_tax: '',
          // stockQuantity: '',
        };
    console.log('selecteditemsub', selecteditemsub);
    const Response = await getEditProductremote({
      product_name: itemName,
      product_id: id,
      sku: itemSKU,
      product_tax: Tax?.product_tax,
      category_id: valueObj?.category_id,
      sub_categoryid: valueObj?.category_id
        ? selecteditemsub?.subcategory_id
        : '',
      description: '',
      stock_status: isEnabled ? 1 : 0,
      product_price: Variation,
      status: Data?.status,
    });
    setLoading(false);

    if (Response?.status) {
      setLoading(false);

      navigation.goBack();
    } else {
      setLoading(false);

      errorBox(Response?.res?.message);
      console.log('Response?.res', Response?.res);
    }
  };
  console?.log('valueObj', valueObj);
  const AllSubItemCat = (data: any) => {
    // setSelecteditem(data);
    if (data?.category_id && data?.sub_category_status === '1') {
      GetItemAllSubCategory(data?.category_id);
    } else {
      setItemSubCat([]);
      // setSelecteditemsub(null);
    }
  };
  const GetItemAllSubCategory = async (category_id: any) => {
    setLoading(true);
    const Data = await GetLoginData();
  
    const Response = await getCategorySubCatergoryremote({
      status: Data?.status,
      category_id: category_id,
    });
  
    setLoading(false);
    console.log('ResponseResponseResponseResponseResponse', Response);
  
    if (Response) {
      const subcategories = Response?.data || [];
      const firstSub = subcategories?.[0] || null;
  
      setItemSubCat(subcategories);
  
      if (firstSub) {
        const mapped = {
          ...firstSub,
          value: firstSub.subcategory_id,
          label: firstSub.subcategory_name,
        };
        setSelecteditemsub(mapped);               // full object
        setSelecteditem(mapped.value);            // primitive value
        setValue1(mapped.value);                  // for backup if needed
        setValueObj1(mapped);                     // for label display
      } else {
        setSelecteditemsub(null);
        setSelecteditem(null);
      }
    } else {
      setItemSubCat([]);
      setSelecteditemsub(null);
      setSelecteditem(null);
    }
  };
  
  const Onpress = () => {
    setIsEditing1(false);
    setAdd(true);
  };
if(loading){
  return <Loadingcomp/>
}
  return (
    <View style={[tailwind('h-full ')]}>
      <TopBar
        text={route?.params?.type == 1 ? 'Edit Product' : 'Add Product'}
        type={1}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[tailwind('px-3 py-3 mt-3'), {}]}>
          {profile?.stock_status === '1' && (
            <View style={[tailwind('flex-row mb-3'), {}]}>
              <Text style={[tailwind('font-medium font-15 text-black'), {}]}>
                Stock Status
              </Text>
              <View style={[tailwind(''), {marginLeft: 'auto'}]}>
                <Switch
                  trackColor={{false: '#ccc', true: '#001a4f'}}
                  thumbColor={'white'}
                  ios_backgroundColor="#ccc"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
          )}
          <TextInput
            mode="outlined"
            label="   Item Name *"
            onChangeText={txt => setItemName(txt)}
            value={itemName}
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
          <Text
            style={[tailwind('py-2 mt-3 font-15 font-medium text-black'), {}]}>
            Please Select Category *
          </Text>
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
              AllSubItemCat(fullItem);
              setValueObj(fullItem);
              setValue(selectedValue);
            }}
            placeholder={valueObj?.label || 'Select Category'}
            style={[
              tailwind('px-4 mt-3'),
              {
                borderRadius: 25,
                borderColor: '#001a4f',
                backgroundColor: 'white',
                borderWidth: 1,
              },
            ]}
            dropDownContainerStyle={{
              borderRadius: 10,
              borderColor: '#ccc',
            }}
          />
          {valueObj?.sub_category_status === '1' && !open && (
            <View>
              <Text
                style={[
                  tailwind('py-2 mt-3 font-15 font-medium text-black'),
                  {},
                ]}>
                Please Select SubCategory *
              </Text>
              <DropDownPicker
                open={open1}
                value={selecteditem}
                items={updatedData1}
                setOpen={setOpen1}
                setValue={callback => {
                  const selectedValue =
                    typeof callback === 'function' ? callback(selecteditem) : callback;
              
                  const fullItem = updatedData1.find(
                    item => item.value === selectedValue,
                  );
                  setSelecteditemsub(fullItem);
                  setSelecteditem(selectedValue);
                }}
                placeholder={
                  updatedData1.find(i => i.value === selecteditem)?.label || 'Select Sub Category'
                }                 style={[
                  tailwind('px-4 mt-3'),
                  {
                    borderRadius: 25,
                    borderColor: '#001a4f',
                    backgroundColor: 'white',
                    borderWidth: 1,
                  },
                ]}
                dropDownContainerStyle={{
                  borderRadius: 10,
                  borderColor: '#ccc',
                }}
              />
            </View>
          )}
          <TextInput
            mode="outlined"
            label="   Enter Item SKU"
            onChangeText={txt => setItemSKU(txt)}
            value={itemSKU}
            numberOfLines={1}
            placeholderTextColor="black"
            style={[
              tailwind('text-black font-16 mt-3 font-bold'),
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
          {profile?.product_tax_status === '1' && (
            <TextInput
              mode="outlined"
              label="   Enter Item Tax (%) *"
              onChangeText={txt => setItemTax(txt)}
              value={itemTax}
              numberOfLines={1}
              placeholderTextColor="black"
              style={[
                tailwind('text-black font-16 mt-3 font-bold'),
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
          )}
          <View style={[tailwind('flex-row py-2 mt-3 items-center'), {}]}>
            <Text style={[tailwind(' font-15 font-medium text-black'), {}]}>
              Item Variation
            </Text>
            <TouchableOpacity
              onPress={() => {
                Onpress();
              }}
              style={[
                tailwind('border px-3 py-2 rounded-full'),
                {borderColor: 'green', marginLeft: 'auto'},
              ]}>
              <Text style={[tailwind(' font-15 font-bold text-black'), {}]}>
                Add Variation
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[tailwind('mt-3 white-shadow rounded-xl'), {}]}>
            {Variation?.length != 0 ? (
              Variation?.map((i: any, index: any) => {
                return (
                  <View style={[tailwind('px-5 py-5'), {}]}>
                    {i?.product_variation && (
                      <View
                        style={[
                          tailwind('flex-row items-center pb-1 mb-2'),
                          {borderColor: 'gray', borderBottomWidth: 1},
                        ]}>
                        <Text
                          style={[
                            tailwind('font-15 font-medium'),
                            {width: '30%', color: 'gray'},
                          ]}>
                          Item Variation
                        </Text>
                        <Text style={[tailwind('items-center'), {}]}>:</Text>
                        <View style={[tailwind(''), {width: '2%'}]} />
                        <Text
                          style={[
                            tailwind('font-15 font-medium text-black'),
                            {width: '65%'},
                          ]}>
                          {i?.product_variation}
                        </Text>
                      </View>
                    )}
                    {i?.product_price && (
                      <View
                        style={[
                          tailwind('flex-row items-center pb-1 mb-2'),
                          {borderColor: 'gray', borderBottomWidth: 1},
                        ]}>
                        <Text
                          style={[
                            tailwind('font-15 font-medium'),
                            {width: '30%', color: 'gray'},
                          ]}>
                          Item Price
                        </Text>
                        <Text style={[tailwind('items-center'), {}]}>:</Text>
                        <View style={[tailwind(''), {width: '2%'}]} />
                        <Text
                          style={[
                            tailwind('font-15 font-medium text-black'),
                            {width: '65%'},
                          ]}>
                          {i?.product_price}
                        </Text>
                      </View>
                    )}
                    {i?.stock_quantity && (
                      <View
                        style={[
                          tailwind('flex-row items-center pb-1 mb-2'),
                          {borderColor: 'gray', borderBottomWidth: 1},
                        ]}>
                        <Text
                          style={[
                            tailwind('font-15 font-medium'),
                            {width: '30%', color: 'gray'},
                          ]}>
                          Item Stock Quantity
                        </Text>
                        <Text style={[tailwind('items-center'), {}]}>:</Text>
                        <View style={[tailwind(''), {width: '2%'}]} />
                        <Text
                          style={[
                            tailwind('font-15 font-medium text-black'),
                            {width: '65%'},
                          ]}>
                          {i?.stock_quantity}
                        </Text>
                      </View>
                    )}
                    {i?.low_stock_alert && (
                      <View
                        style={[
                          tailwind('flex-row items-center pb-1 mb-2'),
                          {borderColor: 'gray', borderBottomWidth: 1},
                        ]}>
                        <Text
                          style={[
                            tailwind('font-15 font-medium'),
                            {width: '30%', color: 'gray'},
                          ]}>
                          Item Low Stock Alert
                        </Text>
                        <Text style={[tailwind('items-center'), {}]}>:</Text>
                        <View style={[tailwind(''), {width: '2%'}]} />
                        <Text
                          style={[
                            tailwind('font-15 font-medium text-black'),
                            {width: '65%'},
                          ]}>
                          {i?.low_stock_alert}
                        </Text>
                      </View>
                    )}
                    {i?.sku && (
                      <View
                        style={[
                          tailwind('flex-row items-center pb-1 mb-2'),
                          {borderColor: 'gray', borderBottomWidth: 1},
                        ]}>
                        <Text
                          style={[
                            tailwind('font-15 font-medium'),
                            {width: '30%', color: 'gray'},
                          ]}>
                          Item SKU
                        </Text>
                        <Text style={[tailwind('items-center'), {}]}>:</Text>
                        <View style={[tailwind(''), {width: '2%'}]} />
                        <Text
                          style={[
                            tailwind('font-15 font-medium text-black'),
                            {width: '65%'},
                          ]}>
                          {i?.sku}
                        </Text>
                      </View>
                    )}
                    {i?.mrp_price && (
                      <View
                        style={[
                          tailwind('flex-row items-center pb-1 mb-2'),
                          {borderColor: 'gray', borderBottomWidth: 1},
                        ]}>
                        <Text
                          style={[
                            tailwind('font-15 font-medium'),
                            {width: '30%', color: 'gray'},
                          ]}>
                          Item MRP Price
                        </Text>
                        <Text style={[tailwind('items-center'), {}]}>:</Text>
                        <View style={[tailwind(''), {width: '2%'}]} />
                        <Text
                          style={[
                            tailwind('font-15 font-medium text-black'),
                            {width: '65%'},
                          ]}>
                          {i?.mrp_price}
                        </Text>
                      </View>
                    )}
                    {i?.whole_sale_price != 0 && (
                      <View
                        style={[
                          tailwind('flex-row items-center pb-1 mb-2'),
                          {borderColor: 'gray', borderBottomWidth: 1},
                        ]}>
                        <Text
                          style={[
                            tailwind('font-15 font-medium'),
                            {width: '30%', color: 'gray'},
                          ]}>
                          Item Whole Sale Price
                        </Text>
                        <Text style={[tailwind('items-center'), {}]}>:</Text>
                        <View style={[tailwind(''), {width: '2%'}]} />
                        <Text
                          style={[
                            tailwind('font-15 font-medium text-black'),
                            {width: '65%'},
                          ]}>
                          {i?.whole_sale_price}
                        </Text>
                      </View>
                    )}
                    {/* {i?.product_tax && (
                      <View
                        style={[
                          tailwind('flex-row items-center pb-1 mb-2'),
                          {borderColor: 'gray', borderBottomWidth: 1},
                        ]}>
                        <Text
                          style={[
                            tailwind('font-15 font-medium'),
                            {width: '30%', color: 'gray'},
                          ]}>
                          Item Tax
                        </Text>
                        <Text style={[tailwind('items-center'), {}]}>:</Text>
                        <View style={[tailwind(''), {width: '2%'}]} />
                        <Text
                          style={[
                            tailwind('font-15 font-medium text-black'),
                            {width: '65%'},
                          ]}>
                          {i?.product_tax}
                        </Text>
                      </View>
                    )} */}
                    <View style={[tailwind('mt-3 flex-row items-center'), {}]}>
                      <TouchableOpacity
                        onPress={() => handleEdit(i, index)}
                        style={[tailwind('flex-row items-center'), {}]}>
                        <Image
                          style={[tailwind(''), {height: 20, width: 20}]}
                          source={assets_manifest?.editing}
                          tintColor={'#001a4f'}
                        />
                        <Text
                          style={[
                            tailwind('ml-1 font-15 font-bold text-primary'),
                            {},
                          ]}>
                          EDIT
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => removeVariationAtIndex(index)}
                        style={[tailwind('flex-row items-center ml-5'), {}]}>
                        <Image
                          style={[tailwind(''), {height: 20, width: 20}]}
                          source={assets_manifest?.delete}
                          tintColor={'red'}
                        />
                        <Text
                          style={[
                            tailwind('ml-1 font-15 font-bold text-primary'),
                            {},
                          ]}>
                          DELETE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            ) : (
              <View
                style={[
                  tailwind('px-3 py-3 items-center '),
                  {marginVertical: '10%'},
                ]}>
                <Image
                  source={assets_manifest?.search}
                  style={[
                    tailwind(''),
                    {height: 80, width: 80, resizeMode: 'contain'},
                  ]}
                />
                <Text
                  style={[tailwind('mt-3 font-bold font-15 text-black'), {}]}>
                  No Item Variation Data Found
                </Text>
              </View>
            )}
          </View>
        </View>
        <Modal
          backdropOpacity={0.15}
          onBackdropPress={() => setAdd(true)}
          style={[
            tailwind(' h-full justify-center '),
            {backgroundColor: 'transparent'},
          ]}
          isVisible={add}>
          <View
            style={[
              tailwind('rounded-xl    pb-5'),
              {backgroundColor: '#ffffff'},
            ]}>
            <View style={[tailwind(''), {}]}>
              <Text
                style={[
                  tailwind(
                    'font-16 py-3  font-bold text-black text-center items-center',
                  ),
                  {justifyContent: 'center', borderBottomWidth: 1},
                ]}>
                Item Variation
              </Text>
              <TouchableOpacity
                onPress={Remove}
                style={[tailwind(''), {position: 'absolute', right: 1}]}>
                <Image
                  source={assets_manifest?.close}
                  style={[
                    tailwind(''),
                    {
                      height: 20,
                      width: 20,
                      // position: 'absolute',
                      // top: -10,
                      // right: 1,
                      marginLeft: 'auto',
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={[tailwind('px-5 py-3'), {}]}>
              <TextInput
                mode="outlined"
                label="   Enter item Variation"
                onChangeText={txt => setVariationname(txt)}
                value={itemVariationname}
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
                label="   Enter item Sale Price *"
                onChangeText={txt => setItemSalesPrice(txt)}
                value={itemSalesPrice}
                numberOfLines={1}
                placeholderTextColor="black"
                style={[
                  tailwind('text-black font-16 mt-3 font-bold'),
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
              {profile?.stock_status === '1' && isEnabled && (
                <View>
                  <TextInput
                    mode="outlined"
                    label="   Enter item Low Stock Alert *"
                    onChangeText={txt => setItemLowStack(txt)}
                    value={itemLowStock}
                    numberOfLines={1}
                    placeholderTextColor="black"
                    style={[
                      tailwind('text-black font-16 mt-3 font-bold'),
                      {
                        borderRadius: 50,
                        backgroundColor: 'white',
                      },
                    ]}
                    outlineColor="#B0B0B0"
                    activeOutlineColor="#001a4f"
                    theme={{roundness: 50}}
                  />
                  {!(route?.params?.type === 1 && isEditing1) && (
                    <TextInput
                      mode="outlined"
                      label="   Enter item Stock Quanity *"
                      onChangeText={txt => setItemStackQuanity(txt)}
                      value={itemStockQuanity}
                      numberOfLines={1}
                      placeholderTextColor="black"
                      style={[
                        tailwind('text-black font-16 mt-3 font-bold'),
                        {
                          borderRadius: 50,
                          backgroundColor: 'white',
                        },
                      ]}
                      outlineColor="#B0B0B0"
                      activeOutlineColor="#001a4f"
                      theme={{roundness: 50}}
                    />
                  )}
                </View>
              )}
              {profile?.mrp_price_status === '1' && (
                <TextInput
                  mode="outlined"
                  label="   Enter item MRP Price *"
                  onChangeText={txt => setItemMRP(txt)}
                  value={itemStockMRP}
                  numberOfLines={1}
                  placeholderTextColor="black"
                  style={[
                    tailwind('text-black font-16 mt-3 font-bold'),
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
              )}
              {profile?.whole_sale_price_status === '1' && (
                <TextInput
                  mode="outlined"
                  label="   Enter item whole Sale Price *"
                  onChangeText={txt => setItemWholeSale(txt)}
                  value={itemwholesale}
                  numberOfLines={1}
                  placeholderTextColor="black"
                  style={[
                    tailwind('text-black font-16 mt-3 font-bold'),
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
              )}

              {/* <TextInput
                mode="outlined"
                label="   Enter Item SKU"
                onChangeText={txt => setItemSKU(txt)}
                value={itemSKU}
                numberOfLines={1}
                placeholderTextColor="black"
                style={[
                  tailwind('text-black font-16 mt-3 font-bold'),
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
              /> */}
              {profile?.unit_status === '1' && (
                <DropDownPicker
                  open={unitopen}
                  value={unitvalue}
                  items={unitpdatedData}
                  setOpen={setUnitOpen}
                  setValue={callback => {
                    const selectedValue =
                      typeof callback === 'function'
                        ? callback(value)
                        : callback;

                    const fullItem = unitpdatedData.find(
                      item => item.value === selectedValue,
                    );
                    // AllSubItemCat(fullItem);
                    setUnitValueObj(fullItem);
                    setunitValue(selectedValue);
                  }}
                  placeholder={unitvalueObj?.label || 'Select Unit'}
                  style={[
                    tailwind('px-4 mt-3'),
                    {
                      borderRadius: 25,
                      borderColor: '#001a4f',
                      backgroundColor: 'white',
                      borderWidth: 1,
                    },
                  ]}
                  dropDownContainerStyle={{
                    borderRadius: 10,
                    borderColor: '#ccc',
                  }}
                />
                // <TextInput
                //   mode="outlined"
                //   label="   Please Select Unit *"
                //   onChangeText={txt => setItemSalesPrice(txt)}
                //   value={itemSalesPrice}
                //   numberOfLines={1}
                //   placeholderTextColor="black"
                //   style={[
                //     tailwind('text-black font-16 mt-3 font-bold'),
                //     {
                //       borderRadius: 50,
                //       backgroundColor: 'white', // Optional: ensure background doesn't override border radius
                //     },
                //   ]}
                //   outlineColor="#B0B0B0" // gray when not focused
                //   activeOutlineColor="#001a4f" // pink when focused (e.g., hot pink)
                //   theme={{
                //     roundness: 50, // applies to ripple and internal elements
                //   }}
                // />
              )}
            </View>
            <TouchableOpacity
              onPress={SaveData}
              style={[
                tailwind('py-3 mx-5 bg-primary rounded-full  border'),
                {borderColor: '#001a4f'},
              ]}>
              <Text
                style={[
                  tailwind('font-16 text-white text-center font-semi'),
                  {},
                ]}>
                Save
              </Text>
            </TouchableOpacity>
            {visible && (
              <Animated.View
                style={[
                  {
                    opacity: fadeAnim,
                    position: 'absolute',
                    bottom: 10,
                    width: '90%',
                    alignSelf: 'center',
                  },
                ]}>
                <View
                  // onPress={SaveData}
                  style={[
                    tailwind('py-3 mx-5 bg-secondary   rounded-full  border'),
                    {
                      borderColor: '#001a4f',
                      width: '90%',
                      position: 'absolute',
                      bottom: 10,
                    },
                  ]}>
                  <Text
                    style={[
                      tailwind('font-16  text-white text-center font-semi'),
                      {},
                    ]}>
                    {errorToastData}
                  </Text>
                </View>
              </Animated.View>
            )}
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => {
            if (route?.params?.type == 1) {
              EditConfirm(route?.params?.data?.[0]?.product_id);
            } else {
              Confirm();
            }
          }}
          style={[
            tailwind('py-3 mx-5 bg-primary rounded-full mt-5  border'),
            {borderColor: '#001a4f'},
          ]}>
          <Text
            style={[tailwind('font-16 text-white text-center font-semi'), {}]}>
            Save
          </Text>
        </TouchableOpacity>
        <View style={[tailwind('h-20'), {}]} />
      </ScrollView>
    </View>
  );
}
