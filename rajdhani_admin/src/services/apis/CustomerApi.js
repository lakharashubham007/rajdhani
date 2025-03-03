import axios from "axios";
import apis from './index'

export const createCustomerApi = async (formData) => {
    const form = new FormData();

    for (const key in formData) {
      if (key !== 'image' && key !== 'gallery' && formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
        form.append(key, formData[key]);
      }
    }
    if (formData.image) {
      form.append("image", formData.image);
    }

    formData?.gallery?.forEach((file) => {
      form.append("gallery", file);
    });
   
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
            apis.customer.addCustomer,
            form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating PRODUCT:", error);
    throw error;
  }
};


export const getCustomerListApi = async (currentPage,sort,sortValue,searchInputValue) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(`${apis.customer.getCustomerList}?page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:`: ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`,
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


  
export const getAllCusotmerListApi = async () => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(`${apis.customer.getAllCustomers}`,
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