import React, { useState } from "react";
import Select from "react-select";


const DustCapSection = (props) => {
  const {formData, 
    setFormData, 
    errors,
    maleFemaleOption,
    setmaleFemaleOption,
    selectedMaleFemaleOption,
    setSelectedMaleFemaleOption
  }= props;

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
            <div className="card-header">
              <h4 className="card-title">Dust Cap</h4>
            </div>
            <div className="card-body">
                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label className="col-form-label">Thread Type</label>
                    <input
                      name="threadType"
                      value={formData.threadType}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Thread Type"
                    />
                    {errors.threadType && (
                      <span className="text-danger fs-12">{errors.threadType}</span>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="col-form-label">Size</label>
                    <input
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Size"
                    />
                    {errors.size && (
                      <span className="text-danger fs-12">{errors.size}</span>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Color</label>
                    <input
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Color"
                    />
                    {errors.color && (
                      <span className="text-danger fs-12">{errors.color}</span>
                    )}
                  </div>

                </div>
                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label className="col-form-label">Male/Female</label>
                    <Select
                      isMulti 
                      value={selectedMaleFemaleOption}
                      onChange={(selectedOptions) => {
                        setSelectedMaleFemaleOption(selectedOptions); // Store the selected options
                        setFormData({
                          ...formData,
                          male_female: selectedOptions?.map(option => option.value), // Extract values from selected options
                        });
                      }}
                      defaultValue={selectedMaleFemaleOption}
                      options={maleFemaleOption}
                      />
                    {errors.gender && (
                      <span className="text-danger fs-12">{errors.gender}</span>
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

export default DustCapSection;
