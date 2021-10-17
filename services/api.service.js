import axios from "axios";
import { userTokenId } from "../services/auth.service";
import { BASE_URL } from '../constants';
import { NavigationContext } from '@react-navigation/native';

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use(async function (config) {
  if (userTokenId) {
    config.headers['Authorization'] = `Bearer ${userTokenId}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    const navigation = React.useContext(NavigationContext);
    navigation.replace('LoginScreen');
  } else {
      return Promise.reject(error);
  }
});


async function get(url, config) {
  try {
    const response = await axios.get(url, config);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

async function post(url, data, config) {
  try {
    const response = await axios.post(url, data, config);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

async function put(url, data, config) {
  try {
    const response = await axios.put(url, data, config)
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

async function patch(url, params: any) {
  try {
    const response = await axios.patch(url, data, config);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteMethod(url, config) {
  try {
    const response = await axios.delete(url, config);
  } catch (e) {
    throw new Error(e);
  }
}

export { get, post, put, patch, deleteMethod };