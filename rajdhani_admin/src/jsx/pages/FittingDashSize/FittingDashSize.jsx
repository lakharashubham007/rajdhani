import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Dropdown, Button, Modal } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Toaster } from "../../components/Toaster/Toster";
import Loader from "../../components/Loader/Loader";
import moment from "moment";
import Switch from "react-switch";
import ReactPaginate from "react-paginate";
import DeleteWarningMdl from "../../components/common/DeleteWarningMdl";
import useDebounce from "../../components/common/Debounce";
import Select from "react-select";
import {
  addFittingDashSizeApi,
  deleteFittingDashSizeApi,
  fetchFilteredFittingDashSize,
  GetEditFittingDashSizeData,
  getFittingDashSizeApi,
  UpdateFittingDashSize,
  UpdateFittingDashSizeStatus,
} from "../../../services/apis/FittingDashSize";
import { getAllOptions } from "../../../services/apis/options";
import { getAllFittingThreadApi } from "../../../services/apis/FittingThreads";
import { getAllHoseDashSizeApi } from "../../../services/apis/HoseDashSize";
import { getAllVariantListApi } from "../../../services/apis/Variants";

const theadData = [
  { heading: "S.No.", sortingVale: "sno" },
  // { heading: "Id", sortingVale: "_id" },
  { heading: "Fitting Thread Type", sortingVale: "thread_type" },
  { heading: "Hose Dash Size", sortingVale: "dash_code" },
  { heading: "Fitting Dash Size/Thread", sortingVale: "dash_code" },
  { heading: "Fitting Code", sortingVale: "thread" },
  { heading: "Description Code", sortingVale: "dsc_code" },
  { heading: "Created At", sortingVale: "created_at" },
  { heading: "Status", sortingVale: "status" },
  { heading: "Action", sortingVale: "action" },
];

const FittingDashSize = () => {
  const [dropdownOptions, setDropwonOptions] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  // selected options
  const [sort, setSortata] = useState(10);
  const [modalCentered, setModalCentered] = useState(false);
  const [data, setData] = useState(
    document.querySelectorAll("#holidayList tbody tr")
  );

  const [UpdateCategory, setUpdateCategory] = useState(false);
  const [fittingDashSizeList, setFittingDasjSizesList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editPartId, setEditPartId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [iconData, setIconDate] = useState({ complete: false, ind: Number });
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const [showDeleteMdl, setShowDeleteMdl] = useState(false);
  const [deleteTableDataId, setDeleteTableDataId] = useState("");
  const [filterThreadValue,setFilterThreadValue] = useState("")
  console.log("filterThreadValue",filterThreadValue)
  const [formData, setFormData] = useState({
    thread_type: "",
    dash_code: "",
    variant: "",
    thread: "",
    size: "",
    dsc_code: "",
    pipe_od: "",
    metric_type: ""
  });

  console.log("formData", formData);

  const [HoseDashSizeOption, setHoseDashSizeOption] = useState(null);
  const [fittingDashSizeOption, setfittingDashSizeOption] = useState(
    dropdownOptions?.fittingDashSizeOptions
  );
  const [fittingThreadOption, setfittingThreadOption] = useState(null);
  const [pipeODOption, setpipeODOption] = useState(
    dropdownOptions?.pipeODOptions
  );
  const [matricTypeOption, setMatricTypeOption] = useState([
    { label: "Light", value: "light" },
    { label: "Heavy", value: "heavy" },
    { label: "Light With O", value: "Light With O" },
    { label: "Heavy With O", value: "Heavy With O" },
  ]);
  const [variantOption, setVariantOption] = useState([
    { label: "Null", value: "null" },
    { label: "Standard", value: "Standard" },
  ]);
  // selected
  const [selectedhoseDashSizeOption, setSelectedHoseDashSizeOption] = useState(null);
  const [selectedFittingDashSizeOption, setSelectedfittingDashSizeOption] = useState(null);
  const [selectedFittingThreadOption, setSelectedFittingThreadOption] = useState(null);
  const [selectedvariantOption, setSelectedvariantOption] = useState(null);
  const [selectedmetricTypeOptions, setSelectedmetricTypeOptions] = useState(null);

  console.log("selectedhoseDashSizeOption", selectedhoseDashSizeOption)

  const debouncedSearchValue = useDebounce(searchInputValue, 500);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Dynamically update the field (name, etc.)
    });
    setErrors({
      ...errors,
      name: "",
    });
  };

  const fetchFittingThreadOptions = async () => {
    setLoading(true);
    try {
      const res = await getAllFittingThreadApi();
      const resData = res?.data?.fittingThreads;
      const mappedData = resData?.map((val) => ({
        label: `${val?.name}`,
        value: val?.name,
      }));
      setfittingThreadOption(mappedData);
    } catch (error) {
      // console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHoseDashSizeOptions = async () => {
    setLoading(true);
    try {
      const res = await getAllHoseDashSizeApi();
      const resData = res?.data?.hoseDashSizes;
      const mappedData = resData?.map((val) => ({
        label: `${val?.size} (${val?.code})`,
        value: val?.size,
        code: val?.code
      }));
      setHoseDashSizeOption(mappedData);
    } catch (error) {
      // console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchVariantsOptions = async () => {
    setLoading(true);
    try {
      const res = await getAllVariantListApi();
      const resData = res?.data?.variants;
      // const mappedData = resData?.map((val) => ({
      //   label: `${val?.name}`,
      //   value: val?.name
      // }));

      // console.log("mappedData",mappedData)
      // setVariantOption(mappedData);
    } catch (error) {
      // console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllOptions = async () => {
    setLoading(true);
    try {
      const res = await getAllOptions();
      const resData = res?.data?.data;
      // setDropwonOptions(res?.data?.data);
      // setHoseDashSizeOption(resData?.hoseDashSizeOptions)
    } catch (error) {
      // console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOptions();
    fetchFittingThreadOptions();
    fetchHoseDashSizeOptions();
    fetchVariantsOptions();
  }, []);

  //   getSubCategoriesApi
  const fetchFittingDashSize = async (sortValue) => {
    // Set loading to true when the API call starts
    setLoading(true);
    try {
      const res = await getFittingDashSizeApi(
        currentPage,
        sort,
        sortValue,
        searchInputValue,
        filterThreadValue
      );
      setFittingDasjSizesList(res?.data?.fittingDashSizes);
      setUpdateCategory(false);
    } catch (error) {
      // Catch and handle errors
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      // Always set loading to false when the API call is done (whether successful or failed)
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFittingDashSize();
  }, [UpdateCategory, currentPage, sort, debouncedSearchValue,filterThreadValue]);

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

  function SotingData(name, ind) {
    if (iconData.complete) {
      const sortValue = { value: name, type: "asc" };
      fetchFittingDashSize(sortValue);
    } else {
      const sortValue = { value: name, type: "dsc" };
      fetchFittingDashSize(sortValue);
    }
  }

  const handleEditFittingDashSize = async (id) => {
    try {
      const res = await GetEditFittingDashSizeData(id);
      if (res?.data?.success) {
        const data = res?.data?.fittingDashSize;
        // console.log("data",data)
        setEditPartId(data?._id);
        setSelectedFittingThreadOption({
          value: data?.thread_type,
          label: data?.thread_type
        });

        setSelectedHoseDashSizeOption({
          value: data?.dash_code,
          label: data?.dash_code
        });

        setSelectedvariantOption({
          value: data?.variant,
          label: data?.variant
        });

        setSelectedmetricTypeOptions({
          value: data?.metric_type,
          label: data?.metric_type
        });

        setFormData({
          thread_type: data?.thread_type,
          dash_code: data?.dash_code?.replace(/"$/, ""),
          variant: data?.variant,
          thread: data?.thread?.replace(/"$/, ""),
          size: data?.size,
          dsc_code: data?.dsc_code?.replace(/"$/, ""),
          pipe_od: data?.pipe_od,
          metric_type: data?.metric_type
        });
        // setModalCentered(true);
        setIsEdit(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePart = (id) => {
    setDeleteTableDataId(id);
    setShowDeleteMdl(true);
  };

  const handleDeleteSubmit = async () => {
    try {
      const res = await deleteFittingDashSizeApi(deleteTableDataId);
      if (res.status === 200) {
        Toaster.success(res?.data?.message); // Display success message
        fetchFittingDashSize();
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

  const handleStatusChange = async (partId, currentStatus) => {
    const fdata = {
      status: !currentStatus,
    };
    try {
      const res = await UpdateFittingDashSizeStatus(partId, fdata);
      if (res.status === 200) {
        Toaster.success(res?.data?.message); // Display success message
        fetchFittingDashSize();
      } else {
        Toaster.error(
          res?.data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.log(err);
    }

    // console.log("newStatus",newStatus)
  };

  const handleFilter = async (option) => {
    if (!selectedFittingThreadOption) return;

    console.log("selectedFittingThreadOption.value",option)
  
    try {
      const res = await fetchFilteredFittingDashSize( 
        option);
  
      if (res.status === 200) {
        Toaster.success("Filter applied successfully!");
        // setFilteredData(res.data.filteredEntries); // Assuming API returns filtered data
      } else {
        Toaster.error("Failed to apply filter. Please try again.");
      }
    } catch (error) {
      console.error("Error filtering entries:", error);
      Toaster.error("Something went wrong while filtering.");
    }
  };
  

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      thread_type: "",
      dash_code: "",
      variant: "",
      thread: "",
      size: "",
      dsc_code: "",
      pipe_od: "",
      metric_type: ""
    });
    setSelectedHoseDashSizeOption(null);
    setSelectedfittingDashSizeOption(null);
    setSelectedFittingThreadOption(null);
    setSelectedvariantOption(null);
    setSelectedmetricTypeOptions(null);

    setErrors({});
    setLoading(false);
  };

  const validateForm = () => {
    const newErrors = {};
    // Required field validation
    if (!formData.thread_type) newErrors.thread_type = "Fitting Thread is required.";

    if (!formData.hose_dash_code) newErrors.hose_dash_code = "Hose Dash Size is required.";

    if (!formData.thread) newErrors.thread = "Fitting Code is required.";

    if (!formData.dsc_code) newErrors.dsc_code = "Description Code is required.";

    if (formData?.thread_type == "METRIC") {
      if (!formData.metric_type) newErrors.metric_type = "Metric Type is required.";

      if (!formData.pipe_od) newErrors.pipe_od = "Pipe Od is required.";
    } else {
      if (!formData.variant) newErrors.variant = "Variant is required.";

      // if (!formData.size) newErrors.size = "Size is required.";
    }

    // Set errors to the state
    setErrors(newErrors);
    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };


  const handleUpdateSubmit = async () => {
    try {
      const res = await UpdateFittingDashSize(editPartId, formData);
      if (res.status === 200) {
        setUpdateCategory(true);
        Toaster.success(res?.data?.message);
        resetForm();
        setModalCentered(false);
        setIsEdit(false);
        fetchFittingDashSize();
        setSelectedOption(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    if (isEdit) {
      handleUpdateSubmit();
    } else {
      setLoading(true);
      const fData = {
        ...formData,
        thread_type: `${formData?.thread_type}`,
        dash: `${formData?.hose_dash_code}`,
        thread: `${formData?.size}\"`,
        dsc_code: `${formData?.dsc_code}\"`,
        // size:`${formData?.size}\"`,
        variant: `${formData?.variant}`
      }
      try {
        const res = await addFittingDashSizeApi(fData);
        if (res?.data?.success) {
          setLoading(false);
          Toaster.success(res?.data?.message);
          resetForm(); // Reset form after success
          fetchFittingDashSize();
        } else {
          setLoading(false);
          Toaster.error(res?.data?.message || "Failed to create item");
          // console.error("Creation error:", res);
        }
      } catch (error) {
        setLoading(false);
        Toaster.error(
          error.response?.data?.message ||
          "An error occurred while processing your request"
        );
      }
    }
  };

  return (
    <>
      <DeleteWarningMdl
        title={"table data"}
        showDeleteMdl={showDeleteMdl}
        setShowDeleteMdl={setShowDeleteMdl}
        setDeleteTableDataId={setDeleteTableDataId}
        handleDeleteSubmit={handleDeleteSubmit}
      />

      <ToastContainer />
      <Loader visible={loading} />
      <PageTitle activeMenu={"Fitting Dash Size"} motherMenu={"Home"} />
      <div className="row">
        {/* SECTION 1ST */}
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Basic Info</h4>
            </div>
            <div className="card-body">
              <div>
                <div className="mb-3 row">
                  <div className="col-md-3">
                    <label className="col-form-label">Fitting Thread Type</label>
                    <Select
                      value={selectedFittingThreadOption}
                      onChange={(option) => {
                        setSelectedFittingThreadOption(option);
                        setFormData({
                          ...formData,
                          thread_type: option.value,
                        });
                        setErrors({
                          ...errors,
                          thread_type: null,
                        });
                      }}
                      defaultValue={selectedFittingThreadOption}
                      options={fittingThreadOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.thread_type && (
                      <span className="text-danger fs-12">
                        {errors.thread_type}
                      </span>
                    )}
                  </div>

                  <div className="col-md-3">
                    <label className="col-form-label">Hose Dash Size</label>
                    <Select
                      value={selectedhoseDashSizeOption}
                      onChange={(option) => {
                        setSelectedHoseDashSizeOption(option);
                        setFormData({
                          ...formData,
                          hose_dash_size: option.value,
                          hose_dash_code: option.code,
                        });
                        setErrors({
                          ...errors,
                          dash_code: null,
                        });
                      }}
                      defaultValue={selectedhoseDashSizeOption}
                      options={HoseDashSizeOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.dash_code && (
                      <span className="text-danger fs-12">
                        {errors.dash_code}
                      </span>
                    )}
                  </div>

                  {selectedFittingThreadOption?.value !== "METRIC" && 
                  // selectedFittingThreadOption?.value !== "SAE 61" &&
                  // selectedFittingThreadOption?.value !==  "SAE 62" &&
                    <div className="col-md-3">
                      <label className="col-form-label">Fitting Dash Size/Thread</label>
                      <input
                        name="size"
                        value={formData?.size}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Ex: 1/2"
                      />
                      {errors.size && (
                        <span className="text-danger fs-12">{errors.size}</span>
                      )}
                    </div>
                  }

                  {/* {
                     (selectedFittingThreadOption?.value === "SAE 61" ||
                     selectedFittingThreadOption?.value ===  "SAE 62") &&
                    <div className="col-md-3">
                    <label className="col-form-label">Pipe OD</label>
                    <input
                      name="pipe_od"
                      value={formData.pipe_od}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: 01"
                    />
                    {errors.pipe_od && (
                      <span className="text-danger fs-12">
                        {errors.pipe_od}
                      </span>
                    )}
                  </div>
                  } */}

                  {selectedFittingThreadOption?.value !== "METRIC" ? (
                    <>
                      <div className="col-md-3">
                        <label className="col-form-label">Variant</label>
                        <Select
                          value={selectedvariantOption}
                          onChange={(option) => {
                            setSelectedvariantOption(option);
                            setFormData({
                              ...formData,
                              variant: option.value,
                            });
                            setErrors({
                              ...errors,
                              variant: null,
                            });
                          }}
                          defaultValue={selectedvariantOption}
                          options={variantOption}
                          style={{
                            lineHeight: "40px",
                            color: "#7e7e7e",
                            paddingLeft: " 15px",
                          }}
                        />
                        {errors.variant && (
                          <span className="text-danger fs-12">
                            {errors.variant}
                          </span>
                        )}
                      </div>

                    </>
                  ) : (
                    <>

                      {/* Metric Type */}
                      <div className="col-md-3">
                        <label className="col-form-label">Metric Type</label>
                        <Select
                          value={selectedmetricTypeOptions}
                          onChange={(option) => {
                            setSelectedmetricTypeOptions(option);
                            setFormData({
                              ...formData,
                              metric_type: option.value,
                            });
                            setErrors({
                              ...errors,
                              metric_type: null,
                            });
                          }}
                          defaultValue={selectedmetricTypeOptions}
                          options={matricTypeOption}
                          style={{
                            lineHeight: "40px",
                            color: "#7e7e7e",
                            paddingLeft: " 15px",
                          }}
                        />
                        {errors.metric_type && (
                          <span className="text-danger fs-12">
                            {errors.metric_type}
                          </span>
                        )}
                      </div>

                      {/* POD */}
                      <div className="col-md-3">
                        <label className="col-form-label">Pipe OD</label>
                        <input
                          name="pipe_od"
                          value={formData.pipe_od}
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                          placeholder="Ex: 01"
                        />
                        {errors.pipe_od && (
                          <span className="text-danger fs-12">
                            {errors.pipe_od}
                          </span>
                        )}
                      </div>
                    </>
                  )}

                  <div className="col-md-3">
                    <label className="col-form-label">
                      Fitting Code
                    </label>
                    <input
                      name="thread"
                      value={formData.thread}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: 01"
                    />
                    {errors.thread && (
                      <span className="text-danger fs-12">
                        {errors.thread}
                      </span>
                    )}
                  </div>

                  <div className="col-md-3">
                    <label className="col-form-label">Desciption Code</label>
                    <input
                      name="dsc_code"
                      value={formData?.dsc_code}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: 1/2"
                    />
                    {errors.dsc_code && (
                      <span className="text-danger fs-12">
                        {errors.dsc_code}
                      </span>
                    )}
                  </div>


                </div>
              </div>
              <div className="text-end">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary rounded-sm">
                  Save Information
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Section Submit button */}
      </div>

      <Row>
        <Col lg={12}>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Fitting Dash Size List</h4>
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


                    <div className="" style={{ display: "flex", alignItems: "center", gap: "0px" }}>
                      <label style={{ fontWeight: "", minWidth: "120px" }}>Fitting Thread</label>
                      <Select
                        value={selectedFittingThreadOption}
                        onChange={(option) => {
                          setSelectedFittingThreadOption(option);
                          setFilterThreadValue(option.value)
                          // handleFilter(option.value); // Call filter method on change
                        }}
                        // onChange={(option) => {
                        //   setSelectedFittingThreadOption(option);
                        //   setFormData({
                        //     ...formData,
                        //     thread_type: option.value,
                        //   });
                        //   setErrors({
                        //     ...errors,
                        //     thread_type: null,
                        //   });
                        // }}
                        defaultValue={selectedFittingThreadOption}
                        options={fittingThreadOption}
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            minHeight: "30px", // Reduce select box height
                            height: "45px",
                            lineHeight: "30px",
                            width: '250px'
                          }),
                          valueContainer: (provided) => ({
                            ...provided,
                            padding: "4px 6px -4px -2px",
                          }),
                          singleValue: (provided) => ({
                            ...provided,
                            color: "#7e7e7e",
                          }),
                        }}
                      />
                      {errors.thread_type && (
                        <span className="text-danger fs-12">{errors.thread_type}</span>
                      )}
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
                      {fittingDashSizeList?.fittingDashSizes?.map((data, ind) => (
                        <tr key={ind}>
                          <td>
                            {/* <strong>{ind + 1}</strong> */}
                            <strong>{(currentPage - 1) * sort + ind + 1}</strong>
                          </td>

                          <td className="">{data?.thread_type}</td>
                          <td className="">{data?.hose_dash_code}</td>
                          <td className="">{data?.thread === null ? "NULL" : data?.thread === "null\"" ? "NULL" : data?.thread}</td>


                          {/* <td className="">{data?.thread}</td> */}
                          <td className="">{data?.hose_dash_code}</td>
                          <td className="">{data?.dsc_code === null ? "NULL" : data?.dsc_code === "null\"" ? "NULL" : data?.dsc_code}</td>

                          <td>
                            {moment(data?.created_at).format(
                              "DD MMM YYYY, h:mm:ss a"
                            )}
                          </td>
                          <td>
                            <Switch
                              checked={data?.status}
                              onChange={() =>
                                handleStatusChange(data?._id, data?.status)
                              }
                              offColor="#f0f1ff"
                              onColor="#6a73fa"
                              offHandleColor="#6a73fa"
                              onHandleColor="#fff"
                              uncheckedIcon={false}
                              checkedIcon={false}
                              width={40} // Adjust width of the switch
                              height={20} // Adjust height of the switch
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-xs sharp btn-primary me-1"
                              onClick={() => handleEditFittingDashSize(data?._id)}
                            >
                              <i className="fa fa-pencil" />
                            </button>
                            <button
                              className="btn btn-xs sharp btn-danger"
                              onClick={() => handleDeletePart(data?._id)}>
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
                            fittingDashSizeList?.totalFittingDashSizes /
                            fittingDashSizeList?.rowsPerPage
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
                          {errors?.name && (
                            <span className="text-danger fs-12">
                              {errors?.name}
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

export default FittingDashSize;
