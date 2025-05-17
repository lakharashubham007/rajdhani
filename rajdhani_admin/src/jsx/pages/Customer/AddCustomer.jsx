import React, { useEffect, useState } from "react";
import { DatePicker } from "rsuite";
import Select from "react-select";
import PageTitle from "../../layouts/PageTitle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Toaster } from "../../components/Toaster/Toster";
import Loader from "../../components/Loader/Loader";
import {
  addProductApi,
  GetAllProductList,
  getCityApi,
  getCountryApi,
  getStateApi,
} from "../../../services/apis/Product";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getAllSupplierListApi } from "../../../services/apis/Supplier";
import "../../../assets/css/AddSupplierPurchaseOrder.css";
import { addSupplierPurchaseOrderApi, createPoItemApi } from "../../../services/apis/PurchaseOrder";
import { getCountryListApi, getStateListApi, getStateListTinApi } from "../../../services/apis/CommonApi";
import uplodIcon from "../../../assets/images/upload-icon.png";
import { createCustomerApi } from "../../../services/apis/CustomerApi";
import CustomerBillingDetailForm from "./CustomerBillingDetailForm";
import CustomerShippingDetailForm from "./CustomerShippingDetailForm";

const options = [
  { value: "veg", label: "Veg" },
  { value: "non-veg", label: "Non Veg" },
];

const discountOptions = [
  { value: "percentage", label: "Percentage ( % ) " },
  { value: "inr", label: "INR " },
];

const AddCustomer = () => {

  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  const [selectedCountryOption, setSelectedCountryOption] = useState();
  const [selectedStateOption, setSelectedStateOption] = useState(null);
  const [selectedCityOption, setSelectedCityOption] = useState(null);



  const [selectedBillingCountryOption, setSelectedBillingCountryOption] = useState();
  const [selectedBillingStateOption, setSelectedBillingStateOption] = useState(null);
  const [selectedBillingCityOption, setSelectedBillingCityOption] = useState(null);

  const [selectedShippingCountryOption, setSelectedShippingCountryOption] = useState();
  const [selectedShippingStateOption, setSelectedShippingStateOption] = useState(null);
  const [selectedShippingCityOption, setSelectedShippingCityOption] = useState(null);

  const [stateTIN, setStateTIN] = useState();
  // console.log("stateTIN",stateTIN)
  const [countriesList, setCountriesList] = useState();
  const [stateList, setStateList] = useState();
  const [cityList, setCityList] = useState();
  const [supplierDetail, setSupplierDetail] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const TodayDate = moment().format("YYYY-MM-DD");


  //Billing Form Details Fields
  const [formCustomerData, setCustomerFormData] = useState({});

  const [customerBillingDetailsModal, setCustomerBillingDetailsModal] = useState(false);
  const [customerShippingDetailsModal, setCustomerShippingDetailsModal] = useState(false);

  const [formCustomerBillingDetailsData, setFormCustomerBillingDetailsData] = useState();
  const [formCustomerShippingDetailsData, setFormCustomerShippingDetailsData] = useState();

  const [selectedCustomerBillingCountryOption, setSelectedCustomerBillingCountryOption] = useState(null);
  const [selectedCustomerBillingStateOption, setSelectedCustomerBillingStateOption] = useState(null);
  const [selectedCustomerBillingCityOption, setSelectedCustomerBillingCityOption] = useState(null);

  const [selectedCustomerShippingCountryOption, setSelectedCustomerShippingCountryOption] = useState(null);
  const [selectedCustomerShippingStateOption, setSelectedCustomerShippingStateOption] = useState(null);
  const [selectedCustomerShippingCityOption, setSelectedCustomerShippingCityOption] = useState(null);

  console.log("formCustomerData", formCustomerData);
  console.log("formCustomerShippingDetailsData", formCustomerShippingDetailsData);
  console.log("formCustomerBillingDetailsData", formCustomerBillingDetailsData)


  //Rows Fields
  const [rows, setRows] = useState([
    {
      id: 1,
    },
  ]);


  const resetForm = () => {
    setCustomerFormData({});
    

   

  

    setRows([
      {
        id: 1,
        product_name: "",
        sku: "",
        unit: "",
        variant: "",
        variant_type: "",
        uom: "",
        uom_qty: "",
        quantity: "",
        price_per_unit: "",
        discount_per_unit: "",
        total_discount: "",
        cgst: "",
        sgst: "",
        igst: "",
        cess: "",
        amount: "",
      },
    ]);

    setSupplierDetail({});
    setSelectedBillingStateOption(null);
    setSelectedShippingStateOption(null);
    setLogo(null);
    // setSelectedSupplierOption(null);
    // setSelectedProductOption(null);
  };

  const validateForm = () => {
    const newErrors = {};
    // Required field validation

    // Set errors to the state
    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };



  const fetchSupplierAllList = async () => {
    setLoading(true);
    try {
      const res = await getAllSupplierListApi();
      const dropdownSupplierList = res?.data?.suppliers?.map((supplier) => ({
        value: supplier._id,
        label: supplier.name,
      }));
      // setSupplierOption(dropdownSupplierList);
      // setAllSupplier(res?.data?.suppliers);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductAllList = async () => {
    setLoading(true);
    try {
      const res = await GetAllProductList();
      console.log("res dropdownProductList res", res)
      const dropdownProductList = res?.data?.products?.map((product) => ({
        value: product?.desc_Code,
        label: product?.desc_Code,
        id: product?._id,
        product_code: product?.product_code,
        uom: product?.uom,
        weight: product?.weight,
        price: product?.price,
        gst: product?.gst

      }));
      console.log("dropdownProductList dropdownProductList dropdownProductList", dropdownProductList)
      // setProductOption(dropdownProductList);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //Fetch State TIN Number
  const fetchStatesListTIN = async (state_code) => {
    try {
      const res = await getStateListTinApi(state_code);
      const StateTinNumber = res?.data?.stateTin[0]?.tin_number;
      // setBillingFormData({
      //   ...formBillingData,
      //   state_tin_code: StateTinNumber
      // })
      setStateTIN(StateTinNumber);
    } catch (error) {
      Toaster.error("Failed to load tin number. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //Fetch State TIN Number
  const fetchShippingStatesListTIN = async (state_code) => {
    try {
      const res = await getStateListTinApi(state_code);
      const StateTinNumber = res?.data?.stateTin[0]?.tin_number;
      // setShippingFormData({
      //   ...formShippingData,
      //   state_tin_code: StateTinNumber
      // })
      setStateTIN(StateTinNumber);
    } catch (error) {
      Toaster.error("Failed to load tin number. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //Fetch Countries List
  const fetchCountryData = async () => {
    try {
      const countriesResponse = await getCountryApi();
      const dropdownCountryList = countriesResponse?.data?.countries?.map((country) => ({
        value: country?.name,
        label: country?.name,
        id: country?.id
      }));

      setCountriesList(dropdownCountryList);
    } catch (error) {
      console.log(error.message);
    }
  };
  //Fetch state List
  const fetchStatesData = async (id) => {
    try {
      const stateData = await getStateApi(id);
      const dropdownStateList = stateData?.data?.states?.map((state) => ({
        value: state?.name,
        label: state?.name,
        id: state?.id,
        state_code: state?.state_code
      }));


      setStateList(dropdownStateList);

    } catch (error) {
      console.log(error.message);
    }
  };
  //Fetch Cities List
  const fetchCitiesData = async (id) => {
    try {
      const cityData = await getCityApi(id);
      const dropdownCityList = cityData?.data?.cities?.map((city) => ({
        value: city?.name,
        label: city?.name,
        id: city?.id
      }));
      setCityList(dropdownCityList);
    } catch (error) {
      console.log(error.message);
    }
  };
  //Fetch Data
  useEffect(() => {
    fetchSupplierAllList();
    fetchProductAllList();
    fetchCountryData();
  }, []);

  //State and city data from country selection for main form data customer data
  useEffect(() => {
    if (selectedCountryOption?.value) {
      fetchStatesData(selectedCountryOption?.id)
    }
    if (selectedStateOption?.value) {
      fetchStatesListTIN(selectedStateOption?.state_code)
      fetchCitiesData(selectedStateOption?.id)
    }
  }, [selectedCountryOption, selectedStateOption])

  const handleCustomerDetailChange = (e) => {
    const { name, value } = e.target; // Destructure the input's name and value
    setCustomerFormData((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update the corresponding field
    }));
  };

  //Country state and city handler
  const handleCountryChange = (option) => {
    setSelectedCountryOption(option);
    setCustomerFormData({
      ...formCustomerData,
      country: option?.value,
    })
    setSelectedBillingStateOption('')
    setSelectedBillingCityOption('')

  }
  const handleStateChange = (option) => {
    setSelectedStateOption(option);
    setCustomerFormData({
      ...formCustomerData,
      state: option?.value,
    })
    setSelectedBillingCityOption('')

  }
  const handleCityChange = (option) => {
    setSelectedCityOption(option);
    setCustomerFormData({
      ...formCustomerData,
      city: option?.value,
    })
  }
  // Handle the logo image change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
      setCustomerFormData({
        ...formCustomerData,
        image: file, // Update the image field with the selected file
      });
      setErrors({
        ...errors,
        image: null, // Update the image field with the selected file
      });
    }
  };
  //Delete the logo
  const handleDeleteLogo = () => {
    setLogo(null);
    document.getElementById("logoUpload").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const validationErrors = validateFormComponent(formData);
    // setErrors(validationErrors);

    // if(Object.keys(validationErrors).length > 0){
    //   console.log("validationErrors is available",validationErrors )
    //   return
    // }

   
    
    const fData = {
      ...formCustomerData,
      customer_billing_details:{
        ...formCustomerBillingDetailsData
      },
      customer_shipping_details:{
        ...formCustomerShippingDetailsData
      }
    }
    console.log(fData)

    if (fData) {
      try {
        const res = await createCustomerApi(fData);
        console.log("res is here ", res)
        if (res.data?.success) {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Customer",
            text: res.data?.message,
            showConfirmButton: false,
            timer: 1500,
          });
          resetForm();
          // navigate('/productlist');
        } else {
          setLoading(false);
          Toaster.error(res.data?.message);
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

  /*****************************---------------------------------------------------formCustomerBillingDetailsData-------------------------------------------------------------------- */
  useEffect(() => {
    if (selectedCustomerBillingCountryOption?.value) {
      fetchStatesData(selectedCustomerBillingCountryOption?.id)
    }
    if (selectedCustomerBillingStateOption?.value) {
      // fetchStatesListTIN(selectedStateOption?.state_code)
      fetchCitiesData(selectedCustomerBillingStateOption?.id)
    }
  }, [selectedCustomerBillingCountryOption, selectedCustomerBillingStateOption])

  //cutomer billing Details
  const handleCustomerBillingCountryChange = (option) => {
    setSelectedCustomerBillingCountryOption(option);
    setFormCustomerBillingDetailsData({
      ...formCustomerBillingDetailsData,
      country: option?.value,
    })
    setSelectedCustomerBillingStateOption('')
    setSelectedCustomerBillingCityOption('')

  }
  const handleCustomerBillingStateChange = (option) => {
    setSelectedCustomerBillingStateOption(option);
    setFormCustomerBillingDetailsData({
      ...formCustomerBillingDetailsData,
      state: option?.value,
    })
    setSelectedCustomerBillingCityOption('')

  }
  const handleCustomerBillingCityChange = (option) => {
    setSelectedCustomerBillingCityOption(option);
    setFormCustomerBillingDetailsData({
      ...formCustomerBillingDetailsData,
      city: option?.value,
    })
  }


  const handleCustomerBillingDetailChange = (e) => {
    const { name, value } = e.target; // Destructure the input's name and value
    setFormCustomerBillingDetailsData((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update the corresponding field
    }));
  };


  /*****************************---------------------------------------------------FormCustomerShippingDetailsData-------------------------------------------------------------------- */
  useEffect(() => {
    if (selectedCustomerShippingCountryOption?.value) {
      fetchStatesData(selectedCustomerShippingCountryOption?.id);
    }
    if (selectedCustomerShippingStateOption?.value) {
      fetchCitiesData(selectedCustomerShippingStateOption?.id);
    }
  }, [selectedCustomerShippingCountryOption, selectedCustomerShippingStateOption]);


  const handleCustomerShippingCountryChange = (option) => {
    setSelectedCustomerShippingCountryOption(option);
    setFormCustomerShippingDetailsData((prev) => ({
      ...prev,
      country: option?.value,
    }));
    setSelectedCustomerShippingStateOption('');
    setSelectedCustomerShippingCityOption('');
  };

  const handleCustomerShippingStateChange = (option) => {
    setSelectedCustomerShippingStateOption(option);
    setFormCustomerShippingDetailsData((prev) => ({
      ...prev,
      state: option?.value,
    }));
    setSelectedCustomerShippingCityOption('');
  };

  const handleCustomerShippingCityChange = (option) => {
    setSelectedCustomerShippingCityOption(option);
    setFormCustomerShippingDetailsData((prev) => ({
      ...prev,
      city: option?.value,
    }));
  };

  const handleCustomerShippingDetailChange = (e) => {
    const { name, value } = e.target;
    setFormCustomerShippingDetailsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  return (
    <>
      <ToastContainer />
      <Loader visible={loading} />

      <CustomerBillingDetailForm
        customerBillingDetailsModal={customerBillingDetailsModal}
        setCustomerBillingDetailsModal={setCustomerBillingDetailsModal}
        formCustomerBillingDetailsData={formCustomerBillingDetailsData}
        handleCustomerBillingDetailChange={handleCustomerBillingDetailChange}

        countriesList={countriesList}
        setSelectedCustomerBillingCountryOption={setSelectedCustomerBillingCountryOption}
        handleCountryChange={handleCustomerBillingCountryChange}
        selectedCustomerBillingCountryOption={selectedCustomerBillingCountryOption}

        stateList={stateList}
        setSelectedCustomerBillingStateOption={setSelectedCustomerBillingStateOption}
        handleStateChange={handleCustomerBillingStateChange}
        selectedCustomerBillingStateOption={selectedCustomerBillingStateOption}

        cityList={cityList}
        setSelectedCustomerBillingCityOption={setSelectedCustomerBillingCityOption}
        handleCityChange={handleCustomerBillingCityChange}
        selectedCustomerBillingCityOption={selectedCustomerBillingCityOption}
      />

      <CustomerShippingDetailForm
        customerShippingDetailsModal={customerShippingDetailsModal}
        setCustomerShippingDetailsModal={setCustomerShippingDetailsModal}
        formCustomerShippingDetailsData={formCustomerShippingDetailsData}
        handleCustomerShippingDetailChange={handleCustomerShippingDetailChange}

        countriesList={countriesList}
        setSelectedCustomerShippingCountryOption={setSelectedCustomerShippingCountryOption}
        handleShippingCountryChange={handleCustomerShippingCountryChange}
        selectedCustomerShippingCountryOption={selectedCustomerShippingCountryOption}

        stateList={stateList}
        setSelectedCustomerShippingStateOption={setSelectedCustomerShippingStateOption}
        handleShippingStateChange={handleCustomerShippingStateChange}
        selectedCustomerShippingStateOption={selectedCustomerShippingStateOption}

        cityList={cityList}
        setSelectedCustomerShippingCityOption={setSelectedCustomerShippingCityOption}
        handleShippingCityChange={handleCustomerShippingCityChange}
        selectedCustomerShippingCityOption={selectedCustomerShippingCityOption}
        
      />


      <PageTitle
        activeMenu={"Add New Customer"}
        motherMenu={"Home"}
        motherMenuLink={"/dashboard"}
      />
      <div className="row">
        {/* SECTION 1ST */}
        <div className="col-xl-12 col-lg-12">
          <div className="card">

            <div className="card-header">
              <h4 className="">Customer Info</h4>

              <div class="d-flex flex-wrap gap-2 mt-2">
                <div className="text-end ">
                  <button
                    type="submit"
                    // onClick={handleSubmit}
                    onClick={() => setCustomerBillingDetailsModal(true)}
                    className="btn btn-warning rounded-xl "
                  >
                    Add Customer Billing Details
                  </button>
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    // onClick={handleSubmit}
                    onClick={() => setCustomerShippingDetailsModal(true)}
                    className="btn btn-success rounded-sm"
                  >
                    Add Customer Shipping Details
                  </button>
                </div>

              </div>
            </div>

            <div className="card-body">
              {/* Customer Details */}
              <div className="mb-3">
                {/* <h4 className="card-title">Billing Detail</h4> */}
                <div className="row mb-3">
                   {/* company  name */}
                   <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">Company Name</label>
                    <input
                      name="company_name"
                      value={formCustomerData?.company_name}
                      onChange={handleCustomerDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC Pvt. Ltd"
                    />

                    {errors.fname && (
                      <span className="text-danger fs-12">
                        {errors.fname}
                      </span>
                    )}
                  </div>
                  {/* first name */}
                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">First Name</label>
                    <input
                      name="fname"
                      value={formCustomerData?.fname}
                      onChange={handleCustomerDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: John"
                    />

                    {errors.fname && (
                      <span className="text-danger fs-12">
                        {errors.fname}
                      </span>
                    )}
                  </div>
                  {/* last name */}
                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">Last Name</label>
                    <input
                      name="lname"
                      value={formCustomerData?.lname}
                      onChange={handleCustomerDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: Doe"
                    />

                    {errors.lname && (
                      <span className="text-danger fs-12">
                        {errors.lname}
                      </span>
                    )}
                  </div>

                  { /* email */}
                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">Email</label>
                    <input
                      name="email"
                      value={formCustomerData?.email}
                      onChange={handleCustomerDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC@gmail.com"
                    />

                    {errors.email && (
                      <span className="text-danger fs-12">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  { /* mobile number */}
                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">Mobile No.1</label>
                    <input
                      name="mobile_no1"
                      value={formCustomerData?.mobile_no1}
                      onChange={handleCustomerDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: +91 9876-555-555"
                    />

                    {errors.billing_mobile_no1 && (
                      <span className="text-danger fs-12">
                        {errors.billing_mobile_no1}
                      </span>
                    )}
                  </div>
                  { /* mobile number */}
                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">Mobile No.2</label>
                    <input
                      name="mobile_no2"
                      value={formCustomerData?.mobile_no2}
                      onChange={handleCustomerDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex:  +91 9876-555-555"
                    />

                    {errors.billing_mobile_no2 && (
                      <span className="text-danger fs-12">
                        {errors.billing_mobile_no2}
                      </span>
                    )}
                  </div>
                  { /* country */}
                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">Country</label>
                    <Select
                      value={selectedCountryOption}
                      onChange={handleCountryChange}
                      defaultValue={setSelectedCountryOption}
                      options={countriesList}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.country && (
                      <span className="text-danger fs-12">
                        {errors.country}
                      </span>
                    )}
                  </div>
                  { /* state */}
                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">State</label>
                    <Select
                      value={selectedStateOption}
                      onChange={handleStateChange}
                      defaultValue={selectedStateOption}
                      options={stateList}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.state && (
                      <span className="text-danger fs-12">
                        {errors.state}
                      </span>
                    )}
                  </div>
                  { /* city */}
                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">City</label>
                    <Select
                      value={selectedCityOption}
                      onChange={handleCityChange}
                      defaultValue={selectedCityOption}
                      options={cityList}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.city && (
                      <span className="text-danger fs-12">
                        {errors.city}
                      </span>
                    )}
                  </div>

                </div>

                <div className="row mb-3">
                  { /* Pincode */}
                  <div className="col-sm-6 col-xl-3">
                    <label className="col-form-label">Pincode</label>
                    <input
                      name="pin_code"
                      value={formCustomerData?.pin_code}
                      onChange={handleCustomerDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: 313001"
                    />

                    {errors.pin_code && (
                      <span className="text-danger fs-12">
                        {errors.pin_code}
                      </span>
                    )}
                  </div>
                  <div className="col-xl-9">
                    <label className="col-sm-3 col-form-label">Address</label>
                    <input
                      name="address"
                      value={formCustomerData?.address}
                      onChange={handleCustomerDetailChange}
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
                  <div className="col-sm-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', }}>
                      <label className="col-form-label">Customer Image</label>
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
              </div>


            </div>
          </div>
        </div>

        {/* Section Submit button */}
        <div className="text-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary rounded-sm"
          >
            Save Information
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCustomer;
