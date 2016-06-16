import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { ToolbarAndroid } from 'react-native-vector-icons/Ionicons';

import styles from './styles';

class CardView extends Component {
  static propTypes = {
    navigator: PropTypes.any,
    onBack: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
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
          <Image
            style={styles.image}
            source={{ uri: this.props.url }}
            width={246}
            height={185}
          />
        </View>
      </View>
    );
  }
}

export default CardView;
