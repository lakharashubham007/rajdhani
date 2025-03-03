import axios from "axios";
import apis from './index'

export const addFittingDashSizeApi = async (formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
            apis.fittingDashSize.addFittingDashSize,
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

export const getFittingDashSizeApi = async (currentPage,sort,sortValue,searchInputValue) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
      const response = await axios.get(`${apis.fittingDashSize.fittingDashSizeList}?page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:`: ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`,
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

export const deleteFittingDashSizeApi = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.delete(`${apis.fittingDashSize.deleteFittingDashSize}/${id}`,
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

  export const UpdateFittingDashSizeStatus = async (id,formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.patch(`${apis.fittingDashSize.updateFittingDashSizeStatus}/${id}`,
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


export const GetEditFittingDashSizeData = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(`${apis.fittingDashSize.getEditFittingDashSizeData}/${id}`,
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


  export const UpdateFittingDashSize = async (id,formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.patch(`${apis.fittingDashSize.updateFittingDashSize}/${id}`,
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


export const getAllFittingDashSizeApi = async () => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.fittingDashSize.getAllFittingDashSizeList}`,
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

  
