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


export const getProductApi = async (currentPage,sort,sortValue,searchInputValue,productTypes = []) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
      const response = await axios.get(`${apis.product.productList}?page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:`: ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}&productTypes=${productTypes?.join(",")}`,
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

  //single prodcut details when user scan qr code
  export const GetProductDetailsQrScannerApi = async (id) => {
    // const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(`${apis.product.getEditProductDetails}/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
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
        const response = await axios.patch(`${apis.product.updateProduct}/${id}`,
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

export const SearchProductsApi = async (query) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.product.searchProductForSuggestions}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: { query }, 
    }
  );
  return response;
} catch (error) {
  console.error("Error creating facility:", error);
  throw error;
}
};


// Function to search for similar products across different brands
export const SearchSimilarProductsApi = async (fittingCode) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

  try {
    const response = await axios.get(
      `${apis.product.searchSimilarProducts}`, // Replace with actual API endpoint
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: { fittingCode }, // Pass fitting code as query parameter
      }
    );
    return response.data; // Return response data
  } catch (error) {
    console.error("Error fetching similar products:", error);
    throw error;
  }
};

// Function to search for similar products across different brands
export const SearchSimilarHoseAssemblyApi = async (product_code) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

  try {
    const response = await axios.get(
      `${apis.product.searchSimilarHoseAssembly}`, // Replace with actual API endpoint
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: { product_code }, // Pass fitting code as query parameter
      }
    );
    return response.data; // Return response data
  } catch (error) {
    console.error("Error fetching similar products:", error);
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


// utils/api.js or wherever your API functions are
export const generateQrCodeForProduct = async (productId) => {
  // const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

  try {
    const response = await axios.get(`${apis.product.generateQr}/${productId}`, {
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
};





