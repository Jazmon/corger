import React, { PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from './styles';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Card({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
      <View style={styles.imageWrapper}>
        <Text style={styles.emoji}>🐶</Text>
      </View>
    </View>
  );
}
Card.propTypes = propTypes;

export default Card;
