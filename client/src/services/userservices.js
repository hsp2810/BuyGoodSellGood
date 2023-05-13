import axios from 'axios';

const uri = 'http://localhost:5000/api/v1/user';

export const editUser = async user => {
  try {
    const userResponse = await axios.post(`${uri}/personalinformation`, user, {
      withCredentials: true,
    });
    return userResponse;
  } catch (error) {
    return error.resposne;
  }
};

export const deactivateUser = async user_id => {
  try {
    const userResponse = await axios.post(
      `${uri}/deactivate`,
      { user_id },
      {
        withCredentials: true,
      }
    );
    return userResponse;
  } catch (error) {
    return error.resposne;
  }
};
