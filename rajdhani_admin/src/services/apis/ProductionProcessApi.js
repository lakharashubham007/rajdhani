import axios from "axios";
import apis from './index'

export const SearchProductionSheetApi = async (query) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.prodcutionProcess.searchProductionSheets}`,
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

export const GetAllItemsBySelectedSheet = async (id) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.prodcutionProcess.getAllSelectedSheetItemsBySheetId}/${id}`,
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

export const GetProductionProcessDetailsBySheetId = async (id) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.prodcutionProcess.GetProcessBySelectedSheetId}/${id}`,
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

export const addProductionProcessDetails = async (formData) => {
  console.log("formdata in addBrandsApi", formData)
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.post(
      apis.prodcutionProcess.addProductionProcessDetails,
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

export const getProductionProcessDetails = async (formData) => {
  console.log("formdata in addBrandsApi", formData)
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.post(
      apis.prodcutionProcess.addProductionProcessDetails,
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

export const addProductionProcessItems = async (formData) => {
  console.log("formdata in addBrandsApi", formData)
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.post(
      apis.prodcutionProcess.addProductionProcessItems,
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

export const addProductionProcessLog = async (formData) => {
  console.log("formdata in addBrandsApi", formData)
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.post(
      apis.prodcutionProcess.addProductionProcessLog,
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

// startHoseCuttingProcess
export const startHoseCuttingProcess = async (id) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.patch(`${apis.prodcutionProcess.startHoseCuttingProcess}/${id}`,
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

// endHoseCuttingProcess
export const endHoseCuttingProcess = async (id) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.patch(`${apis.prodcutionProcess.endHoseCuttingProcess}/${id}`,
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


export const GetProductionProcessItemsByProductionID = async (productionProcessID, currentPage, sort, sortValue, searchInputValue) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.prodcutionProcess.getItemsByProductionId}?production_process_id=${productionProcessID}&page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:` : ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`,
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

export const getProductionProcessLogDetailsApi = async (production_process_id, currentPage, sort, sortValue, searchInputValue) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.prodcutionProcess.getProductionProcessLogDetails}?productionProcessID=${production_process_id}&page=${currentPage}&limit=${sort}&sort=${sortValue?.value ? `${sortValue?.value}:` : ""}${sortValue?.type ? sortValue?.type : ""}&search=${searchInputValue}`,
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

//updateProductionProcessItemsApi
export const updateProductionProcessItemsApi = async (formData) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.post(
      apis.prodcutionProcess.updateProductionProcessItems,
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

//getLineNumberOptionsApi
export const getLineNumberOptionsApi = async () => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.options.lineNumbers}`,
      {
        headers: {
          'Content-Type': 'application/json',
          //   Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating facility:", error);
    throw error;
  }
};

//getAllOperatorsListApi
export const getAllOperatorsListApi = async () => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get(`${apis.operator.getAllOperatorsList}`,
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

//addProductionProcessItemLogsApi
export const addProductionProcessItemLogsApi = async (formData) => {
  console.log("formdata in addBrandsApi", formData)
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.post(
      apis.prodcutionProcess.addProductionProcessItemsLogs,
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

export const getProductionProcessItemLogsByItemAndStageApi = async (itemId, stage) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

  try {
    const response = await axios.get(
      `${apis.prodcutionProcess.getProductionProcessItemLogsByItemAndStage}?item_id=${itemId}&stage=${encodeURIComponent(stage)}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("❌ Error fetching item stage logs:", error);
    throw error;
  }
};


// startSkivingProcess
export const startSkivingProcessApi = async (id) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.patch(`${apis.prodcutionProcess.startSkivingProcess}/${id}`,
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

// End Skiving process
export const endSkivingProcessApi = async (id) => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.patch(`${apis.prodcutionProcess.endSkivingProcess}/${id}`,
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

//updateSkivingStatusApi Applicable or Non Applicable
export const updateSkivingStatusApi = async (payload) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

  try {
    const response = await axios.post(
      `${apis.prodcutionProcess.updateSkivingStatus}`, // e.g., /api/production-process/skiving-status
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating skiving status:", error);
    throw error;
  }
};

//startPreAssemblyProcessApi
export const startPreAssemblyProcessApi = async (id) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.patch(`${apis.prodcutionProcess.startPreAssemblyProcess}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error("Error starting Pre-Assembly process:", error);
    throw error;
  }
};

export const endPreAssemblyProcessApi = async (id) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.patch(`${apis.prodcutionProcess.endPreAssemblyProcess}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error("Error ending Pre-Assembly process:", error);
    throw error;
  }
};


//startCrimpingProcessApi
export const startCrimpingProcessApi = async (id) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.patch(`${apis.prodcutionProcess.startCrimpingProcess}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error("Error starting Crimping process:", error);
    throw error;
  }
};

export const endCrimpingProcessApi = async (id) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.patch(`${apis.prodcutionProcess.endCrimpingProcess}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error("Error ending Crimping process:", error);
    throw error;
  }
};

//startTestingProcessApi
export const startTestingProcessApi = async (id) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.patch(`${apis.prodcutionProcess.startTestingProcess}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error("Error starting Testing process:", error);
    throw error;
  }
};

export const endTestingProcessApi = async (id) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.patch(`${apis.prodcutionProcess.endTestingProcess}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error("Error ending Testing process:", error);
    throw error;
  }
};

//startPackingProcessApi
export const startPackingProcessApi = async (id) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.patch(`${apis.prodcutionProcess.startPackingProcess}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error("Error starting Packing process:", error);
    throw error;
  }
};

export const endPackingProcessApi = async (id) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.patch(`${apis.prodcutionProcess.endPackingProcess}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    console.error("Error ending Packing process:", error);
    throw error;
  }
};

export const pauseProductionProcessApi = async (formData) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.post(
      apis.prodcutionProcess.pauseProductionProcess, // ✅ Add this endpoint in your `apis.js`
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
    console.error("❌ Error pausing production process:", error);
    throw error;
  }
};

export const resumeProductionProcessApi = async (formData) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.post(
      apis.prodcutionProcess.resumeProductionProcess, // ✅ Add this in your `apis.js`
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
    console.error("❌ Error resuming production process:", error);
    throw error;
  }
};

export const stopProductionProcessApi = async (formData) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.post(
      apis.prodcutionProcess.stopProductionProcess, // ✅ Define in `apis.js`
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
    console.error("❌ Error stopping production process:", error);
    throw error;
  }
};



