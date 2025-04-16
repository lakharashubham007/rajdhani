
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
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { addSupplier } from "../../../services/apis/Supplier";
import { getCountryStateCityApi } from "../../../services/apis/CountryStateCity";
import { useNavigate } from "react-router-dom";

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

const AddNewSupplier = () => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);

  const [allFittingSizeList, setAllFittingSizeList] = useState([]);


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
  const [showDeleteMdl, setShowDeleteMdl] = useState(false);
  const [deleteTableDataId, setDeleteTableDataId] = useState("");
  const [selectedStatusOption, setSelectedStatusOption] = useState(null);
  const [statusOption, setStatusOption] = useState([{
    value: "true",
    label: "Active"
  },
  {
    value: "false",
    label: "Inactive",
  }]);

  const [states, setStates] = useState([]);
  const [selectedStateOption, setSelectedStateOption] = useState(null);
  const [stateOption, setStateOption] = useState(null);

  const [selectedCityOption, setSelectedCityOption] = useState(null);
  const [cityOption, setCityOption] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    gstNumber: "",
    panNumber: "",
    description: "",
    status: null,
    image: null
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


  const fetchCountryStateCity = async () => {
    try {
      const res = await getCountryStateCityApi();
      const data = res?.data?.data?.countries[100];
      setStates(data?.states);
      const dropdownStateData = data?.states?.map((state) => ({
        value: state.state_name,
        label: state.state_name,
      })
      );
      setStateOption(dropdownStateData)

    } catch (error) {
      // Catch and handle errors
      // console.error("Error fetching cuisines:", error);
      // Toaster.error("Failed to load cuisines. Please try again.");
    }
  }

  useEffect(() => {
    fetchCountryStateCity()
  }, []);



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
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      state: "",
      city: "",
      pincode: "",
      gstNumber: "",
      panNumber: "",
      description: "",
      status: null,
      image: null
    });
    setLogo(null);
    setSelectedStatusOption(null);
    setSelectedStateOption(null)
    setSelectedCityOption(null)
  };


  const validateForm = () => {
    const newErrors = {};
    // Required field validation
    if (!formData.name) newErrors.name = "Supplier Name is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.firstName) newErrors.firstName = "FirstName is required.";
    if (!formData.lastName) newErrors.lastName = "LastName is required.";
    if (!formData.phone) {
      newErrors.phone = "Phone is required.";
    } else if (!/^\+91\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must start with '+91' and be followed by 10 digits.";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.pincode) newErrors.pincode = "Pincode is required.";
    if (!formData.gstNumber) newErrors.gstNumber = "GST Number is required.";
    if (!formData.panNumber) newErrors.panNumber = "PAN Number is required.";
    if (!formData.phone) newErrors.phone = "Phone is required.";
    if (!formData.status) newErrors.status = "Status is required.";
    if (!formData.image) newErrors.image = "Image is required.";

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

    if (isEdit) {
      handleUpdateSubmit();
    } else {
      setLoading(true);
      try {
        const res = await addSupplier(formData);
        if (res.data?.success) {
          setLoading(false);
          // Toaster.success(res?.data?.message);
          Swal.fire({
            icon: "success",
            title: "Supplier",
            text: res.data?.message || "Add New Supplier successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          resetForm(); // Reset form after success
          navigate("/supplierlist");
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



  const fetchFittingSizeList = async () => {
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

  useEffect(() => {
    fetchFittingSizeList();
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

  const handleOnChange = (value, country) => {
    const phoneNum = value?.slice(2);
    const country_code = `${country.format.charAt(0)}${country?.dialCode}`;
    const phone = `${country_code}${phoneNum}`;
    setFormData({
      ...formData,
      phone: phone
    })
  };


  const handleStateChange = (option) => {
    if (option?.value) {
      const state = states ? states?.find((state) => state?.state_name == option?.value)
        : null;
      const drpCityValue = state?.cities?.map((city) => ({
        value: city?.city_name,
        label: city?.city_name,
      })
      );
      setCityOption(drpCityValue)
    } else {
      setCityOption([]);
    }

    setSelectedStateOption(option);
    setFormData({
      ...formData,
      state: option.value,
    });
  }


  return (
    <>

      <ToastContainer />
      <Loader visible={loading} />
      <PageTitle activeMenu={"Supplier"} motherMenu={"Home"} />
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
                  <div className="col-md-6">
                    <label className="col-sm-6 col-form-label">Supplier Name</label>
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
                </div>

                <div className="mb-3 row">
                  <div className="col-md-6 col-xl-3">
                    <label className="col-form-label">Contact Person First Name</label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.firstName && (
                      <span className="text-danger fs-12">{errors.firstName}</span>
                    )}
                  </div>

                  <div className="col-md-6 col-xl-3">
                    <label className="col-form-label">Contact Person Last Name</label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.lastName && (
                      <span className="text-danger fs-12">{errors.lastName}</span>
                    )}
                  </div>

                  <div className="col-md-6 col-xl-3">
                    <label className="col-md-8 col-form-label">Phone</label>
                    <PhoneInput
                      className=""
                      inputClass=""
                      country={"in"}
                      value={formData?.phone}
                      onChange={handleOnChange}
                    />
                    {errors.phone && (
                      <span className="text-danger fs-12">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className="col-md-6 col-xl-3">
                    <label className="col-sm-6 col-form-label">Email</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      required="email"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.email && (
                      <span className="text-danger fs-12">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>


                <div className="mb-3 row">
                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">State</label>
                    <Select
                      value={selectedStateOption}
                      onChange={handleStateChange}
                      defaultValue={selectedStateOption}
                      options={stateOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.status && (
                      <span className="text-danger fs-12">{errors.status}</span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">City</label>
                    <Select
                      value={selectedCityOption}
                      onChange={(option) => {
                        setSelectedCityOption(option);
                        setFormData({
                          ...formData,
                          city: option.value,
                        });
                      }}
                      defaultValue={selectedCityOption}
                      options={cityOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.status && (
                      <span className="text-danger fs-12">{errors.status}</span>
                    )}
                  </div>

                  {/* <div className="col-sm-6 col-xl-3">
                    <label className="col-sm-8 col-form-label">Country</label>
                    <input
                      name="type"
                      value={formData.lastname}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.lastname && (
                      <span className="text-danger fs-12">{errors.lastname}</span>
                    )}
                </div> */}

                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">PinCode</label>
                    <input
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      type="number"
                      className="form-control"
                      placeholder="Ex: 123"
                    />
                    {errors.pincode && (
                      <span className="text-danger fs-12">
                        {errors.pincode}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-6">
                    <label className="col-sm-6 col-form-label">Address</label>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.address && (
                      <span className="text-danger fs-12">
                        {errors.address}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  {/* <div className="col-sm-3">
                  <label className="col-sm-6 col-form-label">Created Date</label>
                    <input
                      name="type"
                      value={formData.Createddate}
                      onChange={handleChange}
                      type="date"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                  {errors.Createddate && (
                    <span className="text-danger fs-12">
                      {errors.Createddate}
                    </span>
                  )}
                </div> */}

                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">GST Number</label>
                    <input
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: 08ABCDE9999F1Z8"
                    />
                    {errors.gstNumber && (
                      <span className="text-danger fs-12">
                        {errors.gstNumber}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">PAN Number</label>
                    <input
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABCTY1234D"
                    />
                    {errors.panNumber && (
                      <span className="text-danger fs-12">
                        {errors.panNumber}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">Status</label>
                    <Select
                      value={selectedStatusOption}
                      onChange={(option) => {
                        setSelectedStatusOption(option);
                        setFormData({
                          ...formData,
                          status: option.value,
                        });
                      }}
                      defaultValue={selectedStatusOption}
                      options={statusOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.status && (
                      <span className="text-danger fs-12">{errors.status}</span>
                    )}
                  </div>

                </div>



                <div className="row mb-3">
                  <div className="col-sm-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                      <label className="col-form-label">Supplier Image</label>
                      <div className=' uploadImageContainer' >
                        <input
                          type="file"
                          accept="image/*"
                          name="image"
                          //value={formData?.image}
                          onChange={handleLogoChange}
                          style={{ display: 'none' }}
                          id="logoUpload"
                        />
                        {logo ? (
                          <>
                            {
                              isEdit ?
                                <>
                                  {/* Simple 'X' button as the delete icon */}
                                  <div className="deleteIcon" onClick={handleDeleteLogo}> ⛌ </div>
                                  <img className='img' src={`https://api.i2rtest.in/v1/images/image/${logo}`} alt="Logo" />
                                </>
                                :
                                <>
                                  <div className='deleteIcon' onClick={handleDeleteLogo}> ⛌ </div>
                                  <img className='img' src={logo} alt="Logo" />
                                </>
                            }
                          </>
                        ) : (
                          <label htmlFor="logoUpload" className="imgPlaceholder" >
                            <div className='flex flex-col cursor-pointer imgUploadIcon'>
                              <img width="30" src={uplodIcon} alt="Upload Icon"></img>
                              <p>Upload Image</p>
                            </div>
                          </label>
                        )}
                      </div>
                    </div>
                    <p className='mt-2'>Image format - jpg png jpeg gif<br />Image Size - maximum size 2 MB<br />Image Ratio - 1:1</p>
                    {errors?.image && <span className="text-danger fs-12">{errors?.image}</span>}
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
    </>
  );
};

export default AddNewSupplier;
