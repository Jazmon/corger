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
    <View>
      <Text>{children}</Text>
    </View>
  );
}
Card.propTypes = propTypes;

export default Card;
