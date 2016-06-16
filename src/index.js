import React, { Component, PropTypes } from 'react';

import {
  Navigator,
  BackAndroid,
  ToastAndroid,
 } from 'react-native';

import App from './containers/App';
import CardView from './containers/CardView';

class Main extends Component {

  constructor() {
    super();
    this.renderScene = this.renderScene.bind(this);
    this.navigator = null;
  }

  onComponentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      console.log('added listener');
      return this.onBack();
    });
  }

  onBack() {
    if (this.navigator.getCurrentRoutes().length === 1) return false;
    this.navigator.pop();
    return true;
  }

  renderScene(route, navigator) {
    this.navigator = navigator;
    switch (route.index) {
    case 0:
      return (<App navigator={navigator} onBack={this.onBack} />);
    case 1:
      return (<CardView url={route.url} navigator={navigator} onBack={this.onBack} />);
    default:
      throw Error('unknown scene');
    }
  }

  render() {
    return (
      <Navigator
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
