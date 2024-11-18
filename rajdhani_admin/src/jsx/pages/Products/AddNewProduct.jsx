import React, { useEffect, useState } from "react";
import { DatePicker } from "rsuite";
import Select from "react-select";
import PageTitle from "../../layouts/PageTitle";
import CustomClearIndicator from "../plugins/Select2/MultiSelect";
import { getRestaurantsApi } from "../../../services/apis/RestaurantsApi";
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
import { GetAllBrandList } from "../../../services/apis/BrandApi";
import { getAllMaterialsApi } from "../../../services/apis/Materials";
import { getAllVariantListApi } from "../../../services/apis/Variants";
import { getAllPartsApi } from "../../../services/apis/Parts";
import { addProductApi } from "../../../services/apis/Product";

const options = [
  { value: "veg", label: "Veg" },
  { value: "non-veg", label: "Non Veg" },
];

const discountOptions = [
  { value: "percentage", label: "Percentage ( % ) " },
  { value: "inr", label: "INR " },
];

const AddProduct = () => {
  const [logo, setLogo] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [restaurantList, setRestaurantList] = useState();
  const [mainCategoryOptions, setMainCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [addonsOptions, setAddonsOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);

  const [allFittingSizeList, setAllFittingSizeList] = useState([]);
  const [allThreadList, setAllThreadList] = useState([]);
  const [allCategoryList, setAllCategoryList] = useState([]);
  const [allSubCategoryList, setAllSubCategoryList] = useState([]);
  const [allSubSubCategoryList, setAllSubSubCategoryList] = useState([]);

  //drop option list
  const [categoryOption, setCategoryOption] = useState(null);
  const [subCategoryOption, setSubCategoryOption] = useState(null);
  const [subSubCategoryOption, setSubSubCategoryOption] = useState(null);
  const [brandOption, setBrandOption] = useState(null);
  const [fittingSizeOption, setfittingSizeOption] = useState(null);
  const [materialOption, setmaterialOption] = useState(null);
  const [variantOption, setVariantOption] = useState(null);
  const [threadtypeOption, setThreadtypeOption] = useState(null);
  const [partOption, setPartOption] = useState(null);

  // selected
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
  const [selectedSubCategoryOption, setSelectedSubCategoryOption] = useState(null);
  const [selectedSubSubCategoryOption, setSelectedSubSubCategoryOption] = useState(null);
  const [selectedBrandOption, setSelectedBrandOption] = useState(null);
  const [selectedfittingSizeOption, setSelectedfittingSizeOption] = useState(null);
  const [selectedmaterialOption, setSelectedmaterialOption] = useState(null);
  const [selectedvariantOption, setSelectedvariantOption] = useState(null);
  const [selectedThreadtypeOption, setSelectedThreadtypeOption] = useState(null);
  const [selectedPartOption, setSelectedPartOption] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    gallery: "",
    category_id: "",
    subcategory_id: "",
    subsubcategory_id: "",
    brand: "",
    // connection_type:"",
    price: "",
    fittingSize: "",
    material: "",
    variant: "",
    // thread_id:"",
    parts: [],
    thread_type: "",
    pressure_rating: "",
    temperature_range: "",
    product_id: "",
    product_Type: "",
  });

  const [images, setImages] = useState([]);


  console.log(images, "images is here");

  const handlegGallaeryImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };

  const handleAddImage = () => {
    setImages([...images, null]); // Add a new slot
  };

  const handleDeleteGalleryImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };



  const [rows, setRows] = useState([
    { id: 1, variation: "", price: "", sku: "", stock: "" },
  ]);

  // Function to add a new row
  const addRow = () => {
    setRows([
      ...rows,
      { id: rows.length + 1, variation: "", price: "", sku: "", stock: "" },
    ]);
  };

  const handleDeleteTableRow = (id) => {
    // Filter out the row with the matching id
    setRows(rows.filter((row) => row.id !== id));
  };

  // Function to handle input changes
  const handleChangeRow = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Handles image selection and adds selected images to the state
  // const handleImageChange = (event) => {
  //   console.log("imageChange");

  //   // Convert the FileList to an array of files
  //   const files = Array.from(event.target.files);

  //   // Create an array of objects for each file with 'file' and 'url'
  //   const newImages = files.map((file) => ({
  //     file, // Store the entire File object
  //     url: URL.createObjectURL(file), // Generate a preview URL for the file
  //     name: file.name, // Store the file name
  //     size: file.size, // Store the file size
  //     type: file.type, // Store the file type (image/jpeg, image/png, etc.)
  //     lastModified: file.lastModified, // Store last modified timestamp
  //     lastModifiedDate: file.lastModifiedDate, // Store last modified date
  //     webkitRelativePath: file.webkitRelativePath, // If needed, store the relative path
  //   }));

  //   // Update the gallery images state with the new images
  //   setGalleryImages((prevImages) => [...prevImages, ...newImages]);

  //   // Optionally handle any error handling or other state updates
  // };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
    setGalleryImages(selectedFiles); // Store the array of files in state
    // Log the array of File objects for debugging
  };

  // console.log("gelllryy")

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

  const handleSelectChange = (name) => (selectedOption) => {
    setFormData({ ...formData, [name]: selectedOption.value });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSelectChangeLabel = (name) => (selectedOption) => {
    setFormData({ ...formData, [name]: selectedOption.label });

    // Remove error if one exists for this field
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
      description: "",
      image: "",
      category_id: "",
      subcategory_id: "",
      subsubcategory_id: "",
      brand: "",
      connection_type: "",
      Flare: "",
      status: "",
      price: "",
      fittingSize: "",
      material: "",
      variant: "",
      parts: [],
      thread_type: "",
      pressure_rating: "",
      temperature_range: "",
      product_id: "",
      product_Type: "",
    });


    setErrors({});
    setLoading(false);
  };

  const validateForm = () => {
    const newErrors = {};
    // Required field validation
    if (!formData.name) newErrors.name = "Food name is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.product_id) newErrors.product_id = "Product Id is required.";
    if (!formData.product_Type) newErrors.product_Type = "Product Type is required.";

    if (!formData.image) newErrors.image = "Image is required.";

    if (!formData.category_id) newErrors.category_id = "Category is required.";
    if (!formData.subcategory_id) newErrors.subcategory_id = "Sub Category is required.";
    if (!formData.subsubcategory_id) newErrors.subsubcategory_id = "Sub Sub Category is required.";

    if (!formData.brand) newErrors.brand = "Brand is required.";
    if (!formData.variant) newErrors.variant = "Variant is required.";
    if (!formData.fittingSize) newErrors.fittingSize = "fittingSize is required.";
    if (!formData.thread_type) newErrors.thread_type = "Thread Type is required.";
    if (!formData.material) newErrors.material = "Material is required.";
    if (!formData.pressure_rating) newErrors.pressure_rating = "Pressure Rating is required.";
    if (!formData.temperature_range) newErrors.temperature_range = "Temperature Range Rating is required.";
    // Numeric validation for price and max quantity
    if (!formData.price) newErrors.price = "Price is required."
    else if (formData.price && isNaN(formData.price))
      newErrors.price = "Price must be a numeric value.";
    // if (formData.maxQuantity && isNaN(formData.maxQuantity))
    //   newErrors.maxQuantity = "Max quantity must be a numeric value.";
    // if (formData.discount && isNaN(formData.discount))
    //   newErrors.discount = "Discount must be a numeric value.";

    // Time validation (optional)
    // if (formData.startTime && !/^\d{2}:\d{2}$/.test(formData.startTime))
    //   newErrors.startTime = "Start time must be in HH:MM format.";
    // if (formData.endTime && !/^\d{2}:\d{2}$/.test(formData.endTime))
    //   newErrors.endTime = "End time must be in HH:MM format.";

    // Set errors to the state
    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const fData = new FormData();

    console.log("formData.description", formData.description)
    // Append regular form fields to FormData
    fData.append("name", formData.name);
    fData.append("description", formData.description);
    fData.append("category_id", formData.category_id);
    fData.append("brand", formData.brand);
    fData.append("fittingSize", formData.fittingSize);
    fData.append("material", formData.material);
    fData.append("pressure_rating", formData.pressure_rating);
    fData.append("price", formData.price);
    fData.append("product_Type", formData.product_Type);
    fData.append("product_id", formData.product_id);
    fData.append("status", formData.status);
    fData.append("subcategory_id", formData.subcategory_id);
    fData.append("subsubcategory_id", formData.subsubcategory_id);
    fData.append("temperature_range", formData.temperature_range);
    fData.append("thread_id", formData.thread_id);
    fData.append("thread_type", formData.thread_type);
    fData.append("variant", formData.variant);

    // If a single image is selected, append it as a file
    if (formData.image) {
      fData.append("image", formData.image);
    }
    // Use the processGalleryImages function to append gallery images
    if (galleryImages && galleryImages.length > 0) {
      galleryImages.forEach((image, index) => {
        console.log(`Appending image at index ${index}`, image.file);
        fData.append(`gallery`, image.file); // Append the actual file to FormData
      });
    }

    // const fData = {
    //  ...formData,
    //  gallery:galleryImages,
    //  price:parseInt(formData.price)
    // };
    console.log("data is here", formData);
    try {
      const res = await addProductApi(formData);
      console.log(res, "response is here");
      if (res.data?.success) {
        setLoading(false);
        // Show success message from backend
        Swal.fire({
          icon: "success",
          title: "Food Item",
          text: res.data?.message || "Food item created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        // resetForm(); // Reset form after success
      } else {
        // Show error message from backend if creation failed
        setLoading(false);
        Toaster.error(res.data?.message || "Failed to create food item");
        console.error("Food creation error:", res);
      }
    } catch (error) {
      setLoading(false);
      // Handle any errors during API request
      Toaster.error(
        error.response?.data?.message ||
        "An error occurred while processing your request"
      );
      console.error("Error creating food item:", error);
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
      setfittingSizeOption(dropdownFittingSize)
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fetchAllThreadListApi = async () => {
    setLoading(true);
    try {
      const res = await getAllThreadListApi();
      const dropdownThreads = res?.data?.threads?.map(
        (thread) => ({
          value: thread._id,
          label: thread.threadSize,
        })
      );
      setThreadtypeOption(dropdownThreads)
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  const fetchAllCategoryList = async () => {
    setLoading(true);
    try {
      const res = await getAllCategoriesListApi();
      const dropdownCategories = res?.data?.categories?.map(
        (category) => ({
          value: category._id,
          label: category.name,
        })
      );
      setCategoryOption(dropdownCategories);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  const fetchAllSubCategoryList = async () => {
    setLoading(true);
    try {
      const res = await getAllSubCategoriesListApi();

      const dropdownSubCategories = res?.data?.subcategories?.map(
        (subCategory) => ({
          value: subCategory._id,
          label: subCategory.name,
        })
      );
      setSubCategoryOption(dropdownSubCategories)
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fetchAllSubSubCategoryList = async () => {
    setLoading(true);
    try {
      const res = await getAllSubSubCategoriesListApi();
      const dropdownSubSubCategories = res?.data?.subSubcategories?.map(
        (subSubCategory) => ({
          value: subSubCategory._id,
          label: subSubCategory.name,
        })
      );
      setSubSubCategoryOption(dropdownSubSubCategories)
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fetchAllBrandList = async () => {
    setLoading(true);
    try {
      const res = await GetAllBrandList();
      const dropdownSubSubCategories = res?.data?.brands?.map(
        (brand) => ({
          value: brand._id,
          label: brand.name,
        })
      );
      setBrandOption(dropdownSubSubCategories)
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  const fetchAllMaterialList = async () => {
    setLoading(true);
    try {
      const res = await getAllMaterialsApi();
      const dropdownSubSubCategories = res?.data?.materials?.map(
        (material) => ({
          value: material._id,
          label: material.name,
        })
      );
      setmaterialOption(dropdownSubSubCategories)
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fetchAllVariantList = async () => {
    setLoading(true);
    try {
      const res = await getAllVariantListApi();
      const dropdownSubSubCategories = res?.data?.variants?.map(
        (variant) => ({
          value: variant._id,
          label: variant.name,
        })
      );
      setVariantOption(dropdownSubSubCategories)
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fetchAllPartList = async () => {
    setLoading(true);
    try {
      const res = await getAllPartsApi();
      const dropdownSubSubCategories = res?.data?.parts?.map(
        (part) => ({
          value: part._id,
          label: part.name,
        })
      );
      setPartOption(dropdownSubSubCategories)
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFittingSizeList();
    fetchAllThreadListApi();
    fetchAllCategoryList();
    fetchAllSubCategoryList();
    fetchAllSubSubCategoryList();

    fetchAllBrandList();
    fetchAllMaterialList();
    fetchAllVariantList()
    fetchAllPartList()
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
      border: "2px dashed #ccc",
      borderRadius: "8px",
      width: "150px", // Logo size
      height: "150px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      backgroundColor: "#f9f9f9",
      position: "relative",
      textAlign: "center",
      overflow: "hidden",
    },
    coverContainer: {
      border: "2px dashed #ccc",
      borderRadius: "8px",
      width: "250px", // Cover size (2:1 ratio)
      height: "150px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      backgroundColor: "#f9f9f9",
      position: "relative",
      textAlign: "center",
      overflow: "hidden",
    },
    placeholder: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      textAlign: "center",
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "8px",
    },
    hover: {
      borderColor: "#007bff",
      backgroundColor: "#e9f4ff",
    },
    uploadIcon: {
      color: "#888",
      fontSize: "16px",
      fontWeight: "bold",
    },
    deleteIcon: {
      position: "absolute",
      top: "0px",
      right: "0px",
      backgroundColor: "#FF6D6D",
      color: "white",
      borderRadius: "100%",
      padding: "5px 10px",
      cursor: "pointer",
      zIndex: 2,
      fontSize: "10px",
      fontWeight: "bold",
    },
  };

  return (
    <>
      <ToastContainer />
      <Loader visible={loading} />
      <PageTitle activeMenu={"Add New Product"} motherMenu={"Home"} />
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

                  <div className="col-sm-4">
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

                  <div className="col-sm-4">
                    <label className="col-sm-3 col-form-label">Product Id</label>
                    <input
                      name="product_id"
                      value={formData.product_id}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.product_id && (
                      <span className="text-danger fs-12">{errors.product_id}</span>
                    )}
                  </div>

                  <div className="col-sm-4">
                    <label className="col-sm-3 col-form-label">Product Type</label>
                    <input
                      name="product_Type"
                      value={formData.product_Type}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.product_Type && (
                      <span className="text-danger fs-12">{errors.product_Type}</span>
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



        {/* SECTION 3RD Restaurants & Category Infoo*/}
        <div className="row">
          <div className="col-xl-3 col-lg-3 flex ">
            <div className="card">
              <div className="card-header mb-4">
                <h4 className="card-title">Product Image</h4>
              </div>
              <div
                className="col-sm-12"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <div style={styles.container}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    style={{ display: "none" }}
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
                      <div
                        style={styles.uploadIcon}
                        className="flex flex-col cursor-pointer">
                        <img width="30" src={uplodIcon} alt="Upload Icon"></img>
                        <p>Upload Image</p>
                      </div>
                    </label>
                  )}
                </div>
                <p className="mt-2 mb-1">
                  Image format - jpg png jpeg gif
                  <br />
                  Image Size - maximum size 2 MB
                  <br />
                  Image Ratio - 1:1
                </p>
                {errors.image && (
                  <span className="text-danger fs-12">{errors.image}</span>
                )}
              </div>
            </div>
          </div>


          <div className="col-xl-9 col-lg-3 flex ">
            <div className="card">
              <div className="card-header mb-4">
                <h4 className="card-title">Gallery Image</h4>
              </div>
         
              <div className=" d-flex flex-wrap">
                {images.map((image, index) => (
                  <div key={index} style={{ textAlign: "center" , marginLeft: '10px'}}>
                    <div style={styles.container}>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id={`imageUpload${index}`}
                        onChange={(event) => handlegGallaeryImageChange(event, index)}
                      />
                      {image ? (
                        <>
                          <div
                            style={styles.deleteIcon}
                            onClick={() => handleDeleteGalleryImage(index)}>
                            ⛌
                          </div>
                          <img src={image} alt={`Uploaded ${index}`} style={styles.img} />
                        </>
                      ) : (
                        <label htmlFor={`imageUpload${index}`} style={styles.placeholder}>
                          <div className="flex flex-col cursor-pointer">
                            <img
                              width="30"
                              src={uplodIcon}
                              alt="Upload Icon"
                            />
                            <p>Upload Image</p>
                          </div>
                        </label>
                      )}
                    </div>
                    <p className="mt-2 mb-1">
                      Image format - jpg png jpeg gif
                      <br />
                      Image Size - maximum size 2 MB
                      <br />
                      Image Ratio - 1:1
                    </p>
                  </div>
                ))}
                <div className="flex flex-col">
                  <button onClick={handleAddImage} className="btn btn-primary mt-2">
                    +
                  </button>
                  <button onClick={handleDeleteGalleryImage} className="gap-2 btn btn-danger mt-2">
                    x
                  </button>
                </div>
              </div>
              </div>
              
          </div>

        </div>

        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Category</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <label className="col-sm-4 col-form-label">Category</label>
                  <Select
                    value={selectedCategoryOption}
                    onChange={(option) => {
                      setSelectedCategoryOption(option);
                      setFormData({
                        ...formData,
                        category_id: option.value,
                      });
                    }}
                    defaultValue={selectedCategoryOption}
                    options={categoryOption}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.category_id && (
                    <span className="text-danger fs-12">{errors.category_id}</span>
                  )}
                </div>

                <div className="col-sm-3">
                  <label className="col-sm-4 col-form-label">
                    Sub category
                  </label>
                  <Select
                    value={selectedSubCategoryOption}
                    onChange={(option) => {
                      setSelectedSubCategoryOption(option);
                      setFormData({
                        ...formData,
                        subcategory_id: option.value,
                      });
                    }}
                    defaultValue={selectedSubCategoryOption}
                    options={subCategoryOption}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.subcategory_id && (
                    <span className="text-danger fs-12">
                      {errors.subcategory_id}
                    </span>
                  )}
                </div>
                <div className="col-sm-3">
                  <label className="col-sm-6 col-form-label">
                    Sub Sub category
                  </label>
                  <Select
                    value={selectedSubSubCategoryOption}
                    onChange={(option) => {
                      setSelectedSubSubCategoryOption(option);
                      setFormData({
                        ...formData,
                        subsubcategory_id: option.value,
                      });
                    }}
                    defaultValue={selectedSubSubCategoryOption}
                    options={subSubCategoryOption}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.subsubcategory_id && (
                    <span className="text-danger fs-12">
                      {errors.subsubcategory_id}
                    </span>
                  )}
                </div>


              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3RD Restaurants & Category Infoo*/}
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">General Info</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <label className="col-sm-4 col-form-label">Brand</label>
                  <Select
                    value={selectedBrandOption}
                    onChange={(option) => {
                      setSelectedBrandOption(option);
                      setFormData({
                        ...formData,
                        brand: option.value,
                      });
                    }}
                    defaultValue={selectedBrandOption}
                    options={brandOption}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.brand && (
                    <span className="text-danger fs-12">{errors.brand}</span>
                  )}
                </div>



                <div className="col-sm-3 ">
                  <label className="col-sm-6 col-form-label">Variant</label>
                  <Select
                    value={selectedvariantOption}
                    onChange={(option) => {
                      setSelectedvariantOption(option);
                      setFormData({
                        ...formData,
                        variant: option.value,
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

                <div className="col-sm-3">
                  <label className="col-sm-6 col-form-label">FittingSize</label>
                  <Select
                    value={selectedfittingSizeOption}
                    onChange={(option) => {
                      setSelectedfittingSizeOption(option);
                      setFormData({
                        ...formData,
                        fittingSize: option.value,
                      });
                    }}
                    defaultValue={selectedfittingSizeOption}
                    options={fittingSizeOption}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.fittingSize && (
                    <span className="text-danger fs-12">
                      {errors.fittingSize}
                    </span>
                  )}
                </div>

                <div className="col-sm-3">
                  <label className="col-sm-4 col-form-label">
                    Thread Type
                  </label>
                  <Select
                    value={selectedThreadtypeOption}
                    onChange={(option) => {
                      setSelectedThreadtypeOption(option);
                      setFormData({
                        ...formData,
                        thread_type: option.value,
                      });
                    }}
                    defaultValue={selectedThreadtypeOption}
                    options={threadtypeOption}
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
              </div>

              <div className="row mt-3">
                <div className="col-sm-3">
                  <label className="col-sm-6 col-form-label">Material</label>
                  <Select
                    value={selectedmaterialOption}
                    onChange={(option) => {
                      setSelectedmaterialOption(option);
                      setFormData({
                        ...formData,
                        material: option.value,
                      });
                    }}
                    defaultValue={selectedmaterialOption}
                    options={materialOption}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.material && (
                    <span className="text-danger fs-12">
                      {errors.material}
                    </span>
                  )}
                </div>

                <div className="col-sm-3">
                  <label className="col-sm-6 col-form-label">Pressure Rating</label>
                  <input
                    name="pressure_rating"
                    value={formData.pressure_rating}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ex: ABC"
                  />
                  {errors.pressure_rating && (
                    <span className="text-danger fs-12">{errors.pressure_rating}</span>
                  )}
                </div>

                <div className="col-sm-3">
                  <label className="col-sm-6 col-form-label">Temperature Range</label>
                  <input
                    name="temperature_range"
                    value={formData.temperature_range}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ex: ABC"
                  />
                  {errors.temperature_range && (
                    <span className="text-danger fs-12">{errors.temperature_range}</span>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Part</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-8">
                  <label className="col-sm-4 col-form-label">Part</label>
                  <Select
                    isMulti
                    value={selectedPartOption}
                    onChange={(selectedOptions) => {
                      setSelectedPartOption(selectedOptions);
                      setFormData({
                        ...formData,
                        parts: selectedOptions?.map((option) => option.value),
                      });
                    }}
                    defaultValue={selectedPartOption}
                    options={partOption}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.parts && (
                    <span className="text-danger fs-12">{errors.parts}</span>
                  )}
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
                  <label className="col-sm-3 col-form-label">Price</label>
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    type="number"
                    className="form-control"
                    placeholder="Ex: 100"
                  />
                  {errors.price && (
                    <span className="text-danger fs-12">{errors.price}</span>
                  )}
                </div>

                {/* <div className="col-sm-3">
                  <label className="col-sm-6 col-form-label">
                    Discount type
                  </label>
                  <Select
                    defaultValue={selectedOption}
                    onChange={handleSelectChangeLabel("discountType")}
                    options={discountOptions}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.discountType && (
                    <span className="text-danger fs-12">
                      {errors.discountType}
                    </span>
                  )}
                </div>

                <div className="col-sm-3">
                  <label className="col-sm-6 col-form-label">Discount *</label>
                  <input
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    type="number"
                    className="form-control"
                    placeholder="Ex: 100"
                  />
                  {errors.discount && (
                    <span className="text-danger fs-12">{errors.discount}</span>
                  )}
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
                    placeholder="Ex: 100"/>
                   {errors.maxQuantity && (
                    <span className="text-danger fs-12">
                      {errors.maxQuantity}
                    </span>
                   )}
                </div> */}
              </div>
            </div>
          </div>
        </div>


        {/* SECTION 3RD Restaurants & Category Infoo*/}
        {/* <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Variants</h4>
              <button onClick={addRow} className="btn btn-primary mt-2">
                Add New Row
              </button>
            </div>
            <div>
              <div className="card-body">
                {rows?.length > 0 && (
                  <table
                    id="dynamicTable"
                    className="display dataTable no-footer w-100">
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Name</th>
                        <th>VariantCode</th>
                        <th>VariantSku</th>
                        <th>VariantQrCode</th>
                        <th>Fitting Size</th>

                        <th>Thread</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Sub Sub Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows?.map((row, index) => (
                        <tr key={row.id}>
                          <td>{row.id}</td>
                          <td>
                            <input
                              type="text"
                              placeholder="Name"
                              value={row.name}
                              onChange={(e) =>
                                handleChange(index, "name", e.target.value)
                              }
                              className="form-control" // Bootstrap class for input styling
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              placeholder="VariantCode"
                              name="variantCode"
                              value={row.price}
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "VariantCode",
                                  e.target.value
                                )
                              }
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              placeholder="SKU"
                              value={row.sku}
                              onChange={(e) =>
                                handleChange(index, "sku", e.target.value)
                              }
                              className="form-control"
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              placeholder="Code"
                              name="variantQrCode"
                              value={row.Code}
                              onChange={(e) =>
                                handleChange(index, "Code", e.target.value)
                              }
                              className="form-control"
                            />
                          </td>
                       
                          <td>
                            <div className=" ">
                              <Select
                                // defaultValue={selectedOption}
                                // value={formData.subCategory}
                                // onChange={handleSelectChange('subCategory')}
                                defaultValue={selectedSubCategoryOption}
                                // onChange={setSelectedSubCategoryOption}
                                onChange={handleSelectChange("subCategory")}
                                options={allFittingSizeList}
                                style={{
                                  lineHeight: "40px",
                                  color: "#7e7e7e",
                                  paddingLeft: " 15px",
                                }}
                              />
                              {errors.subsubCategory && (
                                <span className="text-danger fs-12">
                                  {errors.subsubCategory}
                                </span>
                              )}
                            </div>
                          </td>

                          <td>
                            <div className=" ">
                              <Select
                                // defaultValue={selectedOption}
                                // value={formData.subCategory}
                                // onChange={handleSelectChange('subCategory')}
                                defaultValue={selectedSubCategoryOption}
                                // onChange={setSelectedSubCategoryOption}
                                onChange={handleSelectChange("subCategory")}
                                options={allThreadList}
                                style={{
                                  lineHeight: "40px",
                                  color: "#7e7e7e",
                                  paddingLeft: " 15px",
                                }}
                              />
                              {errors.subsubCategory && (
                                <span className="text-danger fs-12">
                                  {errors.subsubCategory}
                                </span>
                              )}
                            </div>
                          </td>

                          <td>
                            <div className=" ">
                              <Select
                                // defaultValue={selectedOption}
                                // value={formData.subCategory}
                                // onChange={handleSelectChange('subCategory')}
                                defaultValue={selectedSubCategoryOption}
                                // onChange={setSelectedSubCategoryOption}
                                onChange={handleSelectChange("subCategory")}
                                options={allCategoryList}
                                style={{
                                  lineHeight: "40px",
                                  color: "#7e7e7e",
                                  paddingLeft: " 15px",
                                }}
                              />
                              {errors.subsubCategory && (
                                <span className="text-danger fs-12">
                                  {errors.subsubCategory}
                                </span>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className=" ">
                              <Select
                                // defaultValue={selectedOption}
                                // value={formData.subCategory}
                                // onChange={handleSelectChange('subCategory')}
                                defaultValue={selectedSubCategoryOption}
                                // onChange={setSelectedSubCategoryOption}
                                onChange={handleSelectChange("subCategory")}
                                options={allSubCategoryList}
                                style={{
                                  lineHeight: "40px",
                                  color: "#7e7e7e",
                                  paddingLeft: " 15px",
                                }}
                              />
                              {errors.subsubCategory && (
                                <span className="text-danger fs-12">
                                  {errors.subsubCategory}
                                </span>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="">
                              <Select
                                // defaultValue={selectedOption}
                                // value={formData.subCategory}
                                // onChange={handleSelectChange('subCategory')}
                                defaultValue={selectedSubCategoryOption}
                                // onChange={setSelectedSubCategoryOption}
                                onChange={handleSelectChange("subCategory")}
                                options={allSubSubCategoryList}
                                style={{
                                  lineHeight: "40px",
                                  color: "#7e7e7e",
                                  paddingLeft: " 15px",
                                }}
                              />
                              {errors.subsubCategory && (
                                <span className="text-danger fs-12">
                                  {errors.subsubCategory}
                                </span>
                              )}
                            </div>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger mt-2"
                              onClick={() => handleDeleteTableRow(row.id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div> */}

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

export default AddProduct;
