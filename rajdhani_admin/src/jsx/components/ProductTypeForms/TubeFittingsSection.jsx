import React, { useEffect, useState } from "react";
import Select from "react-select";


const TubeFitting = (props) => {
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    //options
    tubeFittingsThreadOption,
    tubeFittingsCategoryOption,
    //
    selectedTubeFittingsCategoryOption,
    setSelectedTubeFittingsCategoryOption,
    selectedTubeFittingsThreadOption,
    setSelectedTubeFittingsThreadOption,
  } = props;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
                        <h4 className="card-title">Tube Fitting</h4>
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


                    {/* <div className="col-md-4">
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
                    </div> */}

                  </div>
                </div>
              </div>
            </div>
            {/* Card Header Body */}
            <div className="card-body">
              {/* Thread and Size */}
              <div className="mb-3 row">
                {/**Thread */}
                <div className="col-md-5">
                  <label className="col-form-label">Thread</label>
                  <Select
                    value={selectedTubeFittingsThreadOption}
                    onChange={(option) => {
                      setSelectedTubeFittingsThreadOption(option);
                      setFormData({
                        ...formData,
                        tube_fitting_thread: option?.value ? option?.value : null,
                      });
                      setErrors({
                        ...errors,
                        tube_fitting_thread: null
                      })
                    }}
                    defaultValue={selectedTubeFittingsThreadOption}
                    options={tubeFittingsThreadOption}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                    isClearable
                  />
                  {errors.tube_fitting_thread && (
                    <span className="text-danger fs-12">
                      {errors.tube_fitting_thread}
                    </span>
                  )}
                </div>

                {/*Catgeory*/}
                <div className="col-md-5">
                  <label className="col-form-label">Category</label>
                  <Select
                    value={selectedTubeFittingsCategoryOption}
                    onChange={(option) => {
                      setSelectedTubeFittingsCategoryOption(option);
                      setFormData({
                        ...formData,
                        tube_fitting_category: option?.value ? option?.value : null,
                      });
                      setErrors({
                        ...errors,
                        tube_fitting_category: null
                      })
                    }}
                    defaultValue={selectedTubeFittingsCategoryOption}
                    options={tubeFittingsCategoryOption}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors?.tube_fitting_category && (
                    <span className="text-danger fs-12">
                      {errors?.tube_fitting_category}
                    </span>
                  )}
                </div>
              </div>

              <div className="row">

                {/**Part Code */}
                <div className="col-md-5">
                  <label className="col-form-label">Part Code</label>
                  <input
                    name="part_code"
                    value={formData?.part_code}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter Part Code"
                  />
                  {errors.part_code && (
                    <span className="text-danger fs-12">{errors.part_code}</span>
                  )}
                </div>

                <div className="col-md-7">
                  <label className="col-form-label">Part Description</label>
                  <textarea
                    name="part_description"
                    className="form-control"
                    rows="2"
                    id="comment"
                    placeholder="Enter Part Description."
                    value={formData?.part_description}
                    onChange={handleChange}
                  ></textarea>
                  {errors.part_description && (
                    <span className="text-danger fs-12">{errors.part_description}</span>
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

export default TubeFitting;
