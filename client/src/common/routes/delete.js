import axios from "axios";

const Delete = async (url, id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api${url}/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default Delete;