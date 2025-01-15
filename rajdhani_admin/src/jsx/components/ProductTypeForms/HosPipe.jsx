import React, { useEffect, useState } from "react";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Toaster } from "../Toaster/Toster";
import Loader from "../Loader/Loader";
import { addProductApi } from "../../../services/apis/Product";
import { useNavigate } from "react-router-dom";

const HosePipe = (props) => {
  const {
    formData,
    setFormData,
    errors,
    resetForm,
    wireTypeOption,
    setWireTypeOption,
    selectedWireTypeOption,
    setSelectedWireTypeOption,
    withCapWithoutCapOption,
    setWithCapWithoutCapOption,
    selectedWithCapWithoutCapOption,
    setSelectedWithCapWithoutCapOption,
    fittingPieceOption,
    setFittingPieceOption,
    selectedFittingPieceOption,
    setSelectedFittingPieceOption,
    skiveTypeOption,
    setSkiveTypeOption,
    selectedSkiveTypeOption,
    setSelectedSkiveTypeOption,
    HoseDashSizeOption,
    setHoseDashSizeOption,
    selectedhoseDashSizeOption,
    setSelectedHoseDashSizeOption,
    fittingDashSizeOption,
    setfittingDashSizeOption,
    selectedFittingDashSizeOption,
    setSelectedfittingDashSizeOption,
    fittingThreadOption,
    setfittingThreadOption,
    variantOption,
    setVariantOption,
    selectedvariantOption,
    setSelectedvariantOption,
    selectedFittingThreadOption,
    setSelectedFittingThreadOption,
    fittingTypeOption,
    setfittingTypeOption,
    selectedFittingTypeOption,
    setSelectedFittingTypeOption,
    straightBendangleOption,
    setStraightBendangleOption,
    selectedStraightBendangleOption,
    setSelectedStraightBendangleOption,
    dropLengthOption,
    setDropLengthOption,
    selectedDropLengthOption,
    setSelectedDropLengthOption,
    neckLengthOption,
    setNeckLengthOption,
    selectedNeckLengthOption,
    setselectedNeckLengthOption,

    pipeODOption,
    setpipeODOption,
    selectpipeODOption,
    setSelectpipeODOption,
    selectedpipeODOption,

    matricTypeOption,
    setMatricTypeOption,
    selectedmetricTypeOptions,
    setSelectedmetricTypeOptions,

    fittingCode,
    descCode,


    setSelectedDesignOption,
    selectedDesignOption,
    designOption,

    HosePipeMFCOption,
    selectedHosePipeMFCOption,
    setSelectedHosePipeMFCOption,

    BrandLayLineOption,
    selectedBrandLayLineOption,
    setSelectedBrandLayLineOption,

    HoseTypeOption,
    selectedHoseTypeOption,
    setSelectedHoseTypeOption


  } = props;

  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // if(errors[name]) {
    //   setErrors({
    //     ...errors,
    //     [name]: null,
    //   });
    // }
  };

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

  return (
    <>
      <ToastContainer />
      <Loader visible={loading} />

      <div className="row">
        {/* SECTION 1ST */}
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            


            <div className="mb-3 row">
              <div className="col-md-12">
                <div className="">
                  
                  <div className="card-header row">

                    <div className="col-md-4">
                      <div className="d-flex align-items-center">
                        <h4 className="card-title">Hose Pipe</h4>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="d-flex justify-content-center align-items-center">
                        <span style={{
                          backgroundColor: '#6a73fa',
                          color: 'white',
                          borderRadius: '12px',
                          padding: '5px 10px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          marginRight: '100px'
                        }}>
                          FittingCode :- {fittingCode}
                        </span>
                      </div>
                    </div>


                    <div className="col-md-4">
                      <div className="d-flex justify-content-end">
                        <span style={{
                          backgroundColor: '#ff7a41',
                          color: 'white',
                          borderRadius: '12px',
                          padding: '5px 10px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          // whiteSpace: 'nowrap'
                        }}>
                          Description :- {descCode}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>





            <div className="card-body">
              {/* SECTION 1ST Hose Pipe */}
              <div>
                <div className="mb-3 row">
                
                   {/* MFC options */}
                  <div className="col-md-3">
                    <label className="col-form-label">MFC</label>
                    <Select
                      value={selectedHosePipeMFCOption}
                      onChange={(option) => {
                        setSelectedHosePipeMFCOption(option);
                        setFormData({
                          ...formData,
                          hose_pipe_mfc: option.value,
                        });
                      }}
                      defaultValue={selectedHosePipeMFCOption}
                      options={HosePipeMFCOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.hose_pipe_mfc && (
                      <span className="text-danger fs-12">
                        {errors.hose_pipe_mfc}
                      </span>
                    )}
                  </div>
                   {/* BrandLayLineOption */}
                  <div className="col-md-3">
                    <label className="col-form-label">Brand Lay Line</label>
                    <Select
                      value={selectedBrandLayLineOption}
                      onChange={(option) => {
                        setSelectedBrandLayLineOption(option);
                        setFormData({
                          ...formData,
                          brand_lay_line: option.value,
                        });
                      }}
                      defaultValue={selectedBrandLayLineOption}
                      options={BrandLayLineOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.brand_lay_line && (
                      <span className="text-danger fs-12">
                        {errors.brand_lay_line}
                      </span>
                    )}
                  </div>
                 {/* HoseDash size options */}
                  <div className="col-md-3">
                  <label className="col-form-label">Hose Dash Size</label>
                  <Select
                    value={selectedhoseDashSizeOption}
                    onChange={(option) => {
                      setSelectedHoseDashSizeOption(option);
                      setFormData({
                        ...formData,
                        hose_dash_size: option.value,
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
                  {errors.hose_dash_size && (
                    <span className="text-danger fs-12">
                      {errors.hose_dash_size}
                    </span>
                  )}
                </div>
                {/* Hose Type size options */}
                  <div className="col-md-3">
                    <label className="col-form-label">Hose Type</label>
                    <Select
                      value={selectedHoseTypeOption}
                      onChange={(option) => {
                        setSelectedHoseTypeOption(option);
                        setFormData({
                          ...formData,
                          hose_type: option.value,
                        });
                      }}
                      defaultValue={selectedHoseTypeOption}
                      options={HoseTypeOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.hose_type && (
                      <span className="text-danger fs-12">
                        {errors.hose_type}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>


     

    </>
  );
};

export default HosePipe;
