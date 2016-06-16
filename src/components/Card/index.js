import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
} from 'react-native';

import styles from './styles';
import { createPanresponder } from './panresponder';

class Card extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    elevation: PropTypes.number,
    bottom: PropTypes.number,
    onPress: PropTypes.func,
  }

  static DefaultProps = {
    elevation: 1,
    bottom: 0,
  }

  constructor(props: Object) {
    super(props);

    this.state = {
      bounce: new Animated.Value(),
      pan: new Animated.ValueXY(),
      clicked: false,
      elevation: this.props.elevation,
      url: this.generateUrl(),
    };

    this.panResponder = createPanresponder.call(this);
  }

  componentWillMount() {
    this.state.bounce.setValue(2);

    Animated.spring(
      this.state.bounce,
      { toValue: 1, friction: 3 }
    ).start();
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.clicked && nextState.clicked) {
      this.onPressButton();
    }

    if (nextState.panEndX && Math.abs(nextState.panEndX) > 100) {
      this.floatAway(nextState.panEndX > 0);
    }
  }

  onPressButton() {
    this.setState({
      clicked: false,
    });
    // eslint-disable-next-line no-underscore-dangle
    const value = this.state.bounce._value === 1 ? 4 : 1;

    Animated.spring(
      this.state.bounce,
      { toValue: value, friction: 5 }
    ).start();

    if (this.props.onPress) this.props.onPress(this.state.url);
    this.state.bounce.setValue(1);
    this.state.pan.setValue({ x: 0, y: 0 });
  }

  getCardStyle() {
    const transform = [{
      scale: this.state.bounce,
    }, {
      translateX: this.state.pan.x,
    }, {
      translateY: this.state.pan.y,
    }, {
      rotateZ: this.state.pan.x.interpolate({
        inputRange: [-100, 100],
        outputRange: ['-10deg', '10deg'],
      }),
    }];

    return {
      bottom: this.props.bottom,
      elevation: this.state.elevation,
      transform,
    };
  }

  generateUrl() {
    return `http://loremflickr.com/246/185/corgi?random=${Math.random() * 10}`;
  }

  floatAway(right: Boolean) {
    Animated.timing(
      this.state.pan.x,
      { toValue: right ? 350 : -350 }
    ).start();
  }

  hover(bool: Boolean) {
    const elev = this.props.elevation + 5;
    this.setState({
      elevation: bool ? elev : this.props.elevation,
    });
  }

  render() {
    return (
      <Animated.View
        style={[styles.container, this.getCardStyle()]}
        {...this.panResponder.panHandlers}
      >
        <Text style={styles.text}>{this.props.children}</Text>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{ uri: this.state.url }}
            width={246}
            height={185}
          />
        </View>
      </Animated.View>
    );
  }
}

export default Card;
