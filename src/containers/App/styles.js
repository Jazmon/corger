import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9f9f9f',
    alignSelf: 'stretch',
  },
  cardContainer: {
    flex: 0,
    position: 'absolute',
    left: 50,
    bottom: 150,
  },
});

export default styles;
