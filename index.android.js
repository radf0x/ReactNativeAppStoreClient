/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  View,
} from 'react-native';

import FreeAppItem from './components/models/FreeAppItem'

class ReactNativeAppStoreClient extends Component {
  render() {
    return (
      <View>
        <FreeAppItem/>
      </View>
    );
  }
}

AppRegistry.registerComponent('ReactNativeAppStoreClient', () => ReactNativeAppStoreClient);
