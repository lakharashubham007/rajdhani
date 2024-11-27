import axios from "axios";
import apis from ".";


export const getStateListApi = async () => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(`${apis.common.getStateList}`,
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