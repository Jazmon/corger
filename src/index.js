import React, { Component, PropTypes } from 'react';

import { Navigator } from 'react-native';

import App from './containers/App';
import CardView from './containers/CardView';

class Main extends Component {
  renderScene(route, navigator) {
    switch (route.index) {
    case 0:
      return (<App navigator={navigator} />);
    case 1:
      return (<CardView navigator={navigator} />);
    default:
      throw Error('unknown scene');
    }
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ name: 'app', index: 0 }}
        renderScene={(route, nav) => this.renderScene(route, nav)}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FadeAndroid;
        }}
      />
    );
  }
}

export default Main;
