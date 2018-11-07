import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {

  renderLastSlide(index) {
    const { data, onComplete } = this.props;
    if (index === data.length - 1) {
      return (
        <Button
          title="Onwards!"
          raised
          buttonStyle={styles.burronsStyle}
          onPress={onComplete}
        />
      )
    }
  }

  renderSlides() {
    const { data } = this.props;
    return data.map((slide, i) => {

      return (
        <View key={slide.text} style={[styles.slide, { backgroundColor: slide.color }]}>
          <Text style={styles.slideText}>{slide.text}</Text>
          {this.renderLastSlide(i)}
        </View>
      )
    });
  }
  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
      >
        {this.renderSlides()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  slideText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  burronsStyle: {
    backgroundColor: '#0288D1',
    marginTop: 40
  }
});

export default Slides;