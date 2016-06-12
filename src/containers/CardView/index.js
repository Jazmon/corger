import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { ToolbarAndroid } from 'react-native-vector-icons/Ionicons';

import styles from './styles';

class CardView extends Component {
  static propTypes = {
    navigator: PropTypes.any,
    onBack: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.onBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          title='foo'
          titleColor='#fff'
          navIconName='md-arrow-back'
          onIconClicked={this.goBack}
          actions={[
            { title: 'Settings', iconName: 'md-settings', iconSize: 30, show: 'always' },
            { title: 'Follow me on Twitter', iconName: 'logo-twitter', iconColor: '#4099ff',
              show: 'always' },
          ]}
          overFlowIconName='more'
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Hello from CardView</Text>
        </View>
      </View>
    );
  }
}

export default CardView;
