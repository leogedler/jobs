import React, { Component } from 'react';
import {
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  UIManager
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.4 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Swipe extends Component {

  static defaultProps = {
    onSwipeRight: () => { },
    onSwipeLeft: () => { },
    renderNoMoreCards: () => { }
  };

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });

    const positionDeck = new Animated.ValueXY();

    this.state = { panResponder, position, index: 0, positionDeck };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data){
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    // LayoutAnimation.spring();
  }

  forceSwipe(direction) {
    const { position } = this.state;
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { positionDeck } = this.state;
    const { onSwipeRight, onSwipeLeft, data } = this.props;
    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

    Animated.timing(positionDeck, {
      toValue: { x:0, y: -10 },
      duration: 300
    }).start(() => {
      this.state.position.setValue({ x: 0, y: 0 });
      this.state.positionDeck.setValue({ x: 0, y: 0 });
      this.setState({ index: this.state.index + 1 });
    });
  }

  resetPosition() {
    const { position } = this.state;
    Animated.spring(position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    const { index } = this.state;
    const { data, renderNoMoreCards } = this.props;

    if (index >= data.length) {
      return renderNoMoreCards();
    }

    return this.props.data.map((item, i) => {

      if (i < index) { return null };

      if (i === index) {
        return (
          <Animated.View
            key={item.id}
            style={[this.getCardStyle(), styles.cardStyle, { zIndex: i * -1 }]}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        )
      }
      return (
        <Animated.View
          key={item.id}
          style={[styles.cardStyle, { zIndex: i * -1, top: 10 * (i - index)}]}>
          {this.props.renderCard(item)}
        </Animated.View>
      );
    });
  }

  render() {
    const { positionDeck } = this.state;
    return (
      <Animated.View
        style={positionDeck.getLayout()}>
        {this.renderCards()}
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
});

export default Swipe;