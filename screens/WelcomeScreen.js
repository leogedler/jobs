import _ from 'lodash';
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to Jobs', color: '#03A9F4' },
  { text: 'Use this to get job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {

  state = {
    token: null
  }

  async componentWillMount() {
    const { navigation } = this.props;
    try {
      let token = AsyncStorage.getItem('fb_token');
      if (token) {
        navigation.navigate('map');
        this.setState({ token });
      } else {
        this.setState({ token: false });
      }

    } catch (error) {
      console.log('error', error)
    }
  }

  onSlidesComplete = () => {
    const { navigation } = this.props;
    navigation.navigate('auth');
  }

  render() {

    if (_.isNull(this.state.token)) {
      return <AppLoading />
    }

    return (
      <View style={{ flex: 1 }}>
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
      </View>
    )
  }
}

export default WelcomeScreen;
