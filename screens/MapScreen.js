import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MapScreen extends Component {

  // static navigationOptions = {
  //   title: 'Map',
  //   tabBarIcon: ({ tintColor }) => (<Icon name="my-location" size={30} color={tintColor} />)
  // };

  state = {
    region: {
      latitude: 37,
      longitude: -122,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    mapLoaded: false
  }

  componentDidMount() {
    this.setState({ mapLoaded: true })
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onButtonPress = () => {
    const { fetchJobs, navigation } = this.props;
    const { region } = this.state;
    fetchJobs(region, () => {
      navigation.navigate('deck');
    });
  }


  render() {
    const { region, mapLoaded } = this.state;
    if (!mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Search This area"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
});

export default connect(null, actions)(MapScreen);