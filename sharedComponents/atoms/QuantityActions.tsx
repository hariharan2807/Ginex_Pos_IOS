import React from 'react';
import tailwind from '@tailwind';
import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

interface PropTypes {
  quantity: number;
  initiateIncrement(): any;
  initiateDecrement(): any;
  setOpen:any
}

export default function QuantityActions(props: PropTypes) {
  return (
    <View style={[tailwind('')]}>
      <View
        style={[
          tailwind(`${props.quantity > 0 ? '' : ' bg-white '} rounded-full`),
          props.quantity == 0
            ? {
                backgroundColor: '#001a4f',
                borderColor: '#001a4f',
                borderWidth: 1,
              }
            : {},
        ]}>
        {props.quantity > 0 ? (
          <View
            style={[
              tailwind(
                'flex px-2 rounded-full  py-2 border flex-row items-center',
              ),
              {backgroundColor: '#eef1f6', borderColor: '#001a4f'},
            ]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={props.initiateDecrement}>
              <Icon name="remove" size={20} color="#001a4f" />
            </TouchableOpacity>
            <TouchableOpacity style={[tailwind(''), {}]}
            onPress={()=>{
              props?.setOpen(true)
            }}>
              <Text
                style={[
                  tailwind(
                    `font-semi  
                 px-3 text-primary
                   font-15`,
                  ),
                  {fontWeight: 'bold'},
                ]}>
                {props.quantity}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={props.initiateIncrement}>
              <Icon name="add" size={18} color="#001a4f" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[tailwind('px-6  py-2 rounded-full')]}
            onPress={props.initiateIncrement}>
            <Text
              style={[
                tailwind('uppercase  font-15 text-white'),
                {fontWeight: 'bold', textAlign: 'center'},
              ]}>
              ADD
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

QuantityActions.propTypes = {
  quantity: PropTypes.number,
};
