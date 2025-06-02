/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {Node} from 'react';
import type {PropsWithChildren} from 'react';
import {
  LogBox,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import InitialScreen from './Screen/InitialScreen';
import RootNavigation from './navigation/RootNavigation';
import {Provider} from 'react-redux';
import store from './store';
import {QueryClient, QueryClientProvider} from 'react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import tailwind from '@tailwind';
import Toast from 'react-native-toast-message';
import {toastConfig} from './constants/toastConfig';
import { Buffer } from 'buffer';
import 'react-native-gesture-handler';
import 'react-native-reanimated'; // 👈 Must be FIRST import


const queryClient = new QueryClient();

LogBox.ignoreLogs(['Setting a timer']);

// Remove this entirely:


// Or make it actually work as intended:
if (!__DEV__) {
  // Production: Silence logs
  console.log = () => {};
} else {
  // Development: Enhanced logging
  const originalLog = console.log;  // ✅ Capture ORIGINAL early
  console.log = (...args) => {
    originalLog('[Log]', ...args);  // Safe: Calls the REAL console.log
  };
}

global.Buffer = Buffer;

const App: () => Node = () => {
 
  return (
    <GestureHandlerRootView style={[tailwind('flex-1')]}>
      <SafeAreaView style={{flex: 1,backgroundColor:"#001a4f"}}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <RootNavigation />
          </QueryClientProvider>
        </Provider>
        <Toast config={toastConfig} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
