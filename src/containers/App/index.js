import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';

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

    this.changeView = this.changeView.bind(this);
  }
  changeView() {
    this.props.navigator.push({
      index: 1,
    });
  }

  render() {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}

export default App;
