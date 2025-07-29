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
import DeleteWarningMdl from "../../components/common/DeleteWarningMdl";
import useDebounce from "../../components/common/Debounce";
import { deleteSupplierApi, getSupplierApi, UpdateSupplierStatus } from "../../../services/apis/Supplier";
import $ from 'jquery';
import 'smartwizard/dist/css/smart_wizard_all.min.css';
import 'smartwizard/dist/js/jquery.smartWizard.min.js';
import HoseCutting from "./ProductionProcessStages/HoseCutting";
import Skiving from "./ProductionProcessStages/Skiving";
import PreAssembly from "./ProductionProcessStages/PreAssembly";
import Crimping from "./ProductionProcessStages/Crimping";
import Testing from "./ProductionProcessStages/Testing";
import HomepageAnalytics from "./Analytics/HomepageAnalytics";
import SearchSheetInputBox from "./component/SearchSheetInputBox";
import ProductionStepsProgressAnalytics from "./Analytics/ProductionStepsProgressAnalytics";
import ProductionProcessHomeAnalytics from "./Analytics/ProductionProcessHomeAnalytics";
import { addProductionProcessDetails, addProductionProcessItems, addProductionProcessLog, GetAllItemsBySelectedSheet, GetProcessBySelectedSheetId, getProductionProcessDetails, pauseProductionProcessApi, resumeProductionProcessApi, stopProductionProcessApi, } from "../../../services/apis/ProductionProcessApi";
import ProductionStartStopButton from "./component/producitonStartStopButton";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { getProductionProcessDetailsBySheetIDRequest } from '../../../store/actions/ProductionProcessAction';
import { FaExternalLinkAlt } from "react-icons/fa";
import Packing from "./ProductionProcessStages/Packing";
import ProductionProcessLogActivityModal from "./component/ProductionProcessLogActivityModal";
import { updateSidebarMenuCountApi } from "../../../services/apis/productionSheetApi";
import { getSidebarMenusRequest } from "../../../store/actions/SidebarMenusActions";


const ProductionProcess = () => {
  const [sort, setSortata] = useState(10);
  const [loading, setLoading] = useState(false);
  const [modalCentered, setModalCentered] = useState(false);
  const [logo, setLogo] = useState(null);
  const sidebarMenus = useSelector(state => state?.sidebarMenus?.data);

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
  const producitonProcessItemsAnalytics = useSelector((state) => state?.productionProcess?.items);
  const [selectedSheetNumber, setSelectedSheetNumber] = useState();
  const dispatch = useDispatch();
  const producitonProcessDetails = useSelector((state) => state?.productionProcess?.data?.data);
  const producitonProcess = useSelector((state) => state?.productionProcess);
  let selectedSheetId = selectedSheetNumber?.sheet_no;
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [processStarted, setProcessStarted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  console.log("producitonProcessDetails In Main Produciton Process Component ", producitonProcessDetails)
  console.log("producitonProcessItemsAnalytics  In Main Produciton Process Component ", producitonProcessItemsAnalytics)



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

  const wizardRef = useRef(null);

  useEffect(() => {
    const $wizard = $(wizardRef?.current);

    $wizard.smartWizard({
      selected: 0,
      theme: 'arrows', // other options: 'dots', 'default', 'circles'
      autoAdjustHeight: true,
      transition: {
        animation: 'fade',
      },
      toolbar: {
        showNextButton: true,
        showPreviousButton: true,
        position: 'top', // Top toolbar
        // extraHtml: `
        //   <button class="btn btn-danger ms-2" id="resetWizardBtn">
        //     Reset
        //   </button>
        // `,
      },

    });

    // 👇 Move toolbar above the nav tabs manually
    const $toolbar = $wizard.find('.sw-toolbar-top');
    const $nav = $wizard.find('ul.nav');

    if ($toolbar.length && $nav.length) {
      $toolbar.insertBefore($nav); // Moves toolbar above navigation tabs
    }


    // ✅ Bind Reset button event
    $('#resetWizardBtn').on('click', () => {
      $wizard.smartWizard('reset');
    });

    // ✅ Cleanup on unmount
    return () => {
      $wizard.smartWizard('destroy');
      $('#resetWizardBtn').off('click');
    };
  }, []);


  const handleOpenLogModal = () => {
    // setSelectedItemId(itemId);
    if (!selectedSheetNumber?.value) {
      Swal.fire({
        icon: 'warning',
        title: 'No Sheet Selected',
        text: 'Please search and select a sheet before accessing activity logs.',
        confirmButtonColor: '#004080',
        timer: 2000, // 2 seconds
        timerProgressBar: true,
        showConfirmButton: false
      });
      return;
    }
    setModalOpen(true);
  }
  //section for fetch items for searched sheet   ---start------
  //Searched Sheet Number extracted to parent component here from child componenet

  //STEP: 1 (Search and Select Sheet number) Extract Sheet number from child component and set here for further use
  const handleSheetSelection = (selectedSheet) => {
    setSelectedSheetNumber(selectedSheet);
  };

  //Call api to extract sheet items from production sheet item table
  //API Call Method:- Search Product and fetch

  const [selectdAllSheetItem, setSelectedAllSheetItems] = useState([]);

  //When sheet is selected then extract all items for production process from  produciton sheet Items
  const fetchSelectedSheetNumbersAllItems = async (id) => {
    if (!id) return; // Prevent empty requests
    // setLoading(true);
    try {
      const res = await GetAllItemsBySelectedSheet(id); // API should support search
      setSelectedAllSheetItems(res?.data?.items);
    } catch (error) {
      Toaster.error("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //When sheet is selected and also production process is not started then call otherwise not 
    if (selectedSheetNumber?.value) {
      // console.log("Hit the APIiiiiiiiiiiiiiiiiii");
      fetchSelectedSheetNumbersAllItems(selectedSheetNumber?.value)
    }
    // fetchProcessDetailsBySheetId(selectedSheetNumber?.value)
  }, [selectedSheetNumber])



  //section for fetch items for searched sheet   ---end------



  //start produciton prodution process apis when click on Yes button  -------Start-----
  // 🔧 Step 1: Add production process details
  const createProductionProcessDetails = async () => {
    const data = {
      production_sheet_id: selectedSheetNumber?.value,
      sheet_no: selectedSheetNumber?.sheet_no,
      created_by: "shubham",
    };

    const res = await addProductionProcessDetails(data);

    if (!res?.data?.success || !res?.data?.productionProcess?._id) {
      console.error("❌ Failed to create production process:", res?.data);
      return null;
    }

    return res?.data?.productionProcess;
  };

  // 🔧 Step 2: Add production items with production_process_id
  const storeProductionItems = async ({ productionProcessId }) => {
    const items = selectdAllSheetItem?.map(item => ({
      production_process_id: productionProcessId,
      sheet_no: selectedSheetNumber?.sheet_no,
      part_no: item?.part_no,
      sheet_total_quantity: item?.quantity
    }));

    const res = await addProductionProcessItems({ items });

    if (!res?.data?.success) {
      console.error("❌ Failed to store production items:", res?.data);
      return false;
    }

    return true;
  };

  // 🔧 Step 3: Create log entry
  const createProductionLog = async ({ productionProcessId }) => {
    const logData = {
      production_process_id: productionProcessId,
      sheet_no: selectedSheetNumber?.sheet_no,
      created_by: "shubham",
      type: 'PROCESS_START'
    };

    const res = await addProductionProcessLog(logData);

    if (!res?.data?.success) {
      console.error("❌ Failed to create production log:", res?.data);
      return false;
    }

    return true;
  };


  const sidebarmenuUpdateQuantity = async (data) => {
    console.log("producitonProcess data -*-*-*-*-", data)
    // Find the menu item with title === "Production"
    const productionMenu = sidebarMenus?.find(menu => menu?.title === "Production Process List");
    // Get its _id if found
    const sidebarMenuID = productionMenu?._id;
    console.log("sidebarMenuID", sidebarMenuID)
    const statusCountData = data?.productionProcessDetails?.statusCount;
    try {
      const payload = {
        _id: sidebarMenuID,
        statusCount: {
          Pending: statusCountData?.Pending || 0,
          "In Progress": statusCountData?.["In Progress"] || 0,
          Completed: statusCountData?.Completed || 0,
          Total: statusCountData.Total || 0
        }
      };
       console.log("payload is here",payload)
      const res = await updateSidebarMenuCountApi(payload); // You must implement this API on backend
      if (!res?.data?.success) {
        console.error("Failed to update sidebar menu quantity:", res?.data?.message);
      }
    } catch (error) {
      console.error("Error updating sidebar menu quantity:", error);
    }
  };

  const startProductionProcess = async (sheetId) => {
    try {
      // Step 1: Create main production process entry
      const productionProcess = await createProductionProcessDetails();
      if (!productionProcess) return false;
      const productionProcessDetails = productionProcess;
      const productionProcessId = productionProcess._id;


      // Step 2: Store items
      const itemsStored = await storeProductionItems({ productionProcessId });
      if (!itemsStored) return false;

      // Step 3: Log start
      const logCreated = await createProductionLog({ productionProcessId });
      if (!logCreated) return false;


       //step 4 Update SidebarMenu
      await sidebarmenuUpdateQuantity({ productionProcessDetails })
      // console.log("updateSidebarProductionProcessCount",updateSidebarProductionProcessCount)
      // if (!updateSidebarProductionProcessCount) return false;

      // 👉 Fetch updated sidebar data
      dispatch(getSidebarMenusRequest());

      return true; // ✅ All steps succeeded
    } catch (error) {
      return false;
    }

  };

  //start produciton prodution process apis when click on Yes button  -------end-----


  //section for start and stop button   ---start------


  const handleStartRequest = () => {
    if (!selectedSheetId) {
      Swal.fire('No Sheet Selected', 'Please select a sheet to start.', 'warning');
      return;
    }

    Swal.fire({
      title: `Start production for Sheet ID: ${selectedSheetId}?`,
      text: "Do you want to start the production process?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Start',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#28a745',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // 🔄 Show loading
          Swal.fire({
            title: 'Starting...',
            text: 'Please wait while we start production...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          // ⏳ API call
          const response = await startProductionProcess(selectedSheetId);
          setProcessStarted(true);
          // ✅ If success condition met (customize based on your API)
          if (response) {

            Swal.close();

            setIsRunning(true);
            setIsPaused(false);

            Swal.fire({
              title: 'Started!',
              text: `Production started for Sheet ID: ${selectedSheetId}`,
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
              timerProgressBar: true,
            });

          } else {
            // ❌ Server responded but with failure
            Swal.close();

            Swal.fire({
              title: 'Failed!',
              text: response?.message || 'Server returned an error while starting production.',
              icon: 'error',
              timer: 5000,
              showConfirmButton: false,
              timerProgressBar: true,
            });
          }

        } catch (error) {
          console.error('API error:', error);
          Swal.close();

          Swal.fire({
            title: 'Failed!',
            text: `An error occurred while starting production for Sheet ID: ${selectedSheetId}`,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    });
  };



  const pauseProduction = async () => {
    try {
      const payload = {
        production_process_id: producitonProcessDetails?._id,
      };

      const res = await pauseProductionProcessApi(payload);

      if (res?.data?.success) {
        setIsPaused(true);

        // ✅ Create pause log
        const logData = {
          production_process_id: producitonProcessDetails?._id,
          sheet_no: producitonProcessDetails?.sheet_no,
          created_by: "system",
          type: 'PROCESS_PAUSED', // 🔁 Use your desired log type enum
        };

        const reslog = await addProductionProcessLog(logData);

        if (reslog?.data?.success) {
          Swal.fire({
            icon: 'info',
            title: 'Paused',
            text: 'Production process paused successfully.',
            confirmButtonColor: '#007bff'
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Paused, but Log Failed',
            text: 'Process was paused but log not saved properly.',
          });
        }

        // 🔄 Optional: refresh latest data
        dispatch(getProductionProcessDetailsBySheetIDRequest(producitonProcessDetails?.production_sheet_id));

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Pause Failed',
          text: res?.data?.message || 'Failed to pause production.',
        });
      }
    } catch (error) {
      console.error("Pause error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while pausing production.',
      });
    }
  };

  const stopProcess = async () => {
    try {
      const payload = {
        production_process_id: producitonProcessDetails?._id, // replace with actual ID
      };

      const res = await stopProductionProcessApi(payload); // 🔁 your actual API call

      if (res?.data?.success) {
        // ✅ Create log for stopped process
        const logData = {
          production_process_id: producitonProcessDetails?._id,
          sheet_no: producitonProcessDetails?.sheet_no,
          created_by: "system",
          type: 'PROCESS_STOPPED'
        };

        const reslog = await addProductionProcessLog(logData);

        if (reslog?.data?.success) {
          Swal.fire({
            icon: 'success',
            title: 'Stopped!',
            text: 'Production process has been stopped.',
            confirmButtonColor: '#dc3545',
          });
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Stopped',
            text: 'Process stopped, but failed to log the action.',
          });
        }

        setIsRunning(false);
        setIsPaused(false);

        // 🔄 Optional: refresh latest data
        dispatch(getProductionProcessDetailsBySheetIDRequest(producitonProcessDetails?.production_sheet_id));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Stop Failed',
          text: res?.data?.message || 'Failed to stop production.',
        });
      }
    } catch (error) {
      console.error("Stop error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while stopping production.',
      });
    }
  };

  // const stopProcess = async () => {
  //   try {
  //     const payload = {
  //       production_process_id: producitonProcessDetails?._id, // replace with actual ID
  //     };
  //     const res = await stopProductionProcessApi(payload); // 🔁 your actual API call

  //     if (res?.data?.success) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Stopped!',
  //         text: 'Production process has been stopped.',
  //         confirmButtonColor: '#dc3545',
  //       });
  //       setIsRunning(false);
  //       setIsPaused(false);
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Stop Failed',
  //         text: res?.data?.message || 'Failed to stop production.',
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Stop error:", error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'Something went wrong while stopping production.',
  //     });
  //   }
  // };

  const handleStopRequest = () => {
    Swal.fire({
      title: 'Stop or Pause Production?',
      text: "Do you want to stop or temporarily pause your production process?",
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Stop',
      denyButtonText: 'Pause',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc3545',
      denyButtonColor: '#ffc107',
    }).then((result) => {
      if (result.isConfirmed) {
        // setIsRunning(false);
        // setIsPaused(false);
        // Swal.fire('Stopped', 'Production process has been stopped.', 'info');
        stopProcess();
      } else if (result.isDenied) {
        pauseProduction();
        // Swal.fire('Paused', 'Production is paused.', 'info');
      }
    });
  };

  const resumeProcess = async () => {
    try {
      const payload = {
        production_process_id: producitonProcessDetails?._id
      };

      const res = await resumeProductionProcessApi(payload);

      if (res?.data?.success) {
        // ✅ Update state
        setIsPaused(false);

        // ✅ Log entry for resume
        const logData = {
          production_process_id: producitonProcessDetails?._id,
          sheet_no: producitonProcessDetails?.sheet_no,
          created_by: "system",
          type: 'PROCESS_RESUMED', // same as your log config
        };

        const reslog = await addProductionProcessLog(logData);

        if (reslog?.data?.success) {
          Swal.fire({
            icon: 'success',
            title: 'Resumed!',
            text: 'Production has resumed.',
            confirmButtonColor: '#28a745',
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Resume Successful',
            text: 'Production resumed but log was not created.',
          });
        }

        // 🔁 Refresh production process state if needed
        dispatch(getProductionProcessDetailsBySheetIDRequest(producitonProcessDetails?.production_sheet_id));

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Resume Failed',
          text: res?.data?.message || 'Failed to resume production.',
        });
      }
    } catch (error) {
      console.error("Resume error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while resuming production.',
      });
    }
  };

  // const resumeProcess = async () => {
  //   try {
  //     const payload = {
  //       production_process_id: producitonProcessDetails?._id
  //     };

  //     const res = await resumeProductionProcessApi(payload);

  //     if (res?.data?.success) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Resumed!',
  //         text: 'Production has resumed.',
  //         confirmButtonColor: '#28a745',
  //       });
  //       setIsPaused(false);
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Resume Failed',
  //         text: res?.data?.message || 'Failed to resume production.',
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Resume error:", error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'Something went wrong while resuming production.',
  //     });
  //   }
  // };

  const handleResumeRequest = () => {
    Swal.fire({
      title: 'Resume Production?',
      text: "Do you want to resume the production process?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Resume',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#28a745',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await resumeProcess();
      }
    });
  };

  //section for start and stop button   ---end------
  //GLOBAL REQUEST FROM PRODUCTION PROCESS MOUDLE 

  // console.log("producion process details",producitonProcessDetails, producitonProcessItemsAnalytics)
  useEffect(() => {
    if (selectedSheetNumber?.value) {
      dispatch(getProductionProcessDetailsBySheetIDRequest(selectedSheetNumber?.value));
    }
    setIsRunning(false)//this line is for always whenever selected sheet has should initialy false the value for button which is wrong but now for this ÷
    setProcessStarted(false);
  }, [dispatch, selectedSheetNumber, processStarted]);

  //set --> check if production process is running or not == This useEffect hook is used to check selected sheet id is started or not??
  useEffect(() => {
    if (producitonProcessDetails?.production_process_is_running) {
      setIsRunning(producitonProcessDetails?.production_process_is_running)
    } else {
      setIsRunning(false)
    }
  }, [producitonProcessDetails]);


  // const handleActivityLogClick = () => {
  //   if (!producitonProcessDetails?._id) return;

  //   navigate(`/production-process-log-activity/${producitonProcessDetails._id}`);
  // };

  return (
    <>
      <ToastContainer />
      <Loader visible={loading} />
      <PageTitle
        activeMenu={"Production Process"}
        motherMenu={"Home"}
        motherMenuLink={"/dashboard"}
      />
      <Row>
        <Col lg={12}>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Production Process Management</h4>
              <ProductionStartStopButton
                isRunning={isRunning}
                isPaused={isPaused}
                onStartRequest={handleStartRequest}
                onStopRequest={handleStopRequest}
                onResumeRequest={handleResumeRequest}
              />
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <div className="">
                  {/* ANALYTICS */}
                  <div>
                    <SearchSheetInputBox onSheetSelect={handleSheetSelection} />
                    <ProductionProcessHomeAnalytics />
                    {/* <HomepageAnalytics /> */}
                    <ProductionStepsProgressAnalytics />
                  </div>
                  {/* PRODUCTION PROCESS TABS*/}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 0',
                      marginBottom: '16px',
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '1.6rem',
                        fontWeight: '600',
                        color: '#2c3e50',
                      }}
                    >
                      Production Process
                    </h3>

                    <button
                      onClick={() => handleOpenLogModal()}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        color: '#004080',
                        padding: '6px 16px',
                        border: '2px solid #004080',
                        borderRadius: '6px',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                        transition: 'all 0.2s ease-in-out',
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.backgroundColor = '#004080';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#004080';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#004080';
                      }}
                    >
                      Activity Log&nbsp;
                      <FaExternalLinkAlt style={{ marginLeft: '6px' }} />
                    </button>
                  </div>

                  {/* SEARCHING INPUT BOX WITH ORDERNUMBER AND SHEET NUMBER */}
                  <div>
                    {/* <SearchSheet /> */}
                  </div>
                  <div id="smartwizard" ref={wizardRef}>
                    <ul className="nav">
                      <li>
                        <a className="nav-link" href="#step-1">Step 1<br /><small>Hose Cutting</small></a>
                      </li>
                      <li>
                        <a className="nav-link" href="#step-2">Step 2<br /><small>Skiving</small></a>
                      </li>
                      <li>
                        <a className="nav-link" href="#step-3">Step 3<br /><small>Pre-Assembly</small></a>
                      </li>
                      <li>
                        <a className="nav-link" href="#step-4">Step 4<br /><small>Crimping</small></a>
                      </li>
                      <li>
                        <a className="nav-link" href="#step-5">Step 5<br /><small>Testing</small></a>
                      </li>
                      {/* <li>
                        <a className="nav-link" href="#step-6">Step 6<br /><small>Packing</small></a>
                      </li> */}
                    </ul>
                    <div className="tab-content">
                      <div id="step-1" className="tab-pane" role="tabpanel" style={{ marginTop: '-50px' }}>
                        <HoseCutting />
                      </div>
                      <div id="step-2" className="tab-pane" role="tabpanel">
                        <Skiving />
                      </div>
                      <div id="step-3" className="tab-pane" role="tabpanel">
                        <PreAssembly />
                      </div>
                      <div id="step-4" className="tab-pane" role="tabpanel">
                        <Crimping />
                      </div>
                      <div id="step-5" className="tab-pane" role="tabpanel">
                        <Testing />
                      </div>
                      {/* <div id="step-6" className="tab-pane" role="tabpanel">
                        <Packing />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>



      <ProductionProcessLogActivityModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        // itemId={selectedItemId}
        // stage="Hose-cutting"
        productionProcessID={producitonProcessDetails}
      />

    </>
  );
};

export default ProductionProcess;


