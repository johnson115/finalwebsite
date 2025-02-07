import axios from "axios";

const Delete = async (url, id) => {
  try {
    const response = await axios.delete(`https://server-dmu.vercel.app/api${url}/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default Delete;