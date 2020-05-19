
import 'react-native-gesture-handler';
import React from 'react';
import {YellowBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';

// import MainNavigatorA or MainNavigatorB to preview design differnces
import MainNavigator from './src/navigation/MainNavigatorA';
import { createStore, combineReducers,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import ReduxThunk from 'redux-thunk';

import UserReducer from './src/store/Reducers/userReducer';

enableScreens();

// TODO: Remove when fixed
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended',
]);


const rootReducer = combineReducers({
    users:UserReducer
  });

// APP
function App() {
  
  return (
    <SafeAreaProvider>
     <MainNavigator/>
     </SafeAreaProvider>
  );
}

export default App;
