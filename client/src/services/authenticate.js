import axios from 'axios';

const api = 'http://localhost:5000/api/v1/auth';

export const login = async loginUser => {
  try {
    const loginResponse = await axios.post(`${api}/login`, loginUser, {
      withCredentials: true,
    });
    return loginResponse;
  } catch (error) {
    return error.response;
  }
};

export const register = async registerUser => {
  try {
    const registerResponse = await axios.post(`${api}/register`, registerUser);
    return registerResponse;
  } catch (error) {
    return error.response;
  }
};

export const authenticate = async endpoint => {
  try {
    const authResponse = await axios.get(`${api}${endpoint}`, {
      withCredentials: true,
    });
    return authResponse;
  } catch (error) {
    return error.response;
  }
};

export const logout = async () => {
  try {
    const logoutResponse = await axios.post(
      `${api}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return logoutResponse;
  } catch (error) {
    return error.response;
  }
};
