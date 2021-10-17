import base64 from 'react-native-base64'
import { userTokenId } from './auth.service';
import { post } from './api.service';

export const UserType = {
  JOB_SEEKER: 'job_seeker'
}

export async function getUserType() {
  console.log('getUserType')
  console.log(userTokenId)
  if (userTokenId) {
    let results = userTokenId.split('.');
    results = results[1];
    console.log(results.length)

    console.log(results)

    results = base64.decode(results);

    console.log(results)
    console.log(typeof results)

    // not working, getting error on this line
    const userObject = JSON.parse(results);
    console.log(userObject)
    
    console.log('getUserType', userObject['custom:user_type'])

    return userObject['custom:user_type'];
  }
}

export async function isJobSeeker() {
  if (userTokenId) {
    let results = userTokenId.split('.');
    results = results[1];
    results = base64.decode(results);
    return results.indexOf(UserType.JOB_SEEKER) > -1
  }
}

export async function updateUserType() {
  return post('/api/users/type', { user_type: userType }).then(res => {
    if (userType === 'job_seeker') {
        navigation.replace('יצירת פרופיל מחפש עבודה');
    } else if (userType === 'employer') {
        navigation.navigate('יצירת פרופיל מעסיק');
    }
  });
}

