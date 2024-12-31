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
import { getAllOptions } from "../../../services/apis/options";



const AddProduct = () => {
  const navigate = useNavigate();
  const [dropdownOptions, setDropwonOptions] = useState();
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);
  //drop option list
  const [productTypeOption, setProductTypeOption] = useState(dropdownOptions?.ProductOptions);
  const [categoryOption, setCategoryOption] = useState(null);
  const [subCategoryOption, setSubCategoryOption] = useState(null);
  const [subSubCategoryOption, setSubSubCategoryOption] = useState(null);
  const [brandOption, setBrandOption] = useState(null);
  const [fittingSizeOption, setfittingSizeOption] = useState(null);
  const [materialOption, setmaterialOption] = useState(null);
  const [variantOption, setVariantOption] = useState(dropdownOptions?.variantsOption);
  const [threadtypeOption, setThreadtypeOption] = useState(null);
  const [partOption, setPartOption] = useState(null);
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
  const [selectedPartOption, setSelectedPartOption] = useState(null);
  const [selectpipeODOption, setSelectpipeODOption] = useState(null);
  const [selectedmetricTypeOptions, setSelectedmetricTypeOptions] = useState(null);
  // Child Form  

  const [wireTypeOption, setWireTypeOption] = useState(dropdownOptions?.WireTypeOptions);
  const [withCapWithoutCapOption, setWithCapWithoutCapOption] = useState(dropdownOptions?.CapWithoutCapOptions);
  const [fittingPieceOption, setFittingPieceOption] = useState(dropdownOptions?.fittingPieceOptions);
  const [skiveTypeOption, setSkiveTypeOption] = useState(dropdownOptions?.skiveTypeOptions);
  const [HoseDashSizeOption, setHoseDashSizeOption] = useState(dropdownOptions?.hoseDashSizeOptions);
  const [fittingDashSizeOption, setfittingDashSizeOption] = useState(dropdownOptions?.fittingDashSizeOptions);
  const [fittingThreadOption, setfittingThreadOption] = useState(dropdownOptions?.fittingThreadOptions);
  const [fittingTypeOption, setfittingTypeOption] = useState(dropdownOptions?.fittingTypeOptions);
  const [straightBendangleOption, setStraightBendangleOption] = useState(dropdownOptions?.straightBendangleOptions);
  const [dropLengthOption, setDropLengthOption] = useState(dropdownOptions?.dropLengthOptions);
  const [neckLengthOption, setNeckLengthOption] = useState(dropdownOptions?.dropLengthOptions);
  const [pipeODOption, setpipeODOption] = useState(dropdownOptions?.pipeODOptions);
  const [matricTypeOption, setMatricTypeOption] = useState(dropdownOptions?.metricTypeOptions);

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
  const [springTypeOption, setSpringTypeOption] = useState(null);
  const [selectedSpringTypeOption, setSelectedSpringTypeOption] = useState(null);
  const [maleFemaleOption, setmaleFemaleOption] = useState(null);
  const [selectedMaleFemaleOption, setSelectedMaleFemaleOption] = useState(null);
  const [formData, setFormData] = useState({
    product_type: "",
    // with_cap:[]
  });
  const [fittingCode, setFittingCode] = useState();
  const [descCode, setDescCode] = useState();
  console.log(formData, "formData is here")
  
  const filterFittingDashSizeOptions = () => {
    // Basic filtering based on fitting_thread
    const filteredOptions = dropdownOptions?.fittingDashSizeOptions?.filter((option) => {
      return (
        option.thread_type === formData?.fitting_thread && // Match the selected fitting_thread
        option.thread !== null // Exclude options with null threads
      );
    });



    if (formData?.fitting_thread === "METRIC") {

      const selectedMetricType = formData?.metric_type;
      const normalizedMetricType = selectedMetricType === "Light With O" ? "Light" : selectedMetricType === "Heavy With O" ? "Heavy" : selectedMetricType;


      const metricFilteredOptions = dropdownOptions?.fittingDashSizeOptions.filter((option) => {
        // console.log("-=-=-=-=-=-=-", option, option.metric_type, formData?.metric_type, option.pipe_od, formData?.pipeOD)
        return (
          option.metric_type === normalizedMetricType && // Match the selected metric_type
          option.pipe_od === formData?.pipeOD // Match the selected pipe_od
        );

      });
      // console.log("-=-=-=-=-=-=-", metricFilteredOptions)

      // If no matching options, return an empty array
      if (metricFilteredOptions.length === 0) {
        return [{ value: "Invalid", label: "Invalid" }];
      }
      // Map the filtered options to the desired format
      return metricFilteredOptions.map((option) => ({
        value: `${option.thread} (${option.dash})`,
        label: `${option.thread} (${option.dash})`,
        code: `${option.dash}`,
        dsc_code: `${option.dsc_code}`
      }));
    }

    // Special case for "upper join" and "lower join" - bind values without join
    if (formData?.variant && ["Standard", "Upper Jump", "Lower Jump"].includes(formData?.variant)) {
      const variantOptions = dropdownOptions?.fittingDashSizeOptions.filter(
        (option) =>
          option.thread_type === formData?.fitting_thread &&
          option.variant === formData?.variant &&
          option.thread !== null // Exclude options with null threads
      );

      // Return the options for the selected variant
      if (variantOptions.length > 0) {
        return variantOptions?.map((option) => ({
          value: `${option.thread} (${option.dash})`,
          label: `${option.thread} (${option.dash})`,
          code: `${option.dash}`,
          dsc_code: `${option.dsc_code}`
        }));
      }
    }

    // Map the filtered options to the desired format
    return filteredOptions?.map((option) => ({
      value: `${option.thread} (${option.dash})`,
      label: `${option.thread} (${option.dash})`,
      code: `${option.dash}`,
      dsc_code: `${option.dsc_code}`
    }));
  };
  const filterFittingTypeOptions = () => {
    console.log(dropdownOptions?.fittingTypeOptions)
    const fittingTypeOptions = dropdownOptions?.fittingTypeOptions.filter((option) => {
      return (
       option?.fitting_thread?.startsWith("SAE") === formData?.fitting_thread?.startsWith("SAE") 
       );

     });
     // Map the filtered options to the desired format
     return fittingTypeOptions.map((option) => ({
          value: `${option.value}`,
         label: `${option.label}`,
         code: `${option.code}`,
         dsc_code: `${option.dsc_code}`,
     }));
  }
  // Effect to dynamically set fittingTypeOption
  useEffect(() => {
    // Check if required fields are provided
    if (formData.fitting_thread === "SAE 61" || formData.fitting_thread === "SAE 62") {

      // Call the filtering function
      const filteredOptions = filterFittingTypeOptions();
      if (filteredOptions.length > 0) {

        setfittingTypeOption(filteredOptions);
       
      }
    }
  }, [formData?.fitting_thread]);

  useEffect(() => {
    const fitting_Code = `${formData?.design || ''}${selectedWireTypeOption?.code || ''}${selectedFittingPieceOption?.code ? selectedFittingPieceOption?.code + '-' : ''}${selectedSkiveTypeOption?.code ? selectedSkiveTypeOption?.code + '-' : ''}${selectedhoseDashSizeOption?.code || ''}${selectedFittingDashSizeOption?.code ? selectedFittingDashSizeOption?.code + '-' : ''}${selectedFittingThreadOption?.code ? selectedFittingThreadOption?.code + '-' : ''}${selectedFittingTypeOption?.code || ''}${selectedStraightBendangleOption?.code || ''}`;

    setFittingCode(fitting_Code);

    const desc_Code = `${selectedWireTypeOption?.dsc_code ? selectedWireTypeOption?.dsc_code + '-' : ''}${selectedFittingThreadOption?.dsc_code || ''} ${selectedhoseDashSizeOption?.dsc_code ? selectedhoseDashSizeOption?.dsc_code + 'X' : ''}${selectedFittingDashSizeOption?.dsc_code || ''} ${(selectedFittingTypeOption?.dsc_code || '').toUpperCase()} ${(selectedStraightBendangleOption?.dsc_code || '').toUpperCase()} ${(selectedSkiveTypeOption?.dsc_code || '').toUpperCase()}`.trim();

    setDescCode(desc_Code);
    setFormData((prevData) => ({
      ...prevData,
      desc_Code: desc_Code, // Clear variant value in formData
      fitting_Code: fitting_Code // Clear fitting_dash_size value in formData
    }));

  }, [
    formData?.design,
    selectedWireTypeOption,
    selectedFittingPieceOption,
    selectedSkiveTypeOption,
    selectedFittingThreadOption,
    selectedhoseDashSizeOption,
    selectedvariantOption,
    selectedFittingDashSizeOption,
    selectedFittingTypeOption,
    selectedStraightBendangleOption
  ])

  useEffect(() => {
    // Check if required fields are provided
    if (formData?.fitting_thread && formData?.pipeOD && formData?.metric_type) {
      // Call the filtering function
      const filteredOptions = filterFittingDashSizeOptions();
      if (filteredOptions.length > 0) {
        // Update the selected fitting dash size option
        setSelectedfittingDashSizeOption(filteredOptions[0]);
        
        // selectedpipeODOption
        // Update formData with the selected option's dash
        // setFormData({
        //   ...formData,
        //   fitting_dash_size: filteredOptions[0].value.split("(")[1]?.replace(")", ""),
        // });
      }
    }
  }, [formData?.fitting_thread, formData?.pipeOD, formData?.metric_type]);

  useEffect(() => {
    // When fittingThreadOption is selected, reset variant and fitting_dash size inputs
    if (selectpipeODOption) {
      setFormData((prevData) => ({
        ...prevData,
        metric_type: "", // Clear variant value in formData
        fitting_dash_size: "", // Clear fitting_dash_size value in formData
      }));
      setSelectedmetricTypeOptions(null); // Clear variant option
      setSelectedfittingDashSizeOption(null); // Clear fitting_dash size option
    }
  }, [selectpipeODOption]);


  useEffect(() => {
    // Check if both values are provided
    if (formData?.fitting_thread && formData?.variant) {
      const filteredOptions = filterFittingDashSizeOptions();
      if (filteredOptions.length > 0) {
        setSelectedfittingDashSizeOption(filteredOptions[0]);
        setFormData({
          ...formData,
          fitting_dash_size: filteredOptions[0].value,
        });

      }
    }
  }, [formData?.fitting_thread, formData?.variant,]);

  useEffect(() => {
    // When fittingThreadOption is selected, reset variant and fitting_dash size inputs
    if (selectedFittingThreadOption) {
      setFormData((prevData) => ({
        ...prevData,
        variant: "", // Clear variant value in formData
        fitting_dash_size: "", // Clear fitting_dash_size value in formData
        fitting_type: "",
        OD: "",
        pipeOD: ""
      }));
      setSelectedvariantOption(null); // Clear variant option
      setSelectedfittingDashSizeOption(null); // Clear fitting_dash size option
      setSelectedFittingTypeOption(null);
      setSelectpipeODOption(null)
      
    }
  }, [selectedFittingThreadOption]); // Trigger this whenever fitting thread is selected


  const resetEndFittingForm = () => {
    setFormData({
      design: "",
      wire_type: "",
      with_cap: [],
      fitting_piece: "",
      skive_type: "",
      variant: "",
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
      gallery: [...(prevData.gallery || []), ...newImages?.map(image => image.file)],
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

  const validateForm = () => {
    const newErrors = {};
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
    if (!formData.price) newErrors.price = "Price is required."
    else if (formData.price && isNaN(formData.price))
      newErrors.price = "Price must be a numeric value.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFormComponent(formData);
    setErrors(validationErrors);

    // console.log("formData formData formData formData formData formData",formData)
    // const form = new FormData();

    // for (const key in formData) {
    //   if (key !== 'image' && key !== 'gallery' && formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
    //     form.append(key, formData[key]);
    //   }
    // }

   
    // if (formData.image) {
    //   form.append("image", formData.image);
    // }

    // formData?.gallery?.forEach((file) => {
    //   form.append("gallery", file);
    // });
    // Object.keys(validationErrors).length === 0

//      console.log("form form form form formData formData",form)
//     // To log all FormData contents
// console.log("FormData contents:");
// for (const [key, value] of form.entries()) {
//   console.log(`${key}: ${value}`);
// }

    if (formData) {
      try {
        const res = await addProductApi(formData);
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

  const handleDeleteLogo = () => {
    setLogo(null);
    document.getElementById("logoUpload").value = "";
  };

  const fetchAllOptions = async () => {
    setLoading(true);
    try {
      const res = await getAllOptions();
      setDropwonOptions(res?.data?.data)
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllOptions()
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

  console.log(formData)

  const renderComponent = () => {
    switch (formData.product_type) {
      case "End Fittings":
        return <EndFittingForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          //code prefilled
          fittingCode={fittingCode}
          descCode={descCode}
          //variant
          variantOption={dropdownOptions?.variantsOption}
          setVariantOption={setVariantOption}
          selectedvariantOption={selectedvariantOption}
          setSelectedvariantOption={setSelectedvariantOption}
          //Fitting Dash Size  input 
          // fittingDashSizeOption={fittingDashSizeOption}
          fittingDashSizeOption={filterFittingDashSizeOptions()}
          setfittingDashSizeOption={setfittingDashSizeOption}
          selectedFittingDashSizeOption={selectedFittingDashSizeOption}
          setSelectedfittingDashSizeOption={setSelectedfittingDashSizeOption}
          ///pipe OD options
          pipeODOption={dropdownOptions?.pipeODOptions}
          setpipeODOption={setpipeODOption}
          selectedpipeODOption={selectpipeODOption}
          setSelectpipeODOption={setSelectpipeODOption}
          //metricType
          matricTypeOption={dropdownOptions?.metricTypeOptions}
          setMatricTypeOption={setMatricTypeOption}
          selectedmetricTypeOptions={selectedmetricTypeOptions}
          setSelectedmetricTypeOptions={setSelectedmetricTypeOptions}
          //wire type option
          wireTypeOption={dropdownOptions?.WireTypeOptions}
          setWireTypeOption={setWireTypeOption}
          selectedWireTypeOption={selectedWireTypeOption}
          setSelectedWireTypeOption={setSelectedWireTypeOption}
          //with and without cap option
          withCapWithoutCapOption={dropdownOptions?.CapWithoutCapOptions}
          setWithCapWithoutCapOption={setWithCapWithoutCapOption}
          selectedWithCapWithoutCapOption={selectedWithCapWithoutCapOption}
          setSelectedWithCapWithoutCapOption={setSelectedWithCapWithoutCapOption}
          //fitting piece
          fittingPieceOption={dropdownOptions?.fittingPieceOptions}
          setFittingPieceOption={setFittingPieceOption}
          selectedFittingPieceOption={selectedFittingPieceOption}
          setSelectedFittingPieceOption={setSelectedFittingPieceOption}
          //skive type 
          skiveTypeOption={dropdownOptions?.skiveTypeOptions}
          setSkiveTypeOption={setSkiveTypeOption}
          selectedSkiveTypeOption={selectedSkiveTypeOption}
          setSelectedSkiveTypeOption={setSelectedSkiveTypeOption}
          //hose dash size
          HoseDashSizeOption={dropdownOptions?.hoseDashSizeOptions}
          setHoseDashSizeOption={setHoseDashSizeOption}
          selectedhoseDashSizeOption={selectedhoseDashSizeOption}
          setSelectedHoseDashSizeOption={setSelectedHoseDashSizeOption}

          //fitting thread
          fittingThreadOption={dropdownOptions?.fittingThreadOptions}
          setfittingThreadOption={setfittingThreadOption}
          selectedFittingThreadOption={selectedFittingThreadOption}
          setSelectedFittingThreadOption={setSelectedFittingThreadOption}
          //fitting type
          fittingTypeOption={filterFittingTypeOptions()}
          setfittingTypeOption={setfittingTypeOption}
          selectedFittingTypeOption={selectedFittingTypeOption}
          setSelectedFittingTypeOption={setSelectedFittingTypeOption}
          //steight and bend
          straightBendangleOption={dropdownOptions?.straightBendangleOptions}
          setStraightBendangleOption={setStraightBendangleOption}
          selectedStraightBendangleOption={selectedStraightBendangleOption}
          setSelectedStraightBendangleOption={setSelectedStraightBendangleOption}
          //drop
          dropLengthOption={dropdownOptions?.dropLengthOptions}
          setDropLengthOption={setDropLengthOption}
          selectedDropLengthOption={selectedDropLengthOption}
          setSelectedDropLengthOption={setSelectedDropLengthOption}
          //neck
          neckLengthOption={dropdownOptions?.neckLengthOptions}
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
          errors={errors} />;

      case "Packing":
        return <PackingSection
          formData={formData}
          setFormData={setFormData}
          errors={errors} />;

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

  const handleProductDropChange = (option) => {
    setSelectedProductTypeOption(option);
    setFormData({ product_type: option.value });

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
      <PageTitle activeMenu={"Add Product"} motherMenu={"Home"} motherMenuLink={'/dashboard'} />
      {/* Product Options*/}
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
                      options={dropdownOptions?.ProductOptions}
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
      {/* Dynamic Form*/}
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
                {/* <div className="col-sm-6 col-xl-4">
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
                </div> */}

                <div className="col-sm-6 col-xl-4">
                  <label className="col-sm-3 col-form-label">MFC</label>
                  <input
                    name="mfc"
                    value={formData.mfc}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ex: 101"
                  />
                  {errors.mfc && (
                    <span className="text-danger fs-12">{errors.mfc}</span>
                  )}
                </div>

                {
                  formData?.product_type === 'End Fittings' && (
                    <>
                      <div className="col-sm-6 col-xl-4">
                        <label className="col-sm-3 col-form-label">Fitting Code</label>
                        <input
                          name="fitting_code"
                          value={fittingCode}
                          // onChange={handleChange}
                          type="text"
                          className="form-control"
                          placeholder="Ex: RB1-NS-0404-B-FS"
                          disabled
                        />
                        {errors.fitting_code && (
                          <span className="text-danger fs-12">{errors.fitting_code}</span>
                        )}
                      </div>
                      <div className="col-sm-6 col-xl-4">
                        <label className="col-sm-3 col-form-label">Description</label>
                        <input
                          name="desc_code"
                          value={descCode}
                          // onChange={handleChange}
                          type="text"
                          className="form-control"
                          placeholder="Ex: BR-BSP 1/4x1/4 FEMALE STRAIGHT (NON-SKIVE)"
                          disabled
                        />
                        {errors.desc_code && (
                          <span className="text-danger fs-12">{errors.desc_code}</span>
                        )}
                      </div>
                      {/* <div className="col-sm-6 col-xl-4">
                        <label className="col-sm-3 col-form-label">Description</label>
                        <input
                          name="description_code"
                          value={descCode}
                          // onChange={handleChange}
                          type="text"
                          className="form-control"
                          placeholder="Ex: BR-BSP 1/4x1/4 FEMALE STRAIGHT (NON-SKIVE)"
                          disabled
                        />
                        {errors.description_code && (
                          <span className="text-danger fs-12">{errors.description_code}</span>
                        )}
                      </div> */}
                    </>

                  )
                }



              </div>
              <div className="mb-3 row">
                <div className="col-sm-8">
                  <label className="col-sm-3 col-form-label">
                    Note
                  </label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="6"
                    id="comment"
                    placeholder="Ex: (Optional) If any note write down here."
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

      {/* SECTION 3RD Image & Gallery*/}
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
        {/* Gallery*/}
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
                      borderRadius: '10px'
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
      {/* Section Submit button */}
      <div className="row">

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
