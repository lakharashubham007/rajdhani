import axios from "axios";
import apis from './index'

//verify-so

export const verifySalesOrderApi = async (formData) => {
  console.log("formdata in addBrandsApi", formData)
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
      const response = await axios.post(
          apis.salesorders.verifySO,
          formData,
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

export const addSalesOrderApi = async (formData) => {
    console.log("formdata in addBrandsApi", formData)
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
            apis.salesorders.addSalesOrder,
            formData,
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

export const createSOItemApi = async (formData) => {
  console.log("formdata in createSOItemApi", formData)
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
      const response = await axios.post(
          apis.salesorders.createSOItem,
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

export const getSaleOrdersApi = async (currentPage,sort,sortValue,searchInputValue) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
      const response = await axios.get(`${apis.salesorders.SOList}?page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:`: ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`,
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

//fetchSaleOrderViewData
export const GetSaleOrderViewData = async (id) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.salesorders.getSaleOrderViewData}/${id}`,
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
//GetPurchaseOrderItemsData
export const GetSaleOrderItemsData = async (id) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.salesorders.getSaleOrderItemsData}/${id}`,
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


export const verifyItemsInSalesOrderApi = async (formData) => {
  console.log("Sending verification payload:", formData);

  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

  try {
    const response = await axios.post(
      apis.salesorders.veridySOITems,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error verifying sales order:", error);
    throw error;
  }
};


export const verifyBySOApi = async (formData) => {

  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

  try {
    const response = await axios.post(
      apis.salesorders.verifyBySO,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error verifying sales order:", error);
    throw error;
  }
};


//sell orders by customer id
export const saleOrdersByCustomerIdApi = async (id) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.salesorders.saleOrderByCustomerId}/${id}`,
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


//sell orders by customer id
export const saleOrderItemsBySOIdApi = async (id) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.salesorders.saleOrderItemsBySOId}/${id}`,
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

