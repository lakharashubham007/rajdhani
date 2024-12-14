
import React, { useState } from "react";
import Select from "react-select";



const SpringSection = (props) => {
  const {formData, 
    setFormData, 
    errors ,
    springTypeOption, 
    setSpringTypeOption, 
    selectedSpringTypeOption, 
    setSelectedSpringTypeOption} = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //   hose_size:

  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Spring Section</h4>
            </div>
            <div className="card-body">
                <div className="mb-3 row">
                  <div className="col-md-4">
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
                  <div className="col-md-4">
                    <label className="col-form-label">Spring Length</label>
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

                  <div className="col-md-4">
                    <label className="col-form-label">Spring Type</label> 
                    <Select
                      value={selectedSpringTypeOption}
                      onChange={(option) => {
                        setSelectedSpringTypeOption(option);
                        setFormData({
                          ...formData,
                          spring_type: option.value,
                        });
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
                </div>
             
                <div className="mb-3 row">
               

                  <div className="col-md-4">
                    <label className="col-form-label">Hose Size</label>
                    <input
                      name="hose_size"
                      value={formData.hose_size}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Hose Size"
                    />
                    {errors.hose_size && (
                      <span className="text-danger fs-12">{errors.hose_size}</span>
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
