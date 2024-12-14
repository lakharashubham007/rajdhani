

import React, { useState } from "react";

const PackingSection = (props) => {
  const {formData, setFormData, errors}= props;

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
              <h4 className="card-title">Packing Section</h4>
            </div>
            <div className="card-body">
                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label className="col-form-label">Item Name</label>
                    <input
                      name="item_name"
                      value={formData.item_name}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Item Name"
                    />
                    {errors.item_name && (
                      <span className="text-danger fs-12">{errors.item_name}</span>
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

                  <div className="col-md-4">
                    <label className="col-form-label">Dimensions</label>
                    <input
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Dimensions"
                    />
                    {errors.dimensions && (
                      <span className="text-danger fs-12">{errors.dimensions}</span>
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

export default PackingSection;
