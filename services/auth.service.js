import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth } from 'aws-amplify';

const USER_ID = 'userId';
const ID_TOKEN = 'jwtToken';

export let userId;
export let userTokenId;

export async function isAuthenticated() {
  const user_id = await AsyncStorage.getItem(USER_ID);
  const jwtToken = await AsyncStorage.getItem(ID_TOKEN);
  userId = user_id;
  userTokenId = jwtToken;
  return jwtToken && user_id;
}

export async function storeUserDetails() {
  await storeUserToken();
  await storeUserId();
}

export async function googleSignIn() {
  return Auth.federatedSignIn();
}

async function storeUserId() {
  Auth.currentAuthenticatedUser()
  .then(async (userData) => {
      await AsyncStorage.setItem(
          USER_ID,
          userData.attributes.sub
      );
  })
  .catch(() => console.log('Not signed in'));
}

function storeUserToken() {
  Auth.currentAuthenticatedUser()
  .then(async (userData) => {
      await AsyncStorage.setItem(
          ID_TOKEN,
          userData.signInUserSession.idToken.jwtToken
      );
  })
  .catch(() => console.log('Not signed in'));
}


