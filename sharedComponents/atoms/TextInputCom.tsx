import tailwind from '@tailwind';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import React from 'react';
interface prototype {
  setText: any;
  text: any;
  title: string;
}
export const TextInputCom = (props: prototype) => {
  return (
    <View style={[tailwind(''), {flex: 1}]}>
      <TextInput
        mode="outlined"
        label={`   ${props?.title}`}
        onChangeText={txt => props?.setText(txt)}
        value={props?.text}
        numberOfLines={1}
        placeholderTextColor="black"
        keyboardType="number-pad"
        style={[
          tailwind('text-black font-16 font-bold'),
          {
            borderRadius: 50,
            backgroundColor: 'white', // Optional: ensure background doesn't override border radius
          },
        ]}
        autoFocus={true}
        outlineColor="#B0B0B0" // gray when not focused
        activeOutlineColor="#001a4f" // pink when focused (e.g., hot pink)
        theme={{
          roundness: 50, // applies to ripple and internal elements
        }}
      />
    </View>
  );
};
