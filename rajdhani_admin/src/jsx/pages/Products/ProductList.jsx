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
import { Toaster } from "../../components/Toaster/Toster";
import Switch from "react-switch";
import ReactPaginate from "react-paginate";

import moment from "moment";
import Select from "react-select";
import { addFittingSizeApi, deleteFittingSizeApi, GetEditFittingSizeData, getFittingSizeApi, UpdateFittingSize,
   UpdateFittingSizeStatus } from "../../../services/apis/FittingSize";
import { addThreadApi, deleteThreadApi, GetEditThreadData, getThreadApi, UpdateThread, UpdateThreadStatus } from "../../../services/apis/Thread";
import { deleteProductApi, getProductApi, UpdateProductStatus } from "../../../services/apis/Product";
import DeleteWarningMdl from "../../components/common/DeleteWarningMdl";

const theadData = [
  { heading: "S.No.", sortingVale: "sno" },
  { heading: "Id", sortingVale: "_id" },
  { heading: "Name", sortingVale: "name" },
  { heading: "Type", sortingVale: "product_Type" },
  { heading: "Created At", sortingVale: "created_at" },
  { heading: "Action", sortingVale: "action" },
];

const AllProductList = () => {
  const [sort, setSortata] = useState(10);
  const [loading, setLoading] = useState(false);
  const [modalCentered, setModalCentered] = useState(false);
  const [logo, setLogo] = useState(null);
  const [data, setData] = useState(
    document.querySelectorAll("#holidayList tbody tr")
  );
  const [formData, setFormData] = useState({
    threadSize:"",
    threadType:"",
    measurementUnit:""
  });
  const [UpdateCategory, setUpdateCategory] = useState(false);
  const [productList, setProductList] = useState([]);
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

  const resetForm = () => {
    setFormData({
      threadSize:"",
      threadType:"",
      measurementUnit:""
    });
    setLogo(null); // Reset the displayed image
    setErrors({}); // Clear errors
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.threadSize) newErrors.threadSize = "ThreadSize is required.";
    // if (!formData.threadType) newErrors.threadType = "ThreadType is required.";
    if (!formData.measurementUnit) newErrors.measurementUnit = "MeasurementUnit is required.";
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
      name:"",
    });
  };

//   getSubCategoriesApi
  const fetchProductList=async(sortValue)=>{
        // Set loading to true when the API call starts
        setLoading(true);
        try {
          const res = await getProductApi(
            currentPage,
            sort,
            sortValue,
            searchInputValue
          );
    
          setProductList(res.data);

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

  useEffect(() => {
    fetchProductList();
  }, [UpdateCategory, currentPage, sort, searchInputValue]);

  const handleUpdateSubmit = async () => {
    try {
      const res = await UpdateThread(editCategoryId, formData);
      if (res.status === 200) {
        setUpdateCategory(true);
        Toaster.success(res?.data?.message);
        resetForm();
        setModalCentered(false);
        setIsEdit(false);
  
        fetchProductList();
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
        const res = await addThreadApi(formData);
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
      fetchProductList(sortValue);
    } else {
      const sortValue = { value: name, type: "dsc" };
      fetchProductList(sortValue);
    }
  }

  const handleEditThread = async (id) => {
    try {
      const res = await GetEditThreadData(id);
      if (res?.data?.success) {
        const data = res?.data?.thread;
        setEditCategoryId(data?._id);
        setFormData({
          threadSize:data?.threadSize,
          threadType:data?.threadType,
          measurementUnit:data?.measurementUnit,
        }); 
        // setModalCentered(true);
        setIsEdit(true);
  
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteProduct=(id)=>{
    setDeleteTableDataId(id);
    setShowDeleteMdl(true)
  }

  const handleDeleteSubmit = async () => {
    try {
      const res = await deleteProductApi(deleteTableDataId);
      //   console.log("response",res);
      if (res.status === 200) {
        Toaster.success(res?.data?.message); // Display success message
        fetchProductList();
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

  const handleStatusChange =async (ProductId, currentStatus) => {
    const fdata={
      status:!currentStatus
    }
    try{
        const res =await UpdateProductStatus(ProductId,fdata);
        if (res.status === 200) {
         Toaster.success(res?.data?.message); // Display success message
         fetchProductList()
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
        activeMenu={"Products"}
        motherMenu={"Home"}
        motherMenuLink={"/dashboard"}
      />

      <Row>
        <Col lg={12}>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Product List</h4>
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

                  <table id="example4" className="display dataTable no-footer w-100">
                    <thead>
                      <tr>
                        {theadData?.map((item, ind) => {
                          return (
                            <th key={ind}
                              onClick={() => {
                                SotingData(item?.sortingVale, ind);
                                setIconDate((prevState) => ({
                                  complete: !prevState.complete,
                                  ind: ind,
                                }));
                              }}>
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
                      {productList?.products?.map((data, ind) => (
                        <tr key={ind}>
                          <td>
                            <strong>{ind + 1}</strong>
                          </td>
                          <td>{data?._id}</td>
                          
                          <td className="d-flex align-items-center gap-2">
                            {data?.name}
                          </td>
                          
                          <td className="">
                            {data?.product_Type}
                          </td>
                      
                          <td>
                            {moment(data?.created_at).format(
                              "DD MMM YYYY, h:mm:ss a"
                            )}
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
                            <button className="btn btn-xs sharp btn-primary me-1"
                              onClick={() => handleEditThread(data?._id)}>
                              <i className="fa fa-pencil" />
                            </button>

                            <button className="btn btn-xs sharp btn-danger"
                              onClick={() => handleDeleteProduct(data?._id)}>
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
                            productList?.totalProducts /
                              productList?.rowsPerPage
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
        </Col>
      </Row>
    </>
  );
};

export default AllProductList;