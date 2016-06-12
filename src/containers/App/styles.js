import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#EEEEEE',
  },
  cardContainer: {
    position: 'absolute',
    left: 50,
    bottom: 150,
  },
  toolbar: {
    backgroundColor: '#FF5722',
    height: 56,
    elevation: 6,
  },
});

export default styles;
