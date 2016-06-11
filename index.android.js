/**
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  View,
} from 'react-native';

import Main from './src';

function Corger() {
  return (
    <View>
      <Main />
    </View>
  );
}

AppRegistry.registerComponent('Corger', () => Corger);
