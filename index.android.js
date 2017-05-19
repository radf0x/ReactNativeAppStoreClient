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

import AppStore from './components/views/AppStore'

class ReactNativeAppStoreClient extends Component {
  render() {
    return (
        <AppStore/>
    );
  }
}

AppRegistry.registerComponent('ReactNativeAppStoreClient', () => ReactNativeAppStoreClient);
