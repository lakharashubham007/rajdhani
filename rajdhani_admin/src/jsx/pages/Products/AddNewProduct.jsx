import React, { useEffect, useState } from "react";
import { DatePicker } from "rsuite";
import Select from "react-select";
import PageTitle from "../../layouts/PageTitle";
import { getAllCategoriesListApi, getAllSubCategoriesListApi, getAllSubSubCategoriesListApi } from "../../../services/apis/CategoryApi";
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
import { useNavigate } from "react-router-dom";
import EndFittingForm from "../../components/ProductTypeForms/EndFitting";
import HosPipeSection from "../../components/ProductTypeForms/HosPipeSection";
import HoseAssemblySection from "../../components/ProductTypeForms/HoseAssemblySection";
import SpringSection from "../../components/ProductTypeForms/SpringSection";
import O_ringSection from "../../components/ProductTypeForms/O_ringSection";
import DustCapSection from "../../components/ProductTypeForms/DustCapSection";
import SleeveSection from "../../components/ProductTypeForms/SleeveSection";
import VinylCoverSection from "../../components/ProductTypeForms/VinylCoverSection";
import PackingSection from "../../components/ProductTypeForms/PackingSection";
import TubeFittingsSection from "../../components/ProductTypeForms/TubeFittingsSection";
import { validateFormComponent } from "./ValidationComponent";


const ProductOptions = [
  { value: "End Fittings", label: "End Fittings" },
  { value: "Hose Pipe", label: "Hose Pipe" },
  { value: "Hose Assembly", label: "Hose Assembly" },
  { value: "Spring", label: "Spring" },
  { value: "O-ring", label: "O-ring" },
  { value: "Dust Cap", label: "Dust Cap" },
  { value: "Sleeve", label: "Sleeve" },
  { value: "Vinyl Cover", label: "Vinyl Cover" },
  { value: "Packing", label: "Packing" },
  { value: "Tube Fittings", label: "Tube Fittings" },
];

const WireTypeOptions = [
  { value: "2W", label: "2W" },
  { value: "4W", label: "4W" },
  { value: "6W", label: "6W" },
];

const CapWithoutCapOptions = [
  { value: "With Cap", label: "With Cap" },
  { value: "Without Cap", label: "Without Cap" },
];

const fittingPieceOptions = [
  { value: "ONE PIECE", label: "ONE PIECE" },
  { value: "TWO PIECE", label: "TWO PIECE" },
  { value: "THREE PIECE", label: "THREE PIECE" },
];

const skiveTypeOptions = [
  { value: "SKIVE", label: "SKIVE" },
  { value: "NON-SKIVE", label: "NON-SKIVE" },
  { value: "INNER-SKIVE", label: "INNER-SKIVE" },
];

const hoseDashSizeOptions = [
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "8", label: "8" },
  { value: "10", label: "10" },
  { value: "12", label: "12" },
  { value: "16", label: "16" },
  { value: "20", label: "20" },
  { value: "24", label: "24" },
  { value: "32", label: "32" },
];

const fittingDashSizeOptions = [
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "8", label: "8" },
  { value: "10", label: "10" },
  { value: "12", label: "12" },
  { value: "16", label: "16" },
  { value: "20", label: "20" },
  { value: "24", label: "24" },
  { value: "32", label: "32" },
];

const fittingThreadOptions = [
  { value: "BSP", label: "BSP" },
  { value: "BSP WITH O", label: "BSP WITH O" },
  { value: "JIC", label: "JIC" },
  { value: "ORFS", label: "ORFS" },
  { value: "KOMATSU", label: "KOMATSU" },
];

const fittingTypeOptions = [
  { value: "BSP", label: "BSP" },
  { value: "BSP WITH O", label: "BSP WITH O" },
  { value: "JIC", label: "JIC" },
  { value: "ORFS", label: "ORFS" },
  { value: "KOMATSU", label: "KOMATSU" },
];

const straightBendangleOptions = [
  { value: "STRAIGHT", label: "STRAIGHT" },
  { value: "90 DEGREE", label: "90 DEGREE" },
  { value: "67.5 DEGREE", label: "67.5 DEGREE" },
  { value: "45 DEGREE", label: "45 DEGREE" },
  { value: "30 DEGREE", label: "30 DEGREE" },
];

const dropLengthOptions = [
  { value: "30", label: "30" },
  { value: "36", label: "36" },
  { value: "50", label: "50" },
  { value: "65", label: "65" },
  { value: "90", label: "90" },
  { value: "120", label: "120" },
  { value: "150", label: "150" },
  { value: "180", label: "180" },
];

const springTypeOptions = [
  { value: "Compress", label: "Compress" },
  { value: "Normal", label: "Normal" },
];

const malefemaleOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const AddProduct = () => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);

  //drop option list
  const [productTypeOption, setProductTypeOption] = useState(ProductOptions);
  const [categoryOption, setCategoryOption] = useState(null);
  const [subCategoryOption, setSubCategoryOption] = useState(null);
  const [subSubCategoryOption, setSubSubCategoryOption] = useState(null);
  const [brandOption, setBrandOption] = useState(null);
  const [fittingSizeOption, setfittingSizeOption] = useState(null);
  const [materialOption, setmaterialOption] = useState(null);
  const [variantOption, setVariantOption] = useState(null);
  const [threadtypeOption, setThreadtypeOption] = useState(null);
  const [partOption,setPartOption]= useState(null);
 
  // selected
  const [selectedProductTypeOption, setSelectedProductTypeOption] = useState(null);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
  const [selectedSubCategoryOption, setSelectedSubCategoryOption] = useState(null);
  const [selectedSubSubCategoryOption, setSelectedSubSubCategoryOption] = useState(null);
  const [selectedBrandOption, setSelectedBrandOption] = useState(null);
  const [selectedfittingSizeOption, setSelectedfittingSizeOption] = useState(null);
  const [selectedmaterialOption, setSelectedmaterialOption] = useState(null);
  const [selectedvariantOption, setSelectedvariantOption] = useState(null);
  const [selectedThreadtypeOption, setSelectedThreadtypeOption] = useState(null);
  const [selectedPartOption, setSelectedPartOption]= useState(null);

  // Child Form
  const [wireTypeOption, setWireTypeOption] = useState(WireTypeOptions);
  const [withCapWithoutCapOption, setWithCapWithoutCapOption] = useState(CapWithoutCapOptions);
  const [fittingPieceOption, setFittingPieceOption] = useState(fittingPieceOptions);
  const [skiveTypeOption, setSkiveTypeOption] = useState(skiveTypeOptions);
  const [HoseDashSizeOption, setHoseDashSizeOption] = useState(hoseDashSizeOptions);
  const [fittingDashSizeOption, setfittingDashSizeOption] = useState(fittingDashSizeOptions);
  const [fittingThreadOption, setfittingThreadOption] = useState(fittingThreadOptions);
  const [fittingTypeOption, setfittingTypeOption] = useState(fittingTypeOptions);
  const [straightBendangleOption, setStraightBendangleOption] = useState(straightBendangleOptions);
  const [dropLengthOption, setDropLengthOption] = useState(dropLengthOptions);
  const [neckLengthOption, setNeckLengthOption] = useState(dropLengthOptions);

  // selected
  const [selectedWireTypeOption, setSelectedWireTypeOption] = useState(null);
  const [selectedWithCapWithoutCapOption, setSelectedWithCapWithoutCapOption] = useState(null);
  const [selectedFittingPieceOption, setSelectedFittingPieceOption] = useState(null);
  const [selectedSkiveTypeOption, setSelectedSkiveTypeOption] = useState(null);
  const [selectedhoseDashSizeOption, setSelectedHoseDashSizeOption] = useState(null);
  const [selectedFittingDashSizeOption, setSelectedfittingDashSizeOption] = useState(null);
  const [selectedFittingTypeOption, setSelectedFittingTypeOption] = useState(null);
  const [selectedFittingThreadOption, setSelectedFittingThreadOption] = useState(null);
  const [selectedStraightBendangleOption, setSelectedStraightBendangleOption] = useState(null);
  const [selectedDropLengthOption, setSelectedDropLengthOption] = useState(null);
  const [selectedNeckLengthOption, setselectedNeckLengthOption] = useState(null);  

  const [springTypeOption, setSpringTypeOption] = useState(springTypeOptions);
  const [selectedSpringTypeOption, setSelectedSpringTypeOption] = useState(null);

  const [maleFemaleOption, setmaleFemaleOption] = useState(malefemaleOptions);
  const [selectedMaleFemaleOption, setSelectedMaleFemaleOption] = useState(null);
  const [formData, setFormData] = useState({
    product_type:"",
    // with_cap:[]
  });
  
  // console.log("formData",formData)
  // const [formData, setFormData] = useState({
  //   product_type:"",
  //   name :"",
  //   description:"",
  //   image:"",
  //   gallery:[],
  //   category_id:"",
  //   subcategory_id:"",
  //   subsubcategory_id:"",
  //   brand:"",
  //   //connection_type:"",
  //   price:"",
  //   fittingSize:"",
  //   material:"",
  //   variant:"",
  //   //thread_id:"",
  //   parts:[],
  //   thread_type:"",
  //   pressure_rating:"",
  //   temperature_range:"",
  //   product_id:"",
  //   product_Type:"",
  //   with_cap:[]
  // });

  const resetEndFittingForm = () => {
    setFormData({
      design: "",
      wire_type: "",
      with_cap: [],
      fitting_piece: "",
      skive_type: "",
      hose_dash_size: "",
      fitting_dash_size: "",
      fitting_thread: "",
      fitting_type: "",
      straight_bend_angle: "",
      drop_length: "",
      neck_length: "",
      ferrule_design: "",
      ferrule_wire_type: "",
      ferrule_hose_dash_size: "",
    });

    setSelectedWireTypeOption(null);
    setSelectedWithCapWithoutCapOption(null);
    setSelectedFittingPieceOption(null);
    setSelectedSkiveTypeOption(null);
    setSelectedHoseDashSizeOption(null);
    setSelectedFittingThreadOption(null);
    setSelectedStraightBendangleOption(null);
    setSelectedDropLengthOption(null);
  
    // setErrors({});
    setLoading(false);
  };


  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    // Map through the selected files and create an array of objects containing the file and preview URL
    const newImages = files?.map((file) => ({
      file, // The actual File object
      url: URL.createObjectURL(file), // Preview URL (optional, for showing previews)
    }));
  
    // Update the gallery state with the newly selected images (preserving previous images)
    setGalleryImages((prevImages) => [...prevImages, ...newImages]);
    setFormData((prevData) => ({
      ...prevData,
      gallery:[...(prevData.gallery || []), ...newImages?.map(image => image.file)],
    }));
  };
  
  // Deletes an image from the array
  const handleDeleteImage = (index) => {
    setGalleryImages((prevImages) => prevImages.filter((_, i) => i !== index));;

    setFormData((prevData) => ({
      ...prevData,
      gallery: prevData?.gallery?.filter((_, i) => i !== index), // Remove the image from gallery array
    }));
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
      name :"",
      description:"",
      image:"",
      category_id:"",
      subcategory_id:"",
      subsubcategory_id:"",
      brand:"",
      connection_type:"",
      Flare:"",
      status:"",
      price:"",
      fittingSize:"",
      material:"",
      variant:"",
      parts:[],
      thread_type:"",
      pressure_rating:"",
      temperature_range:"",
      product_id:"",
      product_Type:"",
    });
    setLogo(null)
    setGalleryImages([]);

    setSelectedCategoryOption(null)
    setSelectedSubCategoryOption(null)
    setSelectedSubSubCategoryOption(null)
    setSelectedBrandOption(null)
    setSelectedfittingSizeOption(null)
    setSelectedmaterialOption(null)
    setSelectedvariantOption(null)
    setSelectedThreadtypeOption(null)
    setSelectedPartOption(null)
    setErrors({});
    setLoading(false);
  };

  // const validateForm = () => {
  //   const newErrors = {};
  //   if (!formData.name) newErrors.name = "Food name is required.";
  //   if (!formData.description) newErrors.description = "Description is required.";
  //   if (!formData.product_id) newErrors.product_id = "Product Id is required.";
  //   if (!formData.product_Type) newErrors.product_Type = "Product Type is required.";

  //   if (!formData.image) newErrors.image = "Image is required.";
    
  //   if (!formData.category_id) newErrors.category_id = "Category is required.";
  //   if (!formData.subcategory_id) newErrors.subcategory_id = "Sub Category is required.";
  //   if (!formData.subsubcategory_id) newErrors.subsubcategory_id = "Sub Sub Category is required.";

  //   if (!formData.brand) newErrors.brand = "Brand is required.";
  //   if (!formData.variant) newErrors.variant = "Variant is required.";
  //   if (!formData.fittingSize) newErrors.fittingSize = "fittingSize is required.";
  //   if (!formData.thread_type) newErrors.thread_type = "Thread Type is required.";
  //   if (!formData.material) newErrors.material = "Material is required.";
  //   if (!formData.pressure_rating) newErrors.pressure_rating = "Pressure Rating is required.";
  //   if (!formData.temperature_range) newErrors.temperature_range = "Temperature Range Rating is required.";
  //   if (!formData.price) newErrors.price = "Price is required."
  //   else if (formData.price && isNaN(formData.price))
  //     newErrors.price = "Price must be a numeric value.";

  //   setErrors(newErrors);

  //   return Object.keys(newErrors).length === 0;
  // };


  const handleSubmit=async(e)=>{
    e.preventDefault();
    const validationErrors = validateFormComponent(formData);
    setErrors(validationErrors);

    const form = new FormData();
    for (const key in formData) {
      if (key !== 'image' && key !== 'gallery') {
        form.append(key, formData[key]);
      }
    }

    if (formData.image) {
      form.append("image", formData.image);
    }
           
    formData?.gallery?.forEach((file) => {
      form.append("gallery", file);
    });

    if (Object.keys(validationErrors).length === 0) {
      try {
            const res = await addProductApi(form);
            if (res.data?.success) {
              setLoading(false);
              Swal.fire({
                icon: "success",
                title: "Product",
                text: res.data?.message || "Product created successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              resetForm(); 
              navigate('/productlist');
            } else {
              setLoading(false);
              Toaster.error(res.data?.message || "Failed to create product");
              console.error("Product creation error:", res);
            }
          } catch (error) {
            setLoading(false);
            Toaster.error(error.response?.data?.message ||
                "An error occurred while processing your request"
            );
            console.error("Error creating product:", error);
          }
    }
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) {
  //     return; 
  //   }
  //   setLoading(true);
  //   const fData = new FormData();
  //   fData.append("name", formData.name);
  //   fData.append("description", formData.description);
  //   fData.append("category_id", formData.category_id);
  //   fData.append("brand", formData.brand);
  //   fData.append("fittingSize", formData.fittingSize);
  //   fData.append("material", formData.material);
  //   fData.append("pressure_rating", formData.pressure_rating);
  //   fData.append("price", formData.price);
  //   fData.append("product_Type", formData.product_Type);
  //   fData.append("product_id", formData.product_id);
  //   fData.append("subcategory_id", formData.subcategory_id);
  //   fData.append("subsubcategory_id", formData.subsubcategory_id);
  //   fData.append("temperature_range", formData.temperature_range);
  //   fData.append("thread_type", formData.thread_type);
  //   fData.append("variant", formData.variant);
  //   if (formData.image) {
  //     fData.append("image", formData.image);
  //   }
  //   if (formData.parts && Array.isArray(formData.parts)) {
  //     fData.append("parts", JSON.stringify(formData.parts));
  //   }
  //   formData?.gallery?.forEach((file) => {
  //     fData.append("gallery", file);
  //   });
  //   try {
  //     const res = await addProductApi(fData);
  //     if (res.data?.success) {
  //       setLoading(false);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Product",
  //         text: res.data?.message || "Product created successfully",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       resetForm(); 
  //       navigate('/productlist');
  //     } else {
  //       setLoading(false);
  //       Toaster.error(res.data?.message || "Failed to create product");
  //       console.error("Product creation error:", res);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     Toaster.error(error.response?.data?.message ||
  //         "An error occurred while processing your request"
  //     );
  //     console.error("Error creating product:", error);
  //   }
  // };

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
      setfittingSizeOption(dropdownFittingSize)
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
          label: `${thread?.thread_type} ${thread?.threadSize}`,
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
      setCategoryOption(dropdownCategories);
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
      setSubCategoryOption(dropdownSubCategories)
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
    setSubSubCategoryOption(dropdownSubSubCategories)
  } catch (error) {
    console.error("Error fetching cuisines:", error);
    Toaster.error("Failed to load cuisines. Please try again.");
  } finally {
    setLoading(false);
  }
}

const fetchAllBrandList=async()=>{
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


const fetchAllMaterialList=async()=>{
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

const fetchAllVariantList=async()=>{
  setLoading(true);
  try {
    const res = await getAllVariantListApi();
    const dropdownSubSubCategories = res?.data?.variants?.map(
      (variant) => ({
        value: variant._id,
        label: `${variant?.variantType} ${variant.name}` ,
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

const fetchAllPartList=async()=>{
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

  const renderComponent = () => {
    switch (formData.product_type) {
      case "End Fittings":
        return <EndFittingForm 
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        wireTypeOption={wireTypeOption}
        setWireTypeOption={setWireTypeOption}
        selectedWireTypeOption={selectedWireTypeOption}
        setSelectedWireTypeOption={setSelectedWireTypeOption}
        withCapWithoutCapOption={withCapWithoutCapOption}
        setWithCapWithoutCapOption={setWithCapWithoutCapOption}
        selectedWithCapWithoutCapOption={selectedWithCapWithoutCapOption}
        setSelectedWithCapWithoutCapOption={setSelectedWithCapWithoutCapOption}
        fittingPieceOption={fittingPieceOption}
        setFittingPieceOption={setFittingPieceOption}
        selectedFittingPieceOption={selectedFittingPieceOption}
        setSelectedFittingPieceOption={setSelectedFittingPieceOption}
        skiveTypeOption={skiveTypeOption}
        setSkiveTypeOption={setSkiveTypeOption}
        selectedSkiveTypeOption={selectedSkiveTypeOption}
        setSelectedSkiveTypeOption={setSelectedSkiveTypeOption}
        HoseDashSizeOption={HoseDashSizeOption}
        setHoseDashSizeOption={setHoseDashSizeOption}
        selectedhoseDashSizeOption={selectedhoseDashSizeOption}
        setSelectedHoseDashSizeOption={setSelectedHoseDashSizeOption}
        fittingDashSizeOption={fittingDashSizeOption}
        setfittingDashSizeOption={setfittingDashSizeOption}
        selectedFittingDashSizeOption={selectedFittingDashSizeOption}
        setSelectedfittingDashSizeOption={setSelectedfittingDashSizeOption}
        fittingThreadOption={fittingThreadOption}
        setfittingThreadOption={setfittingThreadOption}
        selectedFittingThreadOption={selectedFittingThreadOption}
        setSelectedFittingThreadOption={setSelectedFittingThreadOption}
        fittingTypeOption={fittingTypeOption}
        setfittingTypeOption={setfittingTypeOption}
        selectedFittingTypeOption={selectedFittingTypeOption}
        setSelectedFittingTypeOption={setSelectedFittingTypeOption}
        straightBendangleOption={straightBendangleOption}
        setStraightBendangleOption={setStraightBendangleOption}
        selectedStraightBendangleOption={selectedStraightBendangleOption}
        setSelectedStraightBendangleOption={setSelectedStraightBendangleOption}
        dropLengthOption={dropLengthOption}
        setDropLengthOption={setDropLengthOption}
        selectedDropLengthOption={selectedDropLengthOption}
        setSelectedDropLengthOption={setSelectedDropLengthOption}
        neckLengthOption={neckLengthOption}
        setNeckLengthOption={setNeckLengthOption}
        selectedNeckLengthOption={selectedNeckLengthOption}
        setselectedNeckLengthOption={setselectedNeckLengthOption}
        />;

      case "Hose Pipe":
        return <HosPipeSection 
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        />;

      case "Hose Assembly":
        return <HoseAssemblySection 
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        />;

      case "Spring":
        return <SpringSection 
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        springTypeOption={springTypeOption}
        setSpringTypeOption={setSpringTypeOption}
        selectedSpringTypeOption={selectedSpringTypeOption}
        setSelectedSpringTypeOption={setSelectedSpringTypeOption}
        />;

      case "O-ring":
        return <O_ringSection 
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        />;

      case "Dust Cap":
        return <DustCapSection 
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        maleFemaleOption={maleFemaleOption} 
        setmaleFemaleOption={setmaleFemaleOption}
        selectedMaleFemaleOption={selectedMaleFemaleOption} 
        setSelectedMaleFemaleOption={setSelectedMaleFemaleOption}
        />;

      case "Sleeve":
        return <SleeveSection 
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        />;

      case "Vinyl Cover":
        return <VinylCoverSection 
        formData={formData}
        setFormData={setFormData}
        errors={errors}/>;

      case "Packing":
        return <PackingSection 
        formData={formData}
        setFormData={setFormData}
        errors={errors}/>;

      case "Tube Fittings":
        return <TubeFittingsSection 
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        />;
      default:
        return null;
    }
  };

  const handleProductDropChange=(option)=>{
    setSelectedProductTypeOption(option);
    setFormData({product_type:option.value});

    setSelectedWireTypeOption(null);
    setSelectedWithCapWithoutCapOption(null);
    setSelectedFittingPieceOption(null);
    setSelectedSkiveTypeOption(null);
    setSelectedHoseDashSizeOption(null);
    setSelectedfittingDashSizeOption(null);
    setSelectedFittingTypeOption(null);
    setSelectedFittingThreadOption(null);
    setSelectedStraightBendangleOption(null);
    setSelectedDropLengthOption(null);
    setselectedNeckLengthOption(null); 
    setSelectedSpringTypeOption(null);
    setSelectedMaleFemaleOption(null);
    
    setErrors({});
  }

  return (
    <>
      <ToastContainer />
      <Loader visible={loading} />
      <PageTitle activeMenu={"Add New Product"} motherMenu={"Home"} motherMenuLink={'/dashboard'}/>

            <div className="row">
      <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Product</h4>
            </div>
            <div className="card-body">
              <div>
                <div className="mb-3 row">
                <div className="col-sm-6">
                  <label className="col-form-label">Product</label>
                  <Select
                    value={selectedProductTypeOption}
                    onChange={handleProductDropChange}
                    defaultValue={selectedProductTypeOption}
                    options={productTypeOption}
                  />
                  {errors.product_type && (
                    <span className="text-danger fs-12">{errors.product_type}</span>
                  )}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
       renderComponent()
      }
           
      <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Basic Info</h4>
            </div>
            <div className="card-body">
              <div>
                <div className="mb-3 row">
                  <div className="col-sm-6 col-xl-4">
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

                  <div className="col-sm-6 col-xl-4">
                    <label className="col-sm-3 col-form-label">Mfc</label>
                    <input
                      name="mfc"
                      value={formData.mfc}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.mfc && (
                      <span className="text-danger fs-12">{errors.mfc}</span>
                    )}
                  </div>

                  {/* <div className="col-sm-6 col-xl-4">
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

                  <div className="col-sm-6 col-xl-4">
                    <label className="col-form-label">Product Type</label>
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
                  </div> */}
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

        <div className="col-xl-9 col-lg-9">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Gallery</h4>
            </div>
            <div className="card-body d-flex gap-3" >
              <div className="row"
                style={{ gap: "10px", display: "flex", flexWrap: "wrap" }}>
                {galleryImages?.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      width: "150px",
                      height: "150px",
                      padding: "6px",
                      border: "solid #cbcbcb 1px",
                      borderStyle: "dashed",
                      borderRadius:'10px'
                    }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        backgroundColor: "rgba(255, 0, 0, 0.6)",
                        borderRadius: "50%",
                        cursor: "pointer",
                        padding: "3px 6px",
                        color: "white",
                        fontSize: "12px",
                      }}
                      onClick={() => handleDeleteImage(index)}>
                      ⛌
                    </div>
                    <img
                      src={image.url}
                      alt={`Product ${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="d-flex flex-column align-items-center">
                <div style={styles.container}>
                  <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleGalleryChange}
                    />
                    <label htmlFor="imageUpload" style={styles.placeholder}>
                      <div style={styles.uploadIcon} className="flex flex-col cursor-pointer">
                        <img width="30" src={uplodIcon} alt="Upload Icon"></img>
                        <p>Upload Gallery Image</p>
                      </div>
                    </label>
                  </label>
                </div>
                <p className="mt-2">
                  Image format - jpg png jpeg gif
                  <br />
                  Image Size - maximum size 2 MB
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>  
       
      <div className="row">
        {/* SECTION 1ST */}
      
  

        {/* SECTION Category Infoo*/}
        {/* <div className="col-xl-12 col-lg-12">
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
                        category_id:option.value,
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
                      subcategory_id:option.value,
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
                       subsubcategory_id:option.value,
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
        </div> */}

        {/* SECTION 3RD Restaurants & Category Infoo*/}
        {/* <div className="col-xl-12 col-lg-12">
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
                        brand:option.value,
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
                       variant:option.value,
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
                       fittingSize:option.value,
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
                      thread_type:option.value,
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
                      material:option.value,
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
        </div> */}

        {/* <div className="col-xl-12 col-lg-12">
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
        </div> */}

        {/* SECTION 5th Price Information*/}
        {/* <div className="col-xl-12 col-lg-12">
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
              </div>
            </div>
          </div>
        </div> */}
        

  

        {/* Section Submit button */}
        <div className="text-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary rounded-sm">
            Save Information
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
