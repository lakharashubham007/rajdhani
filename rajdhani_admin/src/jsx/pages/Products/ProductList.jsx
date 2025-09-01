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
  DropdownButton,
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
import { deleteProductApi, generateQrCodeForProduct, getProductApi, UpdateProductStatus } from "../../../services/apis/Product";
import DeleteWarningMdl from "../../components/common/DeleteWarningMdl";
import useDebounce from "../../components/common/Debounce";
import { FaFilter } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FiRefreshCcw } from "react-icons/fi";
import { getAllOptions } from "../../../services/apis/options";
import FilterDropdown from "./FilterDropdown";
import { getAllFittingDashSizeApi } from "../../../services/apis/FittingDashSize";
import { getAllHoseDashSizeApi } from "../../../services/apis/HoseDashSize";
import { getAllFittingThreadApi } from "../../../services/apis/FittingThreads";
import { getAllBendAngleApi } from "../../../services/apis/BendAngle";
import ProductDetailModal from "./ProductDetailModal";
import { BsQrCodeScan } from "react-icons/bs";
import ProductQrCodeViewModal from "./ProductQRCodeViewModal";
import { wrap } from "lodash";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import dummyQR from '../../../assets/images/dummyQR.png'; // use a local dummy image
//updated

const theadData = [
  { heading: "S.No.", sortingVale: "sno" },
  { heading: "Code", sortingVale: "product_code" },
  { heading: "QR Code", sortingVale: "qr_code" },
  { heading: "Image", sortingVale: "image" },
  { heading: "Product", sortingVale: "product" },
  { heading: "Fitting Thread", sortingVale: "fitting_thread" },
  { heading: "Description", sortingVale: "description" },
  { heading: "Fitting Code", sortingVale: "Fitting Code" },
  { heading: "Design", sortingVale: "design" },
  { heading: "Created At", sortingVale: "created_at" },
  { heading: "Status", sortingVale: "status" },
  { heading: "Action", sortingVale: "action" },
];
const theadDataHosePipe = [
  { heading: "S.No.", sortingVale: "sno" },
  { heading: "Code", sortingVale: "product_code" },
  { heading: "QR Code", sortingVale: "qr_code" },
  { heading: "Image", sortingVale: "image" },
  { heading: "Product", sortingVale: "product" },
  { heading: "Description", sortingVale: "description" },
  { heading: "Hose Code", sortingVale: "Fitting Code" },
  { heading: "Created At", sortingVale: "created_at" },
  { heading: "Status", sortingVale: "status" },
  { heading: "Action", sortingVale: "action" },
];
const theadDataHoseAssembly = [
  { heading: "S.No.", sortingVale: "sno" },
  { heading: "Code", sortingVale: "product_code" },
  { heading: "QR Code", sortingVale: "qr_code" },
  { heading: "Image", sortingVale: "image" },
  { heading: "Product", sortingVale: "product" },
  { heading: "Hose", sortingVale: "hose" },
  { heading: "Fitting A", sortingVale: "fitting_a" },
  { heading: "Fitting B", sortingVale: "fitting_b" },
  { heading: "Assembly Length", sortingVale: "assembly_length" },
  { heading: "Fitting Length", sortingVale: "fitting_length" },
  { heading: "Cutting Length", sortingVale: "cutting_length" },
  { heading: "Oriantaion Angle", sortingVale: "oa" },
  { heading: "Guard Type", sortingVale: "guard_type" },
  { heading: "Guard", sortingVale: "guard" },
  { heading: "Created At", sortingVale: "created_at" },
  { heading: "Status", sortingVale: "status" },
  { heading: "Action", sortingVale: "action" },
];

const theadDatafittingAccessory = [
  { heading: "S.No.", sortingVale: "sno" },
  { heading: "Code", sortingVale: "product_code" },
  { heading: "QR Code", sortingVale: "qr_code" },
  { heading: "Image", sortingVale: "image" },
  { heading: "Product", sortingVale: "product" },
  { heading: "Description", sortingVale: "description" },
  { heading: "Created At", sortingVale: "created_at" },
  { heading: "Status", sortingVale: "status" },
  { heading: "Action", sortingVale: "action" },
];

const theadDataTubeFittings = [
  { heading: "S.No.", sortingVale: "sno" },
  { heading: "Code", sortingVale: "product_code" },
  { heading: "QR Code", sortingVale: "qr_code" },
  { heading: "Image", sortingVale: "image" },
  { heading: "Product", sortingVale: "product" },
  { heading: "Part Code", sortingVale: "part_code" },
  { heading: "Description", sortingVale: "part_description" },
  { heading: "Thread", sortingVale: "tube_fitting_thread" },
  { heading: "Category", sortingVale: "tube_fitting_category" },
  { heading: "Created At", sortingVale: "created_at" },
  { heading: "Status", sortingVale: "status" },
  { heading: "Action", sortingVale: "action" },
];

const buttons = [
  "Fitting Accessories",
  "End Fittings and Parts",
  "Hose Pipe",
  "Hose Assembly",
  "Tube Fittings"
];

const AllProductList = () => {
  const BASEURL = `https://api.i2rtest.in/v1`;
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [sort, setSortata] = useState(10);
  console.log("sort is here", sort)
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
  const [productPaginationInfoByTab, setProductPaginationInfoByTab] = useState([]);
  const [hoseAssemblyProductList, setHoseAssemblyProductList] = useState([]);
  const [endFittingsProductList, setEndFittingsProductList] = useState([]);
  const [fittingAccessoriesProductList, setFittingAccessoriesProductList] = useState([]);
  const [tubeFittingsProductList, setTubeFittingsProductList] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [iconData, setIconDate] = useState({ complete: false, ind: Number });
  const [error, setErrors] = useState(null);
  const [test, settest] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDeleteMdl, setShowDeleteMdl] = useState(false);
  const [deleteTableDataId, setDeleteTableDataId] = useState("");
  const debouncedSearchValue = useDebounce(searchInputValue, 500);
  const activePag = useRef(0);
  const [showProductDetailModal, setShowProductDetailModal] = useState(false);
  const [productDetailData, setShowProductDetailData] = useState({});
  const [showProductQrDetailModal, setShowProductQrDetailModal] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [drpProductList, setDrpProductList] = useState([]);
  const [selectedDrpProduct, setSelectedDrpProduct] = useState("");
  const [drpPartList, setDrpPartList] = useState([]);
  const [selectedDrpPart, setSelectedDrpPart] = useState("");
  const [drpWireTypeList, setDrpWireTypeList] = useState([]);
  const [selectedDrpWireType, setSelectedDrpWireType] = useState("");
  const [drpFerruleList, setDrpFerruleList] = useState([]);
  const [selectedDrpFerrule, setSelectedDrpFerrule] = useState("");
  const [drpFittingDashSizeList, setDrpFittingDashSizeList] = useState([]);
  const [selectedDrpFittingDashSize, setSelectedDrpFittingDashSize] = useState("");
  const [drpHoseDashSizeList, setDrpHoseDashSizeList] = useState([]);
  const [selectedDrpHoseDashSize, setSelectedDrpHoseDashSize] = useState("");
  const [drpFittingThreadList, setDrpFittingThreadList] = useState([]);
  const [selectedDrpFittingThread, setSelectedDrpFittingThread] = useState("");
  const [drpStraightBendangleList, setDrpStraightBendangleList] = useState([]);
  const [selectedDrpStraightBendangle, setSelectedDrpStraightBendangle] = useState("");
  const [drpFittingPieceList, setDrpFittingPieceList] = useState([]);
  const [selectedDrpFittingPiece, setSelectedDrpFittingPiece] = useState("");
  const [drpSkiveTypeOptionsList, setDrpSkiveTypeOptionsList] = useState([]);
  const [selectedDrpSkiveTypeOptions, setSelectedDrpSkiveTypeOptions] = useState("");
  const [sortOptionsList, setSortOptionsList] = useState([
    {
      label: "Recently Added",
      value: "Recently Added"
    },
    {
      label: "Ascending",
      value: "Ascending"
    },
    {
      label: "Descending",
      value: "Descending"
    },
    {
      label: "Last Month",
      value: "Last Month"
    },
    {
      label: "Last 7 Days",
      value: "Last 7 Days"
    },
  ]);
  const [selectedSortOptions, setSelectedSortOptions] = useState("");
  const [active, setActive] = useState("End Fittings and Parts");


  // skiveTypeOptions
  const fetchBendAngleOptions = async () => {
    // setLoading(true);
    try {
      const res = await getAllBendAngleApi();
      const resData = res?.data?.bendAngles;
      const mappedData = resData?.map((val) => ({
        label: val?.name,
        value: val?.name,
      }));
      setDrpStraightBendangleList(mappedData);
    } catch (error) {
      // console.error("Error fetching cuisines:", error);
    } finally {
      // setLoading(false);
    }
  };

  const fetchFittingThreadOptions = async () => {
    try {
      // setLoading(true);
      const res = await getAllFittingThreadApi();
      const resData = res?.data?.fittingThreads;
      const mappedData = resData?.map((val) => ({
        label: `${val?.name}`,
        value: val?.name,
      }));
      setDrpFittingThreadList(mappedData);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
    } finally {
      // setLoading(false);
    }
  };

  const fetchHoseDashSizeOptions = async () => {
    // setLoading(true);
    try {
      const res = await getAllHoseDashSizeApi();
      const resData = res?.data?.hoseDashSizes;
      const mappedData = resData?.map((val) => ({
        label: `${val?.size} (${val?.code})`,
        value: val?.size,
      }));
      setDrpHoseDashSizeList(mappedData);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
    } finally {
      // setLoading(false);
    }
  };

  const fetchFittingDashSizeOptions = async () => {
    // setLoading(true);
    try {
      const res = await getAllFittingDashSizeApi();
      const resData = res?.data?.fittingDashSizes;

      const mappedData = resData?.map((val) => ({
        label: `${val?.thread} (${val?.hose_dash_code})`,
        value: val?.thread
      }));
      setDrpFittingDashSizeList(mappedData)
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      // setLoading(false);
    }
  };

  const fetchAllOptions = async () => {
    try {
      // setLoading(true);
      const res = await getAllOptions();
      const drpData = res?.data?.data;
      setDrpProductList(drpData?.ProductOptions);
      setDrpPartList(drpData?.PartOptions);
      setDrpWireTypeList(drpData?.WireTypeOptions);
      setDrpFerruleList(drpData?.CapWithoutCapOptions);
      setDrpFittingPieceList(drpData?.fittingPieceOptions);
      setDrpSkiveTypeOptionsList(drpData?.skiveTypeOptions)
      // console.log("drrrpppDown",drpData);
    } catch (error) {
      Toaster.error("Failed to load data. Please try again.");
    } finally {
      // setLoading(false);
    }
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
  const fetchHoseAssemblyProductList = async (sortValue, productTypes = []) => {
    console.log("productTypes in api call", productTypes)
    // Set loading to true when the API call starts
    setLoading(true);
    try {
      const res = await getProductApi(
        currentPage,
        sort,
        sortValue,
        searchInputValue,
        productTypes
      );

      setHoseAssemblyProductList(res.data);
      setProductPaginationInfoByTab(res?.data)

      setUpdateCategory(false);
    } catch (error) {
      // Catch and handle errors
    } finally {
      // Always set loading to false when the API call is done (whether successful or failed)
      setLoading(false);
    }
  }

  //   getSubCategoriesApi
  const fetchEndFittingsPartsProductList = async (sortValue, productTypes = []) => {
    // Set loading to true when the API call starts
    setLoading(true);
    try {
      const res = await getProductApi(
        currentPage,
        sort,
        sortValue,
        searchInputValue,
        productTypes
      );

      console.log("res.data", res.data)

      setEndFittingsProductList(res.data);
      setProductPaginationInfoByTab(res?.data)
      setUpdateCategory(false);
    } catch (error) {
      // Catch and handle errors
    } finally {
      // Always set loading to false when the API call is done (whether successful or failed)
      setLoading(false);
    }
  }

  
  //   getSubCategoriesApi
  const fetchHosePipeList = async (sortValue, productTypes = []) => {
    // Set loading to true when the API call starts
    setLoading(true);
    try {
      const res = await getProductApi(
        currentPage,
        sort,
        sortValue,
        searchInputValue,
        productTypes
      );

      console.log("res.data", res.data)

      setEndFittingsProductList(res.data);
      setProductPaginationInfoByTab(res?.data)
      setUpdateCategory(false);
    } catch (error) {
      // Catch and handle errors
    } finally {
      // Always set loading to false when the API call is done (whether successful or failed)
      setLoading(false);
    }
  }

  //fetchFittingAccessoriesProductList
  const fetchFittingAccessoriesProductList = async (sortValue, productTypes = []) => {
    // Set loading to true when the API call starts
    setLoading(true);
    try {
      const res = await getProductApi(
        currentPage,
        sort,
        sortValue,
        searchInputValue,
        productTypes
      );

      setFittingAccessoriesProductList(res.data);
      setProductPaginationInfoByTab(res?.data)
      setUpdateCategory(false);
    } catch (error) {
      // Catch and handle errors
    } finally {
      // Always set loading to false when the API call is done (whether successful or failed)
      setLoading(false);
    }
  }

  //fetchTubeFittingProductList
  const fetchTubeFittingProductList = async (sortValue, productTypes = []) => {
    // Set loading to true when the API call starts
    setLoading(true);
    try {
      const res = await getProductApi(
        currentPage,
        sort,
        sortValue,
        searchInputValue,
        productTypes
      );

      setTubeFittingsProductList(res.data);
      setProductPaginationInfoByTab(res?.data)

      setUpdateCategory(false);
    } catch (error) {
      // Catch and handle errors
    } finally {
      // Always set loading to false when the API call is done (whether successful or failed)
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   fetchProductList();
  // }, [UpdateCategory, currentPage, sort, debouncedSearchValue]);

  const handleUpdateSubmit = async () => {
    try {
      const res = await UpdateThread(editCategoryId, formData);
      if (res.status === 200) {
        setUpdateCategory(true);
        Toaster.success(res?.data?.message);
        resetForm();
        setModalCentered(false);
        setIsEdit(false);

        // fetchProductList();
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
      // fetchProductList(sortValue);
    } else {
      const sortValue = { value: name, type: "dsc" };
      // fetchProductList(sortValue);
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
        // fetchProductList();
        const productTypes = categoryMap[active];
        if (active === "Hose Assembly") {
          fetchHoseAssemblyProductList(0, productTypes);
        } else if (active === "End Fittings and Parts") {
          fetchEndFittingsPartsProductList(0, productTypes);
        } else if (active === "Fitting Accessories") {
          fetchFittingAccessoriesProductList(0, productTypes);
        } else if (active === "Tube Fittings") {
          fetchTubeFittingProductList(0, productTypes);
        }
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
        // fetchProductList()
        // ✅ Re-fetch only non-deleted products based on active category

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

  // Reset filter
  const handleResetFilter = () => {
    setSelectedDrpProduct("");
    setSelectedDrpPart("");
    setSelectedDrpWireType("");
    setSelectedDrpFerrule("");
    setSelectedDrpFittingDashSize("");
    setSelectedDrpHoseDashSize("");
    setSelectedDrpFittingThread("");
    setSelectedDrpStraightBendangle("");
    setSelectedDrpFittingPiece("");
    setSelectedDrpSkiveTypeOptions("");
    setSelectedSortOptions("")
  };

  const handleFilter = async () => {
    // try {
    // Construct query parameters
    const queryParams = new URLSearchParams();
    // if (endFittingType) queryParams.append("product_unit", endFittingType);
    // if (wireType) queryParams.append("wire_type", wireType);
    //     const response = await filterInventoryItemApi(queryParams);
    //     console.log(response?.data?.data,"response")
    //     console.log(response?.data?.data,"response")
    //     setProductList(response?.data?.data);
    //     setAnalyticsData(response?.data)
    //     // const response = await axios.get(`/api/inventories?${queryParams.toString()}`);
    //     // setData(response.data);
    // } catch (error) {
    //     console.error("Error fetching data:", error);
    // } finally {
    //     setLoading(false);
    // }
  };

  const categoryMap = {
    "Fitting Accessories": ["Sleeve", "Packing", "Vinyl Cover", "Dust Cap", "O-ring", "Spring"],
    "End Fittings and Parts": ["End Fittings", "Nut", "Nipple", "Cap"],
    "Hose Pipe": ["Hose Pipe"],
    "Hose Assembly": ["Hose Assembly"],
    "Tube Fittings": ["Tube Fittings"]
  };
  // const buttons = Object.keys(categoryMap);

  useEffect(() => {
    if (active === "Hose Assembly") {
      const productTypes = categoryMap[active];
      fetchHoseAssemblyProductList(sort, productTypes)
    }
    if (active === "End Fittings and Parts") {
      const productTypes = categoryMap[active];
      fetchEndFittingsPartsProductList(sort, productTypes)
    }
    if (active === "Fitting Accessories") {
      const productTypes = categoryMap[active];
      fetchFittingAccessoriesProductList(sort, productTypes)
    }
    if (active === "Tube Fittings") {
      const productTypes = categoryMap[active];
      fetchTubeFittingProductList(sort, productTypes)
    }
    if (active === "Hose Pipe") {
      const productTypes = categoryMap[active];
      fetchHosePipeList(sort, productTypes)
    }
  }, [active, currentPage, sort])



  useEffect(() => {
    const fetchAllInitialOptions = async () => {
      await Promise.all([
        fetchAllOptions(),
        fetchFittingDashSizeOptions(),
        fetchHoseDashSizeOptions(),
        fetchFittingThreadOptions(),
        fetchBendAngleOptions(),
      ]);
    };

    if (filterOpen) {
      fetchAllInitialOptions();
    }

  }, [filterOpen]);

  return (
    <>
      <DeleteWarningMdl title={"table data"} showDeleteMdl={showDeleteMdl} setShowDeleteMdl={setShowDeleteMdl}
        setDeleteTableDataId={setDeleteTableDataId} handleDeleteSubmit={handleDeleteSubmit} />
      <ToastContainer />
      <Loader visible={loading} />
      <PageTitle
        activeMenu={"Product List"}
        motherMenu={"Home"}
        motherMenuLink={"/dashboard"}
      />
      <ProductDetailModal
        productDetailData={productDetailData}
        showProductDetailModal={showProductDetailModal}
        setShowProductDetailModal={setShowProductDetailModal}
        categoryMap={categoryMap}
        fetchHoseAssemblyProductList={fetchHoseAssemblyProductList}
        fetchEndFittingsPartsProductList={fetchEndFittingsPartsProductList}
        fetchFittingAccessoriesProductList={fetchFittingAccessoriesProductList}
        fetchTubeFittingProductList={fetchTubeFittingProductList}
      />
      <ProductQrCodeViewModal productDetailData={productDetailData} showProductQrDetailModal={showProductQrDetailModal} setShowProductQrDetailModal={setShowProductQrDetailModal} />
      <Row>
        <Col lg={12}>
          <div className="card">
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
                    {/* <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "1px", flexWrap: "wrap" }}>
                      {buttons.map((label) => (
                        <button
                          key={label}
                          onClick={() => setActive(label)}
                          style={{
                            height: "35px",
                            padding: "6px 16px",
                            borderRadius: "12px",
                            fontSize: "14px",
                            fontWeight: "500",
                            transition: "all 0.2s ease-in-out",
                            border: active === label ? "1px solid #7C3AED" : "1px solid #BEE3F8",
                            backgroundColor: active === label ? "#7C3AED" : "#E0F2FE",
                            color: active === label ? "#FFFFFF" : "#075985",
                            transform: active === label ? "scale(0.95)" : "scale(1)",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                            cursor: "pointer",
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div> */}
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        justifyContent: "center",
                        marginTop: "1px",
                        flexWrap: "wrap"
                      }}
                    >
                      {buttons.map((label) => (
                        <div key={label} style={{ position: "relative", display: "inline-block" }}>
                          <button
                            onClick={() => setActive(label)}
                            onMouseEnter={() => setHovered(label)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                              height: "35px",
                              padding: "6px 16px",
                              borderRadius: "12px",
                              fontSize: "14px",
                              fontWeight: "500",
                              transition: "all 0.2s ease-in-out",
                              border: active === label ? "1px solid #7C3AED" : "1px solid #BEE3F8",
                              backgroundColor: active === label ? "#7C3AED" : "#E0F2FE",
                              color: active === label ? "#FFFFFF" : "#075985",
                              transform: active === label ? "scale(0.95)" : "scale(1)",
                              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                              cursor: "pointer",
                              position: "relative"
                            }}
                          >
                            {label}
                          </button>

                          {/* Tooltip Box */}
                          {hovered === label && (
                            <div
                              style={{
                                position: "absolute",
                                top: "42px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                backgroundColor: "#fff",
                                padding: "8px 12px",
                                borderRadius: "8px",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                                fontSize: "12px",
                                zIndex: 10,
                                whiteSpace: "nowrap",
                                color: "#333",
                                minWidth: "120px",
                              }}
                            >
                              {categoryMap[label].map((item, idx) => (
                                <div key={idx} style={{ padding: "2px 0" }}>
                                  {item}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="d-flex gap-2 dataTables_filter">
                      <label>
                        Search :
                        <input
                          type="search"
                          className=""
                          placeholder=""
                          onChange={(e) => setSearchInputValue(e.target.value)}
                        />
                      </label>
                      <div>
                        <button className="btn btn-primary" onClick={() => setFilterOpen(!filterOpen)}>
                          {filterOpen ? <AiOutlineClose size={20} /> : <FaFilter />} </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    {filterOpen && (
                      <div
                        className="filter-box d-flex align-items-center row-12 ms-2"
                        style={{
                          gap: "10px",
                          backgroundColor: "rgb(224 242 254)",
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                          borderTopLeftRadius: "2rem",
                          borderBottomRightRadius: "2rem",
                          padding: "16px",
                          marginTop: "10px",
                          flexWrap: "wrap",
                          transition: "all 0.3s ease-in-out"
                        }}
                      >
                        {/* End Fitting Type Filter */}
                        <div className="d-flex gap-2 flex-wrap">
                          <FilterDropdown
                            drpList={drpProductList}
                            selectedDrpValue={selectedDrpProduct}
                            setSelectedDrpValue={setSelectedDrpProduct}
                            title="Product"
                          />

                          <FilterDropdown
                            drpList={drpPartList}
                            selectedDrpValue={selectedDrpPart}
                            setSelectedDrpValue={setSelectedDrpPart}
                            title="Part"
                          />

                          <FilterDropdown
                            drpList={drpWireTypeList}
                            selectedDrpValue={selectedDrpWireType}
                            setSelectedDrpValue={setSelectedDrpWireType}
                            title="Wire Type"
                          />

                          <FilterDropdown
                            drpList={drpFerruleList}
                            selectedDrpValue={selectedDrpFerrule}
                            setSelectedDrpValue={setSelectedDrpFerrule}
                            title="Ferrule"
                          />

                          <FilterDropdown
                            drpList={drpFittingDashSizeList}
                            selectedDrpValue={selectedDrpFittingDashSize}
                            setSelectedDrpValue={setSelectedDrpFittingDashSize}
                            title="Fitting Dash Size"
                          />

                          <FilterDropdown
                            drpList={drpHoseDashSizeList}
                            selectedDrpValue={selectedDrpHoseDashSize}
                            setSelectedDrpValue={setSelectedDrpHoseDashSize}
                            title="Hose Dash Size"
                          />

                          <FilterDropdown
                            drpList={drpFittingThreadList}
                            selectedDrpValue={selectedDrpFittingThread}
                            setSelectedDrpValue={setSelectedDrpFittingThread}
                            title="Fitting Thread"
                          />

                          <FilterDropdown
                            drpList={drpStraightBendangleList}
                            selectedDrpValue={selectedDrpStraightBendangle}
                            setSelectedDrpValue={setSelectedDrpStraightBendangle}
                            title="Bend Angle"
                          />

                          <FilterDropdown
                            drpList={drpFittingPieceList}
                            selectedDrpValue={selectedDrpFittingPiece}
                            setSelectedDrpValue={setSelectedDrpFittingPiece}
                            title="Fitting Piece"
                          />

                          <FilterDropdown
                            drpList={drpSkiveTypeOptionsList}
                            selectedDrpValue={selectedDrpSkiveTypeOptions}
                            setSelectedDrpValue={setSelectedDrpSkiveTypeOptions}
                            title="Skive Type"
                          />

                          <FilterDropdown
                            drpList={sortOptionsList}
                            selectedDrpValue={selectedSortOptions}
                            setSelectedDrpValue={setSelectedSortOptions}
                            title="Sort By:"
                          />
                        </div>
                        <Button className="filter-reset-btn" variant="danger" size="sm" onClick={handleResetFilter}>
                          <FiRefreshCcw size={18} className="me-0" />
                        </Button>
                        <Button className="ms-auto" variant="primary" size="sm" onClick={handleFilter}>Filter </Button>
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      background: '#e0f2fe', // light blue background
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#0369a1', // deep blue text
                      margin: '8px 0',
                      float: 'right',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    Total Items: <strong style={{ color: '#0c4a6e', marginLeft: 4 }}>{productPaginationInfoByTab?.totalProducts || 0}</strong>
                  </div>



                  {active === "End Fittings and Parts" && (
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
                        {
                          endFittingsProductList?.products?.length > 0 ? (
                            endFittingsProductList?.products?.map((data, ind) => (
                              <tr key={ind}

                                onClick={async (e) => {
                                  const target = e.target;
                                  if (target.tagName === "BUTTON") return; // Prevent if it's a button
                                  if (target.tagName === "INPUT" && !target.disabled) return; // Prevent if it's an input (and not disabled)
                                  if (!data?.qr_code) {
                                    try {
                                      setLoading(true); // Optional: show a loader
                                      const result = await generateQrCodeForProduct(data._id);
                                      if (result.qr_code) {
                                        data.qr_code = result.qr_code;
                                        data.qr_url = result.qr_url;

                                        // setShowProductQrDetailModal(true); // Show the modal with QR info
                                        setShowProductDetailData(data);
                                      }
                                    } catch (err) {
                                      console.error("QR Code generation failed", err);
                                    } finally {
                                      setLoading(false);
                                    }
                                  }
                                  // Open modal if clicking on any other part of the row
                                  setShowProductDetailModal(true);
                                  setShowProductDetailData(data);
                                }}

                                style={{
                                  cursor: "pointer"
                                }}

                              >
                                <td>
                                  <strong>{ind + 1}</strong>
                                </td>
                                {/* Product Code */}
                                <td
                                  // onClick={()=>{setShowProductDetailModal(true); setShowProductDetailData(data)}}

                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '55ch'
                                  }}>
                                  <span
                                    style={{
                                      fontSize: "0.875rem", // Smaller text size (adjust as needed)
                                      backgroundColor: "transparent", // Transparent background
                                      padding: "2px 6px", // Add padding for badge effect
                                      borderRadius: "10px", // Rounded corners
                                      display: "inline-block", // Ensure proper layout inside the td
                                      color: "#686D76", // Text color
                                      border: "1px solid gray", // Black border
                                    }}>
                                    {data?.product_code ? data?.product_code : "N/A"}
                                  </span>
                                </td>
                                {/* Qr Code */}
                                <td
                                  onClick={(e) => {
                                    // Prevent opening the QR detail modal if clicking on the QR code cell itself
                                    e.stopPropagation(); // Prevent the row click handler from firing
                                    setShowProductQrDetailModal(true);
                                    setShowProductDetailData(data);
                                  }}
                                  style={{
                                    padding: '10px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: '#ffffffff',
                                    borderRadius: '5px',
                                    transition: 'background-color 0.3s ease',
                                  }}
                                >
                                  <div>
                                    {data?.qr_code ? (
                                      <img
                                        src={data?.qr_code}
                                        alt="QR Code"
                                        style={{
                                          width: '40px',
                                          height: '40px',
                                          objectFit: 'contain',
                                          borderRadius: '8px',
                                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                          transition: 'transform 0.1s ease-in-out',
                                        }}
                                        onMouseEnter={(e) => {
                                          e.target.style.transform = 'scale(1.50)';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.target.style.transform = 'scale(1)';
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={dummyQR}
                                        alt="Generate QR"
                                        title="Click to Generate QR"
                                        style={{
                                          width: '40px',
                                          height: '40px',
                                          objectFit: 'contain',
                                          borderRadius: '8px',
                                          // opacity: 0.6,
                                          cursor: 'pointer',
                                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                          transition: 'transform 0.1s ease-in-out',
                                        }}
                                        onMouseEnter={(e) => {
                                          e.target.style.transform = 'scale(1.50)';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.target.style.transform = 'scale(1)';
                                        }}

                                        onClick={async (e) => {
                                          e.stopPropagation(); // prevent row click
                                          try {
                                            // Optional: You can show a spinner or loading text here
                                            setLoading(true);
                                            const result = await generateQrCodeForProduct(data._id);
                                            if (result.qr_code) {
                                              setLoading(false)
                                              data.qr_code = result.qr_code; // update the current object
                                              data.qr_url = result.qr_url
                                              setShowProductQrDetailModal(true);
                                              setShowProductDetailData(data);
                                              // setEndFittingsProductList([...formData, {qr_code:data.qr_code} ,  ]); // trigger re-render
                                            }
                                          } catch (err) {
                                            // alert("Failed to generate QR code");
                                          }
                                        }}
                                      />
                                    )}
                                  </div>
                                </td>
                                {/**Product Image */}
                                <td className="d-flex align-items-center gap-2">
                                  {data?.image && (
                                    <div
                                      onClick={(e) => {
                                        e.stopPropagation();

                                        const mainImage = {
                                          original: `${BASEURL}/images/image/${data?.image}`,
                                          thumbnail: `${BASEURL}/images/image/${data?.image}`,
                                        };

                                        const galleryImages =
                                          data?.gallery?.map((img) => ({
                                            original: `${BASEURL}/images/image/${img}`,
                                            thumbnail: `${BASEURL}/images/image/${img}`,
                                          })) || [];

                                        const allImages = [mainImage, ...galleryImages];

                                        setGalleryItems(allImages);
                                        setGalleryVisible(true);
                                      }}
                                      style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
                                    >
                                      <img
                                        className="select-file-img"
                                        src={`${BASEURL}/images/image/${data?.image}`}
                                        alt={data?.name}
                                        style={{
                                          // height: 50,
                                          // width: 50,
                                          borderRadius: 6,
                                          objectFit: 'cover',
                                          transition: 'transform 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                      />
                                    </div>
                                  )}
                                  {data?.name}
                                </td>
                                {/* product_type */}
                                <td
                                  // onClick={()=>{setShowProductDetailModal(true); setShowProductDetailData(data)}}
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',

                                  }}>
                                  {data?.product_type}
                                </td>
                                {/* fitting_thread */}
                                <td
                                  style={{
                                    textAlign: "center", // Horizontally center the content
                                    verticalAlign: "middle", // Vertically center the content
                                  }}>
                                  <span
                                    style={{
                                      // backgroundColor: fittingThreadColors[data?.fitting_thread] || "#f5f5f5", // Default to light gray if no match
                                      backgroundColor:
                                        fittingThreadColors[data?.part] || // Check for `Cap`, `Nipple`, `Nut`
                                        fittingThreadColors[data?.fitting_thread] || // Check for fitting_thread
                                        "#f5f5f5", // Default to light gray if no match
                                      color: "#000", // Black text color for better contrast
                                      padding: "5px 10px", // Padding inside the badge
                                      borderRadius: "12px", // Rounded corners
                                      fontWeight: "bold", // Bold text
                                      textAlign: "center", // Centered text
                                      display: "inline-block", // Works for the span
                                    }}>
                                    {["Cap", "Nipple", "Nut"].includes(data?.part) ? data?.part : data?.fitting_thread || "N/A"}
                                    {/* {data?.fitting_thread} */}
                                  </span>
                                </td>
                                {/* desc_Code */}
                                <td
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '75ch'
                                  }}>
                                  <span
                                    style={{
                                      fontSize: '0.875rem', // Smaller text size (adjust as needed)
                                      backgroundColor: '#F5EFFF', // White badge background
                                      padding: '2px 6px', // Add padding for badge effect
                                      borderRadius: '4px', // Rounded corners
                                      display: 'inline-block', // Ensure proper layout inside the td
                                      color: '#686D76'
                                    }}>
                                    {data?.desc_Code ? data?.desc_Code : "N/A"}
                                  </span>
                                </td>
                                {/* fitting_Code */}
                                <td
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '45ch'
                                  }}>
                                  <span
                                    style={{
                                      fontSize: '0.875rem', // Smaller text size (adjust as needed)
                                      backgroundColor: '#D9EAFD', // White badge background
                                      padding: '2px 6px', // Add padding for badge effect
                                      borderRadius: '4px', // Rounded corners
                                      display: 'inline-block', // Ensure proper layout inside the td
                                      color: '#686D76'
                                    }}>
                                    {data?.fitting_Code ? data?.fitting_Code : "N/A"}
                                  </span>
                                </td>
                                {/* design */}
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
                                    }}>
                                    {data?.design ? data?.design : "N/A"}
                                  </span>
                                </td>
                                {/* created_at */}
                                <td>
                                  {moment(data?.created_at).format(
                                    "DD MMM YYYY, h:mm:ss a"
                                  )}
                                </td>
                                {/* status */}
                                <td>
                                  <div onClick={(e) => e.stopPropagation()}>
                                    <Switch
                                      checked={data?.status}
                                      onChange={() => handleStatusChange(data?._id, data?.status)}
                                      offColor="#f0f1ff"
                                      onColor="#6a73fa"
                                      offHandleColor="#6a73fa"
                                      onHandleColor="#fff"
                                      uncheckedIcon={false}
                                      checkedIcon={false}
                                      width={40}
                                      height={20}
                                    />
                                  </div>
                                </td>
                                {/* Edit and Delete */}
                                <td>
                                  <button className="btn btn-xs sharp btn-primary me-1"
                                    // onClick={() => handleEditThread(data?._id)}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent row click handler from firing when button is clicked
                                      handleEditThread(data?._id);
                                    }}>
                                    <i className="fa fa-pencil" />
                                  </button>

                                  <button className="btn btn-xs sharp btn-danger"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent row click handler from firing when button is clicked
                                      handleDeleteProduct(data?._id);
                                    }}
                                  >
                                    <i className="fa fa-trash" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="10">
                                <div style={{
                                  textAlign: "center",
                                  padding: "20px",
                                  fontSize: "16px",
                                  color: "#888"
                                }}>
                                  No Data Found
                                </div>
                              </td>
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
                  )}

                  {active === "Hose Pipe" && (
                    <table id="example4" className="display dataTable no-footer w-100">
                      <thead>
                        <tr>
                          {theadDataHosePipe?.map((item, ind) => {
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
                        {
                          endFittingsProductList?.products?.length > 0 ? (
                            endFittingsProductList?.products?.map((data, ind) => (
                              <tr key={ind}

                                onClick={async (e) => {
                                  const target = e.target;
                                  if (target.tagName === "BUTTON") return; // Prevent if it's a button
                                  if (target.tagName === "INPUT" && !target.disabled) return; // Prevent if it's an input (and not disabled)
                                  if (!data?.qr_code) {
                                    try {
                                      setLoading(true); // Optional: show a loader
                                      const result = await generateQrCodeForProduct(data._id);
                                      if (result.qr_code) {
                                        data.qr_code = result.qr_code;
                                        data.qr_url = result.qr_url;

                                        // setShowProductQrDetailModal(true); // Show the modal with QR info
                                        setShowProductDetailData(data);
                                      }
                                    } catch (err) {
                                      console.error("QR Code generation failed", err);
                                    } finally {
                                      setLoading(false);
                                    }
                                  }
                                  // Open modal if clicking on any other part of the row
                                  setShowProductDetailModal(true);
                                  setShowProductDetailData(data);
                                }}

                                style={{
                                  cursor: "pointer"
                                }}

                              >
                                <td>
                                  <strong>{ind + 1}</strong>
                                </td>
                                {/* Product Code */}
                                <td
                                  // onClick={()=>{setShowProductDetailModal(true); setShowProductDetailData(data)}}

                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '55ch'
                                  }}>
                                  <span
                                    style={{
                                      fontSize: "0.875rem", // Smaller text size (adjust as needed)
                                      backgroundColor: "transparent", // Transparent background
                                      padding: "2px 6px", // Add padding for badge effect
                                      borderRadius: "10px", // Rounded corners
                                      display: "inline-block", // Ensure proper layout inside the td
                                      color: "#686D76", // Text color
                                      border: "1px solid gray", // Black border
                                    }}>
                                    {data?.product_code ? data?.product_code : "N/A"}
                                  </span>
                                </td>
                                {/* Qr Code */}
                                <td
                                  onClick={(e) => {
                                    // Prevent opening the QR detail modal if clicking on the QR code cell itself
                                    e.stopPropagation(); // Prevent the row click handler from firing
                                    setShowProductQrDetailModal(true);
                                    setShowProductDetailData(data);
                                  }}
                                  style={{
                                    padding: '10px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '5px',
                                    transition: 'background-color 0.3s ease',
                                  }}
                                >
                                  <div>
                                    {data?.qr_code ? (
                                      <img
                                        src={data?.qr_code}
                                        alt="QR Code"
                                        style={{
                                          width: '40px',
                                          height: '40px',
                                          objectFit: 'contain',
                                          borderRadius: '8px',
                                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                          transition: 'transform 0.1s ease-in-out',
                                        }}
                                        onMouseEnter={(e) => {
                                          e.target.style.transform = 'scale(1.50)';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.target.style.transform = 'scale(1)';
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={dummyQR}
                                        alt="Generate QR"
                                        title="Click to Generate QR"
                                        style={{
                                          width: '40px',
                                          height: '40px',
                                          objectFit: 'contain',
                                          borderRadius: '8px',
                                          // opacity: 0.6,
                                          cursor: 'pointer',
                                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                          transition: 'transform 0.1s ease-in-out',
                                        }}
                                        onMouseEnter={(e) => {
                                          e.target.style.transform = 'scale(1.50)';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.target.style.transform = 'scale(1)';
                                        }}

                                        onClick={async (e) => {
                                          e.stopPropagation(); // prevent row click
                                          try {
                                            // Optional: You can show a spinner or loading text here
                                            setLoading(true);
                                            const result = await generateQrCodeForProduct(data._id);
                                            if (result.qr_code) {
                                              setLoading(false)
                                              data.qr_code = result.qr_code; // update the current object
                                              data.qr_url = result.qr_url
                                              setShowProductQrDetailModal(true);
                                              setShowProductDetailData(data);
                                              // setEndFittingsProductList([...formData, {qr_code:data.qr_code} ,  ]); // trigger re-render
                                            }
                                          } catch (err) {
                                            // alert("Failed to generate QR code");
                                          }
                                        }}
                                      />
                                    )}
                                  </div>
                                </td>
                                {/**Product Image */}
                                <td className="d-flex align-items-center gap-2">
                                  {data?.image && (
                                    <div
                                      onClick={(e) => {
                                        e.stopPropagation();

                                        const mainImage = {
                                          original: `${BASEURL}/images/image/${data?.image}`,
                                          thumbnail: `${BASEURL}/images/image/${data?.image}`,
                                        };

                                        const galleryImages =
                                          data?.gallery?.map((img) => ({
                                            original: `${BASEURL}/images/image/${img}`,
                                            thumbnail: `${BASEURL}/images/image/${img}`,
                                          })) || [];

                                        const allImages = [mainImage, ...galleryImages];

                                        setGalleryItems(allImages);
                                        setGalleryVisible(true);
                                      }}
                                      style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
                                    >
                                      <img
                                        className="select-file-img"
                                        src={`${BASEURL}/images/image/${data?.image}`}
                                        alt={data?.name}
                                        style={{
                                          // height: 50,
                                          // width: 50,
                                          borderRadius: 6,
                                          objectFit: 'cover',
                                          transition: 'transform 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                      />
                                    </div>
                                  )}
                                  {data?.name}
                                </td>
                                {/* product_type */}
                                <td
                                  // onClick={()=>{setShowProductDetailModal(true); setShowProductDetailData(data)}}
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',

                                  }}>
                                  {data?.product_type}
                                </td>
                                
                                {/* desc_Code */}
                                <td
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '75ch'
                                  }}>
                                  <span
                                    style={{
                                      fontSize: '0.875rem', // Smaller text size (adjust as needed)
                                      backgroundColor: '#F5EFFF', // White badge background
                                      padding: '2px 6px', // Add padding for badge effect
                                      borderRadius: '4px', // Rounded corners
                                      display: 'inline-block', // Ensure proper layout inside the td
                                      color: '#686D76'
                                    }}>
                                    {data?.desc_Code ? data?.desc_Code : "N/A"}
                                  </span>
                                </td>
                                {/* hose_Code */}
                                <td
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '45ch'
                                  }}>
                                  <span
                                    style={{
                                      fontSize: '0.875rem', // Smaller text size (adjust as needed)
                                      backgroundColor: '#D9EAFD', // White badge background
                                      padding: '2px 6px', // Add padding for badge effect
                                      borderRadius: '4px', // Rounded corners
                                      display: 'inline-block', // Ensure proper layout inside the td
                                      color: '#686D76'
                                    }}>
                                    {data?.fitting_Code ? data?.fitting_Code : "N/A"}
                                  </span>
                                </td>
                                {/* created_at */}
                                <td>
                                  {moment(data?.created_at).format(
                                    "DD MMM YYYY, h:mm:ss a"
                                  )}
                                </td>
                                {/* status */}
                                <td>
                                  <div onClick={(e) => e.stopPropagation()}>
                                    <Switch
                                      checked={data?.status}
                                      onChange={() => handleStatusChange(data?._id, data?.status)}
                                      offColor="#f0f1ff"
                                      onColor="#6a73fa"
                                      offHandleColor="#6a73fa"
                                      onHandleColor="#fff"
                                      uncheckedIcon={false}
                                      checkedIcon={false}
                                      width={40}
                                      height={20}
                                    />
                                  </div>
                                </td>
                                {/* Edit and Delete */}
                                <td>
                                  <button className="btn btn-xs sharp btn-primary me-1"
                                    // onClick={() => handleEditThread(data?._id)}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent row click handler from firing when button is clicked
                                      handleEditThread(data?._id);
                                    }}>
                                    <i className="fa fa-pencil" />
                                  </button>

                                  <button className="btn btn-xs sharp btn-danger"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent row click handler from firing when button is clicked
                                      handleDeleteProduct(data?._id);
                                    }}
                                  >
                                    <i className="fa fa-trash" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="10">
                                <div style={{
                                  textAlign: "center",
                                  padding: "20px",
                                  fontSize: "16px",
                                  color: "#888"
                                }}>
                                  No Data Found
                                </div>
                              </td>
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
                  )}

                  {active === "Hose Assembly" && (
                    <table id="example4" className="display dataTable no-footer w-100">
                      <thead>
                        <tr>
                          {theadDataHoseAssembly?.map((item, ind) => {
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
                                style={{
                                  whiteSpace: "normal",
                                  maxWidth: "150px", // Set desired width
                                }}
                              >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                  <span style={{}}>{item.heading}</span>
                                  <span>
                                    {ind !== iconData.ind && (
                                      <i className="fa fa-sort ms-2 fs-12" style={{ opacity: "0.3" }} />
                                    )}
                                    {ind === iconData.ind &&
                                      (iconData.complete ? (
                                        <i className="fa fa-arrow-down ms-2 fs-12" style={{ opacity: "0.7" }} />
                                      ) : (
                                        <i className="fa fa-arrow-up ms-2 fs-12" style={{ opacity: "0.7" }} />
                                      ))}
                                  </span>
                                </div>
                              </th>

                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {
                          hoseAssemblyProductList?.products?.length > 0 ? (
                            hoseAssemblyProductList?.products?.map((data, ind) => (
                              <tr key={ind}

                                onClick={async (e) => {
                                  const target = e.target;
                                  if (target.tagName === "BUTTON") return; // Prevent if it's a button
                                  if (target.tagName === "INPUT" && !target.disabled) return; // Prevent if it's an input (and not disabled)
                                  if (!data?.qr_code) {
                                    try {
                                      setLoading(true); // Optional: show a loader
                                      const result = await generateQrCodeForProduct(data._id);
                                      if (result.qr_code) {
                                        data.qr_code = result.qr_code;
                                        data.qr_url = result.qr_url;

                                        // setShowProductQrDetailModal(true); // Show the modal with QR info
                                        setShowProductDetailData(data);
                                      }
                                    } catch (err) {
                                      console.error("QR Code generation failed", err);
                                    } finally {
                                      setLoading(false);
                                    }
                                  }
                                  // Open modal if clicking on any other part of the row
                                  setShowProductDetailModal(true);
                                  setShowProductDetailData(data);
                                }}

                                style={{
                                  cursor: "pointer"
                                }}
                              >
                                {/* Index */}
                                <td>
                                  <strong>{ind + 1}</strong>
                                </td>
                                {/* Product Code */}
                                <td
                                  // onClick={()=>{setShowProductDetailModal(true); setShowProductDetailData(data)}}
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '55ch'
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "0.875rem", // Smaller text size (adjust as needed)
                                      backgroundColor: "transparent", // Transparent background
                                      padding: "2px 6px", // Add padding for badge effect
                                      borderRadius: "10px", // Rounded corners
                                      display: "inline-block", // Ensure proper layout inside the td
                                      color: "#686D76", // Text color
                                      border: "1px solid gray", // Black border
                                    }}
                                  >
                                    {data?.product_code ? data?.product_code : "N/A"}
                                  </span>
                                </td>
                                {/* Qr Code */}
                                <td
                                  onClick={(e) => {
                                    // Prevent opening the QR detail modal if clicking on the QR code cell itself
                                    e.stopPropagation(); // Prevent the row click handler from firing
                                    setShowProductQrDetailModal(true);
                                    setShowProductDetailData(data);
                                  }}
                                  style={{
                                    padding: '10px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '5px',
                                    transition: 'background-color 0.3s ease',
                                  }}
                                >
                                  <div>
                                    {data?.qr_code ? (
                                      <img
                                        src={data?.qr_code}
                                        alt="QR Code"
                                        style={{
                                          width: '40px',
                                          height: '40px',
                                          objectFit: 'contain',
                                          borderRadius: '8px',
                                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                          transition: 'transform 0.1s ease-in-out',
                                        }}
                                        onMouseEnter={(e) => {
                                          e.target.style.transform = 'scale(1.50)';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.target.style.transform = 'scale(1)';
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={dummyQR}
                                        alt="Generate QR"
                                        title="Click to Generate QR"
                                        style={{
                                          width: '40px',
                                          height: '40px',
                                          objectFit: 'contain',
                                          borderRadius: '8px',
                                          // opacity: 0.6,
                                          cursor: 'pointer',
                                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                          transition: 'transform 0.1s ease-in-out',

                                        }}
                                        onMouseEnter={(e) => {
                                          e.target.style.transform = 'scale(1.50)';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.target.style.transform = 'scale(1)';
                                        }}

                                        onClick={async (e) => {
                                          e.stopPropagation(); // prevent row click
                                          try {
                                            // Optional: You can show a spinner or loading text here
                                            setLoading(true);
                                            const result = await generateQrCodeForProduct(data._id);
                                            if (result.qr_code) {
                                              setLoading(false)
                                              data.qr_code = result.qr_code; // update the current object
                                              data.qr_url = result.qr_url
                                              setShowProductQrDetailModal(true);
                                              setShowProductDetailData(data);
                                              // setEndFittingsProductList([...formData, {qr_code:data.qr_code} ,  ]); // trigger re-render
                                            }
                                          } catch (err) {
                                            // alert("Failed to generate QR code");
                                          }
                                        }}
                                      />
                                    )}
                                  </div>
                                </td>
                                {/**Product Image */}
                                <td
                                  style={{
                                    padding: '10px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    // backgroundColor: '#f4f4f4',
                                    // borderRadiusColor:"ff7a41",
                                    borderRadius: '5px',

                                    transition: 'background-color 0.3s ease',
                                  }}
                                >
                                  {data?.image && (
                                    <div
                                      onClick={(e) => {
                                        e.stopPropagation();

                                        const mainImage = {
                                          original: `${BASEURL}/images/image/${data?.image}`,
                                          thumbnail: `${BASEURL}/images/image/${data?.image}`,
                                        };

                                        const galleryImages =
                                          data?.gallery?.map((img) => ({
                                            original: `${BASEURL}/images/image/${img}`,
                                            thumbnail: `${BASEURL}/images/image/${img}`,
                                          })) || [];

                                        const allImages = [mainImage, ...galleryImages];

                                        setGalleryItems(allImages);
                                        setGalleryVisible(true);
                                      }}
                                      style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
                                    >
                                      <img
                                        className="select-file-img"
                                        src={`${BASEURL}/images/image/${data?.image}`}
                                        alt={data?.name}
                                        style={{
                                          // height: 50,
                                          // width: 50,
                                          borderRadius: 6,
                                          objectFit: 'cover',
                                          transition: 'transform 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                      />
                                    </div>
                                  )}
                                  {data?.name}
                                </td>
                                {/* Product Type*/}
                                <td
                                  // onClick={()=>{setShowProductDetailModal(true); setShowProductDetailData(data)}}
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',

                                  }}
                                >
                                  {data?.product_type}
                                </td>
                                {/* Hose */}
                                <td >
                                  <span style={{
                                    backgroundColor: '#edbb3a', // light lemon
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    padding: '2px 6px',
                                    borderRadius: '10px',
                                    whiteSpace: 'nowrap',
                                    display: 'inline-block',
                                    color: "black"
                                  }}>
                                    {data?.hose ? data?.hose : "N/A"}
                                  </span>
                                </td>
                                <td>
                                  <div
                                    style={{
                                      border: '1px solid #cfcffc',
                                      borderRadius: '10px',
                                      padding: '8px 10px',
                                      backgroundColor: '#f9f9ff',
                                      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: '6px',
                                      minWidth: '160px'
                                    }}
                                  >
                                    {/* Description */}
                                    <div
                                      style={{
                                        backgroundColor: 'rgb(210, 205, 255)',
                                        padding: '6px 10px',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#2c2c2c',
                                        whiteSpace: 'nowrap'
                                      }}
                                    >
                                      {data?.fitting_a_description ? data?.fitting_a_description : "N/A"}
                                    </div>

                                    {/* Fitting Code */}
                                    <div
                                      style={{
                                        backgroundColor: 'rgb(235, 230, 255)',
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        color: '#4f4f4f',
                                        whiteSpace: 'nowrap'
                                      }}
                                    >
                                      {data?.fitting_a_fitting_Code ? data?.fitting_a_fitting_Code : "N/A"}
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <div
                                    style={{
                                      border: '1px solid #cfcffc',
                                      borderRadius: '10px',
                                      padding: '8px 10px',
                                      backgroundColor: '#f9f9ff',
                                      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: '6px',
                                      minWidth: '160px'
                                    }}
                                  >
                                    {/* Description */}
                                    <div
                                      style={{
                                        backgroundColor: 'rgb(210, 205, 255)',
                                        padding: '6px 10px',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#2c2c2c',
                                        whiteSpace: 'nowrap'
                                      }}
                                    >
                                      {data?.fitting_b_description ? data?.fitting_b_description : "N/A"}
                                    </div>

                                    {/* Fitting Code */}
                                    <div
                                      style={{
                                        backgroundColor: 'rgb(235, 230, 255)',
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        color: '#4f4f4f',
                                        whiteSpace: 'nowrap'
                                      }}
                                    >
                                      {data?.fitting_b_fitting_Code ? data?.fitting_b_fitting_Code : "N/A"}
                                    </div>
                                  </div>
                                </td>

                                <td style={{
                                  textAlign: 'center', // Horizontally center the content
                                  verticalAlign: 'middle', // Vertically center the content
                                }}>
                                  <span
                                    style={{
                                      backgroundColor: "#f0f4ff", // Light blue background
                                      color: "rgb(48 46 45)", // Text color
                                      padding: "5px 10px", // Padding inside the badge
                                      borderRadius: "12px", // Rounded corners
                                      fontWeight: "bold", // Bold text
                                      textAlign: "center", // Centered text
                                      display: "inline-block", // Works for the span
                                    }}>
                                    {data?.assembly_length ? data?.assembly_length : "N/A"}
                                  </span>
                                </td>

                                <td style={{
                                  textAlign: 'center', // Horizontally center the content
                                  verticalAlign: 'middle', // Vertically center the content
                                }}>
                                  <span
                                    style={{
                                      backgroundColor: "#f0f4ff", // Light blue background
                                      color: "rgb(48 46 45)", // Text color
                                      padding: "5px 10px", // Padding inside the badge
                                      borderRadius: "12px", // Rounded corners
                                      fontWeight: "bold", // Bold text
                                      textAlign: "center", // Centered text
                                      display: "inline-block", // Works for the span
                                    }}>
                                    {data?.fitting_length ? data?.fitting_length : "N/A"}
                                  </span>
                                </td>

                                <td style={{
                                  textAlign: 'center', // Horizontally center the content
                                  verticalAlign: 'middle', // Vertically center the content
                                }}>
                                  <span
                                    style={{
                                      backgroundColor: "#f0f4ff", // Light blue background
                                      color: "rgb(48 46 45)", // Text color
                                      padding: "5px 10px", // Padding inside the badge
                                      borderRadius: "12px", // Rounded corners
                                      fontWeight: "bold", // Bold text
                                      textAlign: "center", // Centered text
                                      display: "inline-block", // Works for the span
                                    }}>
                                    {data?.cutting_length ? data?.cutting_length : "N/A"}
                                  </span>
                                </td>

                                <td style={{
                                  textAlign: 'center', // Horizontally center the content
                                  verticalAlign: 'middle', // Vertically center the content
                                }}>
                                  <span
                                    style={{
                                      backgroundColor: "#f0f4ff", // Light blue background
                                      color: "rgb(48 46 45)", // Text color
                                      padding: "5px 10px", // Padding inside the badge
                                      borderRadius: "12px", // Rounded corners
                                      fontWeight: "bold", // Bold text
                                      textAlign: "center", // Centered text
                                      display: "inline-block", // Works for the span
                                    }}>
                                    {data?.oa ? data?.oa : "N/A"}
                                  </span>
                                </td>

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
                                    }}>
                                    {data?.guard_type ? data?.guard_type : "N/A"}
                                  </span>
                                </td>

                                <td>
                                  <span
                                    style={{
                                      backgroundColor: "#f0f4ff", // Light blue background
                                      color: "rgb(250 106 152)", // Text color
                                      padding: "5px 10px", // Padding inside the badge
                                      borderRadius: "12px", // Rounded corners
                                      fontWeight: "bold", // Bold text
                                      textAlign: "center", // Centered text
                                      display: "inline-block", // Works for the span
                                      whiteSpace: 'nowrap',

                                    }}>
                                    {data?.guard ? data?.guard : "N/A"}
                                  </span>
                                </td>

                                <td>
                                  {moment(data?.created_at).format(
                                    "DD MMM YYYY, h:mm:ss a"
                                  )}
                                </td>

                                <td>
                                  <div onClick={(e) => e.stopPropagation()}>
                                    <Switch
                                      checked={data?.status}
                                      onChange={() => handleStatusChange(data?._id, data?.status)}
                                      offColor="#f0f1ff"
                                      onColor="#6a73fa"
                                      offHandleColor="#6a73fa"
                                      onHandleColor="#fff"
                                      uncheckedIcon={false}
                                      checkedIcon={false}
                                      width={40}
                                      height={20}
                                    />
                                  </div>
                                </td>

                                <td>
                                  <button className="btn btn-xs sharp btn-primary me-1"
                                    // onClick={() => handleEditThread(data?._id)}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent row click handler from firing when button is clicked
                                      handleEditThread(data?._id);
                                    }}>
                                    <i className="fa fa-pencil" />
                                  </button>

                                  <button className="btn btn-xs sharp btn-danger"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent row click handler from firing when button is clicked
                                      handleDeleteProduct(data?._id);
                                    }}
                                  >
                                    <i className="fa fa-trash" />
                                  </button>
                                </td>

                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="10">
                                <div style={{
                                  textAlign: "center",
                                  padding: "20px",
                                  fontSize: "16px",
                                  color: "#888"
                                }}>
                                  No Data Found
                                </div>
                              </td>
                            </tr>
                          )
                        }
                      </tbody>

                    </table>
                  )}

                  {active === "Fitting Accessories" && (
                    <table id="example4" className="display dataTable no-footer w-100">
                      <thead>
                        <tr>
                          {theadDatafittingAccessory?.map((item, ind) => {
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
                        {
                          fittingAccessoriesProductList?.products?.length > 0 ? (
                            fittingAccessoriesProductList?.products?.map((data, ind) => (
                              <tr key={ind}
                                onClick={async (e) => {
                                  const target = e.target;
                                  if (target.tagName === "BUTTON") return; // Prevent if it's a button
                                  if (target.tagName === "INPUT" && !target.disabled) return; // Prevent if it's an input (and not disabled)
                                  if (!data?.qr_code) {
                                    try {
                                      setLoading(true); // Optional: show a loader
                                      const result = await generateQrCodeForProduct(data._id);
                                      if (result.qr_code) {
                                        data.qr_code = result.qr_code;
                                        data.qr_url = result.qr_url;

                                        // setShowProductQrDetailModal(true); // Show the modal with QR info
                                        setShowProductDetailData(data);
                                      }
                                    } catch (err) {
                                      console.error("QR Code generation failed", err);
                                    } finally {
                                      setLoading(false);
                                    }
                                  }
                                  // Open modal if clicking on any other part of the row
                                  setShowProductDetailModal(true);
                                  setShowProductDetailData(data);
                                }}

                                style={{
                                  cursor: "pointer"
                                }}
                              >
                                {/* Index */}
                                <td>
                                  <strong>{ind + 1}</strong>
                                </td>
                                {/* Product Code */}
                                <td
                                  // onClick={()=>{setShowProductDetailModal(true); setShowProductDetailData(data)}}
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '55ch'
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "0.875rem", // Smaller text size (adjust as needed)
                                      backgroundColor: "transparent", // Transparent background
                                      padding: "2px 6px", // Add padding for badge effect
                                      borderRadius: "10px", // Rounded corners
                                      display: "inline-block", // Ensure proper layout inside the td
                                      color: "#686D76", // Text color
                                      border: "1px solid gray", // Black border
                                    }}
                                  >
                                    {data?.product_code ? data?.product_code : "N/A"}
                                  </span>
                                </td>
                                {/* QR Code */}

                                <td
                                  onClick={(e) => {
                                    // Prevent opening the QR detail modal if clicking on the QR code cell itself
                                    e.stopPropagation(); // Prevent the row click handler from firing
                                    setShowProductQrDetailModal(true);
                                    setShowProductDetailData(data);
                                  }}
                                  style={{
                                    padding: '10px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '5px',
                                    transition: 'background-color 0.3s ease',
                                  }}
                                >
                                  <div>
                                    {data?.qr_code ? (
                                      <img
                                        src={data?.qr_code}
                                        alt="QR Code"
                                        style={{
                                          width: '40px',
                                          height: '40px',
                                          objectFit: 'contain',
                                          borderRadius: '8px',
                                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                          transition: 'transform 0.1s ease-in-out',
                                        }}
                                        onMouseEnter={(e) => {
                                          e.target.style.transform = 'scale(1.50)';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.target.style.transform = 'scale(1)';
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={dummyQR}
                                        alt="Generate QR"
                                        title="Click to Generate QR"
                                        style={{
                                          width: '40px',
                                          height: '40px',
                                          objectFit: 'contain',
                                          borderRadius: '8px',
                                          // opacity: 0.6,
                                          cursor: 'pointer',
                                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                          transition: 'transform 0.1s ease-in-out',
                                        }}
                                        onMouseEnter={(e) => {
                                          e.target.style.transform = 'scale(1.50)';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.target.style.transform = 'scale(1)';
                                        }}

                                        onClick={async (e) => {
                                          e.stopPropagation(); // prevent row click
                                          try {
                                            // Optional: You can show a spinner or loading text here
                                            setLoading(true);
                                            const result = await generateQrCodeForProduct(data._id);
                                            if (result.qr_code) {
                                              setLoading(false)
                                              data.qr_code = result.qr_code; // update the current object
                                              data.qr_url = result.qr_url
                                              setShowProductQrDetailModal(true);
                                              setShowProductDetailData(data);
                                              // setEndFittingsProductList([...formData, {qr_code:data.qr_code} ,  ]); // trigger re-render
                                            }
                                          } catch (err) {
                                            // alert("Failed to generate QR code");
                                          }
                                        }}
                                      />
                                    )}
                                  </div>
                                </td>
                                {/**Product Image */}
                                <td className="d-flex align-item-center"

                                  style={{
                                    padding: '10px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    // backgroundColor: '#f4f4f4',
                                    // borderRadiusColor:"ff7a41",
                                    borderRadius: '5px',

                                    transition: 'background-color 0.3s ease',
                                  }}
                                >
                                  {data?.image && (
                                    <div
                                      onClick={(e) => {
                                        e.stopPropagation();

                                        const mainImage = {
                                          original: `${BASEURL}/images/image/${data?.image}`,
                                          thumbnail: `${BASEURL}/images/image/${data?.image}`,
                                        };

                                        const galleryImages =
                                          data?.gallery?.map((img) => ({
                                            original: `${BASEURL}/images/image/${img}`,
                                            thumbnail: `${BASEURL}/images/image/${img}`,
                                          })) || [];

                                        const allImages = [mainImage, ...galleryImages];

                                        setGalleryItems(allImages);
                                        setGalleryVisible(true);
                                      }}
                                      style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
                                    >
                                      <img
                                        className="select-file-img"
                                        src={`${BASEURL}/images/image/${data?.image}`}
                                        alt={data?.name}
                                        style={{
                                          // height: 50,
                                          // width: 50,
                                          borderRadius: 6,
                                          objectFit: 'cover',
                                          transition: 'transform 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                      />
                                    </div>
                                  )}
                                  {data?.name}
                                </td>
                                {/* Product Type*/}
                                <td
                                  // onClick={()=>{setShowProductDetailModal(true); setShowProductDetailData(data)}}
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',

                                  }}
                                >
                                  {data?.product_type}
                                </td>
                                {/* desc_Code */}
                                <td >
                                  <span style={{
                                    backgroundColor: 'rgb(255 205 227)', // light lemon
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    padding: '2px 6px',
                                    borderRadius: '10px',
                                    whiteSpace: 'nowrap',
                                    display: 'inline-block',
                                    color: 'black'
                                  }}>
                                    {data?.desc_Code ? data?.desc_Code : "N/A"}
                                  </span>
                                </td>

                                <td>
                                  {moment(data?.created_at).format(
                                    "DD MMM YYYY, h:mm:ss a"
                                  )}
                                </td>

                                <td>
                                  <div onClick={(e) => e.stopPropagation()}>
                                    <Switch
                                      checked={data?.status}
                                      onChange={() => handleStatusChange(data?._id, data?.status)}
                                      offColor="#f0f1ff"
                                      onColor="#6a73fa"
                                      offHandleColor="#6a73fa"
                                      onHandleColor="#fff"
                                      uncheckedIcon={false}
                                      checkedIcon={false}
                                      width={40}
                                      height={20}
                                    />
                                  </div>
                                </td>

                                <td>
                                  <button className="btn btn-xs sharp btn-primary me-1"
                                    // onClick={() => handleEditThread(data?._id)}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent row click handler from firing when button is clicked
                                      handleEditThread(data?._id);
                                    }}>
                                    <i className="fa fa-pencil" />
                                  </button>

                                  <button className="btn btn-xs sharp btn-danger"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent row click handler from firing when button is clicked
                                      handleDeleteProduct(data?._id);
                                    }}
                                  >
                                    <i className="fa fa-trash" />
                                  </button>
                                </td>

                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="10">
                                <div style={{
                                  textAlign: "center",
                                  padding: "20px",
                                  fontSize: "16px",
                                  color: "#888"
                                }}>
                                  No Data Found
                                </div>
                              </td>
                            </tr>
                          )
                        }
                      </tbody>

                    </table>
                  )}

                  {active === "Tube Fittings" && (
                    <table
                      style={{
                        overflowX: "auto",
                        overflowY: "hidden", // only scroll horizontally
                        whiteSpace: "nowrap",
                        maxWidth: "100%",
                        scrollbarWidth: "thin", // for Firefox
                      }}
                      onWheel={(e) => {
                        if (e.deltaY !== 0) {
                          e.currentTarget.scrollLeft += e.deltaY;
                        }
                      }}
                      id="example4" className="display dataTable no-footer w-100">
                      <thead>
                        <tr>
                          {

                            theadDataTubeFittings?.map((item, ind) => {
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
                        {
                          tubeFittingsProductList?.products?.length > 0 ? (
                            tubeFittingsProductList?.products?.map((data, ind) => (
                              <tr key={ind}
                                onClick={async (e) => {
                                  const target = e.target;
                                  if (target.tagName === "BUTTON") return; // Prevent if it's a button
                                  if (target.tagName === "INPUT" && !target.disabled) return; // Prevent if it's an input (and not disabled)
                                  if (!data?.qr_code) {
                                    try {
                                      setLoading(true); // Optional: show a loader
                                      const result = await generateQrCodeForProduct(data._id);
                                      if (result.qr_code) {
                                        data.qr_code = result.qr_code;
                                        data.qr_url = result.qr_url;

                                        // setShowProductQrDetailModal(true); // Show the modal with QR info
                                        setShowProductDetailData(data);
                                      }
                                    } catch (err) {
                                      console.error("QR Code generation failed", err);
                                    } finally {
                                      setLoading(false);
                                    }
                                  }
                                  // Open modal if clicking on any other part of the row
                                  setShowProductDetailModal(true);
                                  setShowProductDetailData(data);
                                }}

                                style={{
                                  cursor: "pointer"
                                }}
                              >
                                {/* Index */}
                                <td>
                                  <strong>{ind + 1}</strong>
                                </td>
                                {/* Product Code */}
                                <td
                                  // onClick={()=>{setShowProductDetailModal(true); setShowProductDetailData(data)}}
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '55ch'
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "0.875rem", // Smaller text size (adjust as needed)
                                      backgroundColor: "transparent", // Transparent background
                                      padding: "2px 6px", // Add padding for badge effect
                                      borderRadius: "10px", // Rounded corners
                                      display: "inline-block", // Ensure proper layout inside the td
                                      color: "#686D76", // Text color
                                      border: "1px solid gray", // Black border
                                    }}
                                  >
                                    {data?.product_code ? data?.product_code : "N/A"}
                                  </span>
                                </td>

                                {/* Qr Code */}
                                <td
                                  onClick={(e) => {
                                    // Prevent opening the QR detail modal if clicking on the QR code cell itself
                                    e.stopPropagation(); // Prevent the row click handler from firing
                                    setShowProductQrDetailModal(true);
                                    setShowProductDetailData(data);
                                  }}
                                  style={{
                                    padding: '10px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '5px',
                                    transition: 'background-color 0.3s ease',
                                  }}
                                >
                                  <div>
                                    {data?.qr_code ? (
                                      <img
                                        src={data?.qr_code}
                                        alt="QR Code"
                                        style={{
                                          width: '40px',
                                          height: '40px',
                                          objectFit: 'contain',
                                          borderRadius: '8px',
                                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                          transition: 'transform 0.1s ease-in-out',
                                        }}
                                        onMouseEnter={(e) => {
                                          e.target.style.transform = 'scale(1.50)';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.target.style.transform = 'scale(1)';
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={dummyQR}
                                        alt="Generate QR"
                                        title="Click to Generate QR"
                                        style={{
                                          width: '40px',
                                          height: '40px',
                                          objectFit: 'contain',
                                          borderRadius: '8px',
                                          // opacity: 0.6,
                                          cursor: 'pointer',
                                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                          transition: 'transform 0.1s ease-in-out',
                                        }}
                                        onMouseEnter={(e) => {
                                          e.target.style.transform = 'scale(1.50)';
                                        }}
                                        onMouseLeave={(e) => {
                                          e.target.style.transform = 'scale(1)';
                                        }}

                                        onClick={async (e) => {
                                          e.stopPropagation(); // prevent row click
                                          try {
                                            // Optional: You can show a spinner or loading text here
                                            setLoading(true);
                                            const result = await generateQrCodeForProduct(data._id);
                                            if (result.qr_code) {
                                              setLoading(false)
                                              data.qr_code = result.qr_code; // update the current object
                                              data.qr_url = result.qr_url
                                              setShowProductQrDetailModal(true);
                                              setShowProductDetailData(data);
                                              // setEndFittingsProductList([...formData, {qr_code:data.qr_code} ,  ]); // trigger re-render
                                            }
                                          } catch (err) {
                                            // alert("Failed to generate QR code");
                                          }
                                        }}
                                      />
                                    )}
                                  </div>
                                </td>


                                {/**Product Image */}
                                <td
                                  style={{
                                    padding: '10px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    // backgroundColor: '#f4f4f4',
                                    // borderRadiusColor:"ff7a41",
                                    borderRadius: '5px',

                                    transition: 'background-color 0.3s ease',
                                  }}
                                >
                                  {data?.image && (
                                    <div
                                      onClick={(e) => {
                                        e.stopPropagation();

                                        const mainImage = {
                                          original: `${BASEURL}/images/image/${data?.image}`,
                                          thumbnail: `${BASEURL}/images/image/${data?.image}`,
                                        };

                                        const galleryImages =
                                          data?.gallery?.map((img) => ({
                                            original: `${BASEURL}/images/image/${img}`,
                                            thumbnail: `${BASEURL}/images/image/${img}`,
                                          })) || [];

                                        const allImages = [mainImage, ...galleryImages];

                                        setGalleryItems(allImages);
                                        setGalleryVisible(true);
                                      }}
                                      style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
                                    >
                                      <img
                                        className="select-file-img"
                                        src={`${BASEURL}/images/image/${data?.image}`}
                                        alt={data?.name}
                                        style={{
                                          // height: 50,
                                          // width: 50,
                                          borderRadius: 6,
                                          objectFit: 'cover',
                                          transition: 'transform 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                      />
                                    </div>
                                  )}
                                  {data?.name}
                                </td>
                                {/* Product Type*/}
                                <td
                                  // onClick={()=>{setShowProductDetailModal(true); setShowProductDetailData(data)}}
                                  style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',

                                  }}
                                >
                                  {data?.product_type}
                                </td>
                                {/* part_Code */}
                                <td >
                                  <span style={{
                                    backgroundColor: 'rgb(255 205 227)', // light lemon
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    padding: '2px 6px',
                                    borderRadius: '10px',
                                    whiteSpace: 'nowrap',
                                    display: 'inline-block',
                                    color: 'black'
                                  }}>
                                    {data?.part_code ? data?.part_code : "N/A"}
                                  </span>
                                </td>
                                {/* part_description */}
                                <td>
                                  <div
                                    style={{
                                      // border: '1px solid #cfcffc',
                                      borderRadius: '10px',
                                      padding: '8px 10px',
                                      // backgroundColor: '#f9f9ff',
                                      // boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: '6px',
                                      minWidth: '160px',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {/* Description */}
                                    <div
                                      style={{
                                        backgroundColor: 'rgb(210, 205, 255)',
                                        padding: '6px 10px',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#2c2c2c',
                                        whiteSpace: 'nowrap'
                                      }}
                                    >
                                      {data?.part_description ? data?.part_description : "N/A"}
                                    </div>


                                  </div>
                                </td>
                                {/* tube_fitting_thread */}
                                <td style={{
                                  textAlign: 'center', // Horizontally center the content
                                  verticalAlign: 'middle', // Vertically center the content
                                  whiteSpace: 'nowrap'
                                }}>
                                  <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                    <span
                                      style={{
                                        backgroundColor: "#f0f4ff", // Light blue background
                                        color: "rgb(48 46 45)", // Text color
                                        padding: "5px 10px", // Padding inside the badge
                                        borderRadius: "12px", // Rounded corners
                                        fontWeight: "bold", // Bold text
                                        textAlign: "center", // Centered text
                                        display: "inline-block", // Works for the span
                                        whiteSpace: "nowrap"
                                      }}>
                                      {data?.tube_fitting_thread ? data?.tube_fitting_thread : "N/A"}
                                    </span>
                                  </div>
                                </td>
                                {/* tube_fitting_category */}
                                <td style={{
                                  textAlign: 'center', // Horizontally center the content
                                  verticalAlign: 'middle', // Vertically center the content
                                  whiteSpace: 'nowrap'
                                }}>
                                  <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                    <span
                                      style={{
                                        backgroundColor: "rgb(240 165 98 / 24%)", // Light blue background
                                        color: "rgb(48 46 45)", // Text color
                                        padding: "5px 10px", // Padding inside the badge
                                        borderRadius: "12px", // Rounded corners
                                        fontWeight: "bold", // Bold text
                                        textAlign: "center", // Centered text
                                        display: "inline-block", // Works for the span
                                      }}>
                                      {data?.tube_fitting_category ? data?.tube_fitting_category : "N/A"}
                                    </span>
                                  </div>
                                </td>








                                <td>
                                  {moment(data?.created_at).format(
                                    "DD MMM YYYY, h:mm:ss a"
                                  )}
                                </td>

                                <td>
                                  <div onClick={(e) => e.stopPropagation()}>
                                    <Switch
                                      checked={data?.status}
                                      onChange={() => handleStatusChange(data?._id, data?.status)}
                                      offColor="#f0f1ff"
                                      onColor="#6a73fa"
                                      offHandleColor="#6a73fa"
                                      onHandleColor="#fff"
                                      uncheckedIcon={false}
                                      checkedIcon={false}
                                      width={40}
                                      height={20}
                                    />
                                  </div>
                                </td>

                                <td>
                                  <button className="btn btn-xs sharp btn-primary me-1"
                                    // onClick={() => handleEditThread(data?._id)}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent row click handler from firing when button is clicked
                                      handleEditThread(data?._id);
                                    }}>
                                    <i className="fa fa-pencil" />
                                  </button>

                                  <button className="btn btn-xs sharp btn-danger"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent row click handler from firing when button is clicked
                                      handleDeleteProduct(data?._id);
                                    }}
                                  >
                                    <i className="fa fa-trash" />
                                  </button>
                                </td>

                              </tr>
                            ))
                          ) : (<tr>
                            <td colSpan="10">
                              <div style={{
                                textAlign: "center",
                                padding: "20px",
                                fontSize: "16px",
                                color: "#888"
                              }}>
                                No Data Found
                              </div>
                            </td>
                          </tr>)

                        }
                      </tbody>

                    </table>
                  )}

                  <div>
                    <div className="d-sm-flex text-center justify-content-end align-items-center mt-3">
                      <div className="pagination-container">
                        <ReactPaginate
                          pageCount={Math.ceil(
                            productPaginationInfoByTab?.totalProducts /
                            productPaginationInfoByTab?.rowsPerPage
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      {/* gallery View */}
      <>
        {galleryVisible && (
          <>
            <style>
              {`
                 .image-gallery-left-nav .image-gallery-svg, .image-gallery-right-nav .image-gallery-svg {
                  height: 80px;
                  width: 60px;}
              `}
            </style>
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.8)",
                zIndex: 1000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => setGalleryVisible(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "#fff",
                  borderRadius: "10px",
                  overflow: "auto",
                }}
              >
                <ImageGallery
                  items={galleryItems}
                  showPlayButton={false}
                  showFullscreenButton={true}
                  showThumbnails={true}
                  autoPlay={false}
                  slideDuration={200}
                  showBullets={true}

                />
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default AllProductList;
