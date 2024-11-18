import React, { useState, useRef, useEffect } from "react";
import {
  Row,
  Col,
  Dropdown,
  Button,
  Modal,
  Container,
  Card,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import {
  addCuisinesApi,
  getCuisinesApi,
} from "../../../services/apis/cuisinesApi";
import Loader from "../../components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/css/brand.css";
import Swal from "sweetalert2";
import { Toaster } from "../../components/Toaster/Toster";
import uplodIcon from "../../../assets/images/upload-icon.png";
import {
  addBrandsApi,
  deleteBrandsApi,
  getBrandsApi,
  GetEditBrandData,
  UpdateBrand,
  UpdateBrandStatus,
} from "../../../services/apis/BrandApi";
import Switch from "react-switch";
import ReactPaginate from "react-paginate";
import {
  addCategoryApi,
  addSubCategoryApi,
  deleteCategoriesApi,
  deleteSubCategoriesApi,
  GetAllCategoriesApi,
  getAllCategoriesListApi,
  getAllSubCategoriesListApi,
  getAllSubSubCategoriesListApi,
  getCategoriesApi,
  GetCategoryById,
  getSubCategoriesApi,
  GetSubCategoryById,
  UpdateCategory,
  UpdateCategoryApi,
  UpdateCategoryStatusApi,
  UpdateSubCategoryApi,
  UpdateSubCategoryStatusApi,
} from "../../../services/apis/CategoryApi";
import moment from "moment";
import Select from "react-select";
import { addFittingSizeApi, deleteFittingSizeApi, getAllFittingSizeListApi, GetEditFittingSizeData, getFittingSizeApi, UpdateFittingSize, UpdateFittingSizeStatus } from "../../../services/apis/FittingSize";
import { addMaterialApi, deleteMaterialApi, GetEditMaterialData, getMaterialsApi, UpdateMaterial, UpdateMaterialStatus } from "../../../services/apis/Materials";
import { getAllThreadListApi } from "../../../services/apis/Thread";
import { addVariantApi, deleteVariantApi, GetEditVariantData, getVariantApi, UpdateVariant, UpdateVariantStatus } from "../../../services/apis/Variants";
import DeleteWarningMdl from "../../components/common/DeleteWarningMdl";

const theadData = [
  { heading: "S.No.", sortingVale: "sno" },
  { heading: "Id", sortingVale: "_id" },
  { heading: "Name", sortingVale: "name" },
  // { heading: "VariantCode", sortingVale: "variantCode" },
  // { heading: "Description", sortingVale: "description" },
  { heading: "Created At", sortingVale: "created_at" },
  { heading: "Action", sortingVale: "action" },
];

const Variants = () => {
  const [sort, setSortata] = useState(10);
  const [loading, setLoading] = useState(false);
  const [modalCentered, setModalCentered] = useState(false);
  const [logo, setLogo] = useState(null);
  const [data, setData] = useState(
    document.querySelectorAll("#holidayList tbody tr")
  );
  const [formData, setFormData] = useState({
   name:"",
  //  variantCode:"",
   variantType:"",
  //  description:""
  });
  const [UpdateCategory, setUpdateCategory] = useState(false);
  const [variantsList, setVariantsList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [iconData, setIconDate] = useState({ complete: false, ind: Number });
  const [error, setErrors] = useState(null); // To manage the error state
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDeleteMdl,setShowDeleteMdl]=useState(false);
  const [deleteTableDataId,setDeleteTableDataId] = useState("");
  
  const [allFittingSizeList,setAllFittingSizeList]=useState([]);
  const [allThreadList,setAllThreadList]=useState([]);
  const [allCategoryList,setAllCategoryList]=useState([]);
  const [allSubCategoryList,setAllSubCategoryList]=useState([]);
  const [allSubSubCategoryList,setAllSubSubCategoryList]=useState([]);

  const resetForm = () => {
    setFormData({
      name:"",
      // variantCode:"",
      variantType:"",
      // description:""
    });
    setLogo(null); // Reset the displayed image
    setErrors({}); // Clear errors
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    // if (!formData.variantCode) newErrors.variantCode = "VariantCode is required.";
    if (!formData.variantType) newErrors.variantType = "VariantType is required.";
    // if (!formData.description) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Dynamically update the field (name, etc.)
    });
    setErrors({
      ...error,
      name: "",
    });
  };

//   getSubCategoriesApi
  const fetchVariants=async(sortValue)=>{
        // Set loading to true when the API call starts
        setLoading(true);
        try {
          const res = await getVariantApi(
            currentPage,
            sort,
            sortValue,
            searchInputValue
          );
    
          setVariantsList(res?.data);

          setUpdateCategory(false);
        } catch (error) {
          // Catch and handle errors
          console.error("Error fetching cuisines:", error);
          Toaster.error("Failed to load cuisines. Please try again.");
        } finally {
          // Always set loading to false when the API call is done (whether successful or failed)
          setLoading(false);
        }
  }

  const fetchFittingSizeList=async()=>{
    setLoading(true);
    try {
      const res = await getAllFittingSizeListApi();
      
      console.log("FittingList",res)
    //   setAllFittingSizeList(res?.data)
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
}

const fetchAllThreadListApi=async()=>{
    setLoading(true);
    try {
      const res = await getAllThreadListApi();
      console.log("fetchAllThreadListApi",res)
    //   setAllThreadList(res?.data)
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
}


const fetchAllCategoryList=async()=>{
    setLoading(true);
    try {
      const res = await getAllCategoriesListApi();
      console.log("fetchAllCategoryList",res)
    //   setAllCategoryList(res?.data);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
}


const fetchAllSubCategoryList=async()=>{
    setLoading(true);
    try {
      const res = await getAllSubCategoriesListApi();
      console.log("fetchAllSubCategoryList",res)
    //   setAllSubCategoryList(res?.data)
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
}

const fetchAllSubSubCategoryList=async()=>{
    setLoading(true);
    try {
      const res = await getAllSubSubCategoriesListApi();
      console.log("fetchAllSubSubCategoryList",res)
    //  setAllSubSubCategoryList(res?.data)
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
}

  useEffect(()=>{
    // fetchFittingSizeList();
    // fetchAllThreadListApi();
    // fetchAllCategoryList();
    // fetchAllSubCategoryList();
    // fetchAllSubSubCategoryList();
   },[]);

  useEffect(() => {
    fetchVariants();
  }, [UpdateCategory, currentPage, sort, searchInputValue]);

  const handleUpdateSubmit = async () => {
    try {
      const res = await UpdateVariant(editCategoryId, formData);
      if (res.status === 200) {
        setUpdateCategory(true);
        Toaster.success(res?.data?.message);
        resetForm();
        setModalCentered(false);
        setIsEdit(false);
  
        fetchVariants();
        setSelectedOption(null)
      } else {
        Toaster.error(
          res?.data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      Toaster.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error("Error:", error.message);
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  const handleSubmit = async () => {

    if (!validateForm()) {
      return; // If validation fails, do not proceed further
    }
    if (isEdit) {
      handleUpdateSubmit();
    } else {
      setLoading(true); // Start the loader
      try {
        const res = await addVariantApi(formData);
        if (res.status === 200) {
          setUpdateCategory(true);
          Toaster.success(res?.data?.message); // Display success message
          resetForm();
          setModalCentered(false); // Close modal if necessary
          setSelectedOption(null)
        } else {
          // Handle any non-200 response cases
          Toaster.error(
            res?.data?.message || "Something went wrong. Please try again."
          );
        }
      } catch (error) {
        // If there's an error in the request itself (network error, timeout, etc.)
        Toaster.error(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
        console.error("Error:", error.message);
      } finally {
        setLoading(false); // Stop the loader
      }
    }
  };

  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };

  useEffect(() => {
    setData(document.querySelectorAll("#holidayList tbody tr"));
  }, [test]);

  activePag.current === 0 && chageData(0, sort);

  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };

  function SotingData(name, ind) {

    if (iconData.complete) {
      const sortValue = { value: name, type: "asc" };
      fetchVariants(sortValue);
    } else {
      const sortValue = { value: name, type: "dsc" };
      fetchVariants(sortValue);
    }
  }

  const handleEditVariant = async (id) => {
    try {
      const res = await GetEditVariantData(id);
      if (res?.data?.success) {
        const data = res?.data?.variant;
 
        setEditCategoryId(data?._id);
        setFormData({
          name: data?.name,
          variantType:data?.variantType,
          // variantCode: data?.variantCode,
          // description:data?.description
        }); 
        // setModalCentered(true);
        setIsEdit(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteVariant=(id)=>{
    setDeleteTableDataId(id);
    setShowDeleteMdl(true)
  }

  const handleDeleteSubmit=async() => {
    try {
      const res = await deleteVariantApi(deleteTableDataId);
      //   console.log("response",res);
      if (res.status === 200) {
        Toaster.success(res?.data?.message); // Display success message
        fetchVariants();
        setDeleteTableDataId("");
        setShowDeleteMdl(false);
      } else {
        Toaster.error(
          res?.data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChange =async (FittingSizeId, currentStatus) => {
    const fdata={
      isActive:!currentStatus
    }
    try{
        const res =await UpdateVariantStatus(FittingSizeId,fdata);
        if (res.status === 200) {
         Toaster.success(res?.data?.message); // Display success message
         fetchVariants()
      } else {
        Toaster.error(res?.data?.message || "Something went wrong. Please try again.");
      }
     }catch(err){
       console.log(err)
     }
    
    // console.log("newStatus",newStatus)
  };


  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleAddNewBrand = () => {
    setModalCentered(true);
    setIsEdit(false);
    setEditCategoryId("");
    resetForm();
    setSelectedOption(null)
  };

  return (
    <>
      <DeleteWarningMdl title={"table data"} showDeleteMdl={showDeleteMdl} setShowDeleteMdl={setShowDeleteMdl} 
       setDeleteTableDataId={setDeleteTableDataId} handleDeleteSubmit={handleDeleteSubmit}/>
      
      <ToastContainer />
      <Loader visible={loading} />
      <PageTitle
        activeMenu={"Variants"}
        motherMenu={"Home"}
        motherMenuLink={"/dashboard"}
      />

            {/* SECTION 3RD Restaurant Info*/}
            <div className="col-xl-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Variant</h4>
                    </div>
                    <div className="card-body">
                    <div>
                      <div className="mb-3 row mt-3">                  
                        <div className="col-sm-4">
                          <label className="col-sm-3 col-form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData?.name}
                            className="form-control"
                            placeholder="Name"
                            onChange={handleInputChange}
                          />
                          {error?.name && (
                            <span className="text-danger fs-12">
                              {error?.name}
                            </span>
                          )}
                        </div>

                        {/* <div className="col-sm-4">
                          <label className="col-sm-3 col-form-label">
                           VariantCode
                          </label>
                          <input
                            type="text"
                            name="variantCode"
                            value={formData?.variantCode}
                            className="form-control"
                            placeholder="VariantCode"
                            onChange={handleInputChange}
                          />
                          {error?.variantCode && (
                            <span className="text-danger fs-12">
                              {error?.variantCode}
                            </span>
                          )}
                        </div> */}
                        <div className="col-sm-4">
                          <label className="col-sm-3 col-form-label">
                           VariantType
                          </label>
                          <input
                            type="text"
                            name="variantType"
                            value={formData?.variantType}
                            className="form-control"
                            placeholder="VariantType"
                            onChange={handleInputChange}
                          />
                          {error?.variantType && (
                            <span className="text-danger fs-12">
                              {error?.variantType}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* <div className="mb-3 row mt-3">
                        <div className="col-sm-4">
                          <label className="col-sm-3 col-form-label">
                            VariantQrCode
                          </label>
                          <input
                            type="text"
                            name="variantQrCode"
                            value={formData?.variantQrCode}
                            className="form-control"
                            placeholder="VariantQrCode"
                            onChange={handleInputChange}
                          />
                          {error?.variantQrCode && (
                            <span className="text-danger fs-12">
                              {error?.variantQrCode}
                            </span>
                          )}
                        </div>
                         
                        <div className="col-sm-4">
                          <label className="col-form-label"> Fitting Size </label>
                          <Select
                            defaultValue={selectedOption}
                            value={selectedOption}
                            onChange={(option) => {
                              setSelectedOption(option);
                              setFormData({
                                ...formData,
                                category_id:option.value,
                              });
                            }}
                            options={allFittingSizeList}
                            style={{
                              lineHeight: "40px",
                              color: "#7e7e7e",
                              paddingLeft: " 15px",
                            }}
                          />
                        </div>
                        
  
                        <div className="col-sm-4">
                          <label className="col-form-label"> Thread </label>
                          <Select
                            defaultValue={selectedOption}
                            value={selectedOption}
                            onChange={(option) => {
                              setSelectedOption(option);
                              setFormData({
                                ...formData,
                                category_id:option.value,
                              });
                            }}
                            options={allThreadList}
                            style={{
                              lineHeight: "40px",
                              color: "#7e7e7e",
                              paddingLeft: " 15px",
                            }}
                          />
                        </div>
                        </div> */}

                        {/* <div className="mb-3 row mt-3">
                          <div className="col-sm-4">
                          <label className="col-form-label"> Category </label>
                          <Select
                            defaultValue={selectedOption}
                            value={selectedOption}
                            onChange={(option) => {
                              setSelectedOption(option);
                              setFormData({
                                ...formData,
                                category_id:option.value,
                              });

                              // Clear the category error if there was one
                            //   if (error.category_id) {
                            //     setErrors((prevError) => ({
                            //       ...prevError,
                            //       category_id: "",
                            //     }));
                            //   }
                            }}
                            // options={allCategoryList}
                            style={{
                              lineHeight: "40px",
                              color: "#7e7e7e",
                              paddingLeft: " 15px",
                            }}
                          />
                        </div>
                        
                        <div className="col-sm-4">
                          <label className="col-form-label">Sub Category </label>
                          <Select
                            defaultValue={selectedOption}
                            value={selectedOption}
                            onChange={(option) => {
                              setSelectedOption(option);
                              setFormData({
                                ...formData,
                                variantSubCategoryId:option.value,
                              });

                            }}
                            // options={drpCategoryList}
                            style={{
                              lineHeight: "40px",
                              color: "#7e7e7e",
                              paddingLeft: " 15px",
                            }}
                          />
                        </div>

                        <div className="col-sm-4">
                          <label className="col-form-label">Sub Sub Category </label>
                          <Select
                            defaultValue={selectedOption}
                            value={selectedOption}
                            onChange={(option) => {
                              setSelectedOption(option);
                              setFormData({
                                ...formData,
                                variantSubCategoryId:option.value,
                              });
                            }}
                            // options={drpCategoryList}
                            style={{
                              lineHeight: "40px",
                              color: "#7e7e7e",
                              paddingLeft: " 15px",
                            }}
                          />
                        </div>
                        </div> */}

                        {/* <div className="mb-3 row mt-3">
                        <div className="col-sm-4">
                            <label className="col-sm-3 col-form-label">
                               Description
                            </label>
                            <textarea
                                name="description"
                                className="form-control"
                                rows="6"
                                id="comment"
                                placeholder="Ex: House#94  Road#8  Abc City"
                                value={formData.description}
                                onChange={handleInputChange}
                            ></textarea>
                            {error?.description && <span className="text-danger fs-12">{error?.description}</span>}
                        </div>
                        </div> */}
                    </div>
                    </div>
                    <div className="text-end p-3">
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary rounded-sm">Submit</button>
                    </div>
                </div>
            </div>

      <Row>
        <Col lg={12}>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Variant List</h4>
              {/* <Link to={"/add-staff"} className="btn btn-primary">+ Add New</Link> */}
              {/* <Button
                variant="primary"
                type="button"
                className="mb-2 me-2"
                onClick={handleAddNewBrand}
              >
                + Add New Sub Category
              </Button> */}
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <div id="holidayList" className="dataTables_wrapper no-footer">
                  <div className="justify-content-between d-sm-flex">
                    <div className="dataTables_length">
                      <label className="d-flex align-items-center">
                        Show
                        <Dropdown className="search-drop">
                          <Dropdown.Toggle as="div" className="search-drop-btn">
                            {sort}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSortata("2")}>
                              2
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortata("5")}>
                              5
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortata("10")}>
                              10
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortata("15")}>
                              15
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortata("20")}>
                              20
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        entries
                      </label>
                    </div>
                    <div className="dataTables_filter">
                      <label>
                        Search :
                        <input
                          type="search"
                          className=""
                          placeholder=""
                          onChange={(e) => setSearchInputValue(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                  <table
                    id="example4"
                    className="display dataTable no-footer w-100"
                  >
                    <thead>
                      <tr>
                        {theadData?.map((item, ind) => {
                          return (
                            <th
                              key={ind}
                              onClick={() => {
                                SotingData(item?.sortingVale, ind);
                                setIconDate((prevState) => ({
                                  complete: !prevState.complete,
                                  ind: ind,
                                }));
                              }}
                            >
                              {item.heading}
                              <span>
                                {ind !== iconData.ind && (
                                  <i
                                    className="fa fa-sort ms-2 fs-12"
                                    style={{ opacity: "0.3" }}
                                  />
                                )}
                                {ind === iconData.ind &&
                                  (iconData.complete ? (
                                    <i
                                      className="fa fa-arrow-down ms-2 fs-12"
                                      style={{ opacity: "0.7" }}
                                    />
                                  ) : (
                                    <i
                                      className="fa fa-arrow-up ms-2 fs-12"
                                      style={{ opacity: "0.7" }}
                                    />
                                  ))}
                              </span>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {variantsList?.variants?.map((data, ind) => (
                        <tr key={ind}>
                          <td>
                            <strong>{ind + 1}</strong>
                          </td>
                          <td>{data?._id}</td>
                          
                          <td className="d-flex align-items-center gap-2">
                            {data?.name}
                          </td>
                          {/* <td className="">
                            {data?.variantCode}
                          </td> */}
{/* 
                          <td className="">
                            {data?.description}
                          </td> */}

                          <td>
                            {moment(data?.created_at).format("DD MMM YYYY, h:mm:ss a")}
                          </td>
                          <td> 
                           <Switch
                            checked={data?.status} 
                            onChange={() => handleStatusChange(data?._id, data?.status)} 
                            offColor="#f0f1ff" 
                            onColor="#6a73fa"
                            offHandleColor="#6a73fa"
                            onHandleColor="#fff"
                            uncheckedIcon={false}
                            checkedIcon={false}
                            width={40}  // Adjust width of the switch
                            height={20} // Adjust height of the switch
                           />
                          </td>
                          <td>
                            <button
                              className="btn btn-xs sharp btn-primary me-1"
                              onClick={() => handleEditVariant(data?._id)}
                            >
                              <i className="fa fa-pencil" />
                            </button>
                            <button
                              className="btn btn-xs sharp btn-danger"
                              onClick={() => handleDeleteVariant(data?._id)}
                            >
                              <i className="fa fa-trash" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div>
                    {/* {brandList?.data?.length < brandList?.total && ( */}
                    <div className="d-sm-flex text-center justify-content-end align-items-center mt-3">
                      <div className="pagination-container">
                        <ReactPaginate
                          pageCount={Math.ceil(
                            variantsList?.totalVariants /
                              variantsList?.rowsPerPage
                          )}
                          pageRangeDisplayed={1}
                          marginPagesDisplayed={2}
                          onPageChange={handlePageClick}
                          containerClassName="pagination"
                          activeClassName="selected"
                          disabledClassName="disabled"
                        />
                      </div>
                    </div>
                    {/* )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Modal --> */}
          <Modal
            className="fade"
            show={modalCentered}
            onHide={setModalCentered}
            centered>
            <Modal.Header>
              <Modal.Title>
                {isEdit ? "Edit Sub Category" : "+ Add New Sub Category"}
              </Modal.Title>
              <Button
                onClick={() => {
                  setModalCentered(false);
                  resetForm();
                  setIsEdit(false);
                }}
                variant=""
                className="btn-close"
              ></Button>
            </Modal.Header>
            <Modal.Body>
              <div className="col-xl-12 col-lg-12 ">
                <div className="card">
                  <div className="card-body">
                    <div>
                      <div className="mb-3 row mt-3">
                        <div className="col-sm-12">
                          <label className="col-sm-3 col-form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData?.name}
                            className="form-control"
                            placeholder="New Sub Category"
                            onChange={handleInputChange}
                          />
                          {error?.name && (
                            <span className="text-danger fs-12">
                              {error?.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  setModalCentered(false);
                  resetForm();
                  setIsEdit(false);
                }}
                variant="danger light">
                Close
              </Button>
              <Button
                onClick={() => {
                  handleSubmit();
                }}
                variant="primary">
                Save changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </>
  );
};

export default Variants;
