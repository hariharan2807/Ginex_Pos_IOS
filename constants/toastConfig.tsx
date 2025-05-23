import React from 'react';
import {View, Text, Image} from 'react-native';
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import tailwind from '@tailwind';
import assets from '@assets';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      text1NumberOfLines={3}
      style={{borderLeftColor: 'green', borderLeftWidth: 10}}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: 'black',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        opacity: 2,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'Nunito-SemiBold',
        color: 'white',
      }}
      text2Style={{
        fontSize: 12,
        fontWeight: '300',
        color: 'white',
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={3}
      style={{borderLeftColor: 'tomato', borderLeftWidth: 10}}
      contentContainerStyle={{
        // paddingHorizontal: 15,
        paddingVertical: 5,
        // backgroundColor: 'black',
        text1NumberOfLines: 3,
        // borderRadius:10,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        opacity: 2,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'Nunito-SemiBold',
        color: 'white',
      }}
      text2Style={{
        fontSize: 12,
        fontWeight: '300',
        color: 'white',
      }}
    />
  ),
  successMsg: ({text1, ...props}) => (
    <View
      style={{
        // borderColor: 'tomato',
        // borderWidth: 2,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#3B6EB5',
        flex: 1,
        borderRadius: 50,
        // borderLeftColor: '#47d147',
        // borderLeftWidth: 10,
        // borderTopRightRadius: 8,
        // borderBottomRightRadius: 8,
        opacity: 3,
        marginHorizontal: 30,
        paddingRight: 10,
      }}>
      <View style={[tailwind('flex-row items-center pr-10')]}>
        <Image
          source={assets.react_logo}
          style={{
            height: 28,
            width: 28,
            resizeMode: 'contain',
            borderRadius: 50,
          }}
        />
        <Text
          style={[
            tailwind('font-regular font-15 pl-3'),
            {
              fontSize: 15,
              fontWeight: '500',
              fontFamily: 'Nunito-SemiBold',
              color: 'white',
            },
          ]}>
          {text1}
        </Text>
      </View>
    </View>
  ),

  errorMsg: ({text1, ...props}) => (
    <View
      style={{
        // borderColor: 'tomato',
        // borderWidth: 2,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#3B6EB5',
        flex: 1,
        borderRadius: 50,
        // borderLeftColor: 'tomato',
        // borderLeftWidth: 10,
        // borderTopRightRadius: 8,
        // borderBottomRightRadius: 8,
        opacity: 3,
        marginHorizontal: 30,
      }}>
      <View style={[tailwind('flex-row items-center pr-10')]}>
        <Image
          source={assets.react_logo}
          style={{
            height: 28,
            width: 28,
            resizeMode: 'contain',
            borderRadius: 50,
          }}
        />
        <Text
          style={[
            tailwind('font-regular font-15 pl-3 text-center'),
            {
              fontSize: 15,
              fontWeight: '500',
              fontFamily: 'Nunito-SemiBold',
              color: 'white',
            },
          ]}>
          {text1}
        </Text>
      </View>
    </View>
  ),
};
