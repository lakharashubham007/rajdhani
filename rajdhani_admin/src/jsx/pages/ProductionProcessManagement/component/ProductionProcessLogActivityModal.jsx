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
import { Link, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../layouts/PageTitle";
import {
  addCuisinesApi,
  getCuisinesApi,
} from "../../../../services/apis/cuisinesApi";
import Loader from "../../../components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../assets/css/brand.css";
import { Toaster } from "../../../components/Toaster/Toster";
import Switch from "react-switch";
import ReactPaginate from "react-paginate";

import moment from "moment";
import Select from "react-select";
import {
  addFittingSizeApi, deleteFittingSizeApi, GetEditFittingSizeData, getFittingSizeApi, UpdateFittingSize,
  UpdateFittingSizeStatus
} from "../../../../services/apis/FittingSize";
import { addThreadApi, deleteThreadApi, GetEditThreadData, getThreadApi, UpdateThread, UpdateThreadStatus } from "../../../../services/apis/Thread";
import { deleteProductApi, getProductApi, UpdateProductStatus } from "../../../../services/apis/Product";
import DeleteWarningMdl from "../../../components/common/DeleteWarningMdl";
import useDebounce from "../../../components/common/Debounce";
import { deleteSupplierApi, getSupplierApi, UpdateSupplierStatus } from "../../../../services/apis/Supplier";
import { getSupplierPurchaseOrderApi } from "../../../../services/apis/PurchaseOrder";
import { getSaleOrdersApi } from "../../../../services/apis/salesOrderApi";
import { getProductionProcessItemLogsByItemAndStageApi, getProductionProcessLogDetailsApi } from "../../../../services/apis/ProductionProcessApi";
import { useDispatch } from "react-redux";

const theadData = [
  { heading: "S.No.", sortingVale: "sno" },
  { heading: "Time Stamp", sortingVale: "time_stamp" },
  { heading: "Activity", sortingVale: "activity" },
  // { heading: "Time Stamp", sortingVale: "time_stamp" },
  { heading: "Supervised By", sortingVale: "Supervised_by" },
  //   { heading: "Orderd Date", sortingVale: "date" },
  //   { heading: "Due Date", sortingVale: "due_date" },
  //   { heading: "SO Amount", sortingVale: "grand_total" },
  //   { heading: "Prepared By", sortingValue: "preparedBy" },
  //   { heading: "Verified By", sortingValue: "verifiedBy" },
  //   { heading: "Verified", sortingValue: "verified" },
  //   { heading: "Authorized By", sortingValue: "authorizedBy" },

  //   // { heading: "Created At", sortingVale: "created_at" },
  //   { heading: "Status", sortingVale: "status" },
  //   { heading: "Action", sortingVale: "action" },
];

const ProductionProcessLogActivityModal = ({ show, onHide, itemId, stage, productionProcessID }) => {
  const [sort, setSortata] = useState(10);
  const [loading, setLoading] = useState(false);
  const [modalCentered, setModalCentered] = useState(false);
  const [logo, setLogo] = useState(null);
  const [data, setData] = useState(
    document.querySelectorAll("#holidayList tbody tr")
  );
  const [formData, setFormData] = useState({
    threadSize: "",
    threadType: "",
    measurementUnit: ""
  });
  const [UpdateCategory, setUpdateCategory] = useState(false);
  const [purchaseOrderList, setPurchaseOrderList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [iconData, setIconDate] = useState({ complete: false, ind: Number });
  const [error, setErrors] = useState(null); // To manage the error state
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDeleteMdl, setShowDeleteMdl] = useState(false);
  const [deleteTableDataId, setDeleteTableDataId] = useState("");
  const debouncedSearchValue = useDebounce(searchInputValue, 500);
  const processID = useParams();
  // console.log("processID", productionProcessID?._id)


  const navigate = useNavigate()
  const resetForm = () => {
    setFormData({
      threadSize: "",
      threadType: "",
      measurementUnit: ""
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
      name: "",
    });
  };


  // const [activityItemsLogData, setItemsActivityLogData] = useState();
  // console.log("activityLogData", activityItemsLogData)

  // //   getSubCategoriesApi
  // const fetchItemsActivityLogDetails = async (sortValue) => {
  //   // Set loading to true when the API call starts
  //   setLoading(true);
  //   try {
  //     const res = await getProductionProcessItemLogsByItemAndStageApi(
  //       itemId,
  //       stage,
  //       currentPage,
  //       sort,
  //       sortValue,
  //       searchInputValue
  //     );

  //     const logsData = res?.data?.logs || [];


  //     setItemsActivityLogData(logsData);

  //     //   setUpdateCategory(false);
  //   } catch (error) {
  //     // Catch and handle errors
  //     console.error("Error fetching data:", error);
  //     Toaster.error("Failed to load data. Please try again.");
  //   } finally {
  //     // Always set loading to false when the API call is done (whether successful or failed)
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   if (itemId) {
  //     fetchItemsActivityLogDetails();
  //   }

  // }, [UpdateCategory, currentPage, sort, debouncedSearchValue, itemId]);

  const [activityLogData, setActivityLogData] = useState();
  // console.log("activityLogData", activityLogData)

  //   getSubCategoriesApi
  const fetchActivityLogDetails = async (sortValue) => {
    // Set loading to true when the API call starts
    // setLoading(true);
    try {
      const res = await getProductionProcessLogDetailsApi(
        productionProcessID?._id,
        currentPage,
        sort,
        sortValue,
        searchInputValue
      );

      setActivityLogData(res?.data?.productionProcessLogs);

      //   setUpdateCategory(false);
    } catch (error) {
      // Catch and handle errors
      console.error("Error fetching data:", error);
      Toaster.error("Failed to load data. Please try again.");
    } finally {
      // Always set loading to false when the API call is done (whether successful or failed)
      // setLoading(false);
    }
  }

  useEffect(() => {
    if (productionProcessID?._id) {
      fetchActivityLogDetails();
    }
  }, [show, UpdateCategory, currentPage, sort, debouncedSearchValue, productionProcessID]);





  function SotingData(name, ind) {

    if (iconData.complete) {
      const sortValue = { value: name, type: "asc" };
      // fetchPurchaseOrderList(sortValue);
    } else {
      const sortValue = { value: name, type: "dsc" };
      // fetchPurchaseOrderList(sortValue);
    }
  }



  const handleDeleteSubmit = async () => {
    try {
      const res = await deleteSupplierApi(deleteTableDataId);
      //   console.log("response",res);
      if (res.status === 200) {
        Toaster.success(res?.data?.message); // Display success message

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
      <Modal
        show={show}
        onHide={onHide}
        dialogClassName="custom-modal-activity-log"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Production Log Overview — Sheet Number:&nbsp;
            <strong style={{ color: productionProcessID?.sheet_no ? "purple" : "red" }}>
              {productionProcessID?.sheet_no || "N/A"}
            </strong>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body 
        style={{overflowX: 'hidden'}}
        >
          <DeleteWarningMdl title={"table data"} showDeleteMdl={showDeleteMdl} setShowDeleteMdl={setShowDeleteMdl}
            setDeleteTableDataId={setDeleteTableDataId} handleDeleteSubmit={handleDeleteSubmit} />
          <ToastContainer />
          <Loader visible={loading} />
          {productionProcessID?.sheet_no ?
            <Row>
              <Col lg={12}>
                <div className="">
                  {/* <div className="card-header">
                  <h4 className="card-title">Production Process Log Activity</h4>
                </div> */}
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
                            {activityLogData?.map((data, ind) => (
                              <tr key={ind}>
                                <td><strong>{ind + 1}</strong> </td>

                                {/* <td>{data?.production_process_id?.process_uid}</td>
          
                                    <td>{data?.production_process_id?.sheet_no}</td> */}

                                <td className="">
                                  {moment(data?.timestamp).format("DD MMM YYYY, hh:mm A")}
                                </td>

                                <td style={{
                                  whiteSpace: 'nowrap',
                                }}>
                                  {data?.log_message}
                                </td>

                                {/* <td className="">
                                     {moment(data?.timestamp).format("DD MMM YYYY")}
                                    </td> */}

                                {/* <td style={{
                                        whiteSpace: 'nowrap',}}>
                                      {data?.createdBy} 
                                    </td>
                                       */}
                                <td className="">
                                  <span style={{
                                    whiteSpace: 'nowrap',
                                    border: '0.5px solid black',
                                    padding: '5px 10px',
                                    borderRadius: '9999px', // fully rounded
                                    backgroundColor: 'white',
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                    fontSize: '0.875rem',
                                  }}>
                                    {data?.created_by
                                      ? `${data?.created_by} `
                                      : '-'}
                                  </span>
                                </td>




                                {/* <td className="whitespace-nowrap ">
                                      {moment(data?.order_details?.date).format("DD MMM YYYY")}
                                    </td>
          
                                    <td style={{
                                        whiteSpace: 'nowrap',}} >
                                      {moment(data?.order_details?.due_date).format("DD MMM YYYY")}
                                    </td>
          
                                    <td className="">
                                      INR {data?.summary?.grand_total}
                                    </td> */}

                                {/* <td>
                                      {moment(data?.created_at).format("DD MMM YYYY, h:mm:ss a")}
                                    </td> */}


                                {/* <td>
                                      <span style={{
                                        whiteSpace: 'nowrap',
                                        border: '0.5px solid black',
                                        padding: '5px 10px',
                                        borderRadius: '9999px', // fully rounded
                                        backgroundColor: 'white',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                        fontSize: '0.875rem',
                                      }}>
                                        {data?.isVerifiedBy?.firstName && data?.isVerifiedBy?.lastName
                                          ? `${data?.isVerifiedBy?.firstName} ${data?.isVerifiedBy?.lastName}`
                                          : '-'}
                                      </span>
                                    </td> */}

                                {/* 
                                    <td>
                                      {data?.isVerified ? (
                                        <span
                                          className={`badge bg-success`}
                                        >
                                          Verified
                                          <span className="ml-1">✅</span>
                                        </span>
          
                                      ) : (
                                        <span
                                          className={`badge bg-warning`}
                                        >
                                          Pending
                                          <span className="ml-1">🔄</span>
                                        </span>
                                      )}
                                    </td> */}

                                {/* <td className="text-center">
                                      {data?.isVerified ? (
                                        <span className="inline-flex items-center text-xs font-medium border border-green-500 text-green-600 px-2 py-1 rounded-full">
                                          Verified
                                          <span className="ml-1">✅</span>
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center text-xs font-medium border border-green-500 text-green-600 px-2 py-1 rounded-full">
                                          Pending
                                          <span className="ml-1">🔄</span>
                                        </span>
                                      )
                                        }
                                    </td> */}

                                {/* <td className="">
                                      {data?.isAuthorizedBy?.fname && data?.isAuthorizedBy?.lname
                                        ? `${data?.isAuthorizedBy?.firstName} ${data?.isAuthorizedBy?.lastName}`
                                        : '-'}
                                    </td> */}

                                {/* <td>
                                      <span
                                        className={`badge ${data.status === "In Pending"
                                          ? "bg-warning"
                                          : data.status === "Completed"
                                            ? "bg-success"
                                            : "bg-secondary"
                                          }`}
                                      >
                                        {data?.status}
                                      </span>
                                    </td> */}



                                {/* <td className="d-flex justify-content-start align-items-center gap-2">
                                      <button
                                        className="btn btn-xs sharp btn-primary"
                                        onClick={() => navigate(`/saleorderview/${data?._id}`)}>
                                        <i className="fa-solid fa-eye"></i>
                                      </button>
          
                                      <button
                                        className="btn btn-xs sharp btn-light"
                                        onClick={() => navigate(`/verifysSaleOrder/${data?._id}`)}
                                      >
                                        <i className="fa-solid fa-check"></i>
                                      </button>
          
                                      <button
                                        className="btn btn-xs sharp"
                                        onClick={() => navigate(`/authorizeSaleOrder/${data?._id}`)}
                                        style={{ background: '#FFB456', color: 'black' }}
                                      >
                                        <i className="fas fa-user-lock"></i>
                                      </button>
          
                                      <button className="btn btn-xs sharp btn-primary"
                                        onClick={() => navigate(`/edit-sale-order/${data?._id}`)}
                                      >
                                        <i className="fa fa-pencil" />
                                      </button>
          
                                      <button
                                        className="btn btn-xs sharp btn-danger"
                                        onClick={() => handleDeleteSupplier(data?._id)}
                                      >
                                        <i className="fa fa-trash"></i>
                                      </button>
                                    </td> */}

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
                                  purchaseOrderList?.totalRecords /
                                  purchaseOrderList?.rowsPerPage
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
            :
            <h5 style={{ display: 'flex', justifyContent: 'center' }}>No data available OR Production process not started for selected sheet</h5>
          }
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductionProcessLogActivityModal;

