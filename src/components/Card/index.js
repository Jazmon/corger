import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
} from 'react-native';

import styles from './styles';

class Card extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  constructor(props: Object) {
    super(props);

    this.state = {
      bounce: new Animated.Value(),
      pan: new Animated.ValueXY(),
      clicked: false,
      elevation: 1,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        console.log('onPanResponderGrant');
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.{x,y}0 will be set to zero now
        this.hover(true);
      },
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y,
      }]),
      onPanResponderRelease: (evt, gestureState) => {
        this.hover(false);
        this.setState({
          ...this.state,
          clicked: (Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy < 5)),
        });
        Animated.spring(
          this.state.pan,
          { toValue: { x: 0, y: 0 } }
        ).start();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        this.hover(false);
        Animated.spring(
          this.state.pan,
          { toValue: { x: 0, y: 0 } }
        ).start();
      },
    });

    this.onPressButton = this.onPressButton.bind(this);
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
  }

  onPressButton() {
    this.setState({
      ...this.state,
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
      ...this.state,
      elevation: bool ? 5 : 1,
    });
  }

  render() {
    return (
      <Animated.View
        style={[styles.container, { elevation: this.state.elevation }, { transform: [
          { scale: this.state.bounce }, { translateX: this.state.pan.x },
          { translateY: this.state.pan.y }] }]}
        {...this.panResponder.panHandlers}
      >
        <Text style={styles.text}>{this.props.children}</Text>
        <View style={styles.imageWrapper}>
          <Text style={styles.emoji}>🐶</Text>
        </View>
      </Animated.View>
    );
  }
}

export default Card;
