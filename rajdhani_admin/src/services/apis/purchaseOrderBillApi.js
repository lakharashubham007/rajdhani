import axios from "axios";
import apis from './index'

export const addBillDetailsApi = async (formData) => {
  const form = new FormData();

  for (const key in formData) {
    if (key !== 'bill_doc' && key !== 'bill_doc' && formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
      form.append(key, formData[key]);
    }
  }
  if (formData.image) {
    form.append("bill_doc", formData.image);
  }

  formData?.bill_doc?.forEach((file) => {
    form.append("bill_doc", file);
  });
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
            apis.purchaseorder.addBillDetails,
            form,
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


export const updatePoItemForBillsApi = async (id,formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.put(`${apis.purchaseorder.updatePOItems}/${id}`,
            formData,
      {
        headers: {
          'Content-Type': 'application/json',
          //"Content-Type": "multipart/form-data",
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

export const createBillItemsApi = async (formData) => {
    console.log("formdata in addBrandsApi", formData)
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
            apis.purchaseorder.createBillItems,
            formData,
      {
        headers: {
          'Content-Type': 'application/json',
          // "Content-Type": "multipart/form-data",
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


  export const getReturnOrderListApi = async (currentPage,sort,sortValue,searchInputValue) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(`${apis.purchaseorder.returnOrderList}?page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:`: ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`,
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

  export const GetReturnOrderViewData = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
      const response = await axios.get(`${apis.purchaseorder.getReturnOrderViewData}/${id}`,
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
  
  export const GetBillViewById = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
      const response = await axios.get(`${apis.purchaseorder.getBillViewbyId}/${id}`,
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

  export const DownloadBill = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
      const response = await axios.get(`${apis.purchaseorder.downloadBill}/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      }
    );
    // console.log("ressssss",response)
    return response;
    } catch (error) {
      console.error("Error creating facility:", error);
      throw error;
    }
  };
  