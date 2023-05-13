import axios from 'axios';

const uri = 'http://localhost:5000/api/v1/posts/user/saved';

export const savePost = async input => {
  try {
    const saveResponse = await axios.post(`${uri}/insert`, input, {
      withCredentials: true,
    });
    return saveResponse;
  } catch (error) {
    return error.response;
  }
};

export const fetchPostsByUserID = async user_id => {
  try {
    const fetchResponse = await axios.post(
      `${uri}/fetch`,
      { user_id },
      { withCredentials: true }
    );
    return fetchResponse;
  } catch (error) {
    return error.response;
  }
};

export const unsavePost = async input => {
  try {
    const fetchResponse = await axios.post(`${uri}/remove`, input, {
      withCredentials: true,
    });
    return fetchResponse;
  } catch (error) {
    return error.response;
  }
};
