/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

const CalendarIcon = () => {
  return (
    <Svg width="23" height="22" viewBox="0 0 23 22" fill="none">
      <Path
        d="M4.34753 7.763H18.785M6.21361 1.83331V3.38038M16.7225 1.83331V3.38019M16.7225 3.38019H6.41003C4.7014 3.38019 3.31628 4.76531 3.31628 6.47394V16.7865C3.31628 18.4952 4.7014 19.8803 6.41003 19.8803H16.7225C18.4312 19.8803 19.8163 18.4952 19.8163 16.7865L19.8163 6.47394C19.8163 4.76531 18.4312 3.38019 16.7225 3.38019ZM10.535 12.4037L12.0819 10.8568V16.013M12.0819 16.013H10.535M12.0819 16.013H13.6288"
        stroke="#E0E0E0"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CalendarIcon;
