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

import Loader from "../../components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/css/brand.css";
import { Toaster } from "../../components/Toaster/Toster";
import Switch from "react-switch";
import ReactPaginate from "react-paginate";
import moment from "moment";
import DeleteWarningMdl from "../../components/common/DeleteWarningMdl";
import useDebounce from "../../components/common/Debounce";
import { deleteSupplierApi, getSupplierApi, UpdateSupplierStatus } from "../../../services/apis/Supplier";
import { getInventoryItemLogsByItemAndSOApi, getInventoryItemLogsByItemIdApi } from "../../../services/apis/InventoryItemLogsApi";

const theadData = [
  { heading: "S.No.", sortingVale: "sno" },
  { heading: "Date & Time", sortingVale: "time_stamp" },
  { heading: "Activity", sortingVale: "activity" },
  { heading: "Last Assigned Quantity", sortingVale: "quantity_accepted" },
    { heading: "Last Reserved Quantity", sortingVale: "quantity_reserved" },

  // { heading: "QTY Rejected", sortingVale: "quantity_rejected" },
  { heading: "Updated By", sortingVale: "updated_by" },
  // { heading: "Supervisor", sortingVale: "Supervisor" },

];

const LogActivityItemsModal = ({ show, onHide, itemId, stage, saleOrderID }) => {
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
  // console.log("processID", processID.id)


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


  const [activityItemsLogData, setItemsActivityLogData] = useState();
  // console.log("activityLogData", activityItemsLogData)

  //   getSubCategoriesApi
  const fetchItemsActivityLogDetails = async (sortValue) => {
    // Set loading to true when the API call starts
    // setLoading(true);
    try {
      const res = await getInventoryItemLogsByItemIdApi(
        itemId,
        stage,
        currentPage,
        sort,
        sortValue,
        searchInputValue
      );

      const logsData = res?.data?.logs || [];


      setItemsActivityLogData(logsData);

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
    if(itemId){
      fetchItemsActivityLogDetails();
    }
    
  }, [UpdateCategory, currentPage, sort, debouncedSearchValue, itemId, show]);





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



  // const [logs, setLogs] = useState([]);

  // const fetchItemLogs = async () => {
  //   if (!itemId || !stage) return;

  //   setLoading(true);
  //   try {
  //     const response = await getProductionProcessItemLogsByItemAndStageApi(itemId, stage);
  //     const logsData = response?.data?.logs || [];

  //     // Format data for table
  //     const formattedLogs = logsData.map((log, index) => ({
  //       id: log._id,
  //       stage: log.stage,
  //       quantity: log.quantity_accepted + (log.quantity_rejected || 0),
  //       operator: log?.operator_name || 'N/A', // Adjust if operator info exists
  //       date: moment(log.createdAt).format("DD MMM YYYY, h:mm A"),
  //     }));

  //     setLogs(formattedLogs);
  //   } catch (error) {
  //     console.error("❌ Error fetching item logs:", error);
  //     setLogs([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (show && itemId && stage) {
  //     fetchItemLogs();
  //   }
  // }, [show, itemId, stage]);

  return (
    <>



      <Modal show={show} onHide={onHide} 
          dialogClassName="custom-modal-activity-log"
          centered>
        <Modal.Header closeButton>
          <Modal.Title>Log Activity for Item ID: {itemId}</Modal.Title>
        </Modal.Header>

        <Modal.Body 
         style={{overflowX: 'hidden'}}
        >
          <DeleteWarningMdl title={"table data"} showDeleteMdl={showDeleteMdl} setShowDeleteMdl={setShowDeleteMdl}
            setDeleteTableDataId={setDeleteTableDataId} handleDeleteSubmit={handleDeleteSubmit} />
          <ToastContainer />
          <Loader visible={loading} />

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
                          {activityItemsLogData?.map((data, ind) => (
                            <tr key={ind}>
                              <td
                                 style={{
                                   textAlign: 'center',     // ✅ centers the text horizontally
                                verticalAlign: 'middle', 
                                 width: '20px'
                              }}>
                                <strong>{ind + 1}</strong> </td>



                              <td style={{
                                 width: '180px'
                              }}>
                                {moment(data?.createdAt).format("DD MMM YYYY, hh:mm A")}
                              </td>

                                  <td style={{
                                whiteSpace: 'nowrap',
                              }}>
                                {data?.action_type ? data?.action_type : '-'}
                              </td>



                              {/* <td className="">
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
                              </td> */}

                             

                               <td style={{
                                whiteSpace: 'nowrap',
                                textAlign: 'center',     // ✅ centers the text horizontally
                                verticalAlign: 'middle', // ✅ optional: centers it vertically if needed
                                width: '40px'
                              }}>
                                {(data?.assign_quantity === 0) ? '-' : data?.assign_quantity}
                              </td>

                               <td style={{
                                whiteSpace: 'nowrap',
                                textAlign: 'center',     // ✅ centers the text horizontally
                                verticalAlign: 'middle', // ✅ optional: centers it vertically if needed
                                width: '40px'
                              }}>
                                {(data?.reserve_quantity === 0 || !data?.reserve_quantity) ? '-' : data?.reserve_quantity}
                              </td>

                              {/* <td style={{
                                whiteSpace: 'nowrap',
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                width: '40px'
                              }}>
                                {(data?.quantity_rejected === 0) ? '-' : data?.quantity_rejected}
                              </td> */}

                              <td style={{
                                whiteSpace: 'nowrap',
                              }}>
                                {data?.operator_name ? data?.operator_name : 'system'}
                              </td>

                              {/* <td style={{
                                whiteSpace: 'nowrap',
                              }}>
                                {data?.supervisor ? data?.supervisor : 'person1'}
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

export default LogActivityItemsModal;

