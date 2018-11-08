import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {

  componentDidMount() {
    const { facebookLogin } = this.props;
    facebookLogin();
    // AsyncStorage.removeItem('fb_token');
  }

  componentWillReceiveProps(nextProps){
    this.onAuthComplete(nextProps);
  }

  onAuthComplete({token, navigation}){
    if (token)  {
      navigation.navigate('map');
    }
  }

  render() {
    return (
      <View />
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { token: auth.token }
}

export default connect(mapStateToProps, actions)(AuthScreen);