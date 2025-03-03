import axios from "axios";
import apis from './index'

export const addHoseDashSizeApi = async (formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
            apis.hoseDashSize.addHoseDashSize,
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

export const getHoseDashSizeApi = async (currentPage,sort,sortValue,searchInputValue) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
      const response = await axios.get(`${apis.hoseDashSize.hoseDashSizeList}?page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:`: ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`,
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

export const deleteHoseDashSizeApi = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.delete(`${apis.hoseDashSize.deleteHoseDashSize}/${id}`,
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

  export const UpdateHoseDashSizeStatus = async (id,formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.patch(`${apis.hoseDashSize.updateHoseDashSizeStatus}/${id}`,
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


export const GetEditHoseDashSizeData = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(`${apis.hoseDashSize.getEditHoseDashSizeData}/${id}`,
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


  export const UpdateHoseDashSize = async (id,formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.patch(`${apis.hoseDashSize.updateHoseDashSize}/${id}`,
            formData,
      {
        headers: {
          'Content-Type': 'application/json',
        //   "Content-Type": "multipart/form-data",
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


export const getAllHoseDashSizeApi = async () => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.hoseDashSize.getAllHoseDashSizeList}`,
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

  
