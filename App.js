import React, { Component } from 'react';
import Expo, { Notifications } from 'expo';
import { StyleSheet, View, Alert } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';
import registerForPushNotification from './services/push_notifications';


export default class App extends Component {

  componentDidMount() {
    registerForPushNotification();
    Notifications.addListener((notification) => {

      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok.' }]
        );
      }
    });
  }

  render() {
    const MainNavigator = createBottomTabNavigator({
      welcome: WelcomeScreen,
      auth: AuthScreen,
      main: createBottomTabNavigator({
        map: MapScreen,
        deck: DeckScreen,
        review: createStackNavigator({
          review: ReviewScreen,
          settings: SettingsScreen
        })
      }, {
          navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state;
            let iconName, title;
            if (routeName === 'map') {
              iconName = 'my-location';
              title = 'Map'
            } else if (routeName === 'deck') {
              iconName = 'description';
              title = 'Deck'
            }
            else if (routeName === 'review') {
              iconName = 'favorite';
              title = 'Review'
            }
            return {
              tabBarIcon: ({ tintColor }) => {
                return <Icon name={iconName} size={30} color={tintColor} />
              },
              title,
              tabBarOptions: {
                labelStyle: {
                  fontSize: 12,
                }
              }
            }
          }
        })
    }, {
        navigationOptions: {
          tabBarVisible: false
        },
        lazy: true
      });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
