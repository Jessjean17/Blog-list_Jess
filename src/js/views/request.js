import axios from 'axios';
import { config } from 'dotenv';

config();

const headers = {
  Authorization: `Bearer ${process.env.API_KEY}`
};

const axiosRequest = async (route, param) => {
  try {
    return await axios({
      url: param
        ? `${process.env.URL}/${route}/${param}`
        : `${process.env.URL}/${route}`,
      headers
    });
  } catch (err) {
    return err;
  }
};

export default axiosRequest;
