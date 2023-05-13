import axios from 'axios';

const uri = 'http://localhost:5000/api/v1/posts';

export const getPosts = async () => {
  try {
    const postResponse = await axios.get(uri, {
      withCredentials: true,
    });
    return postResponse;
  } catch (error) {
    return error.response;
  }
};

export const getPostsById = async () => {
  try {
    const postResponse = await axios.get(`${uri}/user`, {
      withCredentials: true,
    });
    return postResponse;
  } catch (error) {
    return error.response;
  }
};

export const getPost = async id => {
  try {
    const postResponse = await axios.post(
      `${uri}/post`,
      { id },
      {
        withCredentials: true,
      }
    );
    return postResponse;
  } catch (error) {
    return error.response;
  }
};

export const addPost = async post => {
  try {
    const postObject = { ...post, date: new Date() };
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };
    console.log('Sent post object: ', postObject);
    const postResponse = await axios.post(
      `${uri}/post/insert`,
      postObject,
      config
    );
    return postResponse;
  } catch (error) {
    return error.response;
  }
};

export const removePost = async id => {
  try {
    const postResponse = await axios.post(
      `${uri}/user`,
      { id },
      {
        withCredentials: true,
      }
    );
    return postResponse;
  } catch (error) {
    return error.response;
  }
};

export const editPost = async post => {
  try {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };
    const postResponse = await axios.post(`${uri}/user/update`, post, config, {
      withCredentials: true,
    });
    return postResponse;
  } catch (error) {
    return error.response;
  }
};

export const increaseViews = async post_id => {
  try {
    const postResponse = await axios.put(
      `${uri}/post`,
      { post_id },
      {
        withCredentials: true,
      }
    );
    return postResponse;
  } catch (error) {
    return error.response;
  }
};
