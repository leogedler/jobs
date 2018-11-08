import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Text } from 'react-native-elements'
import Swipe from '../components/Swipe';
 
class DeckScreen extends Component {
  renderCard(job) {
    return (
      <Card title={job.jobtitle}>
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


  render() {
    const { jobs } = this.props;
    return (
      <View>
        <Swipe 
          data={jobs}
          renderCard={this.renderCard}

        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
})

const mapStateToProps = ({jobs}) => {
  console.log(jobs);
  return { jobs }
}

export default connect(mapStateToProps)(DeckScreen);
