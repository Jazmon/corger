import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from './styles';

import Card from '../../components/Card';

// TODO: connect redux here
class App extends Component {
  // static propTypes = {
  //
  // }

  // constructor() {
  //   super();
  // }

  render() {
    return (
      <View style={styles.container}>
        <Card>Corge</Card>
      </View>
    );
  }
}

export default App;
