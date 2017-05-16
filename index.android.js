'user strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var FreeAppItems = require('./components/FreeAppItem')

var ROUTES = {
  free_app_items: FreeAppItems
};

export default class RNPlayground extends Component {
  render() {
    return (
      <View style={styles.container}>
        {
          /**
          todo: shall render a view for displaying both list.
          */
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RNPlayground', () => RNPlayground);
