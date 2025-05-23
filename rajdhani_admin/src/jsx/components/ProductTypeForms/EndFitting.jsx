import React, { useEffect, useState } from "react";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Toaster } from "../../components/Toaster/Toster";
import Loader from "../../components/Loader/Loader";
import { addProductApi } from "../../../services/apis/Product";
import { useNavigate } from "react-router-dom";

const EndFittingForm = (props) => {
  const {
    formData,
    setFormData,
    errors,
    setErrors,
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
    designOption

  } = props;

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if(errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
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
            {/** Card Header */}
            <div className="mb-3 row">
              <div className="col-md-12">
                <div className="">
                  {/* <h4 className="card-title">End Fitting</h4> */}
                  <div className="card-header row">

                    <div className="col-md-4">
                      <div className="d-flex align-items-center">
                        <h4 className="card-title">End Fitting</h4>
                      </div>
                    </div>

                    {/* <div className="col-md-4">
          <div className="d-flex align-items-center">
            <span style={{
              backgroundColor: '#6a73fa',
              color: 'white',
              borderRadius: '12px',
              padding: '5px 10px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}>
              FittingCode :- {fittingCode}
            </span>
          </div>
        </div> */}
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
              {/* SECTION 1ST Fitting Essentials */}
              <div>
                <div className="mb-3 row">
                  
                  <div className="col-md-3">
                    <label className="col-form-label">Design</label>
                    <Select
                      value={selectedDesignOption}
                      onChange={(option) => {
                        setSelectedDesignOption(option);
                        setFormData({
                          ...formData,
                          design: option.value,
                        });
                        setErrors({
                          ...errors,
                          design: null
                        })
                        
                      }}
                      defaultValue={selectedDesignOption}
                      options={designOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.design && (
                      <span className="text-danger fs-12">
                        {errors.design}
                      </span>
                    )}
                  </div>

                  <div className="col-md-3">
                    <label className="col-form-label">Wire Type</label>
                    <Select
                      value={selectedWireTypeOption}
                      onChange={(option) => {
                        setSelectedWireTypeOption(option);
                        setFormData({
                          ...formData,
                          wire_type: option.value,
                        });
                        setErrors({
                          ...errors,
                          wire_type: null
                        })
                      }}
                      defaultValue={selectedWireTypeOption}
                      options={wireTypeOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.wire_type && (
                      <span className="text-danger fs-12">
                        {errors.wire_type}
                      </span>
                    )}
                  </div>


                  <div className="col-md-2">
                    <label className="col-form-label">Ferrule</label>
                    <Select
                      value={selectedWithCapWithoutCapOption}
                      onChange={(option) => {
                        setSelectedWithCapWithoutCapOption(option);
                        setFormData({
                          ...formData,
                          ferrule: option.value,
                        });
                        setErrors({
                          ...errors,
                          ferrule: null
                        })
                      }}
                      defaultValue={selectedWithCapWithoutCapOption}
                      options={withCapWithoutCapOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.ferrule && (
                      <span className="text-danger fs-12">
                        {errors.ferrule}
                      </span>
                    )}
                  </div>

                  <div className="col-md-2">
                    <label className="col-form-label">Fitting Piece</label>
                    <Select
                      value={selectedFittingPieceOption}
                      onChange={(option) => {
                        setSelectedFittingPieceOption(option);
                        setFormData({
                          ...formData,
                          fitting_piece: option.value,
                        });
                        setErrors({
                          ...errors,
                          fitting_piece: null
                        })
                      }}
                      defaultValue={selectedFittingPieceOption}
                      options={fittingPieceOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.fitting_piece && (
                      <span className="text-danger fs-12">
                        {errors.fitting_piece}
                      </span>
                    )}
                  </div>

                  <div className="col-md-2">
                    <label className="col-form-label">Skive Type</label>
                    <Select
                      value={selectedSkiveTypeOption}
                      onChange={(option) => {
                        setSelectedSkiveTypeOption(option);
                        setFormData({
                          ...formData,
                          skive_type: option.value,
                        });
                        setErrors({
                          ...errors,
                          skive_type: null
                        })
                      }}
                      defaultValue={selectedSkiveTypeOption}
                      options={skiveTypeOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.skive_type && (
                      <span className="text-danger fs-12">
                        {errors.skive_type}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Section2  End Fitting*/}
      <div className="row">
        {/* SECTION  */}
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              padding: '10px',
              // backgroundColor: '#f8f9fa'
            }}>
              <h4 className="card-title" style={{ marginLeft: 15 }}>End Fitting Thread & Size</h4>
            </div>

            <div className="card-body">
              {/* First */}
              <div className="mb-3 row">

                <div className="col-md-3">
                  <label className="col-form-label">Fitting Thread</label>
                  <Select
                    value={selectedFittingThreadOption}
                    onChange={(option) => {
                      setSelectedFittingThreadOption(option);
                      setFormData({
                        ...formData,
                        fitting_thread: option.value,
                      });
                      setErrors({
                        ...errors,
                        fitting_thread: null
                      })
                    }}
                    defaultValue={selectedFittingThreadOption}
                    options={fittingThreadOption}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.fitting_thread && (
                    <span className="text-danger fs-12">
                      {errors.fitting_thread}
                    </span>
                  )}
                </div>

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
                      setErrors({
                        ...errors,
                        hose_dash_size: null
                      })
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

                {selectedFittingThreadOption?.value !== "METRIC" ?
                  (<>
                    <div className="col-md-3">
                      <label className="col-form-label">Variant</label>
                      <Select
                        value={selectedvariantOption}
                        onChange={(option) => {
                          setSelectedvariantOption(option);
                          setFormData({
                            ...formData,
                            variant: option.value,
                          });
                          setErrors({
                            ...errors,
                            variant: null,
                            fitting_dash_size: null,
                            OD: null
                          })
                        }}
                        defaultValue={selectedvariantOption}
                        options={variantOption}
                        style={{
                          lineHeight: "40px",
                          color: "#7e7e7e",
                          paddingLeft: " 15px",
                        }}
                      />
                      {errors.fitting_thread && (
                        <span className="text-danger fs-12">
                          {errors.fitting_thread}
                        </span>
                      )}
                    </div>

                    {/* <div className="col-md-3">
                      <label className="col-form-label">Fitting Dash Size</label>
                      <Select
                        value={selectedFittingDashSizeOption}
                        onChange={(option) => {
                          setSelectedfittingDashSizeOption(option);
                          setFormData({
                            ...formData,
                            fitting_dash_size: option.value,
                          });
                        }}
                        defaultValue={selectedFittingDashSizeOption}
                        options={fittingDashSizeOption}
                        style={{
                          lineHeight: "40px",
                          color: "#7e7e7e",
                          paddingLeft: " 15px",
                        }}
                      />
                      {errors.fitting_dash_size && (
                        <span className="text-danger fs-12">
                          {errors.fitting_dash_size}
                        </span>
                      )}
                    </div> */}
                    {selectedFittingThreadOption?.value === "SAE 61" || selectedFittingThreadOption?.value === "SAE 62" ?
                      (<>
                        <div className="col-md-3">
                          <label className="col-form-label">OD</label>
                          <Select
                            value={selectedFittingDashSizeOption}
                            onChange={(option) => {
                              setSelectedfittingDashSizeOption(option);
                              setFormData({
                                ...formData,
                                OD: option.value,
                              });
                              setErrors({
                                ...errors,
                                OD: null
                              })
                            }}
                            defaultValue={selectedFittingDashSizeOption}
                            options={fittingDashSizeOption}
                            style={{
                              lineHeight: "40px",
                              color: "#7e7e7e",
                              paddingLeft: " 15px",
                            }}
                          />
                          {errors.OD && (
                            <span className="text-danger fs-12">
                              {errors.OD}
                            </span>
                          )}
                        </div>
                      </>) : (<>
                        <div className="col-md-3">
                          <label className="col-form-label">Fitting Dash Size</label>
                          <Select
                            value={selectedFittingDashSizeOption}
                            onChange={(option) => {
                              setSelectedfittingDashSizeOption(option);
                              setFormData({
                                ...formData,
                                fitting_dash_size: option.value,

                              });
                              setErrors({
                                ...errors,
                                fitting_dash_size: null
                              })
                            }}
                            defaultValue={selectedFittingDashSizeOption}
                            options={fittingDashSizeOption}
                            style={{
                              lineHeight: "40px",
                              color: "#7e7e7e",
                              paddingLeft: " 15px",
                            }}
                          />
                          {errors.fitting_dash_size && (
                            <span className="text-danger fs-12">
                              {errors.fitting_dash_size}
                            </span>
                          )}
                        </div>
                      </>)
                    }
                  </>
                  ) : (
                    <>

                      {/* POD */}
                      <div className="col-md-2">
                        <label className="col-form-label">Pipe OD</label>
                        <Select
                          value={selectedpipeODOption}
                          onChange={(option) => {
                            setSelectpipeODOption(option);
                            setFormData({
                              ...formData,
                              pipeOD: option.value,
                            });
                            setErrors({
                              ...errors,
                              pipeOD: null
                            })
                          }}
                          defaultValue={selectedpipeODOption}
                          options={pipeODOption}
                          style={{
                            lineHeight: "40px",
                            color: "#7e7e7e",
                            paddingLeft: " 15px",
                          }}
                        />
                        {errors.pipeOD && (
                          <span className="text-danger fs-12">
                            {errors.pipeOD}
                          </span>
                        )}
                      </div>

                      {/* Metric Type */}
                      <div className="col-md-2">
                        <label className="col-form-label">Metric Type</label>
                        <Select
                          value={selectedmetricTypeOptions}
                          onChange={(option) => {
                            setSelectedmetricTypeOptions(option);
                            setFormData({
                              ...formData,
                              metric_type: option.value,
                            });
                            setErrors({
                              ...errors,
                              metric_type: null
                            })
                          }}
                          defaultValue={selectedmetricTypeOptions}
                          options={matricTypeOption}
                          style={{
                            lineHeight: "40px",
                            color: "#7e7e7e",
                            paddingLeft: " 15px",
                          }}
                        />
                        {errors.metric_type && (
                          <span className="text-danger fs-12">
                            {errors.metric_type}
                          </span>
                        )}
                      </div>
                     
                      <div className="col-md-2">
                        <label className="col-form-label">Fitting Dash Size</label>
                        <Select
                          value={selectedFittingDashSizeOption}
                          onChange={(option) => {
                            setSelectedfittingDashSizeOption(option);
                            setFormData({
                              ...formData,
                              fitting_dash_size: option?.value,

                            });
                            setErrors({
                              ...errors,
                              fitting_dash_size: null
                            })
                          }}
                          defaultValue={selectedFittingDashSizeOption}
                          options={fittingDashSizeOption}
                          style={{
                            lineHeight: "40px",
                            color: "#7e7e7e",
                            paddingLeft: " 15px",
                          }}
                        />
                        {errors.fitting_dash_size && (
                          <span className="text-danger fs-12">
                            {errors.fitting_dash_size}
                          </span>
                        )}
                      </div>
                    </>
                  )
                }
              </div>
              {/* Second */}
              <div className="mb-3 row">
                <div className="col-md-3">
                  <label className="col-form-label">Fitting Type</label>
                  <Select
                    value={selectedFittingTypeOption}
                    onChange={(option) => {
                      setSelectedFittingTypeOption(option);
                      setFormData({
                        ...formData,
                        fitting_type: option.value,
                      });
                      setErrors({
                        ...errors,
                        fitting_type: null
                      })
                    }}
                    defaultValue={selectedFittingTypeOption}
                    options={fittingTypeOption}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.fitting_type && (
                    <span className="text-danger fs-12">
                      {errors.fitting_type}
                    </span>
                  )}
                </div>



                <div className="col-md-3">
                  <label className="col-form-label">
                    Straight Bend Angle
                  </label>
                  <Select
                    value={selectedStraightBendangleOption}
                    onChange={(option) => {
                      setSelectedStraightBendangleOption(option);
                      setFormData({
                        ...formData,
                        straight_bend_angle: option.value,
                      });
                      setErrors({
                        ...errors,
                        straight_bend_angle: null
                      })
                    }}
                    defaultValue={selectedStraightBendangleOption}
                    options={straightBendangleOption}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.straight_bend_angle && (
                    <span className="text-danger fs-12">
                      {errors.straight_bend_angle}
                    </span>
                  )}
                </div>
                
                <div className="col-md-3">
                  <label className="col-form-label">
                    Neck Length <small style={{ color: "grey" }} >(In mm)*</small>
                  </label>
                  <input
                    name="neck_length"
                    value={formData.neck_length}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Ex: 15"
                  />
                  {errors.neck_length && (
                    <span className="text-danger fs-12">{errors.neck_length}</span>
                  )}
                </div>



                {/* Conditionally render Drop Length */}
                {selectedStraightBendangleOption?.value !== "Straight" && selectedStraightBendangleOption?.value !== undefined && (

                  // <div className="col-md-3">
                  //   <label className="col-form-label">Drop Length</label>
                  //   <Select
                  //     value={selectedDropLengthOption}
                  //     onChange={(option) => {
                  //       setSelectedDropLengthOption(option);
                  //       setFormData({
                  //         ...formData,
                  //         drop_length: option.value,
                  //       });
                  //     }}
                  //     defaultValue={selectedDropLengthOption}
                  //     options={dropLengthOption}
                  //     style={{
                  //       lineHeight: "40px",
                  //       color: "#7e7e7e",
                  //       paddingLeft: "15px",
                  //     }}
                  //   />
                  //   {errors.drop_length && (
                  //     <span className="text-danger fs-12">{errors.drop_length}</span>
                  //   )}
                  // </div>
                  <div className="col-md-3">
                    <label className="col-form-label">Drop Length<small style={{ color: "grey" }} >(In mm)*</small></label>
                    <input
                      name="drop_length"
                      value={formData.drop_length}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: 15"
                    />
                    {errors.drop_length && (
                      <span className="text-danger fs-12">{errors.drop_length}</span>
                    )}
                  </div>
                )}

              </div>

            </div>
          </div>
        </div>
      </div>
      {/* Section 3 Location and additional field */}
      {/* <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Location</h4>
            </div>
            <div className="card-body">
              <div className="mb-3 row">
              <div className="col-md-6">
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
                  </div>
                  <div className="col-md-6">
                    <label className="col-form-label">Fitting Additional<small style={{ color: "grey" }} >(Optional)*</small></label>
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
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>  */}


    </>
  );
};

export default EndFittingForm;
