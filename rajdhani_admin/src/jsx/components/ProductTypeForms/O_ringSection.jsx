import React, { useState } from "react";
import Select from "react-select";


const O_ringSection = (props) => {
  const {
    formData,
    setFormData,
    errors,
    setErrors,

    //Fitting Thread
    oRingThreadTypeOption,
    selectedFittingThreadOption,
    setSelectedFittingThreadOption,
  
    //Fitting Dash Size Option
    fittingDashSizeOption,
    selectedFittingDashSizeOption,
    setSelectedfittingDashSizeOption,
    //POD
    pipeODOption,
    setSelectpipeODOption,
    selectedpipeODOption,
    


    //Fitting and description code
    fittingCode,
    descCode,
  } = props;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: null,
    });
  };


  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            {/* Card Header part */}
            <div className="mb-3 row">
              <div className="col-md-12">
                <div className="">
                  <div className="card-header row">

                    <div className="col-md-4">
                      <div className="d-flex align-items-center">
                        <h4 className="card-title">O-Ring</h4>
                      </div>
                    </div>

                    {/* <div className="col-md-4">
                      <div className="d-flex justify-content-center align-items-center">
                        <span style={{
                          backgroundColor: '#6a73fa',
                          color: 'white',
                          borderRadius: '12px',
                          padding: '5px 10px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          marginRight: '80px'
                        }}>
                          FittingCode :- {fittingCode}
                        </span>
                      </div>
                    </div> */}


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
            {/* Card Header Body */}
            <div className="card-body">
              {/* Thread and Size */}
              <div className="mb-3 row">
                {/**Thread */}
                <div className="col-md-3">
                  <label className="col-form-label">Fitting Thread</label>
                  <Select
                    value={selectedFittingThreadOption}
                    onChange={(option) => {
                      setSelectedFittingThreadOption(option);
                      setFormData({
                        ...formData,
                        fitting_thread: option?.value,
                      });
                      setErrors({
                        ...errors,
                        fitting_thread: null
                      })
                    }}
                    defaultValue={selectedFittingThreadOption}
                    options={oRingThreadTypeOption}
                    isClearable
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
                {/**Size combo */}
                {selectedFittingThreadOption?.value !== "METRIC" ?
                  (<>
                    {selectedFittingThreadOption?.value === "SAE 61" || selectedFittingThreadOption?.value === "SAE 62" ?
                      (<>
                        <div className="col-md-3">
                          <label className="col-form-label">Size*(POD)</label>
                          <Select
                            value={selectedFittingDashSizeOption}
                            onChange={(option) => {
                              setSelectedfittingDashSizeOption(option);
                              setFormData({
                                ...formData,
                                size: option.value,
                              });
                              setErrors({
                                ...errors,
                                size: null
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
                          {errors.size && (
                            <span className="text-danger fs-12">
                              {errors.size}
                            </span>
                          )}
                        </div>
                      </>) : (<>
                        <div className="col-md-3">
                          <label className="col-form-label">Size</label>
                          <Select
                            value={selectedFittingDashSizeOption}
                            onChange={(option) => {
                              setSelectedfittingDashSizeOption(option);
                              setFormData({
                                ...formData,
                                size: option.value,

                              });
                              setErrors({
                                ...errors,
                                size: null
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
                          {errors.size && (
                            <span className="text-danger fs-12">
                              {errors.size}
                            </span>
                          )}
                        </div>
                      </>)
                    }
                  </>
                  ) : (
                    <>
                      {/* POD */}
                      <div className="col-md-3">
                        <label className="col-form-label">Size*(POD)</label>
                        <Select
                          value={selectedpipeODOption}
                          onChange={(option) => {
                            setSelectpipeODOption(option);
                            setFormData({
                              ...formData,
                              size: option.value,
                            });
                            setErrors({
                              ...errors,
                              size: null
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
                        {errors.size && (
                          <span className="text-danger fs-12">
                            {errors.size}
                          </span>
                        )}
                      </div>
                    </>
                  )
                }
                {/**Inner Diameter(MM) */}
                <div className="col-md-2">
                  <label className="col-form-label">Inner Diameter*(in mm)</label>
                  <input
                    name="inner_diameter"
                    value={formData.inner_diameter}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter Inner Diameter"
                  />
                  {errors.inner_diameter && (
                    <span className="text-danger fs-12">{errors.inner_diameter}</span>
                  )}
                </div>
                {/**Thickness(MM) */}
                <div className="col-md-2">
                  <label className="col-form-label">Thickness*(in mm)</label>
                  <input
                    name="thickness"
                    value={formData.thickness}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter Thickness"
                  />
                  {errors.thickness && (
                    <span className="text-danger fs-12">{errors.thickness}</span>
                  )}
                </div>
                {/**Hardness(Shore) */}
                <div className="col-md-2">
                  <label className="col-form-label">Hardness (Shore)</label>
                  <input
                    name="hardness"
                    value={formData.hardness}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter Hardness"
                  />
                  {errors.hardness && (
                    <span className="text-danger fs-12">{errors.hardness}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Additional</h4>
              </div>
              <div className="card-body">
                <div className="mb-3 row">

                  <div className="col-md-6">
                    <label className="col-form-label">Additional<small style={{ color: "grey" }} >(Optional Field)*</small></label>
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
        </div>
    </>
  );
};

export default O_ringSection;
