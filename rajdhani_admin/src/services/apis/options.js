import axios from "axios";
import apis from './index'


export const getAllOptions = async () => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
      const response = await axios.get(`${apis.options.dropwons}`,
      {
        headers: {
          'Content-Type': 'application/json',
        //   Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating facility:", error);
    throw error;
  }
  };


  export const getBaseAddress = async () => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
      const response = await axios.get(`${apis.options.baseAddress}`,
      {
        headers: {
          'Content-Type': 'application/json',
        //   Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating facility:", error);
    throw error;
  }
  };