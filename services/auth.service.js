import { Auth } from 'aws-amplify';

export let userId;
export let userTokenId;

export async function isAuthenticated() {
  return userTokenId && userId;
}

export async function storeUserDetails() {
  await storeUserToken();
  await storeUserId();
}

export async function googleSignIn() {
  return Auth.federatedSignIn({ provider: 'Google' });
}

// facebook app from server side not connected right now.
export async function facebookSignIn() {
  return Auth.federatedSignIn({ provider: 'Facebook' });
}

async function storeUserId() {
  Auth.currentAuthenticatedUser()
  .then(async (userData) => {
    userId = userData.attributes.sub
  })
  .catch(() => console.log('Not signed in'));
}

function storeUserToken() {
  Auth.currentAuthenticatedUser()
  .then(async (userData) => {
    userTokenId = userData.signInUserSession.idToken.jwtToken
  })
  .catch(() => console.log('Not signed in'));
}


