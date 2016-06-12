import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
} from 'react-native';

import styles from './styles';

class Card extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    elevation: PropTypes.number,
    bottom: PropTypes.number,
  }
  constructor(props: Object) {
    super(props);

    this.state = {
      bounce: new Animated.Value(),
      pan: new Animated.ValueXY(),
      clicked: false,
      elevation: this.props.elevation || 1,
      url: this.generateUrl(),
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => this.hover(true),
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y,
      }]),
      onPanResponderRelease: (evt, gestureState) => {
        this.hover(false);
        this.setState({
          clicked: (Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy < 5)),
          panEndX: gestureState.dx,
          panEndY: gestureState.dy,
        });
        Animated.spring(
          this.state.pan,
          { toValue: { x: 0, y: 0 } }
        ).start();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.hover(false);
        Animated.spring(
          this.state.pan,
          { toValue: { x: 0, y: 0 } }
        ).start();
      },
    });
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

    // TODO: transition here to another view
  }

  hover(bool: Boolean) {
    this.setState({
      elevation: bool ? 5 : this.props.elevation || 1,
    });
  }

  floatAway(right: Boolean) {
    Animated.timing(
      this.state.pan.x,
      { toValue: right ? 350 : -350 }
    ).start();
  }

  generateUrl() {
    return `http://loremflickr.com/246/185/corgi?random=${Math.random() * 10}`;
  }

  render() {
    return (
      <Animated.View
        style={[styles.container, { bottom: this.props.bottom, elevation: this.state.elevation },
          { transform: [{ scale: this.state.bounce }, { translateX: this.state.pan.x },
          { translateY: this.state.pan.y },
          { rotateZ: this.state.pan.x.interpolate({ inputRange: [-100, 100],
            outputRange: ['-10deg', '10deg'] }) }] }]}
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
