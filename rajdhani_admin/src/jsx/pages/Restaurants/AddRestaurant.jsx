import React, { useEffect, useState } from 'react';
import { DatePicker } from 'rsuite';
import Select from "react-select";
import PageTitle from '../../layouts/PageTitle';
// import CustomClearIndicator from "../plugins/Select2/MultiSelect";
import { format } from 'rsuite/esm/internals/utils/date';
import { getCuisinesApi } from '../../../services/apis/cuisinesApi';
import { getZonesApi } from '../../../services/apis/ZoneApi';
import { addRestaurantApi, createVendorApi } from '../../../services/apis/RestaurantsApi';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Toaster } from '../../components/Toaster/Toster';
import Loader from '../../components/Loader/Loader';
import { FaTrashAlt } from 'react-icons/fa'; // Import a delete icon from react-icons
import uplodIcon from '../../../assets/images/upload-icon.png'
import CustomClearIndicator from './MultiSelect'

const AddRestaurant = () => {
    const [changeText, setChangeText] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [logo, setLogo] = useState(null);
    const [cover, setCover] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [formData, setFormData] = useState({
        restaurantName: '',
        restaurantAddress: '',
        vat: '',
        deliveryTime: '',
        cuisine: '',
        zone: null,
        latitude: '',
        longitude: '',
        firstName: '',
        lastName: '',
        tags: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        logo: null,
        cover: null
    });
    const [cuisineList, setCuisineList] = useState();
    const [zoneList, setZonesList] = useState();
    const [selectedZoneOption, setSelectedZoneOption] = useState();
    console.log("Selected zone option is here", selectedZoneOption)
    const [loading, setLoading] = useState(false);
    const [selectedCuisineOption, setSelectedCuisineOption] = useState([]);
    const [errors, setErrors] = useState({});

    const resetFormData = () => {
        setFormData({
            restaurantName: '',
            restaurantAddress: '',
            vat: '',
            deliveryTime: '',
            cuisine: '',
            zone: null,
            latitude: '',
            longitude: '',
            firstName: '',
            lastName: '',
            tags: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            logo: null,
            cover: null
        });

        setSelectedCuisineOption([]); // Reset selected cuisines
        setSelectedZoneOption(null); // Reset selected zone
        setLogo(null); // Reset logo
        setCover(null); // Reset cover
        setErrors({}); // Reset errors
    };

    const validateForm = () => {
        const newErrors = {};

        // Required field validation
        if (!formData.restaurantName) newErrors.restaurantName = "Restaurant name is required.";
        if (!formData.restaurantAddress) newErrors.restaurantAddress = "Restaurant address is required.";
        if (!formData.firstName) newErrors.firstName = "First name is required.";
        if (!formData.lastName) newErrors.lastName = "Last name is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.password) newErrors.password = "Password is required.";
        if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
        if (!formData.phone) newErrors.phone = "Phone number is required.";
        if (!formData.vat) newErrors.vat = "VAT is required.";
        if (!formData.deliveryTime) newErrors.deliveryTime = "Delivery time is required.";
        if (!selectedCuisineOption.length) newErrors.cuisine = "Please select at least one cuisine.";
        if (!selectedZoneOption) newErrors.zone = "Please select a zone.";
        if (!formData.tags) newErrors.tags = "Tags are required.";
        if (!formData.latitude) newErrors.latitude = "Latitude are required.";
        if (!formData.longitude) newErrors.longitude = "Longitude are required.";
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Password match validation
        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        // Numeric validation for VAT and delivery time
        if (formData.vat && isNaN(formData.vat)) newErrors.vat = "VAT must be a numeric value.";
        if (formData.deliveryTime && isNaN(formData.deliveryTime)) newErrors.deliveryTime = "Delivery time must be a numeric value.";

        // Latitude and longitude validation
        if (formData.latitude && isNaN(formData.latitude)) newErrors.latitude = "Latitude must be a numeric value.";
        if (formData.longitude && isNaN(formData.longitude)) newErrors.longitude = "Longitude must be a numeric value.";

        // Set errors to the state
        setErrors(newErrors);

        // If there are no errors, return true (valid form), otherwise false
        return Object.keys(newErrors).length === 0;
    };

    const CustomClearText = () => "clear all";
    const ClearIndicator = (props) => {
        const {
            children = <CustomClearText />,
            getStyles,
            innerProps: { ref, ...restInnerProps },
        } = props;
        return (
            <div
                {...restInnerProps}
                ref={ref}
                style={getStyles("clearIndicator", props)}
            >
                <div style={{ padding: "0px 5px" }}>{children}</div>
            </div>
        );
    };

    const ClearIndicatorStyles = (base, state) => ({
        ...base,
        cursor: "pointer",
        color: state.isFocused ? "blue" : "black",
    });

    const fetchZones = async () => {
        try {
            const res = await getZonesApi();
            const dropdownZones = res.data?.zones.map(zones => ({
                value: zones._id,
                label: zones.name
            }));
            setZonesList(dropdownZones);
        } catch (error) {

        }
    }

    const fetchCuisines = async () => {
        try {
            const res = await getCuisinesApi();

            const dropdownCuisines = res.data?.cuisines.map(cuisine => ({
                value: cuisine._id,
                label: cuisine.name
            }));
            // Now set the dropdown formatted dat
            setCuisineList(dropdownCuisines);
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchCuisines()
        fetchZones()
    }, [])

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
                logo: file, // Update the image field with the selected file
            });
        }
    };

    const handleDeleteLogo = () => {
        setLogo(null);
        document.getElementById("logoUpload").value = ""; // Reset file input
    };

    const handleDeleteCover = () => {
        setCover(null);
        document.getElementById("coverUpload").value = ""; // Reset file input
    }

    // Handle the cover image change
    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCover(reader.result);
            };
            reader.readAsDataURL(file);
            setFormData({
                ...formData,
                cover: file, // Update the image field with the selected file
            });
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const handleZoneChange = (selectedOption) => {
        setSelectedZoneOption(selectedOption);
        if (errors.zone) {
            setErrors({
                ...errors,
                zone: null
            });
        }
    };

    const handleCuisineChange = (selectedOptions) => {
        const labels = selectedOptions.map(option => option.label);

        // Clear the cuisine error
        setErrors((prevErrors) => ({
            ...prevErrors,
            cuisine: undefined, // Clear the cuisine error
        }));

        setSelectedCuisineOption(labels); // Store only the labels
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before making API calls
        if (!validateForm()) {
            return;  // If validation fails, do not proceed further
        }

        setLoading(true);
        const vendorData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
        };

        try {
            // Create vendor
            const vendorResponse = await createVendorApi(vendorData);

            if (vendorResponse?.status == 201) {
                const vendorId = vendorResponse.data?.vendor?._id;

                const restaurantData = {
                    restaurantName: formData.restaurantName,
                    restaurantAddress: formData.restaurantAddress,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    zone: selectedZoneOption?.label,
                    cuisine: selectedCuisineOption,
                    tags: formData.tags,
                    vat: formData.vat,
                    deliveryTime: formData.deliveryTime,
                    latitude: formData.latitude,
                    longitude: formData.longitude,
                    logo: formData.logo,
                    cover: formData.cover,
                    phone: formData.phone,
                    vendor_id: vendorId // Include vendor_id in restaurant data
                };

                // Create restaurant with the vendor_id
                const restaurantResponse = await addRestaurantApi(restaurantData);

                if (restaurantResponse.data?.success) {
                    setLoading(false);
                    // Show success message from backend
                    // Toaster.success(restaurantResponse?.data?.message || 'Restaurant created successfully');
                    Swal.fire({
                        icon: 'success',
                        title: "Restaurant",
                        text: restaurantResponse?.data?.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    resetFormData();
                } else {
                    // Show error message from backend
                    setLoading(false);
                    Toaster.error(restaurantResponse.data.message || 'Failed to create restaurant');
                    console.error('Restaurant creation error:', restaurantResponse);
                }
            } else {
                // Show error message from backend
                setLoading(false);
                Toaster.error(vendorResponse.data?.vendor?.message || 'Failed to create vendor');
                console.error('Vendor creation error:', vendorResponse);
            }
        } catch (error) {
            setLoading(false);
            // Show error message from backend or fallback
            Toaster.error(error.response?.data?.message || 'An error occurred while processing your request');
            console.error("Error creating vendor or restaurant:", error);
        }
    };




    // Inline styles
    const styles = {
        container: {
            border: '2px dashed #ccc',
            borderRadius: '8px',
            width: '150px', // Logo size
            height: '150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: '#f9f9f9',
            position: 'relative',
            textAlign: 'center',
            overflow: 'hidden',
        },
        coverContainer: {
            border: '2px dashed #ccc',
            borderRadius: '8px',
            width: '250px', // Cover size (2:1 ratio)
            height: '150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: '#f9f9f9',
            position: 'relative',
            textAlign: 'center',
            overflow: 'hidden',
        },
        placeholder: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            textAlign: 'center',
        },
        img: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
        },
        hover: {
            borderColor: '#007bff',
            backgroundColor: '#e9f4ff',
        },
        uploadIcon: {
            color: '#888',
            fontSize: '16px',
            fontWeight: 'bold',
        },
        deleteIcon: {
            position: 'absolute',
            top: '0px',
            right: '0px',
            backgroundColor: '#FF6D6D',
            color: 'white',
            borderRadius: '100%',
            padding: '5px 10px',
            cursor: 'pointer',
            zIndex: 2,
            fontSize: '10px',
            fontWeight: 'bold',
        }
    };

    return (
        <>
            <ToastContainer />
            <Loader visible={loading} />
            <PageTitle activeMenu={"Add new restaurant"} motherMenu={"Restaurants"} />
            <div className="row">
                {/* SECTION 1ST */}
                <div className="col-xl-6 col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Basic Info</h4>
                        </div>
                        <div className="card-body">
                            <div>
                                <div className="mb-3 row">
                                    <div className="col-sm-12">
                                        <label className="col-sm-3 col-form-label">
                                            Restaurant name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="restaurantName"
                                            value={formData.restaurantName}
                                            onChange={handleChange}
                                            placeholder="Ex: ABC Company"
                                        />
                                        {errors.restaurantName && <span className="text-danger fs-12">{errors.restaurantName}</span>}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-12">
                                        <label className="col-sm-3 col-form-label">
                                            Restaurant address
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="6"
                                            id="comment"
                                            name="restaurantAddress"
                                            value={formData.restaurantAddress}
                                            onChange={handleChange}
                                            placeholder="Ex: House#94  Road#8  Abc City"
                                        ></textarea>
                                        {errors.restaurantAddress && <span className="text-danger fs-12">{errors.restaurantAddress}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SECTION 2ND Restaurant logo and cover*/}
                <div className="col-xl-6 col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Restaurant Logo & Covers</h4>
                        </div>
                        <div className="card-body">
                            <div className="mb-3 row">
                                {/* <div className="col-sm-6">
                                    <label className="col-form-label">Logo</label>
                                    <div style={styles.container}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoChange}
                                            style={{ display: 'none' }}
                                            id="logoUpload"
                                        />
                                        <label htmlFor="logoUpload" style={styles.placeholder}>
                                            {logo ? (
                                                <img src={logo} alt="Logo" style={styles.img} />
                                            ) : (
                                                <div style={styles.uploadIcon}>Upload Image</div>
                                            )}
                                        </label>

                                    </div>
                                    <p>Image format - jpg png jpeg gif<br />Image Size - maximum size 2 MB<br />Image Ratio - 1:1</p>
                                </div> */}

                                <div className="col-sm-6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <label className="col-form-label">Logo</label>
                                    <div style={styles.container}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoChange}
                                            style={{ display: 'none' }}
                                            id="logoUpload"
                                        />
                                        {logo ? (
                                            <>
                                                {/* Simple 'X' button as the delete icon */}
                                                <div style={styles.deleteIcon} onClick={handleDeleteLogo}>
                                                    ⛌
                                                </div>
                                                <img src={logo} alt="Logo" style={styles.img} />
                                            </>
                                        ) : (
                                            <label htmlFor="logoUpload" style={styles.placeholder}>
                                                <div style={styles.uploadIcon} className='flex flex-col cursor-pointer'>
                                                    <img width="30" src={uplodIcon} alt="Upload Icon"></img>
                                                    <p>Upload Image</p>
                                                </div>
                                            </label>
                                        )}
                                    </div>
                                    <p className='mt-2'>Image format - jpg png jpeg gif<br />Image Size - maximum size 2 MB<br />Image Ratio - 1:1</p>
                                </div>



                                <div className="col-sm-6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <label className="col-form-label">Restaurant Cover</label>
                                    <div style={styles.coverContainer}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleCoverChange}
                                            style={{ display: 'none' }}
                                            id="coverUpload"
                                        />
                                        {cover ? (
                                            <>
                                                {/* Simple 'X' button as the delete icon */}
                                                <div style={styles.deleteIcon} onClick={handleDeleteCover}>
                                                    ⛌
                                                </div>
                                                <img src={cover} alt="Cover" style={styles.img} />
                                            </>
                                        ) : (
                                            <label htmlFor="coverUpload" style={styles.placeholder}>
                                                <div style={styles.uploadIcon} className='flex flex-col cursor-pointer'>
                                                    <img width="30" src={uplodIcon} alt="Upload Icon"></img>
                                                    <p>Upload Cover Image</p>
                                                </div>
                                            </label>
                                        )}
                                    </div>
                                    <p className='mt-2'>Image format - jpg png jpeg gif<br />Image Size - maximum size 2 MB<br />Image Ratio - 2:1</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SECTION 3RD Restaurant Info*/}
                <div className="col-xl-12 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Restaurant Info</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label className="col-form-label">Vat/tax (%)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="vat"
                                        value={formData.vat}
                                        onChange={handleChange}
                                        placeholder="Ex: 100"
                                    />
                                    {errors.vat && <span className="text-danger fs-12">{errors.vat}</span>}
                                </div>
                                <div className="col-sm-6 mt-2 mt-sm-0">
                                    <label className="col-form-label">Estimated Delivery Time ( Min & Maximum Time )</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        name="deliveryTime"
                                        value={formData.deliveryTime}
                                        onChange={handleChange}
                                    />

                                    {errors.deliveryTime && <span className="text-danger fs-12">{errors.deliveryTime}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SECTION 4TH */}
                <div className="col-xl-12 col-lg-12">
                    <div className="card">

                        <div className="card-body">
                            <div>
                                <div className="mb-3 row">
                                    <div className="col-sm-5">
                                        <label className="col-sm-3 col-form-label">
                                            Cuisine
                                        </label>
                                        {/* <CustomClearIndicator
                                            cuisineOption={cuisineList}
                                        /> */}
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={{ ClearIndicator }}
                                            styles={{ clearIndicator: ClearIndicatorStyles }}
                                            defaultValue={[]}
                                            isMulti
                                            options={cuisineList}
                                            onChange={handleCuisineChange}
                                        // onChange={(selectedOptions) => {
                                        //     // Map over the selected options to extract only the labels
                                        //     const labels = selectedOptions.map(option => option.label);
                                        //     setSelectedCuisineOption(labels); // Now only the labels are stored
                                        // }}
                                        // onChange={setSelectedCuisineOption}
                                        />
                                        {errors.cuisine && <span className="text-danger fs-12">{errors.cuisine}</span>}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-5">
                                        <label className="col-sm-3 col-form-label">
                                            Zone
                                        </label>
                                        <Select
                                            defaultValue={selectedZoneOption}
                                            onChange={handleZoneChange}
                                            // onChange={setSelectedZoneOption}
                                            options={zoneList}
                                            style={{
                                                lineHeight: "40px",
                                                color: "#7e7e7e",
                                                paddingLeft: " 15px",
                                            }}
                                        />
                                        {errors.zone && <span className="text-danger fs-12">{errors.zone}</span>}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-5">
                                        <label className="col-sm-3 col-form-label">
                                            Latitude
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Ex: -942223"
                                            name="latitude"
                                            value={formData.latitude}
                                            onChange={handleChange}
                                        />
                                        {errors.latitude && <span className="text-danger fs-12">{errors.latitude}</span>}

                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-5">
                                        <label className="col-sm-3 col-form-label">
                                            Longitude
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Ex: 103.344235"
                                            name="longitude"
                                            value={formData.longitude}
                                            onChange={handleChange}
                                        />

                                        {errors.longitude && <span className="text-danger fs-12">{errors.longitude}</span>}
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="card-body">
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SECTION 5th Owner Info*/}
                <div className="col-xl-12 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Owner Info</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-4">
                                    <label className="col-form-label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: John"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                    {errors.firstName && <span className="text-danger fs-12">{errors.firstName}</span>}
                                </div>
                                <div className="col-sm-4 mt-2 mt-sm-0">
                                    <label className="col-form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: Doe"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    {errors.lastName && <span className="text-danger fs-12">{errors.lastName}</span>}
                                </div>
                                <div className="col-sm-4 mt-2 mt-sm-0">
                                    <label className="col-form-label">Phone</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Ex: +9XXX-XXX-XXXX"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                    {errors.phone && <span className="text-danger fs-12">{errors.phone}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SECTION 6th Tags*/}
                <div className="col-xl-12 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Tags</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter tags"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                    />

                                    {errors.tags && <span className="text-danger fs-12">{errors.tags}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 

                {/* <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="mb-4">
                                <h4 className="card-title">
                                    Tags
                                </h4>
                            </div>
                            <CustomClearIndicator></CustomClearIndicator>
                        </div>
                    </div>
                </div> */}
                {/* SECTION 7th Account Info*/}
                <div className="col-xl-12 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Owner Info</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-4">
                                    <label className="col-form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Ex: John@company.com"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <span className="text-danger fs-12">{errors.email}</span>}
                                </div>
                                <div className="col-sm-4 mt-2 mt-sm-0">
                                    <label className="col-form-label">Password</label>
                                    <div className="input-group pass-group">
                                        <input
                                            placeholder="Password"
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            className="form-control pass-input"
                                            required
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}

                                        />
                                        <span className={`input-group-text pass-handle ${showPassword ? "active" : ""}`}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <i className="fa fa-eye-slash" />
                                            <i className="fa fa-eye" />
                                        </span>
                                    </div>
                                    {errors.password && <span className="text-danger fs-12">{errors.password}</span>}

                                </div>
                                <div className="col-sm-4 mt-2 mt-sm-0">
                                    <label className="col-form-label">Confirm Password</label>
                                    <div className="input-group pass-group">
                                        <input
                                            placeholder="Confirm Password"
                                            id="confirm_password"
                                            type={changeText ? "text" : "password"}
                                            className="form-control pass-input"
                                            required
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />

                                        <span className={`input-group-text pass-handle ${changeText ? "active" : ""}`}
                                            onClick={() => setChangeText(!changeText)}
                                        >
                                            <i className="fa fa-eye-slash" />
                                            <i className="fa fa-eye" />
                                        </span>

                                    </div>
                                    {errors.confirmPassword && <span className="text-danger fs-12">{errors.confirmPassword}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Section Submit button */}
                <div className="text-end">
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary rounded-sm">Save Information</button>
                </div>
            </div>
        </>
    );
};

export default AddRestaurant;