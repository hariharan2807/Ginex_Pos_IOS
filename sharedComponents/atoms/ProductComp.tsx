import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import tailwind from '@tailwind';
import QuantityActions from './QuantityActions';
import {useDispatch, useSelector} from 'react-redux';
import {
  cartItemUniqueIdGen,
  updateItemQuantityAction,
} from '../../workers/utils';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import assets_manifest from '@assets';
import {TextInput} from 'react-native-paper';
import {updateCart} from 'store/actions/userActions';

interface prototype {
  product_price: any;
  key: any;
  whole_sale_price: any;
  whole_sale_price_status: string;
  mrp_price: any;
  mrp_price_status: string;
  product_name: string;
  seq_no: any;
  low_stock_alert: any;
  stock_count: any;
  increment: () => void;
  decrement: () => void;
  product_id: string;
  image: any;
  product_priceindex: any;
  category_id: number;
  product_tax: string;
}
export const ProductComp = (props: prototype) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState('');

  const navigation = useNavigation();
  let CartState = useSelector(state => state.user.cart);
  let [svar, setSvar] = useState(props?.product_priceindex);
  const previeousUid = useRef(null);
  console.log('CartState', CartState);

  const initiateIncrement = useCallback(() => {
    (async () => {
      // console.log("svar----->",svar)
      let uuid = cartItemUniqueIdGen(props.product_id, svar);

      let cartObj = {
        uuid: uuid,
        id: props.product_id,
        variation_id: svar?.product_price_id,
        product_name: props.product_name,
        price: svar?.product_price,
        image: props.image,
        selected_variation: null,
        product_variation_name: svar?.product_variation_unit_name,
        selected_addons: [],
        addons: [],
        variations: svar,
        customisable: false,
        isCombo: false,
        ilo_explorer_status: props?.ilo_explorer_status
          ? props?.ilo_explorer_status
          : 0,
      };
      previeousUid.current = uuid;
      props.increment(Object.freeze(cartObj));
      console.log('cartObj--------->increment', cartObj);
    })();
  }, [CartState]);
  const initiateDecrement = useCallback(() => {
    if (props.customization) {
      let items = CartState.filter(
        item => item.variation_id === svar.product_price_id,
      );
      if (items.length === 1) {
        props.decrement(items[0].uuid);
      } else {
        navigation.navigate('GlobalModalScreen', {
          target: 'blockDecrement',
          title: 'Remove Item from Cart',
          info: 'The Item has Multiple Customizations added. Proceed to Cart to Remove Item ?',
        });
      }
    } else {
      console.log('Decrement');
      let uuid = cartItemUniqueIdGen(props.product_id, svar);

      props.decrement(uuid);
    }
  }, [CartState]);
  const quantity = useSelector(state => {
    // console.log('previeousUid.current', previeousUid.current);
    if (previeousUid.current) {
      let index = state.user.cart.findIndex(
        (item: any) => item.uuid === previeousUid.current,
      );
      //   console.log("index---->if",state.user.cart[index].quantity)

      if (index !== -1) {
        return state.user.cart[index].quantity;
      } else {
        return 0;
      }
    } else {
      let index = state.user.cart.findIndex((item: any) => {
        return item.variation_id == svar?.product_price_id;
      });
      console.log('index---->else', index);
      if (index != -1) {
        return CartState[index].quantity;
      } else {
        return 0;
      }
    }
  });
  useEffect(() => {
    if (open && quantity) {
      setQty(quantity.toString());
    }
  }, [open, quantity]);
  console?.log('quantity', quantity);
  const Data = () => {
    console.log('previeousUid.current', previeousUid.current);
    dispatch(
      updateItemQuantityAction({
        uuid: previeousUid.current,
        quantity: Number(qty),
      }),
    );

    setOpen(false);
  };
  return (
    <View
      key={props?.key}
      style={[tailwind('white-shadow  rounded-xl px-3 py-4 mx-3 mt-3'), {}]}>
      <View style={[tailwind('flex-row'), {}]}>
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
          <View>
            <Text
              style={[
                tailwind('font-bold'),
                {
                  color:
                    props?.low_stock_alert >= props?.stock_count
                      ? 'red'
                      : 'green',
                },
              ]}>
              {props?.seq_no}
            </Text>
          </View>
        </View>
        <View style={[tailwind(''), {flex: 1}]}>
          <Text>{props?.product_name}</Text>
          <View style={[tailwind('flex-row'), {}]}>
            <View style={[tailwind(''), {}]}>
              {props?.mrp_price_status === '1' && props?.mrp_price != 0 && (
                <Text
                  style={[
                    tailwind('mt-1'),
                    {textDecorationLine: 'line-through'},
                  ]}>
                  ₹ {props?.mrp_price}
                </Text>
              )}
              {props?.whole_sale_price_status === '1' &&
              props?.whole_sale_price != 0 ? (
                <Text
                  style={[
                    tailwind('mt-1'),
                    {textDecorationLine: 'line-through'},
                  ]}>
                  ₹ {props?.whole_sale_price}
                </Text>
              ) : (
                <Text style={[tailwind('mt-1')]}>₹ {props?.product_price}</Text>
              )}
            </View>
            <View style={[tailwind(''), {marginLeft: 'auto'}]}>
              <QuantityActions
                initiateIncrement={initiateIncrement}
                initiateDecrement={initiateDecrement}
                quantity={quantity}
                setOpen={setOpen}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={[tailwind('flex-row'), {marginLeft: 'auto'}]}></View>
      <Modal
        backdropOpacity={0.15}
        onBackdropPress={() => setOpen(true)}
        style={[
          tailwind(' h-full items-center justify-center '),
          {backgroundColor: 'transparent'},
        ]}
        isVisible={open}>
        <View
          style={[
            tailwind('rounded-xl   flex'),
            {backgroundColor: '#ffffff', width: '100%'},
          ]}>
          <TouchableOpacity
            onPress={() => {
              setOpen(false);
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
          <View style={[tailwind('px-5  py-3'), {}]}>
            <Text
              style={[
                tailwind('font-16 font-bold '),
                {textTransform: 'capitalize'},
              ]}>
              {props.product_name}
            </Text>
            <TextInput
              mode="outlined"
              label="  Enter Quantity *"
              value={qty}
              onChangeText={txt => {
                setQty(txt);
              }}
              // secureTextEntry={visible}
              style={[
                tailwind('rounded-full bg-white mt-5'),
                {
                  // height: 20,
                  // borderRadius: 50,
                  // backgroundColor: 'white',
                  // marginTop: 20,
                },
              ]}
              outlineColor="#B0B0B0"
              activeOutlineColor="#001a4f"
              theme={{
                roundness: 50, // applies to ripple and internal elements
              }}
            />
            <TouchableOpacity
              onPress={() => Data()}
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
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
