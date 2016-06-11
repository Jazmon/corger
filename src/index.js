import React, { PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';

import Card from './components/Card';
// import styles from './styles';

const propTypes = {
  // text: PropTypes.string.isRequired,
};

function Main() {
  return (
    <View>
      <Card>Corge</Card>
    </View>
  );
}
Main.propTypes = propTypes;

export default Main;
