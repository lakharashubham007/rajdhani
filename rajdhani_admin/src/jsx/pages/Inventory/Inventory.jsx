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
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import Loader from "../../components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/css/brand.css";
import { Toaster } from "../../components/Toaster/Toster";
import Switch from "react-switch";
import ReactPaginate from "react-paginate";
import moment from "moment";
import { UpdateThread, UpdateThreadStatus } from "../../../services/apis/Thread";
import { deleteProductApi, getProductApi, UpdateProductStatus } from "../../../services/apis/Product";
import DeleteWarningMdl from "../../components/common/DeleteWarningMdl";
import useDebounce from "../../components/common/Debounce";
import { filterInventoryItemApi, getProductsFromInventoryApi } from "../../../services/apis/InventoryApi";
import Select from "react-select";
import { FiRefreshCcw } from "react-icons/fi";

const theadData = [
    { heading: "S.No.", sortingVale: "sno" },
    { heading: "Image", sortingVale: "image" },
    { heading: "Product", sortingVale: "product" },
    { heading: "Description", sortingVale: "description" },
    { heading: "Fitting Code", sortingVale: "Fitting Code" },
    { heading: "Product Code", sortingVale: "product_code" },
    { heading: "Total Qantity", sortingVale: "total_quantity" },
    { heading: "PO Due QTY", sortingVale: "po_due_qty" },
    { heading: "SO Due QTY", sortingVale: "so_due_qty" },
    { heading: "Minimum Required Qty", sortingVale: "minimum_required_qty" },
    { heading: "Sales (last 90 Days Avg)", sortingVale: "sales_last_90_days_avg" },
    { heading: "Rejected Qty", sortingVale: "rejected_qty" },
    { heading: "Created At", sortingVale: "created_at" },
    { heading: "Status", sortingVale: "status" },
    { heading: "Action", sortingVale: "action" },
];

const Inventory = () => {
    const [filterOpen, setFilterOpen] = useState(false);
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
    const [productList, setProductList] = useState([]);
    const [analyticsData, setAnalyticsData] = useState();
    console.log("analyticsData", analyticsData)
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
    const [selectedFittingThreadOption, setSelectedFittingThreadOption] = useState(null);



    // Filter options
    const endFittingTypes = [
        { value: "pcs", label: "PCS" },
        { value: "set", label: "SETS" },
    ];

    const WireTypeOptions = [
        { value: "BRAIDED (BR) - B", label: "BRAIDED (BR) - B" },
        { value: "SPIRAL (SP) - S", label: "SPIRAL (SP) - S" },
        { value: "TEFLON (TF) - T", label: "TEFLON (TF) - T" },
    ];

    // State for filters
    const [endFittingType, setEndFittingType] = useState("");
    const [wireType, setWireType] = useState("");


    // Handle filter selection
    const handleEndFittingChange = (type) => {
        setEndFittingType(type);
    };

    const handleWireTypeChange = (type) => {
        setWireType(type);
    };


    // Reset filter
    const handleResetFilter = () => {
        setEndFittingType("")
        setWireType("")
    };

    // API Call on search
    const handleSearch = async () => {
        try {


            // Construct query parameters
            const queryParams = new URLSearchParams();
            if (endFittingType) queryParams.append("product_unit", endFittingType);
            if (wireType) queryParams.append("wire_type", wireType);

            const response = await filterInventoryItemApi(queryParams);
            console.log(response?.data?.data, "response")

            console.log(response?.data?.data, "response")
            setProductList(response?.data?.data);
            setAnalyticsData(response?.data)
            // const response = await axios.get(`/api/inventories?${queryParams.toString()}`);
            // setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };




    const toggleFilter = () => {
        setFilterOpen(!filterOpen);
    };

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

    const fittingThreadColors = {
        "BSP": "#f0f4ff", // Light blue
        "BSP O": "#ffe4e1", // Light coral
        "JIC": "#e6ffe6", // Light green
        "ORFS": "#fff2cc", // Light yellow
        "KOMATSU": "#d9d9ff", // Light purple
        "METRIC": "#ffe6e6", // Light pink
        "NPT": "#d1e7ff", // Light sky blue
        "JIS": "#fce4ec", // Light rose
        "SAE 61": "#f2e6ff", // Lavender
        "SAE 62": "#ffe6cc", // Light orange
        "BANJO WITHOUT O": "#e8f5e9", // Mint green
        "BANJO WITH O": "#ede7f6", // Soft lavender
        "METRIC THREAD ORFS": "#ffecb3", // Light amber

        "Cap": "#cce7ff", // Light blue-gray
        "Nipple": "#ffcce7", // Light rose-pink
        "Nut": "rgb(255 122 65 / 76%)", // Light greenish-yellow
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

    //   getSubCategoriesApi
    const fetchProductList = async (sortValue) => {
        // Set loading to true when the API call starts
        setLoading(true);
        try {
            const res = await getProductsFromInventoryApi(
                currentPage,
                sort,
                sortValue,
                searchInputValue
            );

            console.log('res res is here', res)

            setProductList(res?.data?.data);

            setUpdateCategory(false);
        } catch (error) {
            // Catch and handle errors
            console.error("Error fetching data:", error);
            Toaster.error("Failed to load data. Please try again.");
        } finally {
            // Always set loading to false when the API call is done (whether successful or failed)
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProductList();
    }, [UpdateCategory, currentPage, sort, debouncedSearchValue]);

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
        navigate(`/editproductdata/${id}`)

    };

    const handleDeleteProduct = (id) => {
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

    const handleStatusChange = async (ProductId, currentStatus) => {
        const fdata = { status: !currentStatus }
        try {
            const res = await UpdateProductStatus(ProductId, fdata);
            if (res.status === 200) {
                Toaster.success(res?.data?.message); // Display success message
                fetchProductList()
            } else {
                Toaster.error(res?.data?.message || "Something went wrong. Please try again.");
            }
        } catch (err) {
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
                setDeleteTableDataId={setDeleteTableDataId} handleDeleteSubmit={handleDeleteSubmit} />
            <ToastContainer />
            <Loader visible={loading} />
            {/* <PageTitle
        activeMenu={"Product List"}
        motherMenu={"Home"}
        motherMenuLink={"/dashboard"}
      /> */}

            <Row>
                <Col lg={12}>
                    <div className="card">
                        {/**Inventory Heading */}
                        <div className="card-header">
                            <h2 className="">📥 Inventory</h2>
                            {/* Analytics Badge Boxes */}
                            <div class="d-flex flex-wrap gap-2 mt-2">
                                <div class="p-2 text-dark fw-bold border rounded" style={{ backgroundColor: "#e7f3ff" }}>
                                    Total Quantity: {analyticsData?.total_quantity ? analyticsData?.total_quantity : 0}
                                </div>
                                <div class="p-2 text-dark fw-bold border rounded" style={{ backgroundColor: "#e8f5e9" }}>
                                    Total Amount: {analyticsData?.total_amount ? analyticsData?.total_amount : 0} INR
                                </div>
                                {/* <div class="p-2 text-dark fw-bold border rounded" style={{ backgroundColor: "#fff8e1" }} >
                                    Total Weight: 500 tons
                                </div> */}
                                <div class="p-2 text-dark fw-bold border rounded" style={{ backgroundColor: "#e0f7fa" }} >
                                    Total Products: {analyticsData?.total_products ? analyticsData?.total_products : 0}
                                </div>
                                {/* <div class="p-2 text-dark fw-bold border rounded" style={{ backgroundColor: "#f5f5f5" }} >
                                    Stock Value: 1,200,000 INR
                                </div> */}
                            </div>
                        </div>
                        {/**Inventory Body */}
                        <div className="card-body">
                            <div className="table-responsive">
                                <div id="holidayList" className="dataTables_wrapper no-footer">
                                    {/**Inventory table Filters Box */}
                                    <div className="justify-content-between d-sm-flex">
                                        {/* Pagination Dropdown */}
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
                                        {/* Filter Icon and Filter Dropdowns */}
                                        <div className="d-flex align-items-start gap-2">
                                            {/* Search Box */}
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
                                            {/* Filter Button */}
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="filter-icon-box d-flex justify-content-center align-items-center me-3"
                                                    style={{
                                                        width: "35px",
                                                        height: "35px",
                                                        borderRadius: "5px",
                                                        background: "#6A73FA",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={toggleFilter}
                                                >
                                                    <i
                                                        className={`bi ${filterOpen ? "bi-x-lg" : "bi-funnel"}`}
                                                        style={{ color: 'white', fontSize: "18px" }}
                                                    ></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/**Inventory table Filters Extended Dropdowns when click on filter button */}
                                    <div>
                                        {filterOpen && (
                                            <div className="filter-box d-flex align-items-center row-12" style={{ gap: "10px" }}>
                                                {/* End Fitting Type Filter */}
                                                <Dropdown className="m-2">
                                                    <Dropdown.Toggle className="btn btn-primary">
                                                        {endFittingType ? endFittingTypes.find((item) => item.value === endFittingType)?.label : "End Fitting Type"}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {endFittingTypes.map((type) => (
                                                            <Dropdown.Item
                                                                key={type.value}
                                                                onClick={() => handleEndFittingChange(type.value)}
                                                                active={endFittingType === type.value}
                                                            >
                                                                {type.label}
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                                {/* Wire Type Filter */}
                                                <Dropdown className="m-2">
                                                    <Dropdown.Toggle className="btn btn-primary">
                                                        {wireType ? WireTypeOptions.find((item) => item.value === wireType)?.label : "Wire Type"}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {WireTypeOptions.map((type) => (
                                                            <Dropdown.Item
                                                                key={type.value}
                                                                onClick={() => handleWireTypeChange(type.value)}
                                                                active={wireType === type.value}
                                                            >
                                                                {type.label}
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown>



                                                {/* <Dropdown>
                                                    <Dropdown.Toggle className="btn btn-light">Category</Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>Category 1</Dropdown.Item>
                                                        <Dropdown.Item>Category 2</Dropdown.Item>
                                                        <Dropdown.Item>Category 3</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown> */}




                                                {/* <Dropdown>
                                                    <Dropdown.Toggle className="btn btn-light">Status</Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>Active</Dropdown.Item>
                                                        <Dropdown.Item>Inactive</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown> */}

                                                {/* <Dropdown>
                                                    <Dropdown.Toggle className="btn btn-light">Price Range</Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>Below $100</Dropdown.Item>
                                                        <Dropdown.Item>$100-$500</Dropdown.Item>
                                                        <Dropdown.Item>Above $500</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown> */}

                                                <Button variant="danger" onClick={handleResetFilter}>
                                                    <FiRefreshCcw size={18} className="me-0" />
                                                </Button>
                                                <button className="btn btn-primary ms-auto" onClick={handleSearch}>Search</button>
                                            </div>
                                        )}
                                    </div>
                                    {/**Inventory Table */}
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
                                            {productList?.map((data, ind) => (
                                                // console.log("data is here", data),
                                                <tr key={ind}>
                                                    {/* Serial numbere  */}
                                                    <td>
                                                        <strong>{ind + 1}</strong>
                                                    </td>
                                                    {/* Product Image  */}
                                                    <td className="d-flex align-items-center gap-2">
                                                        {data?.product_id?.image ? (
                                                            <img className='select-file-img' src={`https://api.i2rtest.in/v1/images/image/${data?.product_id?.image}`} alt={data?.product_id?.image} />
                                                        ) : (
                                                            ""

                                                            // <span>No Image Available</span>
                                                        )} {data?.name}
                                                    </td>
                                                    {/* Product Type  */}
                                                    <td style={{
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',

                                                    }}>
                                                        {data?.product_id?.product_type}
                                                    </td>
                                                    {/* Product Name  */}
                                                    <td
                                                        style={{
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxWidth: '55ch'
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize: '0.875rem', // Smaller text size (adjust as needed)
                                                                backgroundColor: '#F5EFFF', // White badge background
                                                                padding: '2px 6px', // Add padding for badge effect
                                                                borderRadius: '4px', // Rounded corners
                                                                display: 'inline-block', // Ensure proper layout inside the td
                                                                color: '#686D76'
                                                            }}
                                                        >
                                                            {data?.product_name}
                                                        </span>
                                                    </td>
                                                    {/* Fitting Code  */}
                                                    <td
                                                        style={{
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxWidth: '45ch'
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize: '0.875rem', // Smaller text size (adjust as needed)
                                                                backgroundColor: '#D9EAFD', // White badge background
                                                                padding: '2px 6px', // Add padding for badge effect
                                                                borderRadius: '4px', // Rounded corners
                                                                display: 'inline-block', // Ensure proper layout inside the td
                                                                color: '#686D76'
                                                            }}
                                                        >
                                                            {data?.product_id?.fitting_Code}
                                                        </span>
                                                    </td>
                                                    {/* Product Code  */}
                                                    <td
                                                        style={{
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            maxWidth: '45ch'
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                fontSize: '0.875rem', // Smaller text size (adjust as needed)
                                                                backgroundColor: '#F3CCF3', // White badge background
                                                                padding: '2px 6px', // Add padding for badge effect
                                                                borderRadius: '4px', // Rounded corners
                                                                display: 'inline-block', // Ensure proper layout inside the td
                                                                color: '#686D76'
                                                            }}
                                                        >
                                                            {data?.product_id?.product_code}
                                                        </span>
                                                    </td>
                                                    {/* Total QTY       */}
                                                    <td style={{
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',

                                                    }}>
                                                        {data?.total_quantity ? data?.total_quantity : 100}
                                                    </td>
                                                    {/* "PO Due QTY" */}
                                                    <td style={{
                                                        textAlign: 'center', // Horizontally center the content
                                                        verticalAlign: 'middle', // Vertically center the content
                                                    }}>
                                                        <span
                                                            style={{
                                                                backgroundColor: "#f0f4ff", // Light blue background
                                                                color: "black", // Text color
                                                                padding: "5px 10px", // Padding inside the badge
                                                                borderRadius: "12px", // Rounded corners
                                                                fontWeight: "bold", // Bold text
                                                                textAlign: "center", // Centered text
                                                                display: "inline-block", // Works for the span
                                                            }}
                                                        >
                                                            {data?.po_due_qty ? data?.po_due_qty : "N/A"}
                                                        </span>
                                                    </td>
                                                    {/* SO Due QTY */}
                                                    <td style={{
                                                        textAlign: 'center', // Horizontally center the content
                                                        verticalAlign: 'middle', // Vertically center the content
                                                    }}>
                                                        <span
                                                            style={{
                                                                backgroundColor: "#f0f4ff", // Light blue background
                                                                color: "black", // Text color
                                                                padding: "5px 10px", // Padding inside the badge
                                                                borderRadius: "12px", // Rounded corners
                                                                fontWeight: "bold", // Bold text
                                                                textAlign: "center", // Centered text
                                                                display: "inline-block", // Works for the span
                                                            }}
                                                        >
                                                            {data?.so_due_qty ? data?.so_due_qty : "N/A"}
                                                        </span>
                                                    </td>
                                                    {/* Minimum Required Qty"  */}
                                                    <td style={{
                                                        textAlign: 'center', // Horizontally center the content
                                                        verticalAlign: 'middle', // Vertically center the content
                                                    }}>
                                                        <span
                                                            style={{
                                                                backgroundColor: "#f0f4ff", // Light blue background
                                                                color: "black", // Text color
                                                                padding: "5px 10px", // Padding inside the badge
                                                                borderRadius: "12px", // Rounded corners
                                                                fontWeight: "bold", // Bold text
                                                                textAlign: "center", // Centered text
                                                                display: "inline-block", // Works for the span
                                                            }}
                                                        >
                                                            {data?.minimum_required_qty ? data?.minimum_required_qty : "N/A"}
                                                        </span>
                                                    </td>
                                                    {/* Sales last 90 days Avg  */}
                                                    <td style={{
                                                        textAlign: 'center', // Horizontally center the content
                                                        verticalAlign: 'middle', // Vertically center the content
                                                    }}>
                                                        <span
                                                            style={{
                                                                backgroundColor: "#f0f4ff", // Light blue background
                                                                color: "#6a73fa", // Text color
                                                                padding: "5px 10px", // Padding inside the badge
                                                                borderRadius: "12px", // Rounded corners
                                                                fontWeight: "bold", // Bold text
                                                                textAlign: "center", // Centered text
                                                                display: "inline-block", // Works for the span
                                                            }}
                                                        >
                                                            {data?.sales_last_90_days_avg ? data?.sales_last_90_days_avg : "N/A"}
                                                        </span>
                                                    </td>
                                                    {/* Rejected Qty       */}
                                                    <td style={{
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',

                                                    }}>
                                                        {data?.rejected_qty ? data?.rejected_qty : "N/A"}
                                                    </td>
                                                    {/* created_at */}
                                                    <td>
                                                        {moment(data?.created_at).format(
                                                            "DD MMM YYYY, h:mm:ss a"
                                                        )}
                                                    </td>
                                                    {/* status */}
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
                                                    {/* Actions Edit and Delete */}
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
                                    {/** Pagnination  Next and Prev Buttons  */}
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

export default Inventory;
