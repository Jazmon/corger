import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StatusBar,
  DrawerLayoutAndroid,
  Linking,
  TouchableNativeFeedback,
} from 'react-native';
import { ToolbarAndroid } from 'react-native-vector-icons/Ionicons';

import styles from './styles';

import Card from '../../components/Card';

const cards = [];
for (let i = 0; i < 5; i++) {
  cards.push({ title: `Corge ${i + 1}`, url: null, index: i });
}

// TODO: connect redux here
class App extends Component {
  static propTypes = {
    navigator: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false,
    };

    this.actions = [
      { title: 'Settings', iconName: 'md-settings', iconSize: 30, show: 'always' },
      { title: 'Follow me on Twitter', iconName: 'logo-twitter',
        iconColor: '#4099ff', show: 'always', twitterUri: 'twitter://user?user_id=59417944',
        url: 'https://twitter.com/attehuhtakangas' },
    ];

    this.navItems = [
      { title: 'Foo' },
      { title: 'Bar' },
      { title: 'Baz' },
    ];

    this.changeView = this.changeView.bind(this);
    this.doAction = this.doAction.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.renderNavigationView = this.renderNavigationView.bind(this);
  }

  changeView() {
    this.props.navigator.push({
      index: 1,
    });
  }

  doAction(index) {
    if (index === 1) {
      const { twitterUri, url } = this.actions[index];
      Linking.canOpenURL(twitterUri).then(supported => {
        if (!supported) {
          Linking.openURL(url);
        } else {
          Linking.openURL(twitterUri);
        }
      });
    }
  }

  openDrawer() {
    if (!this.state.drawerOpen) {
      this.drawerLayoutAndroid.openDrawer();
      this.setState({
        drawerOpen: true,
      });
    } else {
      this.drawerLayoutAndroid.closeDrawer();
      this.setState({
        drawerOpen: false,
      });
    }
  }

  /* eslint-disable new-cap */
  renderNavigationView() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', elevation: 7 }}>
        {this.navItems.map((item, index) =>
          <TouchableNativeFeedback
            key={index}
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#82B1FF')}
          >
            <View>
              <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>{item.title}</Text>
            </View>
          </TouchableNativeFeedback>
        )}
      </View>
    );
  }
  /* eslint-enable new-cap */
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#BF360C'
          barStyle='light-content'
        />
        <ToolbarAndroid
          style={styles.toolbar}
          title='Corger'
          titleColor='#fff'
          navIconName='md-menu'
          onIconClicked={this.openDrawer}
          actions={this.actions}
          onActionSelected={this.doAction}
          overFlowIconName='more'
        />
        <DrawerLayoutAndroid
          ref={(drawerLayoutAndroid) => { this.drawerLayoutAndroid = drawerLayoutAndroid; }}
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.left}
          renderNavigationView={this.renderNavigationView}
        >
          <View style={styles.cardContainer}>
            {cards.map((card, i) =>
              <Card
                key={card.index}
                elevation={i}
                bottom={(i || 1) * 5}
                onPress={this.changeView}
              >
                {card.title}
              </Card>)
            }
          </View>
        </DrawerLayoutAndroid>
      </View>
    );
  }
}

export default App;
