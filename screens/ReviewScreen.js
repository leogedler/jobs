import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Linking, Platform } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    headerRight: (
      <Button
        title="Setting"
        onPress={() => navigation.navigate('settings')}
        backgroundColor="rgba(0,0,0,0)"
        color="rgba(0, 122, 255, 1)"
      />
    ),
    // headerStyle: { marginTop: Platform.OS === 'android' ? 24 : 0 }
  });


  renderLikedJobs() {
    const { likedJobs } = this.props;
    return likedJobs.map(job => {
      const {
        jobkey,
        company,
        formattedRelativeTime,
        url,
        longitude,
        latitude,
        jobtitle
      } = job;
      const initialRegion = {
        longitude: longitude,
        latitude: latitude,
        latitudeDelta: 0.9,
        longitudeDelta: 0.9,
      };
      return (
        <Card title={jobtitle} key={jobkey}>
          <View style={{ height: 200 }}>
            <MapView
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              initialRegion={initialRegion}
            >
            </MapView>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply now"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
});

const mapStateToProps = ({ likedJobs }) => {
  return {
    likedJobs
  }
}

export default connect(mapStateToProps)(ReviewScreen);