import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

// How ot use AsyncStorage
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
      // Dispatch an action saying FB login is done
      dispatch({
        type: FACEBOOK_LOGIN_SUCCESS,
        payload: token
      });
    } else {
      // Start up FB Login process
      doFacebookLogin(dispatch);
    }
  } catch (error) {
    console.log('error', error);
    return dispatch({
      type: FACEBOOK_LOGIN_FAIL
    });
  }
};

const doFacebookLogin = async dispatch => {
  try {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('293863351465083', {
      permissions: ['public_profile']
    });

    if (type === 'cancel') {
      return dispatch({
        type: FACEBOOK_LOGIN_FAIL
      });
    }

    await AsyncStorage.setItem('fb_token', token);
    return dispatch({
      type: FACEBOOK_LOGIN_SUCCESS,
      payload: token
    });

  } catch (error) {
    console.log('error login', error);
    return dispatch({
      type: FACEBOOK_LOGIN_FAIL
    });
  }
};

