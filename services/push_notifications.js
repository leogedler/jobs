import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  try {
    let previoustoken = await AsyncStorage.getItem('pushtoken');
    console.log('TOKEN', previoustoken);
    if (previoustoken) {
    } else {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)

      if (existingStatus !== 'granted') {
        return;
      }
      
      let token = await Notifications.getExpoPushTokenAsync();
      await axios.post(PUSH_ENDPOINT, { token: { token } });
      await AsyncStorage.setItem('pushtoken', token);
    }
  } catch (error) {
    console.log('error', error);
  }

};
