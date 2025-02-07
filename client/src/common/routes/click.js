import axios from "axios";

const Click = async (url, data) => {
  try {
    const response = await axios.post(`https://server-dmu.vercel.app/api${url}`, data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default Click;