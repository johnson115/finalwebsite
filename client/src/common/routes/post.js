import axios from "axios";

const Post = async (url, data) => {
  try {
    const response = await axios.post(`http://localhost:5000/api${url}`, data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default Post;