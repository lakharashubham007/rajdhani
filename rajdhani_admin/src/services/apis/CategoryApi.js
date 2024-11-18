import axios from "axios";
import apis from './index';

// Function to add a category
export const addCategoryApi = async (formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
           apis.categories.addCategory, // Update endpoint for categories
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, // Uncomment if using authentication
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
};

// Function to get the list of categories
export const getCategoriesApi = async (currentPage,sort,sortValue,searchInputValue) => {
    const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1"); // Use optional chaining
    try {
        const response = await axios.get(`${apis.categories.categoriesList}?page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:`: ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`, 
            // Update API reference to categories
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Use authentication if necessary
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const deleteCategoriesApi = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.delete(`${apis.categories.deleteCategorie}/${id}`,
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

export const GetCategoryById = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(`${apis.categories.getCategoryById}/${id}`,
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
//
export const UpdateCategoryApi = async (id,formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.patch(`${apis.categories.updateCategory}/${id}`,
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

// 

export const UpdateCategoryStatusApi = async (id,formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.patch(`${apis.categories.updateCategoryStatus}/${id}`,
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

export const getAllCategoriesListApi = async () => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1"); // Use optional chaining
  try {
      const response = await axios.get(`${apis.categories.getAllCategoriesListApi}`, 
          // Update API reference to categories
          {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`, // Use authentication if necessary
              },
          }
      );
      return response;
  } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
  }
};

// ............................................................ 
//   Sub Category 
// ............................................................ 


export const addSubCategoryApi = async (formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
           apis.categories.addSubcategory, // Update endpoint for categories
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, // Uncomment if using authentication
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
};


export const GetAllCategoriesApi = async (currentPage,sort,sortValue,searchInputValue) => {
    const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1"); // Use optional chaining
    try {
        const response = await axios.get(`${apis.categories.getAllCategoryList}`, 
            // Update API reference to categories
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Use authentication if necessary
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const getSubCategoriesApi = async (currentPage,sort,sortValue,searchInputValue) => {
    const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1"); // Use optional chaining
    try {
        const response = await axios.get(`${apis.categories.subCategoriesList}?page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:`: ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`, 
            // Update API reference to categories
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Use authentication if necessary
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const deleteSubCategoriesApi = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.delete(`${apis.categories.deleteSubCategorie}/${id}`,
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

export const GetSubCategoryById = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(`${apis.categories.getSubCategoryById}/${id}`,
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
//
export const UpdateSubCategoryApi = async (id,formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.patch(`${apis.categories.updateSubCategory}/${id}`,
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

export const getAllSubCategoriesListApi = async (currentPage,sort,sortValue,searchInputValue) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1"); // Use optional chaining
  try {
      const response = await axios.get(`${apis.categories.getAllSubCategoriesListApi}`, 
          // Update API reference to categories
          {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`, // Use authentication if necessary
              },
          }
      );
      return response;
  } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
  }
};

// ............................................................ 
//   Sub Sub Category 
// ............................................................ 


export const addSubSubCategoryApi = async (formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.post(
           apis.categories.addSubSubcategory, // Update endpoint for categories
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, // Uncomment if using authentication
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
};


export const getSubSubCategoriesApi = async (currentPage,sort,sortValue,searchInputValue) => {
    const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1"); // Use optional chaining
    try {
        const response = await axios.get(`${apis.categories.subSubCategoriesList}?page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:`: ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`, 
            // Update API reference to categories
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Use authentication if necessary
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const deleteSubSubCategoriesApi = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.delete(`${apis.categories.deleteSubSubCategorie}/${id}`,
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

export const GetSubSubCategoryById = async (id) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.get(`${apis.categories.getSubSubCategoryById}/${id}`,
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
//
export const UpdateSubSubCategoryApi = async (id,formData) => {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    try {
        const response = await axios.patch(`${apis.categories.updateSubSubCategory}/${id}`,
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

export const getAllSubSubCategoriesListApi = async () => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1"); 
  try {
      const response = await axios.get(`${apis.categories.getAllSubSubCategoriesListApi}`, 
          {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
              },
          }
      );
      return response;
  } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
  }
};