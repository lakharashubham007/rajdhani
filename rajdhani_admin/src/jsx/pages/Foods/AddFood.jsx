import React, { useEffect, useState } from 'react';
import { DatePicker } from 'rsuite';
import Select from "react-select";
import PageTitle from '../../layouts/PageTitle';
import CustomClearIndicator from "../plugins/Select2/MultiSelect";
import { getRestaurantsApi } from '../../../services/apis/RestaurantsApi';
import { getCategoriesApi } from '../../../services/apis/CategoryApi';
import { getAddonsApi } from '../../../services/apis/AddOnServiceApi';
import { addFoodApi } from '../../../services/apis/FoodApi';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Toaster } from '../../components/Toaster/Toster';
import Loader from '../../components/Loader/Loader';
import FlexboxGridItem from 'rsuite/esm/FlexboxGrid/FlexboxGridItem';
import uplodIcon from '../../../assets/images/upload-icon.png'
import { set } from 'rsuite/esm/internals/utils/date';

const options = [
    { value: "veg", label: "Veg" },
    { value: "non-veg", label: "Non Veg" },
];

const discountOptions = [
    { value: 'percentage', label: "Percentage ( % ) " },
    { value: 'inr', label: "INR " }
]

const AddFood = () => {
    const [logo, setLogo] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [restaurantList, setRestaurantList] = useState();
    const [mainCategoryOptions, setMainCategoryOptions] = useState([]);
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [addonsOptions, setAddonsOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedRestaurantOption, setSelectedRestaurantOption] = useState();
    const [selectedCategoryOption, setSelectedCategoryOption] = useState();
    const [selectedSubCategoryOption, setSelectedSubCategoryOption] = useState();
    const [selectedAddonsOption, setSelectedAddonsOption] = useState();
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        shortDescription: '',
        image: null,
        restaurant: null,
        category: null,
        subCategory: null,
        foodType: null,
        addons: null,
        price: '',
        discountType: null,
        discount: '',
        maxQuantity: '',
        tags: '',
        startTime: '',
        endTime: ''
    });

    console.log("formData is here", formData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const handleSelectChange = (name) => (selectedOption) => {
        setFormData({ ...formData, [name]: selectedOption.value });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const handleSelectChangeLabel = (name) => (selectedOption) => {
        setFormData({ ...formData, [name]: selectedOption.label });

        // Remove error if one exists for this field
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            shortDescription: '',
            image: null,
            restaurant: null,
            category: null,
            subCategory: null,
            foodType: '',
            addons: null,
            price: '',
            discountType: 'none',  // Assuming 'none' is the default value
            discount: '',
            maxQuantity: '',
            tags: '',
            startTime: '',
            endTime: '',
            image: null
        });

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
        if (!formData.name) newErrors.name = "Food name is required.";
        if (!formData.shortDescription) newErrors.shortDescription = "Short description is required.";
        if (!formData.price) newErrors.price = "Price is required.";
        if (!formData.startTime) newErrors.startTime = "Start time is required.";
        if (!formData.endTime) newErrors.endTime = "End time is required.";
        if (!formData.image) newErrors.image = "Food image is required.";
        if (!formData.restaurant) newErrors.restaurant = "Please select a restaurant.";
        if (!formData.category) newErrors.category = "Please select a category.";
        if (!formData.subCategory) newErrors.subCategory = "Please select a subcategory.";
        if (!formData.foodType) newErrors.foodType = "Food type is required.";
        if (!formData.addons) newErrors.addons = "Please select addons if applicable.";
        if (!formData.maxQuantity) newErrors.maxQuantity = "Maximum quantity is required.";
        if (!formData.discountType) newErrors.discountType = "Discount type is required.";
        if (!formData.discount && formData.discountType !== 'none') newErrors.discount = "Discount is required if discount type is selected.";
        if (!formData.tags) newErrors.tags = "Tags are required.";

        // Numeric validation for price and max quantity
        if (formData.price && isNaN(formData.price)) newErrors.price = "Price must be a numeric value.";
        if (formData.maxQuantity && isNaN(formData.maxQuantity)) newErrors.maxQuantity = "Max quantity must be a numeric value.";
        if (formData.discount && isNaN(formData.discount)) newErrors.discount = "Discount must be a numeric value.";

        // Time validation (optional)
        if (formData.startTime && !/^\d{2}:\d{2}$/.test(formData.startTime)) newErrors.startTime = "Start time must be in HH:MM format.";
        if (formData.endTime && !/^\d{2}:\d{2}$/.test(formData.endTime)) newErrors.endTime = "End time must be in HH:MM format.";

        // Set errors to the state
        setErrors(newErrors);

        // Return true if there are no errors, false otherwise
        return Object.keys(newErrors).length === 0;
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const foodData = {
    //         name: formData.name,
    //         shortDescription: formData.shortDescription,
    //         image: formData.image,
    //         restaurant: selectedRestaurantOption?.value,
    //         category: selectedCategoryOption?.value,
    //         subCategory: selectedSubCategoryOption?.value,
    //         foodType: formData.foodType,
    //         addons: selectedAddonsOption?.value,
    //         price: formData.price,
    //         discountType: formData.discountType,
    //         discount: formData.discount,
    //         maxQuantity: formData.maxQuantity,
    //         tags: formData.tags,
    //         startTime: formData.startTime,
    //         endTime: formData.endTime
    //     };

    //     const res = await addFoodApi(foodData);
    //     console.log(res, "response form api is here");

    //     console.log("This data goes into api ", foodData);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before making API calls
        if (!validateForm()) {
            return;  // If validation fails, do not proceed further
        }

        setLoading(true);  // Show loader while processingsss

        const foodData = {
            name: formData.name,
            shortDescription: formData.shortDescription,
            image: formData.image,
            restaurant: formData.restaurant,
            category: formData.category,
            subCategory: formData.subCategory,
            foodType: formData.foodType,
            addons: formData.addons,
            price: formData.price,
            discountType: formData.discountType,
            discount: formData.discount,
            maxQuantity: formData.maxQuantity,
            tags: formData.tags,
            startTime: formData.startTime,
            endTime: formData.endTime
        };

        try {
            const res = await addFoodApi(foodData);
            console.log(res, "response is here");
            if (res.data?.success) {
                setLoading(false);
                // Show success message from backend
                Swal.fire({
                    icon: 'success',
                    title: "Food Item",
                    text: res.data?.message || 'Food item created successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
                resetForm();  // Reset form after success
            } else {
                // Show error message from backend if creation failed
                setLoading(false);
                Toaster.error(res.data?.message || 'Failed to create food item');
                console.error('Food creation error:', res);
            }
        } catch (error) {
            setLoading(false);
            // Handle any errors during API request
            Toaster.error(error.response?.data?.message || 'An error occurred while processing your request');
            console.error("Error creating food item:", error);
        }
    };

    const handleDeleteLogo = () => {
        setLogo(null);
        document.getElementById("logoUpload").value = ""; // Reset file input
    };

    // const handleDiscountType = (selectedOption) => {
    //     setSelectedZoneOption(selectedOption);
    //     if (errors.zone) {
    //         setErrors({
    //             ...errors,
    //             zone: null
    //         });
    //     }
    // };


    const fetchAddons = async () => {
        try {
            const res = await getAddonsApi(); // Use the appropriate API function for categories

            const dropdownRestaurant = res.data?.addons.map(addons => ({
                value: addons._id,
                label: addons.name
            }));
            setAddonsOptions(dropdownRestaurant);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCategories = async () => {
        try {
            const res = await getCategoriesApi(); // Use the appropriate API function for categories
            const categories = res.data?.categories || [];

            // Filter main and sub-categories
            const mainCategories = categories
                .filter(category => category.type === "main-category")
                .map(category => ({
                    value: category._id,
                    label: category.name,
                }));

            const subCategories = categories
                .filter(category => category.type === "sub-category")
                .map(category => ({
                    value: category._id,
                    label: category.name,
                }));

            // Set the filtered options
            setMainCategoryOptions(mainCategories);
            setSubCategoryOptions(subCategories);

        } catch (error) {
            console.error("Error fetching categories:", error); // Handle error appropriately
        }
    };

    const fetchRestaurants = async () => {
        try {
            const res = await getRestaurantsApi(); // Use the appropriate API function for categories
            console.log(res.data, "restaurant are here");
            const dropdownRestaurant = res.data?.restaurants.map(restaurant => ({
                value: restaurant._id,
                label: restaurant.restaurantName
            }));
            setRestaurantList(dropdownRestaurant); // Update state to store categories
            // setUpdateSubcategory(false)
        } catch (error) {
            console.error("Error fetching categories:", error); // Handle error appropriately
        }
    };

    useEffect(() => {
        fetchRestaurants()
        fetchCategories()
        fetchAddons()
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
            <PageTitle activeMenu={"Add New Food"} motherMenu={"Restaurants"} />
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
                                            Name
                                        </label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            placeholder="Ex: ABC Company"

                                        />
                                        {errors.name && <span className="text-danger fs-12">{errors.name}</span>}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-12">
                                        <label className="col-sm-3 col-form-label">
                                            Short Description
                                        </label>
                                        <textarea
                                            name="shortDescription"
                                            className="form-control"
                                            rows="6"
                                            id="comment"
                                            placeholder="Ex: House#94  Road#8  Abc City"
                                            value={formData.shortDescription}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.shortDescription && <span className="text-danger fs-12">{errors.shortDescription}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SECTION 2ND Restaurant logo and cover*/}
                {/* <div className="col-xl-6 col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Food Image</h4>
                        </div>
                        <div className="card-body">
                            <div className="mb-3 row">
                                <div className="col-sm-6">
                                    <label className="col-form-label">Food Image</label>
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
                                </div>


                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="col-xl-6 col-lg-6 flex ">
                    <div className="card">
                        <div className="card-header mb-4">
                            <h4 className="card-title">Food Image</h4>
                        </div>
                      <div className="col-sm-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <label className="col-form-label">Food Image</label>
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
                        {errors.image && <span className="text-danger fs-12">{errors.image}</span>}
                    </div>
                   

                    </div>
                </div>




                {/* SECTION 3RD Restaurants & Category Infoo*/}
                <div className="col-xl-12 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Restaurants & Category Info</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">


                                <div className="col-sm-3">
                                    <label className="col-sm-4 col-form-label">
                                        Restaurant *
                                    </label>
                                    <Select
                                        options={restaurantList}
                                        defaultValue={selectedRestaurantOption}
                                        // onChange={setSelectedRestaurantOption}
                                        onChange={handleSelectChange('restaurant')}
                                        // value={formData.restaurant}
                                        // onChange={handleSelectChange('restaurant')}
                                        style={{
                                            lineHeight: "40px",
                                            color: "#7e7e7e",
                                            paddingLeft: " 15px",
                                        }}
                                    />
                                    {errors.restaurant && <span className="text-danger fs-12">{errors.restaurant}</span>}

                                </div>


                                <div className="col-sm-3">
                                    <label className="col-sm-4 col-form-label">
                                        Category *
                                    </label>
                                    <Select
                                        // defaultValue={selectedOption}
                                        // value={formData.category}
                                        // onChange={handleSelectChange('category')}
                                        defaultValue={selectedCategoryOption}
                                        // onChange={setSelectedCategoryOption}
                                        onChange={handleSelectChange('category')}
                                        options={mainCategoryOptions}
                                        style={{
                                            lineHeight: "40px",
                                            color: "#7e7e7e",
                                            paddingLeft: " 15px",
                                        }}
                                    />
                                    {errors.category && <span className="text-danger fs-12">{errors.category}</span>}
                                </div>

                                <div className="col-sm-3">
                                    <label className="col-sm-4 col-form-label">
                                        Sub category
                                    </label>
                                    <Select
                                        // defaultValue={selectedOption}
                                        // value={formData.subCategory}
                                        // onChange={handleSelectChange('subCategory')}
                                        defaultValue={selectedSubCategoryOption}
                                        // onChange={setSelectedSubCategoryOption}
                                        onChange={handleSelectChange('subCategory')}
                                        options={subCategoryOptions}
                                        style={{
                                            lineHeight: "40px",
                                            color: "#7e7e7e",
                                            paddingLeft: " 15px",
                                        }}
                                    />
                                    {errors.subCategory && <span className="text-danger fs-12">{errors.subCategory}</span>}
                                </div>



                                <div className="col-sm-3">
                                    <label className="col-sm-4 col-form-label">
                                        Food type
                                    </label>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={handleSelectChangeLabel('foodType')}
                                        options={options}
                                        style={{
                                            lineHeight: "40px",
                                            color: "#7e7e7e",
                                            paddingLeft: " 15px",
                                        }}
                                    />
                                    {errors.foodType && <span className="text-danger fs-12">{errors.foodType}</span>}
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                {/* SECTION 4thST */}
                <div className="col-xl-6 col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Addon</h4>
                        </div>
                        <div className="card-body">
                            <div>
                                <div className="col-sm-12">
                                    <label className="col-sm-4 col-form-label">
                                        Select Add-on *
                                    </label>
                                    <Select
                                        // defaultValue={selectedOption}
                                        options={addonsOptions}
                                        defaultValue={selectedAddonsOption}
                                        // onChange={setSelectedAddonsOption}
                                        // value={formData.addons}
                                        onChange={handleSelectChange('addons')}
                                        style={{
                                            lineHeight: "40px",
                                            color: "#7e7e7e",
                                            paddingLeft: " 15px",
                                        }}
                                    />
                                    {errors.addons && <span className="text-danger fs-12">{errors.addons}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 5thST  available time
                <div className="col-xl-6 col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Availability</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label className="col-sm-12 col-form-label">
                                        Available time starts *
                                    </label>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={options}
                                        style={{
                                            lineHeight: "40px",
                                            color: "#7e7e7e",
                                            paddingLeft: " 15px",
                                        }}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label className="col-sm-12 col-form-label">
                                        Available time ends *
                                    </label>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={options}
                                        style={{
                                            lineHeight: "40px",
                                            color: "#7e7e7e",
                                            paddingLeft: " 15px",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* SECTION: Availability Time Selector */}
                <div className="col-xl-6 col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Availability</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {/* Time Selector for Available Time Starts */}
                                <div className="col-sm-6">
                                    <label className="col-sm-12 col-form-label">
                                        Available time starts *
                                    </label>
                                    <input
                                        type="time"
                                        name="startTime"
                                        value={formData.startTime} // Manage the state for start time
                                        onChange={handleChange}
                                        // onChange={(e) => setStartTime(e.target.value)} // Update the state on change
                                        className="form-control"
                                        style={{
                                            lineHeight: "40px",
                                            color: "#7e7e7e",
                                            paddingLeft: "15px",
                                        }}
                                    />
                                    {errors.startTime && <span className="text-danger fs-12">{errors.startTime}</span>}
                                </div>

                                {/* Time Selector for Available Time Ends */}
                                <div className="col-sm-6">
                                    <label className="col-sm-12 col-form-label">
                                        Available time ends *
                                    </label>
                                    <input
                                        type="time"
                                        name="endTime"
                                        value={formData.endTime} // Manage the state for end time
                                        onChange={handleChange}
                                        // onChange={(e) => setEndTime(e.target.value)} // Update the state on change
                                        className="form-control"
                                        style={{
                                            lineHeight: "40px",
                                            color: "#7e7e7e",
                                            paddingLeft: "15px",
                                        }}
                                    />
                                    {errors.endTime && <span className="text-danger fs-12">{errors.endTime}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* SECTION 5th Price Information*/}
                <div className="col-xl-12 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Price Information</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">

                                <div className="col-sm-3">
                                    <label className="col-sm-3 col-form-label">
                                        Price *
                                    </label>
                                    <input
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        type="number"
                                        className="form-control"
                                        placeholder="Ex: 100"
                                    />
                                    {errors.price && <span className="text-danger fs-12">{errors.price}</span>}
                                </div>


                                <div className="col-sm-3">
                                    <label className="col-sm-6 col-form-label">
                                        Discount type
                                    </label>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={handleSelectChangeLabel('discountType')}
                                        options={discountOptions}
                                        style={{
                                            lineHeight: "40px",
                                            color: "#7e7e7e",
                                            paddingLeft: " 15px",
                                        }}
                                    />
                                    {errors.discountType && <span className="text-danger fs-12">{errors.discountType}</span>}
                                </div>

                                <div className="col-sm-3">
                                    <label className="col-sm-6 col-form-label">
                                        Discount *
                                    </label>
                                    <input
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        type="number"
                                        className="form-control"
                                        placeholder="Ex: 100"
                                    />
                                    {errors.discount && <span className="text-danger fs-12">{errors.discount}</span>}
                                </div>


                                <div className="col-sm-3">
                                    <label className="col-sm-12 col-form-label">
                                        Maximum Purchase Quantity Limit
                                    </label>
                                    <input
                                        name="maxQuantity"
                                        value={formData.maxQuantity}
                                        onChange={handleChange}
                                        type="number"
                                        className="form-control"
                                        placeholder="Ex: 100"
                                    />

                                    {errors.maxQuantity && <span className="text-danger fs-12">{errors.maxQuantity}</span>}

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
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter tags"
                                    />
                                    {errors.tags && <span className="text-danger fs-12">{errors.tags}</span>}
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

export default AddFood;