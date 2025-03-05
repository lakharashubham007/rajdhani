import React, { useEffect, useState } from "react";
import { DatePicker } from "rsuite";
import Select from "react-select";
import PageTitle from "../../layouts/PageTitle";
import {
  getAllCategoriesListApi,
  getAllSubCategoriesListApi,
  getAllSubSubCategoriesListApi,
} from "../../../services/apis/CategoryApi";
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
import HosPipeSection from "../../components/ProductTypeForms/HosPipe";
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
import Nut from "../../components/ProductTypeForms/Nut";
import Nipple from "../../components/ProductTypeForms/Nipple";
import Cap from "../../components/ProductTypeForms/Cap";
import HosePipe from "../../components/ProductTypeForms/HosPipe";
import { getAllDesignApi } from "../../../services/apis/Design";
import { getAllFittingThreadApi } from "../../../services/apis/FittingThreads";
import { getAllHoseDashSizeApi } from "../../../services/apis/HoseDashSize";
import { getAllFittingDashSizeApi } from "../../../services/apis/FittingDashSize";
import { getAllBendAngleApi } from "../../../services/apis/BendAngle";
import { getAllBrandLayLineApi } from "../../../services/apis/BrandLayLine";
import { getAllHoseTypeApi } from "../../../services/apis/HoseType";

const gstOption = [
  // { value: '', label: 'Select GST Rate' },
  { value: "0", label: "0%" },
  { value: "5", label: "5%" },
  { value: "12", label: "12%" },
  { value: "18", label: "18%" },
  { value: "28", label: "28%" },
];

const uomOptions = [
  { value: "pcs", label: "Pieces (pcs)" },
  { value: "inch", label: "Inches (inch)" },
  { value: "meter", label: "Meters (m)" },
  { value: "pairs", label: "Pairs" },
  { value: "Numbers", label: "NOS" },
  { value: "set", label: "Sets" },
];

const AddProduct = () => {
  const navigate = useNavigate();
  const [dropdownOptions, setDropwonOptions] = useState();
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [galleryImages, setGalleryImages] = useState([]);
  //drop option list
  const [productTypeOption, setProductTypeOption] = useState(
    dropdownOptions?.ProductOptions
  );
  const [categoryOption, setCategoryOption] = useState(null);
  const [subCategoryOption, setSubCategoryOption] = useState(null);
  const [subSubCategoryOption, setSubSubCategoryOption] = useState(null);
  const [brandOption, setBrandOption] = useState(null);
  const [fittingSizeOption, setfittingSizeOption] = useState(null);
  const [materialOption, setmaterialOption] = useState(null);
  const [variantOption, setVariantOption] = useState(
    dropdownOptions?.variantsOption
  );
  const [threadtypeOption, setThreadtypeOption] = useState(null);
  const [partOption, setPartOption] = useState(null);
  // selected
  const [selectedProductTypeOption, setSelectedProductTypeOption] =useState(null);
  const [selectedPartsOption, setSelectedPartsOption] = useState({
    value: "None",
    label: "None",
  });
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
  const [selectedSubCategoryOption, setSelectedSubCategoryOption] =useState(null);
  const [selectedSubSubCategoryOption, setSelectedSubSubCategoryOption] =useState(null);
  const [selectedBrandOption, setSelectedBrandOption] = useState(null);
  const [selectedfittingSizeOption, setSelectedfittingSizeOption] = useState(null);
  const [selectedmaterialOption, setSelectedmaterialOption] = useState(null);
  const [selectedvariantOption, setSelectedvariantOption] = useState(null);
  const [selectedThreadtypeOption, setSelectedThreadtypeOption] = useState(null);
  const [selectedPartOption, setSelectedPartOption] = useState(null);
  const [selectpipeODOption, setSelectpipeODOption] = useState(null);
  const [selectedmetricTypeOptions, setSelectedmetricTypeOptions] = useState(null);
  const [selectedDesignOption, setSelectedDesignOption] = useState(null);
  const [selectedUOMOption, setSelectedUOMOption] = useState(null);
  const [selectedGSTOption, setSelectedGSTOption] = useState(null);
  // Child Form

  const [wireTypeOption, setWireTypeOption] = useState(dropdownOptions?.WireTypeOptions);
  const [withCapWithoutCapOption, setWithCapWithoutCapOption] = useState(dropdownOptions?.CapWithoutCapOptions);
  const [fittingPieceOption, setFittingPieceOption] = useState(dropdownOptions?.fittingPieceOptions);
  const [skiveTypeOption, setSkiveTypeOption] = useState(dropdownOptions?.skiveTypeOptions);
  const [HoseDashSizeOption, setHoseDashSizeOption] = useState(null);
  const [fittingDashSizeOption, setfittingDashSizeOption] = useState(null);
  const [fittingThreadOption, setfittingThreadOption] = useState(null);
  const [fittingTypeOption, setfittingTypeOption] = useState(dropdownOptions?.fittingTypeOptions);
  const [straightBendangleOption, setStraightBendangleOption] = useState(null);
  const [dropLengthOption, setDropLengthOption] = useState(dropdownOptions?.dropLengthOptions);
  const [neckLengthOption, setNeckLengthOption] = useState(dropdownOptions?.dropLengthOptions);
  const [pipeODOption, setpipeODOption] = useState(dropdownOptions?.pipeODOptions);
  const [matricTypeOption, setMatricTypeOption] = useState(dropdownOptions?.metricTypeOptions);
  const [designOption, setDesignOption] = useState([]);
  const [brandLayLineOption,setBrandLayLineOption]=useState(null);
  const [hoseTypeOption,setHoseTypeOption]=useState(null);
  
  // selected
  const [selectedWireTypeOption, setSelectedWireTypeOption] = useState(null);
  const [selectedWithCapWithoutCapOption, setSelectedWithCapWithoutCapOption] =useState(null);
  const [selectedFittingPieceOption, setSelectedFittingPieceOption] =useState(null);
  const [selectedSkiveTypeOption, setSelectedSkiveTypeOption] = useState(null);
  const [selectedhoseDashSizeOption, setSelectedHoseDashSizeOption] =useState(null);
  console.log("selectedhoseDashSizeOption",selectedhoseDashSizeOption)
  const [selectedFittingDashSizeOption, setSelectedfittingDashSizeOption] = useState(null);
  console.log("selectedFittingDashSizeOption",selectedFittingDashSizeOption)
  const [selectedFittingTypeOption, setSelectedFittingTypeOption] =useState(null);
  const [selectedFittingThreadOption, setSelectedFittingThreadOption] =useState(null);
  console.log("selectedFittingThreadOption",selectedFittingThreadOption)
  const [selectedStraightBendangleOption, setSelectedStraightBendangleOption] =useState(null);
  const [selectedDropLengthOption, setSelectedDropLengthOption] = useState(null);
  const [selectedNeckLengthOption, setselectedNeckLengthOption] = useState(null);
  const [springTypeOption, setSpringTypeOption] = useState(null);
  const [selectedSpringTypeOption, setSelectedSpringTypeOption] = useState(null);
  const [maleFemaleOption, setmaleFemaleOption] = useState(null);
  const [selectedMaleFemaleOption, setSelectedMaleFemaleOption] = useState(null);
  //Hose Pipe
  const [selectedHosePipeMFCOption, setSelectedHosePipeMFCOption] = useState(null);
  const [selectedBrandLayLineOption, setSelectedBrandLayLineOption] = useState(null);
  const [selectedHoseTypeOption, setSelectedHoseTypeOption] = useState(null);

  const [formData, setFormData] = useState({
    product_type: "",
    // with_cap:[]
  });
  console.log(formData,"formData is here")
  //code setup variables
  const [fittingCode, setFittingCode] = useState();
  const [descCode, setDescCode] = useState();
  const [capFittingCode, setCapFittingCode] = useState();
  const [capDescCode, setCapDescCode] = useState();
  const [nutFittingCode, setNutFittingCode] = useState();
  const [nutDescCode, setNutDescCode] = useState();
  const [nippleFittingCode, setNippleFittingCode] = useState();
  const [nippleDescCode, setNippleDescCode] = useState();
  // console.log(formData, "formData is here");


  const fetchDesignOptions = async () => {
    setLoading(true);
    try {
      const res = await getAllDesignApi();
      const resData = res?.data?.designs;
      const mappedData = resData?.map((val) => ({
        label: val?.name,
        value: val?.name,
      }));
      setDesignOption(mappedData)
      // setfittingThreadOption(mappedData);
    } catch (error) {
      // console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFittingThreadOptions = async () => {
    setLoading(true);
    try {
      const res = await getAllFittingThreadApi();
      const resData = res?.data?.fittingThreads;
      const mappedData = resData?.map((val) => ({
        label: `${val?.name} (${val?.code})`,
        value: val?.name,
        code: val?.code,
        dsc_code: val?.dsc_code
      }));
      setfittingThreadOption(mappedData);
    } catch (error) {
      // console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load. Please try again.");
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
        code: val?.code,
        dsc_code: val?.dsc_code,
        dash: val?.dash_code
      }));
      setHoseDashSizeOption(mappedData);
    } catch (error) {
      // console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFittingDashSizeOptions = async () => {
    setLoading(true);
    try {
      const res = await getAllFittingDashSizeApi();
      const resData = res?.data?.fittingDashSizes;
     
      const mappedData = resData?.map((val) => ({
        label: `${val?.thread} (${val?.dash_code})`,
        // value: val?.dash_code,
        // code: val?.dash_code,
        dsc_code: val?.dsc_code,
        thread_type: val?.thread_type,
        thread: val?.thread,
        dash_code: val?.hose_dash_code,
        variant: val?.variant


      }));
      console.log("resData ----------------------)))",resData)
      setfittingDashSizeOption(mappedData)
      // setHoseDashSizeOption(mappedData);
    } catch (error) {
      // console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBendAngleOptions = async () => {
    setLoading(true);
    try {
      const res = await getAllBendAngleApi();
      const resData = res?.data?.bendAngles;
      const mappedData = resData?.map((val) => ({
        label: val?.name,
        value: val?.name,
        code: val?.code,
        dsc_code: val?.dsc_code
      }));
      setStraightBendangleOption(mappedData);
    } catch (error) {
      // console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchBrandLayLineOptions = async () => {
    setLoading(true);
    try {
      const res = await getAllBrandLayLineApi();
      const resData = res?.data?.brandLayLines;
      const mappedData = resData?.map((val) => ({
        label: val?.name,
        value: val?.name,
        code: val?.code,
        dsc_code: val?.dsc_code
      }));
      setBrandLayLineOption(mappedData);
    } catch (error) {
      // console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHoseTypeOptions = async () => {
    setLoading(true);
    try {
      const res = await getAllHoseTypeApi();
      const resData = res?.data?.hoseTypes;
      const mappedData = resData?.map((val) => ({
        label: val?.name,
        value: val?.name,
        code: val?.code,
        dsc_code: val?.dsc_code
      }));
      setHoseTypeOption(mappedData);
    } catch (error) {
      // console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchDesignOptions();
    fetchFittingThreadOptions();
    fetchHoseDashSizeOptions();
    fetchFittingDashSizeOptions();
    fetchBendAngleOptions();
    fetchBrandLayLineOptions();
    fetchHoseTypeOptions();
  },[]);
  
  console.log("fittingDashSizeOptionfittingDashSizeOptionfittingDashSizeOption",fittingDashSizeOption,formData?.fitting_thread)
  //Filter Fitting_Dash_Size_Options
  const filterFittingDashSizeOptions = () => {
    // Basic filtering based on fitting_thread
    const filteredOptions = fittingDashSizeOption.filter(
      (option) => {
        return (
          option.thread_type === formData?.fitting_thread && // Match the selected fitting_thread
          option.thread !== null // Exclude options with null threads
        );
      }
    );
  
    console.log("filteredOptions filteredOptions filteredOptions",filteredOptions)
    if (formData?.fitting_thread === "METRIC") {
      const selectedMetricType = formData?.metric_type;
      const normalizedMetricType =
        selectedMetricType === "Light With O"
          ? "Light"
          : selectedMetricType === "Heavy With O"
          ? "Heavy"
          : selectedMetricType;

      const metricFilteredOptions =
        dropdownOptions?.fittingDashSizeOptions.filter((option) => {
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
        dsc_code: `${option.dsc_code}`,
      }));
    }

    // // Special case for "upper join" and "lower join" - bind values without join
    // if (formData?.variant && ["Standard", "Upper Jump", "Lower Jump"].includes(formData?.variant)) {
    //   const variantOptions = dropdownOptions?.fittingDashSizeOptions.filter(
    //     (option) =>
    //       option.thread_type === formData?.fitting_thread &&
    //       option.variant === formData?.variant &&
    //       option.thread !== null // Exclude options with null threads
    //   );

    //   // Return the options for the selected variant
    //   if (variantOptions.length > 0) {
    //     return variantOptions?.map((option) => ({
    //       value: `${option.thread} (${option.dash})`,
    //       label: `${option.thread} (${option.dash})`,
    //       code: `${option.dash}`,
    //       dsc_code: `${option.dsc_code}`
    //     }));
    //   }
    // }

    const hoseDash = HoseDashSizeOption.filter(
      (option) => option?.value === formData?.hose_dash_size
    );

    console.log(" dropdownOptions?.hoseDashSizeOptions", HoseDashSizeOption,formData?.hose_dash_size,formData?.variant ,hoseDash[0]?.dash)

    if (formData?.variant === "Standard" && hoseDash[0]?.dash) {
      const filteredOption = dropdownOptions?.fittingDashSizeOptions.filter(
        (option) =>
          option.thread_type === formData?.fitting_thread &&
          option.dash === hoseDash[0]?.dash &&
          option.variant === formData?.variant
      );

      
   
      console.log(
        "filteredOption filteredOption filteredOption ",
        filteredOption
      );

      // If no matching options, return an empty array
      if (filteredOption.length === 0) {
        return [{ value: "Invalid", label: "Invalid" }];
      }

      if (filteredOption.length > 0) {
        return filteredOption?.map((option) => ({
          value: `${option.thread} (${option.dash})`,
          label: `${option.thread} (${option.dash})`,
          code: `${option.dash}`,
          dsc_code: `${option.dsc_code}`,
        }));
      }
      // const variantOptions = dropdownOptions?.fittingDashSizeOptions.filter(
      //   (option) =>
      //     option.thread_type === formData?.fitting_thread &&
      //     option.variant === formData?.variant &&
      //     option.thread !== null // Exclude options with null threads
      // );

      // // Return the options for the selected variant
      // if (variantOptions.length > 0) {
      //   return variantOptions?.map((option) => ({
      //     value: `${option.thread} (${option.dash})`,
      //     label: `${option.thread} (${option.dash})`,
      //     code: `${option.dash}`,
      //     dsc_code: `${option.dsc_code}`
      //   }));
      // }
    }

    // Map the filtered options to the desired format
    return filteredOptions?.map((option) => ({
      value: `${option.thread} (${option.dash_code})`,
      label: `${option.thread} (${option.dash_code})`,
      code: `${option.dash_code}`,
      dsc_code: `${option.dsc_code}`,
    }));
  };

  // Filter fittingTypeOption
  const filterFittingTypeOptions = () => {
    const fittingTypeOptions = dropdownOptions?.fittingTypeOptions.filter(
      (option) => {
        if (formData?.fitting_thread === "SAE 61") {
          // For SAE 61, include only "Flange"
          return (
            option?.value === "Flange" && option?.fitting_thread === "SAE 61"
          );
        }
        if (formData?.fitting_thread === "SAE 62") {
          // For SAE 62, include both "Flange" and "CAT Flange"
          return option?.fitting_thread === "SAE";
        }
        // Default case: include all matching `fitting_thread`
        return option?.fitting_thread === "normal";
      }
    );
    // Map the filtered options to the desired format
    return fittingTypeOptions.map((option) => ({
      value: `${option.value}`,
      label: `${option.label}`,
      code: `${option.code}`,
      dsc_code: `${option.dsc_code}`,
    }));
  };

  // Set Dynamically -> fittingTypeOption
  useEffect(() => {
    // Check if required fields are provided
    if (
      formData.fitting_thread === "SAE 61" ||
      formData.fitting_thread === "SAE 62"
    ) {
      // Call the filtering function
      const filteredOptions = filterFittingTypeOptions();
      if (filteredOptions.length > 0) {
        setfittingTypeOption(filteredOptions);
      }
    }
  }, [formData?.fitting_thread]);

  // Fitting Code and Description
  useEffect(() => {
    console.log("Fitting code =-=-=-=-=-=-=-=-=-=-",selectedhoseDashSizeOption?.code,selectedFittingDashSizeOption?.code,selectedFittingThreadOption?.code)
    const fitting_Code = `${formData?.design || ""}${
      selectedWireTypeOption?.code || ""
    }${
      selectedFittingPieceOption?.code
        ? selectedFittingPieceOption?.code + "-"
        : ""
    }${
      selectedSkiveTypeOption?.code ? selectedSkiveTypeOption?.code + "-" : ""
    }${selectedhoseDashSizeOption?.code || ""}${
      selectedFittingDashSizeOption?.code
        ? selectedFittingDashSizeOption?.code + "-"
        : ""
    }${
      selectedFittingThreadOption?.code
        ? selectedFittingThreadOption?.code + "-"
        : ""
    }${selectedFittingTypeOption?.code ? selectedFittingTypeOption?.code : ""}${
      selectedStraightBendangleOption?.code || ""
    }${formData?.drop_length ? `-${formData?.drop_length}` : ""}${
      selectedWithCapWithoutCapOption?.code
        ? "-" + selectedWithCapWithoutCapOption?.code
        : ""
    }`;

    // const fitting_Code = `${formData?.design || ''}${selectedWireTypeOption?.code || ''}${selectedFittingPieceOption?.code ? selectedFittingPieceOption?.code + '-' : ''}${selectedSkiveTypeOption?.code ? selectedSkiveTypeOption?.code + '-' : ''}${selectedhoseDashSizeOption?.code || ''}${selectedFittingDashSizeOption?.code ? selectedFittingDashSizeOption?.code + '-' : ''}${selectedFittingThreadOption?.code ? selectedFittingThreadOption?.code + '-' : ''}${selectedFittingTypeOption?.code || ''}${selectedStraightBendangleOption?.code || ''}${selectedWithCapWithoutCapOption?.code || ''}`;
    setFittingCode(fitting_Code);

    // const cap_fitting_code = `${}`

    const desc_Code = `${
      selectedWireTypeOption?.dsc_code ? selectedWireTypeOption?.dsc_code : ""
    }${
      selectedFittingThreadOption?.dsc_code
        ? " " + selectedFittingThreadOption?.dsc_code
        : ""
    } ${
      selectedhoseDashSizeOption?.dsc_code
        ? selectedhoseDashSizeOption?.dsc_code
        : ""
    }${
      selectedFittingDashSizeOption?.dsc_code
        ? "X" + selectedFittingDashSizeOption?.dsc_code
        : ""
    } ${(selectedFittingTypeOption?.dsc_code || "").toUpperCase()} ${(
      selectedStraightBendangleOption?.dsc_code || ""
    ).toUpperCase()} ${(
      selectedSkiveTypeOption?.dsc_code || ""
    ).toUpperCase()}${
      selectedFittingThreadOption?.dsc
        ? " " + selectedFittingThreadOption?.dsc
        : ""
    } ${formData?.drop_length ? `DL-${formData.drop_length}` : ""} ${
      selectedWithCapWithoutCapOption?.dsc_code || ""
    }${formData?.nut_hex ? +formData?.nut_hex + "X" : ""}${
      formData?.nut_length ? formData?.nut_length : ""
    }`.trim();

    setDescCode(desc_Code);
    setFormData((prevData) => ({
      ...prevData,
      desc_Code: desc_Code, // Clear variant value in formData
      fitting_Code: fitting_Code, // Clear fitting_dash_size value in formData
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
    selectedStraightBendangleOption,
    formData?.drop_length,
    formData?.ferrule,
  ]);

  

  //Parts fitting-code and Description
  useEffect(() => {
    //Nut fitting code and description
    if (formData?.part === "Nut") {
      const nut_fitting_code = `${"NUT-" + formData?.design || ""}${
        selectedFittingDashSizeOption?.code
          ? selectedFittingDashSizeOption?.code
          : ""
      }${
        selectedFittingThreadOption?.code
          ? "-" + selectedFittingThreadOption?.code + "-"
          : ""
      }${formData?.nut_hex ? +formData?.nut_hex + "X" : ""}${
        formData?.nut_length ? formData?.nut_length : ""
      }`;
      setNutFittingCode(nut_fitting_code);

      const desc_nut_Code = `${
        selectedFittingThreadOption?.dsc_code
          ? selectedFittingThreadOption?.dsc_code
          : ""
      }${
        selectedFittingDashSizeOption?.dsc_code
          ? " " + selectedFittingDashSizeOption?.dsc_code + " NUT"
          : ""
      }${formData?.nut_hex ? " (" + formData?.nut_hex + "X" : ""}${
        formData?.nut_length ? formData?.nut_length + ")" : ""
      }`;
      setNutDescCode(desc_nut_Code);

      setFormData((prevData) => ({
        ...prevData,
        desc_Code: desc_nut_Code, // Clear variant value in formData
        fitting_Code: nut_fitting_code, // Clear fitting_dash_size value in formData
      }));
    }

    //Nipple fitting code and description
    if (formData?.part === "Nipple") {
      const nipple_fitting_code = `${formData?.design || ""}${
        selectedWireTypeOption?.code || ""
      }${
        selectedSkiveTypeOption?.code ? "-" + selectedSkiveTypeOption?.code : ""
      }${
        selectedFittingThreadOption?.code
          ? "-" + selectedFittingThreadOption?.code + "-"
          : ""
      }${selectedhoseDashSizeOption ? selectedhoseDashSizeOption.code : ""}`;
      setNippleFittingCode(nipple_fitting_code);

      const desc_nipple_Code = `${
        selectedFittingThreadOption?.dsc_code
          ? selectedFittingThreadOption?.dsc_code + " "
          : ""
      }${
        selectedhoseDashSizeOption ? selectedhoseDashSizeOption.dsc_code : ""
      }${
        selectedWireTypeOption?.dsc_code
          ? " " + selectedWireTypeOption?.dsc_code
          : ""
      }${
        selectedSkiveTypeOption?.dsc_code
          ? " " + selectedSkiveTypeOption?.dsc_code
          : ""
      }`;
      setNippleDescCode(desc_nipple_Code);

      setFormData((prevData) => ({
        ...prevData,
        desc_Code: desc_nipple_Code, // Clear variant value in formData
        fitting_Code: nipple_fitting_code, // Clear fitting_dash_size value in formData
      }));
    }

    //cap fitting code and description
    if (formData?.part === "Cap") {
      const cap_fitting_code = `${"Cap " + formData?.design || ""}${
        selectedWireTypeOption?.code || ""
      }${
        formData?.cap_size
          ? "-" + (formData?.cap_size).split(" ").pop().replace(/[()]/g, "")
          : ""
      }${
        selectedSkiveTypeOption?.code
          ? "-" + selectedSkiveTypeOption?.code + "-"
          : ""
      }${formData?.od ? formData?.od : ""}${
        formData?.length ? "X" + formData?.length : ""
      }${formData?.big_bore ? "-" + formData?.big_bore + "B" : ""}${
        formData?.additional
          ? "-" + (formData?.additional).replace(/(\d+)\s*wire/i, "$1W")
          : ""
      }`;
      setCapFittingCode(cap_fitting_code);

      const desc_cap_Code = `${
        formData?.cap_size
          ? "Cap " + (formData?.cap_size).match(/^.*?(?=\s\()/)?.[0] + " "
          : ""
      }${formData?.od ? "(" + formData?.od : ""}${
        formData?.length ? "X" + formData?.length + ")" : ""
      }${
        selectedWireTypeOption?.dsc_code
          ? " " + selectedWireTypeOption?.dsc_code
          : ""
      }${
        selectedSkiveTypeOption?.dsc_code
          ? " " + selectedSkiveTypeOption?.dsc_code + " "
          : ""
      }${formData?.big_bore ? "BIGBORE-" + formData?.big_bore : ""}${
        formData?.additional ? " " + formData?.additional : ""
      }`;
      setCapDescCode(desc_cap_Code);

      setFormData((prevData) => ({
        ...prevData,
        desc_Code: desc_cap_Code, // Clear variant value in formData
        fitting_Code: cap_fitting_code, // Clear fitting_dash_size value in formData
      }));
    }
  }, [
    formData?.design,
    selectedWireTypeOption,
    selectedFittingDashSizeOption,
    formData?.cap_size,
    selectedSkiveTypeOption,
    formData?.od,
    formData.length,
    formData?.big_bore,
    formData?.additional,
    selectedFittingThreadOption,
    formData?.nut_hex,
    formData?.nut_length,
    selectedhoseDashSizeOption,
  ]);

  const [hosepipeFittingCode, setHosePipeFittingCode] = useState(null);
  const [hosepipedescCode, setHosePipeDescCode] = useState(null);

  //Hose pipe type options
  useEffect(() => {
    const hosepipe_fitting_code = `${
      selectedhoseDashSizeOption?.code ? selectedhoseDashSizeOption?.code : ""
    }${
      selectedHoseTypeOption?.code
        ? "-" + selectedHoseTypeOption?.code + " "
        : ""
    }${
      selectedBrandLayLineOption?.value ? selectedBrandLayLineOption?.value : ""
    }${
      selectedHosePipeMFCOption?.code
        ? " " + selectedHosePipeMFCOption?.code
        : ""
    }`;
    setHosePipeFittingCode(hosepipe_fitting_code);

    const desc_hosepipe_Code = `${
      selectedhoseDashSizeOption?.dsc_code
        ? selectedhoseDashSizeOption?.dsc_code
        : ""
    }${
      selectedHoseTypeOption?.dsc_code
        ? " " + selectedHoseTypeOption?.dsc_code + " "
        : ""
    }${
      selectedBrandLayLineOption?.value ? selectedBrandLayLineOption?.value : ""
    }${
      selectedHosePipeMFCOption?.dsc_code
        ? " " + selectedHosePipeMFCOption?.dsc_code
        : ""
    }`;
    setHosePipeDescCode(desc_hosepipe_Code);

    setFormData((prevData) => ({
      ...prevData,
      desc_Code: desc_hosepipe_Code,
      fitting_Code: hosepipe_fitting_code,
    }));
  }, [
    selectedhoseDashSizeOption,
    selectedBrandLayLineOption,
    selectedHoseTypeOption,
    selectedHosePipeMFCOption,
  ]);

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
    if (
      formData?.fitting_thread &&
      formData?.variant &&
      formData?.hose_dash_size
    ) {
      const filteredOptions = filterFittingDashSizeOptions();
      if (filteredOptions.length > 0) {
        setSelectedfittingDashSizeOption(filteredOptions[0]);
        setFormData({
          ...formData,
          fitting_dash_size: filteredOptions[0].value,
        });
      }
    }
  }, [formData?.fitting_thread, formData?.variant, formData?.hose_dash_size]);

  useEffect(() => {
    // When fittingThreadOption is selected, reset variant and fitting_dash size inputs
    if (selectedFittingThreadOption) {
      setFormData((prevData) => ({
        ...prevData,
        variant: "", // Clear variant value in formData
        fitting_dash_size: "", // Clear fitting_dash_size value in formData
        fitting_type: "",
        OD: "",
        pipeOD: "",
      }));
      setSelectedvariantOption(null); // Clear variant option
      setSelectedfittingDashSizeOption(null); // Clear fitting_dash size option
      setSelectedFittingTypeOption(null);
      setSelectpipeODOption(null);
    }
  }, [selectedFittingThreadOption]); // Trigger this whenever fitting thread is selected

  //when hosedash size selected clear variant and fittingdashsiae option
  useEffect(() => {
    // When fittingThreadOption is selected, reset variant and fitting_dash size inputs
    if (selectedFittingThreadOption) {
      setFormData((prevData) => ({
        ...prevData,
        variant: "", // Clear variant value in formData
        fitting_dash_size: "", // Clear fitting_dash_size value in formData
        fitting_type: "",
        OD: "",
        pipeOD: "",
      }));
      setSelectedvariantOption(null); // Clear variant option
      setSelectedfittingDashSizeOption(null); // Clear fitting_dash size option
      setSelectedFittingTypeOption(null);
      setSelectpipeODOption(null);
    }
  }, [selectedhoseDashSizeOption]);

  //Clear bend code
  useEffect(() => {
    //When user select Staight clear the drop length in fitting and descrition code
    if (selectedStraightBendangleOption?.value === "Straight") {
      setFormData((prevData) => ({
        ...prevData,
        drop_length: "", // Clear the bend code when `selectedStraightBendangleOption` changes
      }));
    }
  }, [selectedStraightBendangleOption]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      fitting_dash_size: "",
    }));
    setSelectedfittingDashSizeOption(null);
  }, [formData?.variant === "Manual"]);

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
      gallery: [
        ...(prevData.gallery || []),
        ...newImages?.map((image) => image.file),
      ],
    }));
  };

  // Deletes an image from the array
  const handleDeleteImage = (index) => {
    setGalleryImages((prevImages) => prevImages.filter((_, i) => i !== index));

    setFormData((prevData) => ({
      ...prevData,
      gallery: prevData?.gallery?.filter((_, i) => i !== index), // Remove the image from gallery array
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);

    setFormData({ ...formData, [name]: value });
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
    setLogo(null);
    setGalleryImages([]);

    setSelectedCategoryOption(null);
    setSelectedSubCategoryOption(null);
    setSelectedSubSubCategoryOption(null);
    setSelectedBrandOption(null);
    setSelectedfittingSizeOption(null);
    setSelectedmaterialOption(null);
    setSelectedvariantOption(null);
    setSelectedThreadtypeOption(null);
    setSelectedPartOption(null);
    setErrors({});
    setLoading(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Food name is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.product_id) newErrors.product_id = "Product Id is required.";
    if (!formData.product_Type)
      newErrors.product_Type = "Product Type is required.";

    if (!formData.image) newErrors.image = "Image is required.";

    if (!formData.category_id) newErrors.category_id = "Category is required.";
    if (!formData.subcategory_id)
      newErrors.subcategory_id = "Sub Category is required.";
    if (!formData.subsubcategory_id)
      newErrors.subsubcategory_id = "Sub Sub Category is required.";

    if (!formData.brand) newErrors.brand = "Brand is required.";
    if (!formData.variant) newErrors.variant = "Variant is required.";
    if (!formData.fittingSize)
      newErrors.fittingSize = "fittingSize is required.";
    if (!formData.thread_type)
      newErrors.thread_type = "Thread Type is required.";
    if (!formData.material) newErrors.material = "Material is required.";
    if (!formData.pressure_rating)
      newErrors.pressure_rating = "Pressure Rating is required.";
    if (!formData.temperature_range)
      newErrors.temperature_range = "Temperature Range Rating is required.";
    if (!formData.price) newErrors.price = "Price is required.";
    else if (formData.price && isNaN(formData.price))
      newErrors.price = "Price must be a numeric value.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFormComponent(formData);
    setErrors(validationErrors);

    // if(Object.keys(validationErrors).length > 0){
    //   console.log("validationErrors is available",validationErrors )
    //   return
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
          // navigate('/productlist');
        } else {
          setLoading(false);
          Toaster.error(res.data?.message || "Failed to create product");
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

  const fetchAllOptions = async () => {
    setLoading(true);
    try {
      const res = await getAllOptions();
      setDropwonOptions(res?.data?.data);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOptions();
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

  //parts component
  const renderPartComponent = () => {
    switch (formData?.part) {
      case "Nut":
        return (
          <Nut
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            //code prefilled
            fittingCode={nutFittingCode}
            descCode={nutDescCode}
            //design
            setSelectedDesignOption={setSelectedDesignOption}
            selectedDesignOption={selectedDesignOption}
            designOption={designOption}
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
            setSelectedWithCapWithoutCapOption={
              setSelectedWithCapWithoutCapOption
            }
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
            HoseDashSizeOption={HoseDashSizeOption}
            setHoseDashSizeOption={setHoseDashSizeOption}
            selectedhoseDashSizeOption={selectedhoseDashSizeOption}
            setSelectedHoseDashSizeOption={setSelectedHoseDashSizeOption}
            //fitting thread
            fittingThreadOption={fittingThreadOption}
            setfittingThreadOption={setfittingThreadOption}
            selectedFittingThreadOption={selectedFittingThreadOption}
            setSelectedFittingThreadOption={setSelectedFittingThreadOption}
            //fitting type
            fittingTypeOption={filterFittingTypeOptions()}
            setfittingTypeOption={setfittingTypeOption}
            selectedFittingTypeOption={selectedFittingTypeOption}
            setSelectedFittingTypeOption={setSelectedFittingTypeOption}
            //steight and bend
            straightBendangleOption={straightBendangleOption}
            setStraightBendangleOption={setStraightBendangleOption}
            selectedStraightBendangleOption={selectedStraightBendangleOption}
            setSelectedStraightBendangleOption={
              setSelectedStraightBendangleOption
            }
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
          />
        );
      case "Nipple":
        return (
          <Nipple
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            //code prefilled
            fittingCode={nippleFittingCode}
            descCode={nippleDescCode}
            //design
            setSelectedDesignOption={setSelectedDesignOption}
            selectedDesignOption={selectedDesignOption}
            designOption={designOption}
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
            setSelectedWithCapWithoutCapOption={
              setSelectedWithCapWithoutCapOption
            }
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
            HoseDashSizeOption={HoseDashSizeOption}
            setHoseDashSizeOption={setHoseDashSizeOption}
            selectedhoseDashSizeOption={selectedhoseDashSizeOption}
            setSelectedHoseDashSizeOption={setSelectedHoseDashSizeOption}
            //fitting thread
            fittingThreadOption={fittingThreadOption}
            setfittingThreadOption={setfittingThreadOption}
            selectedFittingThreadOption={selectedFittingThreadOption}
            setSelectedFittingThreadOption={setSelectedFittingThreadOption}
            //fitting type
            fittingTypeOption={filterFittingTypeOptions()}
            setfittingTypeOption={setfittingTypeOption}
            selectedFittingTypeOption={selectedFittingTypeOption}
            setSelectedFittingTypeOption={setSelectedFittingTypeOption}
            //steight and bend
            straightBendangleOption={straightBendangleOption}
            setStraightBendangleOption={setStraightBendangleOption}
            selectedStraightBendangleOption={selectedStraightBendangleOption}
            setSelectedStraightBendangleOption={
              setSelectedStraightBendangleOption
            }
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
          />
        );
      case "Cap":
        return (
          <Cap
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            //code prefilled
            fittingCode={capFittingCode}
            descCode={capDescCode}
            //design
            setSelectedDesignOption={setSelectedDesignOption}
            selectedDesignOption={selectedDesignOption}
            designOption={designOption}
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
            setSelectedWithCapWithoutCapOption={
              setSelectedWithCapWithoutCapOption
            }
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
            HoseDashSizeOption={HoseDashSizeOption}
            setHoseDashSizeOption={setHoseDashSizeOption}
            selectedhoseDashSizeOption={selectedhoseDashSizeOption}
            setSelectedHoseDashSizeOption={setSelectedHoseDashSizeOption}
            //fitting thread
            fittingThreadOption={fittingThreadOption}
            setfittingThreadOption={setfittingThreadOption}
            selectedFittingThreadOption={selectedFittingThreadOption}
            setSelectedFittingThreadOption={setSelectedFittingThreadOption}
            //fitting type
            fittingTypeOption={filterFittingTypeOptions()}
            setfittingTypeOption={setfittingTypeOption}
            selectedFittingTypeOption={selectedFittingTypeOption}
            setSelectedFittingTypeOption={setSelectedFittingTypeOption}
            //steight and bend
            straightBendangleOption={straightBendangleOption}
            setStraightBendangleOption={setStraightBendangleOption}
            selectedStraightBendangleOption={selectedStraightBendangleOption}
            setSelectedStraightBendangleOption={
              setSelectedStraightBendangleOption
            }
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
          />
        );
    }
  };
  const renderComponent = () => {
    switch (formData?.product_type) {
      case "End Fittings":
        return (
          <EndFittingForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            //code prefilled
            fittingCode={fittingCode}
            descCode={descCode}
            //design
            setSelectedDesignOption={setSelectedDesignOption}
            selectedDesignOption={selectedDesignOption}
            designOption={designOption}
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
            setSelectedWithCapWithoutCapOption={
              setSelectedWithCapWithoutCapOption
            }
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
            HoseDashSizeOption={HoseDashSizeOption}
            setHoseDashSizeOption={setHoseDashSizeOption}
            selectedhoseDashSizeOption={selectedhoseDashSizeOption}
            setSelectedHoseDashSizeOption={setSelectedHoseDashSizeOption}
            //fitting thread
            fittingThreadOption={fittingThreadOption}
            setfittingThreadOption={setfittingThreadOption}
            selectedFittingThreadOption={selectedFittingThreadOption}
            setSelectedFittingThreadOption={setSelectedFittingThreadOption}
            //fitting type
            fittingTypeOption={filterFittingTypeOptions()}
            setfittingTypeOption={setfittingTypeOption}
            selectedFittingTypeOption={selectedFittingTypeOption}
            setSelectedFittingTypeOption={setSelectedFittingTypeOption}
            //steight and bend
            straightBendangleOption={straightBendangleOption}
            setStraightBendangleOption={setStraightBendangleOption}
            selectedStraightBendangleOption={selectedStraightBendangleOption}
            setSelectedStraightBendangleOption={
              setSelectedStraightBendangleOption
            }
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
          />
        );

      case "Hose Pipe":
        return (
          <HosePipe
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            fittingCode={hosepipeFittingCode}
            descCode={hosepipedescCode}
            //hose dash size
            HoseDashSizeOption={HoseDashSizeOption}
            setHoseDashSizeOption={setHoseDashSizeOption}
            selectedhoseDashSizeOption={selectedhoseDashSizeOption}
            setSelectedHoseDashSizeOption={setSelectedHoseDashSizeOption}
            //HosePipeMFC options
            HosePipeMFCOption={dropdownOptions?.MFCOptions}
            selectedHosePipeMFCOption={selectedHosePipeMFCOption}
            setSelectedHosePipeMFCOption={setSelectedHosePipeMFCOption}
            //BrandLayLine options
            BrandLayLineOption={brandLayLineOption}
            selectedBrandLayLineOption={selectedBrandLayLineOption}
            setSelectedBrandLayLineOption={setSelectedBrandLayLineOption}
            //HoseType options
            HoseTypeOption={hoseTypeOption  }
            selectedHoseTypeOption={selectedHoseTypeOption}
            setSelectedHoseTypeOption={setSelectedHoseTypeOption}
          />
        );

      case "Hose Assembly":
        return (
          <HoseAssemblySection
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );

      case "Spring":
        return (
          <SpringSection
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            springTypeOption={springTypeOption}
            setSpringTypeOption={setSpringTypeOption}
            selectedSpringTypeOption={selectedSpringTypeOption}
            setSelectedSpringTypeOption={setSelectedSpringTypeOption}
          />
        );

      case "O-ring":
        return (
          <O_ringSection
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );

      case "Dust Cap":
        return (
          <DustCapSection
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            maleFemaleOption={maleFemaleOption}
            setmaleFemaleOption={setmaleFemaleOption}
            selectedMaleFemaleOption={selectedMaleFemaleOption}
            setSelectedMaleFemaleOption={setSelectedMaleFemaleOption}
          />
        );

      case "Sleeve":
        return (
          <SleeveSection
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );

      case "Vinyl Cover":
        return (
          <VinylCoverSection
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );

      case "Packing":
        return (
          <PackingSection
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );

      case "Tube Fittings":
        return (
          <TubeFittingsSection
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );

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
  };

  const handlePartsDropChange = (option) => {
    setSelectedPartsOption(option);
    setFormData((data) => ({
      ...data, // Spread existing data to retain other fields
      part: option.value, // Update only the `part` field
    }));
    setErrors({});
  };

  return (
    <>
      <ToastContainer />
      <Loader visible={loading} />
      <PageTitle
        activeMenu={"Add Product"}
        motherMenu={"Home"}
        motherMenuLink={"/dashboard"}
      />
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
                      <span className="text-danger fs-12">
                        {errors.product_type}
                      </span>
                    )}
                  </div>

                  {formData?.product_type === "End Fittings" && (
                    <div className="col-sm-3">
                      <label className="col-form-label">Parts</label>
                      <Select
                        value={selectedPartsOption}
                        onChange={handlePartsDropChange}
                        defaultValue={selectedPartsOption}
                        // defaultValue={{ value: "None", label: "None" }}
                        options={dropdownOptions?.PartOptions}
                      />
                      {errors.parts && (
                        <span className="text-danger fs-12">
                          {errors.parts}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dynamic Form*/}
      {formData.product_type && formData?.part
        ? renderPartComponent()
        : renderComponent()}
      {/* Basic Info */}
      <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Basic Info</h4>
          </div>
          <div className="card-body">
            <div>
              {/* Weight */}
              {/* <div className="col-sm-6 col-xl-4">
                  <label className="col-sm-3 col-form-label">Weight</label>
                  <input
                    name="Weight"
                    value={formData.weight}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ex: 100"
                  />
                  {errors.weight && (
                    <span className="text-danger fs-12">{errors.weight}</span>
                  )}
                </div> */}

              {/* UOM */}
              {/* <div className="col-sm-6 col-xl-4">
                  <label className="col-sm-6 col-form-label">Unit of Measurement</label>
                  <input
                    name="UOM"
                    value={formData.uom}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ex: 15 inch, meter, set..etc"
                  />
                  {errors.uom && (
                    <span className="text-danger fs-12">{errors.uom}</span>
                  )}
                </div> */}

              {/* Price and Rate */}
              <div className="mb-3 row">
                <div className="col-sm-3 col-xl-3">
                  <label className="col-sm-3 col-form-label">Price</label>
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ex: 2000 INR"
                  />
                  {errors.price && (
                    <span className="text-danger fs-12">{errors.price}</span>
                  )}
                </div>

                <div className="col-sm-3 col-xl-3">
                  {/* <label className="col-sm-3 col-form-label">GST</label>
                  <input
                    name="Gst"
                    value={formData.gst}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ex: 15%"
                  />
                  {errors.gst && (
                    <span className="text-danger fs-12">{errors.gst}</span>
                  )} */}
                  <label className="col-form-label">GST</label>
                  <Select
                    value={selectedGSTOption}
                    onChange={(option) => {
                      setSelectedGSTOption(option);
                      setFormData({
                        ...formData,
                        gst: option.value,
                      });
                      setErrors({
                        ...errors,
                        gst: null,
                      });
                    }}
                    defaultValue={selectedGSTOption}
                    options={gstOption}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.gst && (
                    <span className="text-danger fs-12">{errors.gst}</span>
                  )}
                </div>

                <div className="col-sm-3 col-xl-3">
                  <label className="col-sm-3 col-form-label">Weight</label>
                  <input
                    name="Weight"
                    value={formData.weight}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ex: 100"
                  />
                  {errors.weight && (
                    <span className="text-danger fs-12">{errors.weight}</span>
                  )}
                </div>

                <div className="col-sm-3 col-xl-3">
                  {/* <label className="col-sm-12 col-form-label">Unit of Measurement</label>
                  <input
                    name="UOM"
                    value={formData.uom}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ex: 15 inch, meter, set..etc"
                  />
                  {errors.uom && (
                    <span className="text-danger fs-12">{errors.uom}</span>
                  )} */}
                  <label className="col-sm-12 col-form-label">
                    Unit of Measurement
                  </label>
                  <Select
                    value={selectedUOMOption}
                    onChange={(option) => {
                      setSelectedUOMOption(option);
                      setFormData({
                        ...formData,
                        uom: option.value,
                      });
                      setErrors({
                        ...errors,
                        uom: null,
                      });
                    }}
                    defaultValue={selectedUOMOption}
                    options={uomOptions}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.uom && (
                    <span className="text-danger fs-12">{errors.uom}</span>
                  )}
                </div>
              </div>

              {/* Inputs */}
              <div className="mb-3 row">
                {/* MFC INPUT */}
                <div className="col-sm-6 col-xl-3">
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
                {/* Fitting And Description code input */}
                {formData?.product_type === "End Fittings" && (
                  <>
                    <div className="col-sm-6 col-xl-3">
                      <label className="col-sm-12 col-form-label">
                        Fitting Code
                      </label>
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
                        <span className="text-danger fs-12">
                          {errors.fitting_code}
                        </span>
                      )}
                    </div>
                    <div className="col-sm-6 col-xl-6">
                      <label className="col-sm-3 col-form-label">
                        Description
                      </label>
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
                        <span className="text-danger fs-12">
                          {errors.desc_code}
                        </span>
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
                )}
              </div>

              {/* Location and additional info */}

              <div className="mb-3 row">
                {/* <div className="col-md-6">
                    <label className="col-form-label">Location<small style={{ color: "grey" }} ></small></label>
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: Row-5, BucketNo.22, Rack-15"
                    />
                    {errors.location && (
                      <span className="text-danger fs-12">{errors.location}</span>
                    )}
                  </div> */}
                {/* <div className="col-md-6">
                    <label className="col-form-label">Additional<small style={{ color: "grey" }} >(Optional)*</small></label>
                    <input
                      name="additional"
                      value={formData.additional}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: Additional"
                    />
                    {errors.additional && (
                      <span className="text-danger fs-12">{errors.additional}</span>
                    )}
                  </div> */}
              </div>

              {/* Note */}
              <div className="mb-3 row">
                <div className="col-sm-8">
                  <label className="col-sm-3 col-form-label">Note</label>
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
                {/* Location */}
                <div className="col-sm-4">
                  <label className="col-sm-3 col-form-label">Location</label>
                  <textarea
                    name="location"
                    className="form-control"
                    rows="3"
                    id="comment"
                    placeholder="Ex: Row-5, BucketNo.22, Rack-15"
                    value={formData.location}
                    onChange={handleChange}
                  ></textarea>
                  {errors.location && (
                    <span className="text-danger fs-12">{errors.location}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Weight & Measurement*/}
      {/* <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Weight & Measurement</h4>
          </div>
          <div className="card-body">
            <div>
              <div className="mb-3 row">
                
                <div className="col-sm-6 col-xl-4">
                  <label className="col-sm-3 col-form-label">Weight</label>
                  <input
                    name="Weight"
                    value={formData.weight}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ex: 100"
                  />
                  {errors.weight && (
                    <span className="text-danger fs-12">{errors.weight}</span>
                  )}
                </div>

                <div className="col-sm-6 col-xl-4">
                  <label className="col-sm-6 col-form-label">Unit of Measurement</label>
                  <input
                    name="UOM"
                    value={formData.uom}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ex: 15 inch, meter, set..etc"
                  />
                  {errors.uom && (
                    <span className="text-danger fs-12">{errors.uom}</span>
                  )}
                </div>

              </div>
              
            </div>
          </div>
        </div>
      </div> */}

      {/* Price and GST */}
      {/* <div className="col-xl-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Price & Tax</h4>
          </div>
          <div className="card-body">
            <div>
              <div className="mb-3 row">
                
                <div className="col-sm-6 col-xl-4">
                  <label className="col-sm-3 col-form-label">Rate</label>
                  <input
                    name="Rate"
                    value={formData.rate}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ex: 2000 INR"
                  />
                  {errors.rate && (
                    <span className="text-danger fs-12">{errors.rate}</span>
                  )}
                </div>

                <div className="col-sm-6 col-xl-4">
                  <label className="col-sm-3 col-form-label">GST</label>
                  <input
                    name="Gst"
                    value={formData.gst}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ex: 15%"
                  />
                  {errors.gst && (
                    <span className="text-danger fs-12">{errors.gst}</span>
                  )}
                </div>

              </div>
              
            </div>
          </div>
        </div>
      </div> */}

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
              }}
            >
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
                      className="flex flex-col cursor-pointer"
                    >
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
            <div className="card-body d-flex gap-3">
              <div
                className="row"
                style={{ gap: "10px", display: "flex", flexWrap: "wrap" }}
              >
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
                      borderRadius: "10px",
                    }}
                  >
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
                      onClick={() => handleDeleteImage(index)}
                    >
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
                      <div
                        style={styles.uploadIcon}
                        className="flex flex-col cursor-pointer"
                      >
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
