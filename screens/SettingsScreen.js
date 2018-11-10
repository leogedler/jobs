import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SettingsScreen extends Component {

  clearLikedJobs = () => {
    const { clearLikedJobs, navigation } = this.props;
    clearLikedJobs();
    navigation.navigate('map');
  }

  render() {
    return (
      <View style={{ marginTop: 30 }}>
        <Button
          title="Reset Liked Jobs"
          icon={{ name: 'delete-forever' }}
          backgroundColor="#F44336"
          onPress={this.clearLikedJobs}
        />
      </View>
    )
  }
}

export default connect(null, actions)(SettingsScreen);