import {
  PanResponder,
  Animated,
} from 'react-native';

export function createPanresponder(state) {
  return PanResponder.create({
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

export default createPanresponder;
