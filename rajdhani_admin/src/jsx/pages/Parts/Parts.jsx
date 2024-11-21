import React, { useEffect, useRef, useState } from "react";
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
import { DatePicker } from "rsuite";
import Select from "react-select";
import PageTitle from "../../layouts/PageTitle";
import { getAllCategoriesListApi, getAllSubCategoriesListApi, getAllSubSubCategoriesListApi, getCategoriesApi } from "../../../services/apis/CategoryApi";
import { getAddonsApi } from "../../../services/apis/AddOnServiceApi";
import { addFoodApi } from "../../../services/apis/FoodApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Toaster } from "../../components/Toaster/Toster";
import Loader from "../../components/Loader/Loader";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import uplodIcon from "../../../assets/images/upload-icon.png";
import { set } from "rsuite/esm/internals/utils/date";
import { getAllFittingSizeListApi } from "../../../services/apis/FittingSize";
import { getAllThreadListApi } from "../../../services/apis/Thread";
import { deleteMaterialApi, getAllMaterialsApi, GetEditMaterialData, getMaterialsApi, UpdateMaterial, UpdateMaterialStatus } from "../../../services/apis/Materials";
import moment from "moment";
import Switch from "react-switch";
import ReactPaginate from "react-paginate";
import { addPartApi, deletePartApi, getAllPartsApi, GetEditPartData, getPartsApi, UpdatePart, UpdatePartStatus } from "../../../services/apis/Parts";
import DeleteWarningMdl from "../../components/common/DeleteWarningMdl";
import useDebounce from "../../components/common/Debounce";

const options = [
  { value: "veg", label: "Veg" },
  { value: "non-veg", label: "Non Veg" },
];

const discountOptions = [
  { value: "percentage", label: "Percentage ( % ) " },
  { value: "inr", label: "INR " },
];

const theadData = [
    { heading: "S.No.", sortingVale: "sno" },
    { heading: "Id", sortingVale: "_id" },
    { heading: "Name", sortingVale: "name" },
    { heading: "Type", sortingVale: "type" },
    { heading: "Created At", sortingVale: "created_at" },
    { heading: "Status", sortingVale: "status" },
    { heading: "Action", sortingVale: "action" },
  ];

const Parts = () => {
  const [logo, setLogo] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedRestaurantOption, setSelectedRestaurantOption] = useState();
  const [selectedCategoryOption, setSelectedCategoryOption] = useState();
  const [selectedSubCategoryOption, setSelectedSubCategoryOption] = useState();
  const [selectedAddonsOption, setSelectedAddonsOption] = useState();
  const [errors, setErrors] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);

  const [allFittingSizeList,setAllFittingSizeList]=useState([]);
  const [allThreadList,setAllThreadList]=useState([]);
  const [allCategoryList,setAllCategoryList]=useState([]);
  const [allSubCategoryList,setAllSubCategoryList]=useState([]);
  const [allSubSubCategoryList,setAllSubSubCategoryList]=useState([]);
  const [allMaterialList,setAllMaterialList]=useState([]);

  // selected options
  const [selectedMaterialOption,setSelectedMaterialOption]=useState(null);
  const [selectedFittingSizeOption,setSelectedFittingSizeOption]=useState(null);

  const [sort, setSortata] = useState(10);
  const [modalCentered, setModalCentered] = useState(false);
  const [data, setData] = useState(
    document.querySelectorAll("#holidayList tbody tr")
  );

  const [UpdateCategory, setUpdateCategory] = useState(false);
  const [partsList, setPartsList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editPartId, setEditPartId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [iconData, setIconDate] = useState({ complete: false, ind: Number });
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const [showDeleteMdl,setShowDeleteMdl]=useState(false);
  const [deleteTableDataId,setDeleteTableDataId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    material_id:"",
    fittingsize_id:"",
  });
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

//   getSubCategoriesApi
  const fetchParts=async(sortValue)=>{
        // Set loading to true when the API call starts
        setLoading(true);
        try {
          const res = await getPartsApi(
            currentPage,
            sort,
            sortValue,
            searchInputValue
          );
          setPartsList(res.data);
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
    fetchParts();
  }, [UpdateCategory, currentPage, sort, debouncedSearchValue]);


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
      fetchParts(sortValue);
    } else {
      const sortValue = { value: name, type: "dsc" };
      fetchParts(sortValue);
    }
  }

  const handleEditPart = async (id) => {
    try {
      const res = await GetEditPartData(id);
      if (res?.data?.success) {
        const data = res?.data?.part;
        setEditPartId(data?._id);
        setSelectedFittingSizeOption({
          value: data?.fittingsize_id?._id,
          label: data?.fittingsize_id?.size});

        setSelectedMaterialOption({
          value: data?.material_id?._id,
          label: data?.material_id?.name});
        
        setFormData({
          name: data?.name,
          description: data?.description,
          type: data?.type,
          material_id: data?.material_id?._id,
          fittingsize_id: data?.fittingsize_id?._id,
        }); 
        // setModalCentered(true);
        setIsEdit(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePart=(id)=>{
    setDeleteTableDataId(id);
    setShowDeleteMdl(true)
  }

  const handleDeleteSubmit = async () => {
    try {
      const res = await deletePartApi(deleteTableDataId);
      if (res.status === 200) {
        Toaster.success(res?.data?.message); // Display success message
        fetchParts();
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

  const handleStatusChange =async (partId, currentStatus) => {
    const fdata={
      status:!currentStatus
    }
    try{
        const res =await UpdatePartStatus(partId,fdata);
        if (res.status === 200) {
         Toaster.success(res?.data?.message); // Display success message
         fetchParts()
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



  // Handles image selection and adds selected images to the state
  const handleImageChange = (event) => {
    console.log("imageChange");
    const files = Array.from(event.target.files);
    const newImages = files?.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setGalleryImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Deletes an image from the array
  const handleDeleteImage = (index) => {
    setGalleryImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
      name: "",
      description:"",
      type:"",
      material_id:"",
      fittingsize_id:"",
    });
    setSelectedMaterialOption(null)
    setSelectedFittingSizeOption(null)
    setSelectedRestaurantOption(null);
    setSelectedCategoryOption(null);
    setSelectedSubCategoryOption(null);
    setSelectedAddonsOption(null);
    setErrors({});
    setLoading(false);
  };

  const validateForm = () => {
    const newErrors = {};
    // Required field validation
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.type) newErrors.type = "Type is required.";
    if (!formData.material_id) newErrors.material_id = "Material is required.";
    if (!formData.fittingsize_id) newErrors.fittingsize_id = "Fittingsize is required.";
   

    // Set errors to the state
    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };


  const handleUpdateSubmit = async () => {
    try {
      const res = await UpdatePart(editPartId, formData);
      if (res.status === 200) {
        setUpdateCategory(true);
        Toaster.success(res?.data?.message);
        resetForm();
        setModalCentered(false);
        setIsEdit(false);
        fetchParts();
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    
    if(isEdit){
      handleUpdateSubmit();
    }else{
    setLoading(true); 
    try {
      const res = await addPartApi(formData);
      if (res.data?.success) {
        setLoading(false);
        Toaster.success(res?.data?.message);
        resetForm(); // Reset form after success
        fetchParts()
      } else {
        setLoading(false);
        Toaster.error(res.data?.message || "Failed to create food item");
        console.error("Food creation error:", res);
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

  const handleDeleteLogo = () => {
    setLogo(null);
    document.getElementById("logoUpload").value = "";
  };



  const fetchFittingSizeList=async()=>{
    setLoading(true);
    try {
      const res = await getAllFittingSizeListApi();
      const dropdownFittingSize = res?.data?.fittingSizes?.map(
        (fittingSize) => ({
          value: fittingSize._id,
          label: fittingSize.size,
        })
      );
      setAllFittingSizeList(dropdownFittingSize)
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
      const dropdownThreads = res?.data?.threads?.map(
        (thread) => ({
          value: thread._id,
          label: thread.threadSize,
        })
      );
      setAllThreadList(dropdownThreads)
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
      const dropdownCategories = res?.data?.categories?.map(
        (category) => ({
          value: category._id,
          label: category.name,
        })
      );
      setAllCategoryList(dropdownCategories);
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

      const dropdownSubCategories = res?.data?.subcategories?.map(
        (subCategory) => ({
          value: subCategory._id,
          label: subCategory.name,
        })
      );
      setAllSubCategoryList(dropdownSubCategories)
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

      const dropdownSubSubCategories = res?.data?.subSubcategories?.map(
        (subSubCategory) => ({
          value: subSubCategory._id,
          label: subSubCategory.name,
        })
      );
     setAllSubSubCategoryList(dropdownSubSubCategories)
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
}

const fetchAllMaterialList=async()=>{
  setLoading(true);
  try {
    const res = await getAllMaterialsApi();
    const dropdownFittingSize = res?.data?.materials?.map(
      (fittingSize) => ({
        value: fittingSize._id,
        label: fittingSize.name,
      })
    );
    setAllMaterialList(dropdownFittingSize);
  } catch (error) {
    console.error("Error fetching cuisines:", error);
    Toaster.error("Failed to load cuisines. Please try again.");
  } finally {
    setLoading(false);
  }
}

// getAllPartsApi
  useEffect(() => {
    fetchFittingSizeList();
    fetchAllMaterialList();
    // fetchAllThreadListApi();
    // fetchAllCategoryList();
    // fetchAllSubCategoryList();
    // fetchAllSubSubCategoryList();
  }, []);

  // Handle the logo image change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({
        ...formData,
        image: file, // Update the image field with the selected file
      });
      setErrors({
        ...errors,
        image: null, // Update the image field with the selected file
      });
    }
  };

  return (
    <>
      <DeleteWarningMdl title={"table data"} showDeleteMdl={showDeleteMdl} setShowDeleteMdl={setShowDeleteMdl} 
        setDeleteTableDataId={setDeleteTableDataId} handleDeleteSubmit={handleDeleteSubmit}/>
      
      <ToastContainer />
      <Loader visible={loading} />
      <PageTitle activeMenu={"Parts"} motherMenu={"Home"} />
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
                  <div className="col-sm-3">
                    <label className="col-sm-3 col-form-label">Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.name && (
                      <span className="text-danger fs-12">{errors.name}</span>
                    )}
                  </div>
                
                  <div className="col-sm-3">
                    <label className="col-sm-3 col-form-label">Type</label>
                    <input
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.type && (
                      <span className="text-danger fs-12">{errors.type}</span>
                    )}
                  </div>

                  <div className="col-sm-3">
                  
                  <label className="col-sm-6 col-form-label">Material</label>
                  <Select
                    onChange={(option) => {
                      setSelectedMaterialOption(option);
                      setFormData({
                        ...formData,
                        material_id:option.value,
                      })}}
                    value={selectedMaterialOption}
                    defaultValue={selectedMaterialOption}
                    options={allMaterialList}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.material_id && (
                    <span className="text-danger fs-12">
                      {errors.material_id}
                    </span>
                  )}
                </div>

                <div className="col-sm-3 ">
                  <label className="col-sm-6 col-form-label">FittingSize</label>
                  
                  <Select
                    value={selectedFittingSizeOption}
                    onChange={(option) => {
                      setSelectedFittingSizeOption(option);
                      setFormData({
                        ...formData,
                        fittingsize_id:option.value,
                      })}}
                    defaultValue={selectedFittingSizeOption}
                    options={allFittingSizeList}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />  
                  {errors.fittingsize_id && (
                    <span className="text-danger fs-12">
                      {errors.fittingsize_id}
                    </span>
                  )}
                </div>
            
                </div>
                <div className="mb-3 row">
                
                  <div className="col-sm-8">
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
                      onChange={handleChange}
                    ></textarea>
                    {errors.description && (
                      <span className="text-danger fs-12">
                        {errors.description}
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
              <h4 className="card-title">Part List</h4>
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
                      {partsList?.parts?.map((data, ind) => (
                        <tr key={ind}>
                          <td>
                            <strong>{ind + 1}</strong>
                          </td>
                          <td>{data?._id}</td>
                          
                          <td className="d-flex align-items-center gap-2">
                            {data?.name}
                          </td>
                          <td className="">
                            {data?.type}
                          </td>
                          
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
                              onClick={() => handleEditPart(data?._id)}
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
                            partsList?.totalParts /
                              partsList?.rowsPerPage
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
            centered >
            <Modal.Header>
              <Modal.Title>
                {" "}
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

export default Parts;
