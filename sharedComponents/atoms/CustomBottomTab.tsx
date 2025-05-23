import React, {useEffect, useState} from 'react';
import {Keyboard, Text, TouchableOpacity, View} from 'react-native';
import {
  AccountFocusIcon,
  AccountIcon,
  CartFocusIcon,
  CartIcon,
  DashBoard,
  DashBoardFill,
  SearchFocusIcon,
  SearchIcon,
} from '../../asset/icons';
import tailwind from '../../tailwind';

export default function CustomBottomTab({state, descriptors, navigation}: any) {
  const [showTab, setShowTab] = useState(true);
  const [cart, setCart] = useState([]);

  //   const CartState = useSelector(state => state.user.cart);

  useEffect(() => {
    let show = Keyboard.addListener('keyboardDidShow', () => {
      setShowTab(false);
    });
    let close = Keyboard.addListener('keyboardDidHide', () => {
      setShowTab(true);
    });
    return () => {
      show.remove();
      close.remove();
    };
  }, []);

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  // if (focusedOptions.tabBarVisible === false) {
  //     return null;
  // }
  if (showTab === false) {
    return null;
  }

  return (
    <View style={tailwind('flex flex-row bg-white items-center')}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // console.log(route);
            try {
              navigation.navigate(route.state.routeNames[0]);
            } catch {
              navigation.navigate(route.name);
            }
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{flex: 1}}>
            <View
              style={[
                tailwind(
                  'flex flex-col justify-center  items-center py-3 relative',
                ),
                {backgroundColor: 'white', borderColor: 'lightgray'},
              ]}>
              {index === 0 ? (
                isFocused ? (
                  <View>
                    <DashBoardFill />
                    {/* <HomeIconFocus /> */}
                  </View>
                ) : (
                  <View>
                    <DashBoard />
                    {/* <HomeIcon /> */}
                  </View>
                )
              ) : index === 1 ? (
                isFocused ? (
                  <View>
                    <SearchFocusIcon />
                  </View>
                ) : (
                  <View>
                    <SearchIcon />
                  </View>
                )
              ) : index === 3 ? (
                isFocused ? (
                  <View>
                    <CartFocusIcon />
                  </View>
                ) : (
                  <View>
                    <CartIcon />
                  </View>
                )
              ) : index === 2 ? (
                isFocused ? (
                  <View>
                    <AccountFocusIcon />
                  </View>
                ) : (
                  <View>
                    <AccountIcon />
                  </View>
                )
              ) : null}
              <Text
                style={[
                  tailwind(`text-white pt-1 text-xs font-bold font-15`),
                  {color: `${isFocused ? '#49A600' : '#7B7B7B'}`},
                ]}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
