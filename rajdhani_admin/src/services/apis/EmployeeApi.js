import axios from "axios";
import apis from './index'

export const employeeCreateApi = async (formdata) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  
  try {
    const response = await axios.post(
      apis.employee.createEmployee,
      formdata,  // Send the FormData object
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct content type for multipart
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
};


export const getEmployeesApi = async () => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(
            apis.employee.employeeList,
      {
        headers: {
          'Content-Type': 'application/json',
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
