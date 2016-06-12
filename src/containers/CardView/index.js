import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';

class CardView extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello from CardView</Text>
      </View>
    )
  }
}

export default CardView;
