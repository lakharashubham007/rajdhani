import axios from "axios";
import apis from './index';

// ✅ Create Operator
export const createOperatorApi = async (formData) => {
  const form = new FormData();

  // Append all fields except image and gallery
  const appendFormData = (data, parentKey = "") => {
    for (const key in data) {
      if (
        data[key] !== null &&
        data[key] !== undefined &&
        data[key] !== "" &&
        key !== "image" &&
        key !== "gallery"
      ) {
        const fieldKey = parentKey ? `${parentKey}[${key}]` : key;

        if (typeof data[key] === "object" && !(data[key] instanceof File)) {
          appendFormData(data[key], fieldKey); // recursive for nested objects
        } else {
          form.append(fieldKey, data[key]);
        }
      }
    }
  };

  appendFormData(formData);

  if (formData.image) {
    form.append("image", formData.image);
  }

  if (formData.gallery && Array.isArray(formData.gallery)) {
    formData.gallery.forEach((file) => {
      if (file) form.append("gallery", file);
    });
  }

  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

  try {
    const response = await axios.post(apis.operator.createOperator, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating OPERATOR:", error);
    throw error;
  }
};

// ✅ Get Operator List (Paginated, Sorted, Search)
export const getOperatorListApi = async (currentPage, sort, sortValue, searchInputValue) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(
      `${apis.operator.getOperatorList}?page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:` : ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching operator list:", error);
    throw error;
  }
};

// ✅ Get All Operators (No pagination)
export const getAllOperatorListApi = async () => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.operator.getAllOperators}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching all operators:", error);
    throw error;
  }
};

// ✅ Search Operator
export const searchOperatorApi = async (query) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.operator.searchOperator}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: { query },
    });
    return response;
  } catch (error) {
    console.error("Error searching operator:", error);
    throw error;
  }
};
