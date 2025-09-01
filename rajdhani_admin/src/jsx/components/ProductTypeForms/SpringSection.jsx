
import React, { useState } from "react";
import Select from "react-select";



const SpringSection = (props) => {
  const { formData,
    setFormData,
    errors,
    setErrors,
    springTypeOption,
    setSpringTypeOption,
    selectedSpringTypeOption,
    setSelectedSpringTypeOption,

    //hose dash size
    HoseDashSizeOption,
    selectedhoseDashSizeOption,
    setSelectedHoseDashSizeOption,

    //Fitting and description code
    fittingCode,
    descCode,

    //Wire type for spring
    springWireTypeOption,
    selectedSpringWireTypeOption,
    setSelectedSpringWireTypeOption


  } = props;




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: null
    })
  };
  //   hose_size:

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
                        <h4 className="card-title">Spring</h4>
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
            {/* card Body */}
            <div className="card-body">
              <div className="mb-3 row">
                {/* Spring inner diameter */}
                <div className="col-md-2">
                  <label className="col-form-label">Inner Diameter</label>
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
                {/* Spring Length */}
                <div className="col-md-2">
                  <label className="col-form-label">Spring Length*(in mm)</label>
                  <input
                    name="spring_length"
                    value={formData.spring_length}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter Spring Length"
                  />
                  {errors.spring_length && (
                    <span className="text-danger fs-12">{errors.spring_length}</span>
                  )}
                </div>
                {/* Spring Type */}
                <div className="col-md-2">
                  <label className="col-form-label">Spring Type</label>
                  <Select
                    value={selectedSpringTypeOption}
                    onChange={(option) => {
                      setSelectedSpringTypeOption(option);
                      setFormData({
                        ...formData,
                        spring_type: option.value,
                      });
                      setErrors({
                        ...errors,
                        spring_type: null
                      })
                    }}
                    defaultValue={selectedSpringTypeOption}
                    options={springTypeOption}
                  />
                  {errors.spring_type && (
                    <span className="text-danger fs-12">
                      {errors.spring_type}
                    </span>
                  )}
                </div>
                {/* Hose Dash Size */}
                <div className="col-md-2">
                  <label className="col-form-label">Hose Dash Size</label>
                  <Select
                    value={selectedhoseDashSizeOption}
                    onChange={(option) => {
                      setSelectedHoseDashSizeOption(option);
                      setFormData({
                        ...formData,
                        hose_size: option.value,
                      });
                      setErrors({
                        ...errors,
                        hose_size: null
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
                  {errors.hose_size && (
                    <span className="text-danger fs-12">
                      {errors.hose_size}
                    </span>
                  )}
                </div>
                {/* Spring Wire Type */}
                <div className="col-md-2">
                  <label className="col-form-label">Spring Wire Type</label>
                  <Select
                    value={selectedSpringWireTypeOption}
                    onChange={(option) => {
                      setSelectedSpringWireTypeOption(option);
                      setFormData({
                        ...formData,
                        spring_wire_type: option ? option.value : null,
                      });
                      setErrors({
                        ...errors,
                        spring_wire_type: null,
                      });
                    }}
                    defaultValue={selectedSpringWireTypeOption}
                    options={springWireTypeOption}
                    isClearable
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: "15px",
                    }}
                  />
                  {errors?.spring_wire_type && (
                    <span className="text-danger fs-12">
                      {errors.spring_wire_type}
                    </span>
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

export default SpringSection;
