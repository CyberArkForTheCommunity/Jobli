import axios from "axios";
import { userTokenId } from "../services/auth.service";
import { BASE_URL } from '../constants';
import { useLinkTo } from '@react-navigation/native';

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use(async function (config) {
  if (userTokenId) {
    config.headers['Authorization'] = `Bearer ${userTokenId}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response;
}, error => {
 if (error?.response?.status === 401) {
  const linkTo = useLinkTo();
  linkTo('LoginScreen');
 }
 return error;
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

async function patch(url, params) {
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