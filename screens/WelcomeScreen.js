import React, { Component } from 'react';
import { View } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to Jobs', color: '#03A9F4' },
  { text: 'Use this to get job', color: '#009688'},
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {

  onSlidesComplete = () => {
    const { navigation } = this.props;
    navigation.navigate('auth');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete}/>
      </View>
    )
  }
}

export default WelcomeScreen;
