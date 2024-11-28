import axios from "axios";
import apis from './index'

export const addBillDetailsApi = async (formData) => {
    console.log("formdata in addBrandsApi", formData)
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
            apis.purchaseorder.addBillDetails,
            formData,
      {
        headers: {
          // 'Content-Type': 'application/json',
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating facility:", error);
    throw error;
  }
};
