import axios from "axios";
import apis from './index'

export const addProductApi = async (formData) => {
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
            apis.product.addProduct,
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


export const getProductApi = async (currentPage,sort,sortValue,searchInputValue) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
      const response = await axios.get(`${apis.product.productList}?page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:`: ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`,
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

export const deleteProductApi = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.delete(`${apis.product.deleteProduct}/${id}`,
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

  export const UpdateProductStatus = async (id,formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.patch(`${apis.product.updateProductStatus}/${id}`,
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


export const GetEditProductData = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(`${apis.product.getEditProductData}/${id}`,
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


  export const UpdateProduct = async (id,formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.patch(`${apis.product.updateProduct}/${id}`,
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


export const GetAllProductList = async () => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.product.getAllProductList}`,
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

export const getCountryApi = async () => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
      const response = await axios.get(
          apis.countryStateCity.country,
          {
              headers: {
                  'Content-Type': 'application/json',
              },
          }
      );
      return response;
  } catch (error) {
      console.error("Error creating facility:", error);
      throw error;
  }
};

export const getStateApi = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(
            `${apis.countryStateCity.state}/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error creating facility:", error);
        throw error;
    }
};


export const getCityApi = async ( state_id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(
            `${apis.countryStateCity.city}/${state_id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error creating facility:", error);
        throw error;
    }
};




