import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Text, Button, Icon } from 'react-native-elements'
import * as actions from '../actions';
import Swipe from '../components/Swipe';

class DeckScreen extends Component {

  // static navigationOptions = {
  //   title: 'Jobs',
  //   tabBarIcon: ({ tintColor }) => (<Icon name="description" size={30} color={tintColor} />)
  // };


  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.9,
      longitudeDelta: 0.9,
    };
    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
          >
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>
          {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    const { navigation } = this.props;
    return (
      <Card title="No More Jobs">
        <Button
          title="Back To Map"
          large
          icon={{ name: 'my-location' }}
          backgroundColor="#03A9F4"
          onPress={()=> navigation.navigate('map')}
        />
      </Card>
    );
  }

  render() {
    const { jobs, likeJob } = this.props;    
    return (
      <View style={{ marginTop: 30 }}>
        <Swipe
          indexKey={'jobkey'}
          data={jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => likeJob(job)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10
  }
})

const mapStateToProps = ({ jobs }) => {
  return { jobs }
}

export default connect(mapStateToProps, actions)(DeckScreen);
