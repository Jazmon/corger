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
    <Main />
  );
}

AppRegistry.registerComponent('Corger', () => Corger);
