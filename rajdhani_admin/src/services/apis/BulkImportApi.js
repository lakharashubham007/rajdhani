import axios from "axios";
import apis from './index';

export const bulkImportApi = async (data) => {
  
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  const formData = new FormData();
  formData.append("file", data);
  try {
    const response = await axios.post(
      apis.bulkImport.addData, // Assuming you have this defined in your `apis` file
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error in bulk import:", error);
    throw error;
  }
};
