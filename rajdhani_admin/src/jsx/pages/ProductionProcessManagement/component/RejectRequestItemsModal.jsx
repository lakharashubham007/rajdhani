

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
import SearchBoxWithTable from "./SearchBoxWithTable";

const theadData = [
    { heading: "S.No.", sortingVale: "sno" },
    { heading: "Date & Time", sortingVale: "time_stamp" },
    { heading: "Activity", sortingVale: "activity" },
    { heading: "QTY Accepted", sortingVale: "quantity_accepted" },
    { heading: "QTY Rejected", sortingVale: "quantity_rejected" },
    { heading: "Operator", sortingVale: "Operator" },
    { heading: "Supervisor", sortingVale: "Supervisor" },

];

const RejectRequestItemsModal = ({ show, onHide, itemId, stage, rowData }) => {
    console.log("rowData", rowData)
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
            const res = await getProductionProcessItemLogsByItemAndStageApi(
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
        if (itemId) {
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




    return (
        <>



            <Modal show={show} onHide={onHide}
                dialogClassName="custom-modal-activity-log"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>(Reject / Replace) Quantity Request : {itemId}</Modal.Title>
                </Modal.Header>

                <Modal.Body
                    style={{ overflowX: 'hidden' }}
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
                                            {/* Product Details */}
                                            <div className="col-xl-12 col-lg-12">
                                                <div className="card">
                                                    <div
                                                        style={{
                                                            display: "grid",
                                                            gridTemplateColumns: "180px auto",
                                                            fontSize: "13px",
                                                            border: "1px solid #D3D3D3",
                                                            borderRadius: "8px",
                                                            padding: "15px",
                                                        }}
                                                    >
                                                        {/* Group: Part No, UOM, Weight */}
                                                        <div style={{ fontWeight: "600", color: "#444", padding: "6px 0" }}>
                                                            Part Details:
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                gap: "25px",
                                                                padding: "6px 0",
                                                                borderBottom: "1px dotted #ccc",
                                                                flexWrap: "wrap",
                                                                color: "#666",
                                                            }}
                                                        >
                                                            <span><b>Part No:</b> {rowData?.part_no_details?.part_no || "N/A"}</span>
                                                            <span><b>UOM:</b> {rowData?.part_no_details?.uom || "N/A"}</span>
                                                            <span><b>Weight:</b> {rowData?.part_no_details?.weight || "N/A"}</span>
                                                        </div>

                                                        {/* Hose Label */}
                                                        <div style={{ fontWeight: "600", color: "#444", padding: "6px 0" }}>
                                                            Hose :
                                                        </div>
                                                        <div
                                                            style={{
                                                                color: "#666",
                                                                padding: "6px 0",
                                                                borderBottom: "1px dotted #ccc",
                                                                wordBreak: "break-word",
                                                            }}
                                                        >
                                                            {rowData?.part_no_details?.hose_label || "N/A"}
                                                        </div>

                                                        {/* Fitting A Label */}
                                                        <div style={{ fontWeight: "600", color: "#444", padding: "6px 0" }}>
                                                            Fitting A :
                                                        </div>
                                                        <div
                                                            style={{
                                                                color: "#666",
                                                                padding: "6px 0",
                                                                borderBottom: "1px dotted #ccc",
                                                                wordBreak: "break-word",
                                                            }}
                                                        >
                                                            {rowData?.part_no_details?.fitting_a_label || "N/A"}
                                                        </div>

                                                        {/* Fitting B Label */}
                                                        <div style={{ fontWeight: "600", color: "#444", padding: "6px 0" }}>
                                                            Fitting B :
                                                        </div>
                                                        <div
                                                            style={{
                                                                color: "#666",
                                                                padding: "6px 0",
                                                                borderBottom: "1px dotted #ccc",
                                                                wordBreak: "break-word",
                                                            }}
                                                        >
                                                            {rowData?.part_no_details?.fitting_b_label || "N/A"}
                                                        </div>

                                                        {/* Group: Assembly Length, Fitting Length, Cutting Length */}
                                                        <div style={{ fontWeight: "600", color: "#444", padding: "6px 0" }}>
                                                            Lengths:
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                gap: "25px",
                                                                padding: "6px 0",
                                                                borderBottom: "1px dotted #ccc",
                                                                flexWrap: "wrap",
                                                                color: "#666",
                                                            }}
                                                        >
                                                            <span><b>Assembly Length:</b> {rowData?.part_no_details?.assembly_length || "N/A"}</span>
                                                            <span><b>Fitting Length:</b> {rowData?.part_no_details?.fitting_length || "N/A"}</span>
                                                            <span><b>Cutting Length:</b> {rowData?.part_no_details?.cutting_length || "N/A"}</span>
                                                        </div>

                                                        {/* Group: Guard Type + Guard Label */}
                                                        <div style={{ fontWeight: "600", color: "#444", padding: "6px 0" }}>
                                                            Guard:
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                gap: "25px",
                                                                padding: "6px 0",
                                                                borderBottom: "1px dotted #ccc",
                                                                flexWrap: "wrap",
                                                                color: "#666",
                                                            }}
                                                        >
                                                            <span><b>Guard Type:</b> {rowData?.part_no_details?.guard_type || "N/A"}</span>
                                                            <span><b>Guard Label:</b> {rowData?.part_no_details?.guard_label || "N/A"}</span>
                                                        </div>

                                                        {/* Quantity */}
                                                        <div style={{ fontWeight: "600", color: "#444", padding: "6px 0" }}>
                                                            Quantity:
                                                        </div>
                                                        <div
                                                            style={{
                                                                color: "#666",
                                                                padding: "6px 0",
                                                                borderBottom: "1px dotted #ccc",
                                                            }}
                                                        >
                                                            {rowData?.part_no_details?.quantity || "N/A"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Search Box and table  */}
                                              <div className="col-xl-12 col-lg-12">
                                                <div className="card">
                                                        <SearchBoxWithTable partDetails={rowData?.part_no_details} stage={stage}/>
                                                </div>
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

export default RejectRequestItemsModal;

