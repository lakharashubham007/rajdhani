import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { Row, Card, Col, Button, Modal, Container, Dropdown } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "../../../components/Toaster/Toster";
import Loader from "../../../components/Loader/Loader";
import "../../../../assets/css/PurchaseOrder.css";
import { useDispatch, useSelector } from "react-redux";
import { addProductionProcessItemLogsApi, addProductionProcessLog, endCrimpingProcessApi, endHoseCuttingProcess, endSkivingProcessApi, getAllOperatorsListApi, getLineNumberOptionsApi, startCrimpingProcessApi, startHoseCuttingProcess, startSkivingProcessApi, updateProductionProcessItemsApi, updateSkivingStatusApi } from "../../../../services/apis/ProductionProcessApi";
import { getProductionProcessDetailsBySheetIDRequest, getProductionProcessItemsByProductionIDRequest } from "../../../../store/actions/ProductionProcessAction";
import StageStartButtonCard from "../component/StageStartButtonCard";
import { getAllOperatorListApi, searchOperatorApi } from "../../../../services/apis/OperatorApi";
import LogActivityItemsModal from "../component/LogActivityItemsModal";
import Loader1 from "../../../components/Loader/Loader1";
import Loader2 from "../../../components/Loader/Loader2";
import QualityAssuranceModal from "../component/QualityAssuranceModal";
import StageCompletedCard from "../component/StageCompletedCard";
import PauseCardComponent from "../component/PauseCardComponent";
import StopCardComponent from "../component/StopCardComponent";

const CrimpingCheckPoints = [
  "Crimping Dia",
  "Crimping Ovality",
  "Crimping Taper",
  "Depth Marking Visibility After Crimping",
  "Blockage & Collapsoble",
  "Quality Marking"
];

const theadData = [
  { heading: "S.No.", sortingVale: "sno" },
  { heading: "Part-Number", sortingVale: "part_no" },
  { heading: "Sheet Quantity", sortingVale: "sheet_qty" },
  { heading: "Accepted Quantity", sortingVale: "qty_accepted" },
  { heading: "Rejected Quantity", sortingVale: "qty_rejected" },
  { heading: "Last Accepted Quantity", sortingVale: "last_updated_quantity" },
  { heading: "Available Quantity ", sortingVale: "available_cutting_quantity" },
  { heading: "Remark", sortingVale: "remark" },
  { heading: "Line Number", sortingVale: "line_nimber" },
  { heading: "Operator Name", sortingVale: "operator_name" },
  { heading: "Log Activity", sortingVale: "log_activity" },
];

const Crimping = () => {
  const dispatch = useDispatch();
  const [sort, setSortata] = useState(10);
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [purchaseOrderProdcutList, setPurchaseOrderProdcutList] = useState([]);
  const [iconData, setIconDate] = useState({ complete: false, ind: Number });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verifyShowModal, setVerifyShowModal] = useState(false);
  const [focusedInputIndex, setFocusedInputIndex] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const producitonProcessDetails = useSelector((state) => state?.productionProcess?.data);
  // console.log("producitonProcessDetails",producitonProcessDetails)
  const producitonProcessItems = useSelector((state) => state?.productionProcess?.items?.productionProcessItems);
  // console.log("producitonProcessItems", producitonProcessItems)
  const producitonProcessItemsAnalytics = useSelector((state) => state?.productionProcess?.items);
  const [inputErrors, setInputErrors] = useState({});
  const [quantityUpdated, setQuantityUpdated] = useState(false)
  const [rows, setRows] = useState([]);
  console.log("updated rows", rows)
  const [lineNumberOptions, setLineNumberOptions] = useState();
  const [operatorsOption, setOpertorsOption] = useState();
  const [searchOperatorNameTerm, setSearchOperatorNameTerm] = useState("");
  const debounceTimer = useRef(null);
  const [selectedOperatorOption, setSelectedOperatorOption] = useState(null);
  const [searchTerms, setSearchTerms] = useState({});
  const [focusedRowIndex, setFocusedRowIndex] = useState(null);
  const [operatorSearchTerms, setOperatorSearchTerms] = useState({});
  const [rowOperatorOptions, setRowOperatorOptions] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showQAModal, setShowQAModal] = useState(false);
  const [rowLoading, setRowLoading] = useState({});
  const [isSkivingStatusUpdated, setIsSkivingStatusUpdated] = useState(false);
  //check row loader effetc with this initial value {"686dfff56dd0d622336fddcf": "true"}
  //packingStageAnalytics crimpingStageAnalytics testingStageAnalytics
  console.log("producitonProcessItemsAnalytics", producitonProcessItemsAnalytics)
  //Fetch Line numbers from nodejs json
  const fetcLineOptions = async () => {
    // setLoading(true);
    try {
      const res = await getLineNumberOptionsApi();
      const data = res?.data?.data?.lineNumbers
      const lineOptions = data?.map((option) => ({
        value: `${option.lineNumber}`,
        label: `${option.lineNumber}`,
      }));
      setLineNumberOptions(lineOptions);
    } catch (error) {
      Toaster.error("Failed to load data. Please try again.");
    } finally {
      //   setLoading(false);
    }
  };

  //API Call Method:- Fetch all Customers/Party 
  const fetchAllOperatorsList = async () => {
    // setLoading(true);
    try {
      const res = await getAllOperatorListApi();
      const dopdownData = res?.data?.map((operator) => ({
        value: operator?._id,
        label: `${operator?.fname} ${operator?.lname}`,
      }));
      setOpertorsOption(dopdownData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setLoading(false);
    }
  };

  const fetchOperatorSearchResults = async (query, index) => {
    if (!query) return;

    try {
      const res = await searchOperatorApi(query);
      const dropdownData = res?.data?.operator?.map((operator) => ({
        value: operator?._id,
        label: `${operator?.fname} ${operator?.lname}`,
      }));

      setRowOperatorOptions((prev) => ({
        ...prev,
        [index]: dropdownData, // save options for this row only
      }));
    } catch (error) {
      console.error("Error fetching operator:", error);
    } finally {
      // setLoading(false);
    }
  };

  const debounceOperatorSearch = (query, index) => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchOperatorSearchResults(query, index);
    }, 500);
  };

  const handleOperatorNameSearch = (inputValue, index) => {
    setSearchTerms((prev) => ({ ...prev, [index]: inputValue }));
    setFocusedRowIndex(index);
    if (inputValue.length > 1) {
      debounceOperatorSearch(inputValue, index);
    }
  };

  //Validaiton for Quaniity in skiving stage is different from hose cutting stage = here avalable quanity also checked.
  const validateField = (field, value, row) => {
    const errors = {};

    if (value === '') return errors; // Allow empty input

    const trimmed = value.toString().trim();
    const isOnlyDigits = /^[0-9]+$/.test(trimmed);
    const totalQty = Number(row?.sheet_total_quantity || 0);
    const acceptedQty = Number(row?.quantity_accepted || 0);
    const rejectedQty = Number(row?.quantity_rejected || 0);
    const lastUpdated = Number(row?.last_updated_quantity || 0);
    const availableCuttingQty = Number(row?.available_cutting_quantity || 0);

    const newValue = Number(trimmed);

    if (!isOnlyDigits) {
      errors[field] = "Only whole positive numbers allowed";
      return errors;
    }

    // ✅ Global rule: availableCuttingQty must never exceed totalQty
    if (availableCuttingQty > totalQty) {
      errors[field] = `Invalid Available Qty (${availableCuttingQty}) > (${totalQty})`;
      return errors;
    }

    if (field === "quantity_accepted") {
      const maxAcceptable = Math.max(0, totalQty - lastUpdated - rejectedQty);
      const maxByAvailable = Math.max(0, availableCuttingQty - lastUpdated - rejectedQty);

      if (newValue > maxAcceptable) {
        errors[field] = `Max allowed is ${maxAcceptable}`;
      }

      if (newValue > maxByAvailable) {
        errors[field] = `Max allowed is ${maxByAvailable}`;
      }

      if (newValue > availableCuttingQty) {
        errors[field] = `Max available quantity (${availableCuttingQty - lastUpdated})`;
      }
    }

    if (field === "quantity_rejected") {
      const maxRejectable = Math.max(0, totalQty - lastUpdated - acceptedQty);
      const maxByAvailable = Math.max(0, availableCuttingQty - lastUpdated - acceptedQty);

      if (newValue > maxRejectable) {
        errors[field] = `Max allowed is ${maxRejectable}`;
      }

      if (newValue > maxByAvailable) {
        errors[field] = `Max allowed is ${maxByAvailable}.`;
      }

      if (newValue > availableCuttingQty) {
        errors[field] = `Max available quantity (${availableCuttingQty})`;
      }
    }

    return errors;
  };

  const handleOpenLogModal = (itemId) => {
    setSelectedItemId(itemId);
    setModalOpen(true);
  };

  const handleChangeRow = (index, field, value) => {
    const updatedRows = [...rows];

    if (!updatedRows[index]) {
      updatedRows[index] = {};
    }

    let fieldsToUpdate = {};

    // ✅ Support both: single field or multiple fields via object
    if (typeof field === 'object') {
      fieldsToUpdate = field;
    } else {
      const isNumberField = ['quantity_accepted', 'line_number', 'quantity_rejected'].includes(field);
      const parsedValue =
        value === '' ? '' : isNaN(Number(value)) ? value : Number(value);

      fieldsToUpdate[field] = isNumberField ? parsedValue : value;
    }

    const newRow = {
      ...updatedRows[index],
      ...fieldsToUpdate
    };

    // ✅ Run validation for each field
    const errors = {};
    for (const key in fieldsToUpdate) {
      Object.assign(errors, validateField(key, fieldsToUpdate[key], newRow));
    }

    // ✅ Update errors state
    setInputErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      if (!updatedErrors[index]) updatedErrors[index] = {};

      for (const key in fieldsToUpdate) {
        if (errors[key]) {
          updatedErrors[index][key] = errors[key];
        } else {
          delete updatedErrors[index][key];
        }
      }

      if (Object.keys(updatedErrors[index]).length === 0) {
        delete updatedErrors[index];
      }

      return updatedErrors;
    });




    updatedRows[index] = newRow;
    setRows(updatedRows);
  };

  function SotingData(name, ind) {
    if (iconData.complete) {
      const sortValue = { value: name, type: "asc" };
      // fetchPurchaseOrderData(sortValue);
    } else {
      const sortValue = { value: name, type: "dsc" };
      // fetchPurchaseOrderData(sortValue);
    }
  }

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  //start stage handler 
  const handleStartStage = async (id) => {
    if (!id) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Operation',
        text: 'Make sure process is started or conditions are correct to start!',
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true
      });
      return;
    }

    setLoading(true);
    let isSuccess = false;

    try {
      const res = await startCrimpingProcessApi(id);

      if (res?.data?.success) {
        dispatch(getProductionProcessDetailsBySheetIDRequest(producitonProcessDetails?.data?.production_sheet_id));
        dispatch(getProductionProcessItemsByProductionIDRequest({
          productionProcessID: producitonProcessDetails?.data?._id,
          currentPage: 1,
          sort: 10,
          sortValue: { value: "created_at", type: "desc" },
          searchInputValue: ""
        }));

        const logData = {
          production_process_id: producitonProcessDetails?.data?._id,
          sheet_no: producitonProcessDetails?.data?.sheet_no,
          created_by: "system",
          type: 'PROCESS_CRIMPING_START'
        };
        const reslog = await addProductionProcessLog(logData);

        if (reslog?.data?.success) {
          isSuccess = true;  // ✅ Mark success here
        }
      }

    } catch (error) {
      console.error("❌ Error starting crimping process:", error);
      Toaster.error("Server error while starting crimping process.");
    } finally {
      setLoading(false);
      if (isSuccess) {
        Swal.fire({
          icon: 'success',
          title: 'Crimping Started',
          text: 'Crimping process has been successfully started!',
          timer: 1000,
          showConfirmButton: false,
          timerProgressBar: true
        });
      }
    }
  };

  const handleUpdateProductionItems = async (id) => {
    const validItems = [];
    let hasInvalidItems = false;

    //This Validaion is compulsory for Log items table == only those item should be update which log is neccessary with quanitty 
    rows.forEach((item) => {
      const quantityAccepted = Number(item?.quantity_accepted) || 0;
      const quantityRejected = Number(item?.quantity_rejected) || 0;
      const lastUpdated = Number(item?.last_updated_quantity) || 0;
      const totalQty = Number(item?.sheet_total_quantity) || 0;
      const avalQty = Number(item?.available_cutting_quantity) || 0;

      const hasAcceptedQty =
        item.hasOwnProperty('quantity_accepted') &&
        item.quantity_accepted !== '' &&
        !isNaN(quantityAccepted);



      const hasRejectedQty =
        item.hasOwnProperty('quantity_rejected') &&
        item.quantity_rejected !== '' &&
        !isNaN(quantityRejected);

      const totalUsedQty = quantityAccepted + quantityRejected + lastUpdated;

      const isWithinAcceptedLimit = hasAcceptedQty && totalUsedQty <= totalQty && quantityAccepted <= avalQty - lastUpdated - quantityRejected;

      const isWithinRejectedOnlyLimit =
        !hasAcceptedQty && hasRejectedQty && quantityRejected + lastUpdated <= totalQty && quantityRejected <= avalQty - lastUpdated;


      if (isWithinAcceptedLimit || isWithinRejectedOnlyLimit) {
        validItems.push({
          id: item.id,
          quantity_accepted: quantityAccepted,
          quantity_rejected: quantityRejected,
          last_updated_quantity: lastUpdated,
          remark: item.remark || "",
          line_number: item.line_number || "",
          operator_name: item.operator_name || "",
          operator_id: item?.operator_id || "",
          log: item.log || "",
          sheet_total_quantity: item.sheet_total_quantity || 0,
          part_no: item.part_no || ""
        });
      } else if (hasAcceptedQty || hasRejectedQty) {
        hasInvalidItems = true;
      }
    });

    if (hasInvalidItems || validItems.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text:
          validItems.length === 0
            ? 'No valid items to update. Please check quantity limits.'
            : 'Some items have invalid quantity. Please enter correct input values.',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
      });
      return;
    }
    // ✅ Step 1: Update the production process items
    const payload = {
      itemDetails: {
        stage: "crimping", // dynamic if needed -> produciton process model schema fields key
        production_process_id: producitonProcessDetails?.data?._id,
        updated_by: "System" // or logged-in user
      },
      items: validItems
    };



    try {
      setLoading(true);
      const updateItems = await updateProductionProcessItemsApi(payload);
      setQuantityUpdated(true);


      if (updateItems?.data?.success === true) {
        // ✅ Step 2: Create main log record
        const logData = {
          production_process_id: producitonProcessDetails?.data?._id,
          sheet_no: producitonProcessDetails?.data?.sheet_no,
          created_by: "shubham",
          type: 'PROCESS_CRIMPING_QUANTITY_UPDATE',
          quantity: validItems.reduce((total, item) => total + (Number(item.quantity_accepted) || 0), 0),
          totalItems: validItems.length,
        };
        const productionProcessLogDetails = await addProductionProcessLog(logData);
        const logId = productionProcessLogDetails?.data?.log?._id;

        if (productionProcessLogDetails?.data?.success === true && logId) {
          // ✅ Step 3: Create final payload for ProductionProcessItemLog
          const itemLogsPayload = validItems.map(item => ({
            log_id: logId,
            item_id: item.id,
            stage: "Crimping",
            total_quantity: Number(item.sheet_total_quantity) || 0,
            quantity_accepted: Number(item.quantity_accepted) || 0,
            quantity_rejected: Number(item.quantity_rejected) || 0,
            remarks: item.remark || "",
            operator_name: item?.operator_name,
            operator_id: item?.operator_id,
          }));

          // console.log("📦 Item Log Payload →", itemLogsPayload);

          // ✅ Step 4: Store item logs
          const logsResponse = await addProductionProcessItemLogsApi({ items: itemLogsPayload });

          if (!logsResponse?.data?.success) {
            Toaster.error("Logs not saved, but items were updated.");
            return;
          }
        }
      }
      if (updateItems?.data?.success === true) {
        Swal.fire({
          icon: 'success',
          title: 'Updated items',
          text: 'Item Updated successfully!',
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true
        });
      }


    } catch (error) {
      console.error("❌ Failed to update items:", error);
      // setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update items. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };


  //Handle Finalize the process ------------------------------------------------------------------------------------------start----------------
  const finalizeCrimpingStage = async (producitonProcessId) => {
    try {
      const res = await endCrimpingProcessApi(producitonProcessId);

      if (res?.data?.success) {
        dispatch(getProductionProcessDetailsBySheetIDRequest(producitonProcessDetails?.data?.production_sheet_id));

        const logData = {
          production_process_id: producitonProcessDetails?.data?._id,
          sheet_no: producitonProcessDetails?.data?.sheet_no,
          created_by: "system",
          type: 'PROCESS_CRIMPING_END',
        };

        const reslog = await addProductionProcessLog(logData);

        if (reslog) {
          Swal.fire({
            icon: 'success',
            title: 'Crimping process finalized successfully',
            showConfirmButton: false,
            timer: 1000
          });
        }
      } else {
        Toaster.error("Failed to finalize stage.");
      }
    } catch (error) {
      console.error("❌ Error finalizing stage:", error);
      Toaster.error("Something went wrong while finalizing the stage.");
    } finally {
      setShowQAModal(false);
    }
  };


  const handleFinalSubmission = () => {
    const totalSheetQuantity = producitonProcessItemsAnalytics?.crimpingStageAnalytics?.totalSheetQuantity || 0;
    const totalCompletedQuantity = producitonProcessItemsAnalytics?.crimpingStageAnalytics?.totalCompletedQuantity || 0;

    if (totalCompletedQuantity < totalSheetQuantity) {
      Swal.fire({
        title: 'Incomplete Stage',
        text: 'Some item quantities are still pending. Please complete them before finalizing.',
        icon: 'info',
        confirmButtonText: 'OK',
        timer: 5000,
        timerProgressBar: true,
      });
      return;
    }

    Swal.fire({
      title: 'Finalize Stage?',
      text: 'Do you want to finalize this stage with all quality assurance checks?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Proceed',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        setShowQAModal(true); // 🟢 Only open the modal here
      }
    });
  };

  const orderDetails = {
    warehouse: {
      name: "Warehouse",
      address: "309/7, Delhi",
      phone: "9876543210",
      email: "warehouse@example.com",
      gst: "09ABCDE1234FZ5",
    },
    store: {
      name: "Malviya Nagar",
      address: "South Extn, Malviya Nagar, Delhi, 110017",
      phone: "9322465589",
      email: "store@example.com",
      gst: "09A2B569F3093ZN",
    },
    order: {
      number: "SO-01114569",
      date: "19-11-2024",
      dueDate: "20-11-2024",
    },
    products: [
      {
        name: "Onion/Pyaj/Kanda",
        variant: "kg",
        unitPrice: 21,
        quantity: 25,
        price: 525,
        cgst: 2.5,
        sgst: 2.5,
        igst: 0,
        cess: 0,
        totalTax: 22.05,
        amount: 645.05,
      },
      {
        name: "Mango Sindhri",
        variant: "kg",
        unitPrice: 150,
        quantity: 50,
        price: 7500,
        cgst: 6,
        sgst: 6,
        igst: 0,
        cess: 0,
        totalTax: 168,
        amount: 8680,
      },
      {
        name: "Maggi Masala Instant Noodles",
        variant: "140 gm",
        unitPrice: 30,
        quantity: 30,
        price: 900,
        cgst: 9,
        sgst: 9,
        igst: 0,
        cess: 0,
        totalTax: 59.4,
        amount: 1059.4,
      },
    ],
    summary: {
      totalQuantity: 110,
      subTotal: 8925,
      gstTotal: 1249.45,
      discount: 0,
      shipping: 80,
      grandTotal: 10254.45,
    },
    notes: {
      type: "Urgent",
      verify: "Verify Order Note",
    },
    footer: {
      preparedBy: "Mahesh Kumar",
      authorizedBy: "Pankaj Suthar",
      verifiedBy: "Kushal Kumar",
      terms: [
        "Delivery quantity should be as per SO only.",
        "Goods delivered beyond the expiry date will not be accepted.",
        "SO copy should be sent along with the delivery challan.",
        "Invoice copy should be sent along with SO/PO and delivery challan.",
      ],
      quality_assurance: [
        // Crimping
        "✅ Crimping Dia Checked.",
        "✅ Crimping Ovality Verified.",
        "✅ Crimping Taper within Limit.",
        "✅ Depth Marking Visibility After Crimping.",
        "✅ Blockage & Collapsibility Checked.",
        "✅ Quality Marking Applied.",
      ]
    },
  };

  //Check upto date items 
  useEffect(() => {
    // if (producitonProcessDetails?.success === true) {
    dispatch(getProductionProcessItemsByProductionIDRequest({
      productionProcessID: producitonProcessDetails?.data?._id,
      currentPage: currentPage, // default or dynamic
      sort: sort, // page limit
      sortValue: { value: "created_at", type: "desc" }, // or your default
      searchInputValue: "" // or pass actual search term    
    }));
    setQuantityUpdated(false)
    fetcLineOptions();
    fetchAllOperatorsList();
    setIsSkivingStatusUpdated(false)
    // }
  }, [producitonProcessDetails, quantityUpdated, sort, currentPage, isSkivingStatusUpdated])

  //prefilled items data 
  useEffect(() => {

    if (producitonProcessItems?.length > 0) {
      const formattedRows = producitonProcessItems?.map((item) => ({
        //   ...item,
        id: item?._id,
        quantity_accepted: '',
        quantity_rejected: item?.crimpingStage?.quantityRejected || '',
        last_updated_quantity: item?.crimpingStage?.lastUpdatedQuantity,
        available_cutting_quantity: item?.preAssemblyStage?.lastUpdatedQuantity,
        // isSkiving: item?.skivingStage?.isSkiving,
        remark: item?.crimpingStage?.remark || '',
        line_number: item?.crimpingStage?.line_number || '',
        ...(item?.crimpingStage?.operatorName && {
          operator_name: item?.crimpingStage?.operatorName,
        }),
        ...(item?.crimpingStage?.operatorId && {
          operator_id: item?.crimpingStage?.operatorId,
        }),
        log: item?.log || '',
        sheet_total_quantity: item?.sheet_total_quantity,
        part_no: item?.part_no
      }));
      setRows(formattedRows);
      setQuantityUpdated(false)

    }
  }, [producitonProcessItems, quantityUpdated, sort, currentPage]);

  return (
    <>
      <ToastContainer />
      <Loader2 visible={loading} />
      <div >
        <div className="purchase-order-container ">
          {/* Header Section */}
          <div className="">
            <div className="header-section mb-3">
            </div>
          </div>
          {/* Production process Item  Table */}
          <Row>
            <Col lg={12}>
              <div className="">
                {/* Header and Analytics Part inside Hose Cutting tab */}
                <div className="card-header pb-0 px-0">
                  <h1 className="card-title" style={{
                    color: 'black',
                    fontSize: '6rem',
                    fontWeight: 700
                  }}>
                    Production Sheet Items <br />
                    <span style={{
                      color: 'gray',
                      fontSize: '0.9rem',
                      fontStyle: 'italic',
                      fontWeight: 400
                    }}>
                      {producitonProcessDetails?.data?.crimping?.start_time
                        ? `Starting Time and Date: ${moment(producitonProcessDetails?.data?.crimping?.start_time).format("DD MMM YYYY | hh:mm A")}`
                        : ''}
                    </span>
                  </h1>
                  <div className="mb-3">
                    {/* Analytics Badge Boxes */}
                    <div class="d-flex flex-wrap gap-2 mt-2">
                      <div className="p-2 text-dark fw-bold border rounded" style={{ backgroundColor: "#FCB454" }}>
                        Total Items: {producitonProcessItemsAnalytics?.totalItems ?? 0}
                      </div>
                      <div class="p-2 text-dark fw-bold border rounded" style={{ backgroundColor: "#8F87F1" }} >
                        Total Quantity: {producitonProcessItemsAnalytics?.crimpingStageAnalytics?.totalSheetQuantity ? `${producitonProcessItemsAnalytics?.crimpingStageAnalytics?.totalSheetQuantity}` : 0}
                      </div>
                      <div class="p-2 text-dark fw-bold border rounded" style={{ backgroundColor: "#FFF287" }}>
                        Total Pending: {producitonProcessItemsAnalytics?.crimpingStageAnalytics?.totalSheetQuantity ? `${producitonProcessItemsAnalytics?.crimpingStageAnalytics?.totalPendingQuantity}/${producitonProcessItemsAnalytics?.crimpingStageAnalytics?.totalSheetQuantity}` : 0}
                      </div>
                      <div class="p-2 text-dark fw-bold border rounded" style={{ backgroundColor: "#F7A8C4" }} >
                        Total Rejected: {producitonProcessItemsAnalytics?.crimpingStageAnalytics?.totalSheetQuantity ? `${producitonProcessItemsAnalytics?.crimpingStageAnalytics?.totalRejectedQuantity}/${producitonProcessItemsAnalytics?.crimpingStageAnalytics?.totalSheetQuantity}` : 0}
                      </div>
                      <div class="p-2 text-dark fw-bold border rounded" style={{ backgroundColor: "#AEC8A4" }} >
                        Total Completed: {producitonProcessItemsAnalytics?.crimpingStageAnalytics?.totalSheetQuantity ? `${producitonProcessItemsAnalytics?.crimpingStageAnalytics?.totalCompletedQuantity}/${producitonProcessItemsAnalytics?.crimpingStageAnalytics?.totalSheetQuantity}` : 0}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Production Process Items Table  crimping packing testing */}
                <div className="card-body px-0">
                  <div className="table-responsive">
                    <div
                      id="holidayList"
                      className="dataTables_wrapper no-footer">
                      {(() => {
                        const stageStatus = producitonProcessDetails?.data?.crimping?.status;



                        const isStopped = producitonProcessDetails?.data?.production_process_is_running;
                        const isPaused = producitonProcessDetails?.data?.isPaused;

                        // 🔁 Show pause card if paused
                        if (isPaused) {
                          return (
                            <PauseCardComponent
                              pausedAt={producitonProcessDetails?.data?.production_process_pause_start_date_time}
                              pausedBy={producitonProcessDetails?.data?.paused_by || "Supervisor"}
                            />
                          );
                        }

                        if (isStopped === false) {
                          return (
                            <StopCardComponent
                              stoppedAt={producitonProcessDetails?.data?.production_process_end_date_time}
                              stoppedBy={producitonProcessDetails?.data?.paused_by || "Supervisor"}
                            />
                          )
                        }

                        if (stageStatus === "Not Started" || stageStatus == null) {
                          // Not started - check if Completed
                          if (stageStatus === "Not Started" && producitonProcessDetails?.data?.crimping?.status === "Completed") {
                            return <StageCompletedCard
                              supervisorName={producitonProcessDetails?.data?.finalized_by || 'Supervisor'}
                              completedAt={producitonProcessDetails?.data?.crimping?.end_time}
                            />
                          } else {
                            return (
                              <StageStartButtonCard
                                producitonProcessDetails={producitonProcessDetails}
                                handleStartStage={handleStartStage}
                                Stage="Crimping"
                              />
                            );
                          }
                        } else if (stageStatus === "Completed") {
                          return <StageCompletedCard
                            supervisorName={producitonProcessDetails?.data?.finalized_by || 'Supervisor'}
                            completedAt={producitonProcessDetails?.data?.crimping?.end_time}
                          />;
                        } else {
                          // Any other status, show the main table
                          return (
                            <>
                              {/* Dropdown for number of rows or entries selection */}
                              <div className="justify-content-between d-sm-flex">
                                <div className="dataTables_length">
                                  <label className="d-flex align-items-center">
                                    Show
                                    <Dropdown className="search-drop">
                                      <Dropdown.Toggle
                                        as="div"
                                        className="search-drop-btn">
                                        {sort}
                                      </Dropdown.Toggle>
                                      <Dropdown.Menu>
                                        <Dropdown.Item
                                          onClick={() => setSortata("2")}>
                                          2
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => setSortata("5")}>
                                          5
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => setSortata("10")}>
                                          10
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => setSortata("15")}>
                                          15
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => setSortata("20")}>
                                          20
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                    entries
                                  </label>
                                </div>
                              </div>
                              {/* Tables */}
                              <table id="example4" className="display dataTable no-footer w-100">
                                {/* Table Headings */}
                                <thead>
                                  <tr>
                                    {theadData?.map((item, ind) => {
                                      return (
                                        <>
                                          {item.sortingVale === "verify" ? (
                                            <th
                                              key={ind}
                                              style={{
                                                display: 'flex',
                                                flexDirection: 'column', // stack text and checkbox vertically
                                                alignItems: 'center',    // center horizontally
                                                justifyContent: 'center', // center vertically if needed
                                                padding: '10px',
                                                userSelect: 'none',
                                              }}
                                            >
                                              <span style={{ fontWeight: '600', marginBottom: '6px' }}>
                                                {item.heading}
                                              </span>

                                              <label
                                                style={{
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  justifyContent: 'center',
                                                  width: '15px',
                                                  height: '15px',
                                                  borderRadius: '50%',
                                                  transition: 'background-color 0.2s ease, transform 0.2s ease',
                                                  cursor: 'pointer',
                                                }}
                                                onMouseEnter={(e) => {
                                                  e.currentTarget.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
                                                }}
                                                onMouseLeave={(e) => {
                                                  e.currentTarget.style.backgroundColor = 'transparent';
                                                }}
                                              >
                                                <input
                                                  type="checkbox"
                                                  checked={selectAll}
                                                  onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    setSelectAll(checked);

                                                    if (checked) {
                                                      const allIds = purchaseOrderProdcutList.map((item) => item._id);
                                                      setSelectedProducts(allIds);
                                                    } else {
                                                      setSelectedProducts([]);
                                                    }
                                                  }}
                                                  onClick={(e) => e.stopPropagation()}
                                                  style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '50%',
                                                    accentColor: '#007bff',
                                                    cursor: 'pointer',
                                                    transition: 'transform 0.2s ease',
                                                  }}
                                                  onMouseDown={(e) => {
                                                    e.target.style.transform = 'scale(0.9)';
                                                  }}
                                                  onMouseUp={(e) => {
                                                    e.target.style.transform = 'scale(1)';
                                                  }}
                                                />
                                              </label>
                                            </th>
                                          ) : (
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
                                                maxWidth: '140px',
                                                minWidth: '100px',
                                                padding: '8px 12px',
                                                textAlign: 'left', // ✅ align everything to left
                                                verticalAlign: 'middle',
                                                whiteSpace: 'normal',
                                                wordBreak: 'break-word',
                                              }}
                                            >
                                              <div
                                                style={{
                                                  display: 'flex',
                                                  flexDirection: 'column',
                                                  alignItems: 'flex-start', // ✅ align items to left
                                                  lineHeight: '1',
                                                  gap: '2px',
                                                }}
                                              >
                                                {/* First line: Heading + icon */}
                                                <div
                                                  style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px', // ✅ cleaner space between text and icon
                                                    fontWeight: 600,
                                                    fontSize: '13px',
                                                  }}
                                                >
                                                  <span>{item.heading.split(' ')[0]}</span>
                                                  {ind !== iconData.ind ? (
                                                    <i className="fa fa-sort fs-12" style={{ opacity: '0.3' }} />
                                                  ) : iconData.complete ? (
                                                    <i className="fa fa-arrow-down fs-12" style={{ opacity: '0.7' }} />
                                                  ) : (
                                                    <i className="fa fa-arrow-up fs-12" style={{ opacity: '0.7' }} />
                                                  )}
                                                </div>

                                                {/* Second line: Rest of heading */}
                                                <div style={{ fontWeight: 600, fontSize: '13px' }}>
                                                  {item.heading.split(' ').slice(1).join(' ')}
                                                </div>
                                              </div>
                                            </th>


                                          )}

                                        </>


                                      );
                                    })}
                                  </tr>
                                </thead>
                                <tbody >
                                  {rows?.map((row, index) => (
                                    <tr key={row.id}
                                      //  onClick={() => handleVerifyClick(row)} 
                                      // onClick={(e) => {
                                      //     const target = e.target;

                                      //     // Prevent modal from opening when clicking on an active input or button
                                      //     if (target.tagName === "BUTTON") return;
                                      //     if (target.tagName === "INPUT" && !target.disabled) return;

                                      //     // Open modal if clicking on a disabled input or any other row area
                                      //     handleVerifyClick(row);
                                      // }}
                                      style={{ cursor: "pointer" }}
                                      className={rowLoading[row?.id || row?._id] ? "shimmer-row" : ""}
                                    >
                                      <td><strong>{index + 1}</strong> </td>
                                      {/* Part No.  */}
                                      <td>
                                        <input
                                          type="text"
                                          placeholder="Part No"
                                          value={row?.part_no}
                                          onClick={() =>
                                            setFocusedInputIndex((prev) => (prev === index ? null : index))
                                          }
                                          // onChange={(e) =>
                                          //   handleChangeRow(index, "product_name", e.target.value)
                                          // }
                                          className="form-control row-input"
                                          style={{
                                            width: focusedInputIndex === index ? "300px" : "180px",
                                            transition: "width 0.3s ease",
                                            cursor: "pointer",
                                          }}
                                        />
                                      </td>
                                      {/* Sheet Quantity */}
                                      <td>
                                        <input
                                          type="text"
                                          // placeholder="Qty"
                                          value={row?.sheet_total_quantity}
                                          // onChange={(e) =>
                                          //     handleChangeRow(
                                          //         index,
                                          //         "sheet_total_quantity",
                                          //         e.target.value
                                          //     )
                                          // }
                                          className="form-control row-input"
                                          style={{ width: "60px" }}
                                        />
                                      </td>
                                      {/* quantity_accepted */}
                                      <td>
                                        <input
                                          type="text"
                                          placeholder="Quantity"
                                          value={row?.quantity_accepted}
                                          disabled={row?.isSkiving === false}
                                          onChange={(e) =>
                                            handleChangeRow(index, "quantity_accepted", e.target.value)
                                          }
                                          className={`form-control row-input ${inputErrors[index]?.quantity_accepted ? 'is-invalid' : ''
                                            }`}
                                          style={{ width: "100px" }}
                                        />
                                        {inputErrors[index]?.quantity_accepted && (
                                          <div className="invalid-feedback" style={{ fontSize: '8px', whiteSpace: 'nowrap' }}>
                                            {inputErrors[index].quantity_accepted}
                                          </div>
                                        )}
                                      </td>
                                      {/* quantity_rejected */}
                                      <td>
                                        <input
                                          type="text"
                                          placeholder="Quantity"
                                          value={row?.quantity_rejected ?? ''}
                                          disabled={row?.isSkiving === false}
                                          onChange={(e) =>
                                            handleChangeRow(index, "quantity_rejected", e.target.value)
                                          }
                                          className={`form-control row-input ${inputErrors[index]?.quantity_rejected ? 'is-invalid' : ''
                                            }`}
                                          style={{ width: "90px" }}
                                        />
                                        {inputErrors[index]?.quantity_rejected && (
                                          <div className="invalid-feedback" style={{ fontSize: '8px', whiteSpace: 'nowrap' }}>
                                            {inputErrors[index].quantity_rejected}
                                          </div>
                                        )}
                                      </td>
                                      {/* last_updated_quantity */}
                                      <td>
                                        <input
                                          type="text"
                                          placeholder="Quantity"
                                          value={row?.last_updated_quantity}
                                          onChange={(e) =>
                                            handleChangeRow(
                                              index,
                                              "last_updated_quantity",
                                              e.target.value
                                            )
                                          }
                                          className="form-control row-input"
                                          style={{ width: "90px" }}
                                          disabled
                                        />
                                      </td>
                                      {/* avalable quantity Indicator */}
                                      <td style={{ minWidth: '120px' }}>
                                        <div className="progress-indicator">
                                          <div className="progress-label">
                                            {row?.available_cutting_quantity}/{row?.sheet_total_quantity}
                                          </div>
                                          <div className="progress-bar-container">
                                            <div
                                              className="progress-bar-fill"
                                              style={{
                                                width: `${(Number(row?.available_cutting_quantity || 0) /
                                                  Number(row?.sheet_total_quantity || 1)) * 100
                                                  }%`,
                                              }}
                                            ></div>
                                          </div>
                                        </div>
                                      </td>
                                      {/* Remark */}
                                      <td>
                                        <input
                                          type="text"
                                          placeholder="Enter Remark"
                                          value={row?.remark}
                                          onChange={(e) =>
                                            handleChangeRow(
                                              index,
                                              "remark",
                                              e.target.value
                                            )
                                          }
                                          className="form-control row-input"
                                          style={{ width: "170px" }}
                                        />
                                      </td>
                                      {/* Line number */}
                                      <td>
                                        <Select
                                          options={lineNumberOptions}
                                          value={lineNumberOptions?.find(option => option.value === row?.line_number) || null}
                                          onChange={(selectedOption) =>
                                            handleChangeRow(index, "line_number", selectedOption?.value || '')
                                          }
                                          className="react-select-container"
                                          classNamePrefix="react-select"
                                          placeholder="Line No."
                                          menuPortalTarget={document.body} // 👈 Makes menu render at body level
                                          isClearable
                                          styles={{
                                            container: (base) => ({
                                              ...base,
                                              width: 120,
                                            }),
                                            control: (base) => ({
                                              ...base,
                                              minHeight: '30px',
                                              height: '35px',
                                              fontSize: '12px',
                                              padding: '0 2px',
                                              alignItems: 'center',
                                            }),
                                            indicatorsContainer: (base) => ({
                                              ...base,
                                              height: '28px',
                                              // alignItems: 'center',
                                              paddingTop: '2px',
                                            }),
                                            dropdownIndicator: (base) => ({
                                              ...base,
                                              padding: '2px',
                                              marginTop: '2px', // move arrow up slightly
                                            }),
                                            valueContainer: (base) => ({
                                              // ...base,
                                              height: '100%',
                                              marginLeft: '5px',
                                              display: 'flex',
                                              alignItems: 'center',
                                              fontSize: '13px',
                                              lineHeight: 'normal', // ensures text is vertically aligned
                                            }),
                                            indicatorSeparator: (base) => ({
                                              ...base,
                                              height: '28px', // shorter vertical line
                                              margin: '0 4px',
                                            }),
                                            menuPortal: (base) => ({
                                              ...base,
                                              zIndex: 9999,
                                            }),
                                          }}

                                        />

                                      </td>
                                      {/* Operator Name  */}
                                      <td>
                                        <Select
                                          options={searchTerms[index] ? operatorsOption : []}
                                          placeholder="Search operator"
                                          isLoading={loading}
                                          // value={
                                          //     rowOperatorOptions[index]?.find(
                                          //         (option) => option.label === row?.operator_name
                                          //     )
                                          // }
                                          value={operatorsOption?.find((item) => item?.label === row?.operator_name)}

                                          onChange={(selectedOption) => {
                                            handleChangeRow(index, {
                                              operator_name: selectedOption?.label || "",
                                              operator_id: selectedOption?.value || "",
                                            });
                                          }}
                                          onInputChange={(inputValue) => handleOperatorNameSearch(inputValue, index)}
                                          onFocus={() => setFocusedRowIndex(index)}
                                          onMenuClose={() =>
                                            setSearchTerms((prev) => ({ ...prev, [index]: "" }))
                                          }
                                          menuIsOpen={focusedRowIndex === index && !!searchTerms[index]}
                                          isClearable
                                          menuPortalTarget={document.body}
                                          noOptionsMessage={() => "No matching operators found"}
                                          styles={{
                                            container: (base) => ({
                                              ...base,
                                              width: 210,
                                            }),
                                            control: (base) => ({
                                              ...base,
                                              minHeight: '30px',
                                              height: '35px',
                                              fontSize: '12px',
                                              padding: '0 2px',
                                              alignItems: 'center',
                                              display: 'flex',
                                              flexWrap: 'nowrap', // ✅ Prevent wrapping
                                              justifyContent: 'space-between', // ✅ Ensure right-aligned dropdown stays in same line
                                            }),
                                            indicatorsContainer: (base) => ({
                                              ...base,
                                              height: '28px',
                                              // alignItems: 'center',
                                              paddingTop: '2px',
                                            }),
                                            dropdownIndicator: (base) => ({
                                              ...base,
                                              padding: '2px',
                                              marginTop: '2px', // move arrow up slightly
                                            }),
                                            valueContainer: (base) => ({
                                              // ...base,
                                              height: '100%',
                                              display: 'flex',
                                              flex: '1 1 auto',          // ✅ Takes all space but allows indicator to stay right
                                              minWidth: 0,               // ✅ Avoid overflow
                                              overflow: 'hidden',
                                              whiteSpace: 'nowrap',     // ✅ Prevent text wrap
                                              textOverflow: 'ellipsis', // ✅ Add ellipsis for overflowed text
                                              marginLeft: '5px',
                                              alignItems: 'center',
                                              fontSize: '13px',
                                              lineHeight: 'normal',
                                            }),
                                            indicatorSeparator: (base) => ({
                                              ...base,
                                              height: '28px', // shorter vertical line
                                              margin: '0 4px',
                                            }),
                                            menuPortal: (base) => ({
                                              ...base,
                                              zIndex: 9999,
                                            }),
                                          }}
                                        />
                                      </td>
                                      {/* Log Activity button */}
                                      <td>
                                        <button
                                          onClick={() => handleOpenLogModal(row.id)}
                                          style={{
                                            backgroundColor: '#f0f4ff',
                                            border: '1px solid #3b82f6',
                                            color: '#1e40af',
                                            fontSize: '12px',
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            fontWeight: 500,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease-in-out',
                                            boxShadow: '0 1px 2px rgba(59, 130, 246, 0.1)',
                                            whiteSpace: 'nowrap',
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#3b82f6';
                                            e.currentTarget.style.color = '#ffffff';
                                            e.currentTarget.style.boxShadow = '0 2px 6px rgba(59, 130, 246, 0.3)';
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f0f4ff';
                                            e.currentTarget.style.color = '#1e40af';
                                            e.currentTarget.style.boxShadow = '0 1px 2px rgba(59, 130, 246, 0.1)';
                                          }}
                                        >
                                          <span style={{ fontSize: '13px' }}>🕒</span>
                                          Log Activity
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              {/* Pagination buttons */}
                              <div>
                                {/* {brandList?.data?.length < brandList?.total && ( */}
                                <div className="d-sm-flex text-center justify-content-end align-items-center mt-3">
                                  <div className="pagination-container">
                                    <ReactPaginate
                                      pageCount={Math.ceil(
                                        producitonProcessItemsAnalytics?.totalItems /
                                        producitonProcessItemsAnalytics?.rowsPerPage
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
                            </>
                          );
                        }
                      })()}



                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/* Footer Section */}
          <div className="footer-section">
            <h4>Quality Assurance</h4>
            <ul>
              {orderDetails.footer.quality_assurance.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </div>
          {/* SUBMIT Buttons  */}
          <div className="d-flex gap-3 justify-content-end text-end mt-3 mt-md-0">
            <button
              type="submit"
              onClick={handleUpdateProductionItems}
              className="btn btn-warning rounded-sm">
              Update
            </button>
            <button
              type="submit"
              onClick={() => handleFinalSubmission(producitonProcessDetails?.data?._id)}
              className="btn btn-primary rounded-sm">
              Final Submission
            </button>
          </div>
        </div>
      </div>
      {/* Item wise log activity modal box */}
      <LogActivityItemsModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        itemId={selectedItemId}
        stage="Crimping"
        productionProcessID={producitonProcessDetails?._id}
      />
      <QualityAssuranceModal
        show={showQAModal}
        onClose={() => setShowQAModal(false)}
        stage="Crimping"
        checkPointsQA={CrimpingCheckPoints}
        onFinalize={() => finalizeCrimpingStage(producitonProcessDetails?.data?._id)}
      />
    </>
  );
};

export default Crimping;
