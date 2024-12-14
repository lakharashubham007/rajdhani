
import React, { useState } from "react";

const TubeFittingsSection = (props) => {
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
              <h4 className="card-title">Tube Fittings</h4>
            </div>
            <div className="card-body">
                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label className="col-form-label">Fitting Type</label>
                    <input
                      name="fitting_type"
                      value={formData.fitting_type}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Fitting Type"
                    />
                    {errors.fitting_type && (
                      <span className="text-danger fs-12">{errors.fitting_type}</span>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="col-form-label">Shape</label>
                    <input
                      name="shape"
                      value={formData.shape}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Shape"
                    />
                    {errors.shape && (
                      <span className="text-danger fs-12">{errors.shape}</span>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">End</label>
                    <input
                      name="end"
                      value={formData.end}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter End"
                    />
                    {errors.end && (
                      <span className="text-danger fs-12">{errors.end}</span>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                <div className="col-md-4">
                    <label className="col-form-label">Size</label>
                    <input
                      name="tube_size"
                      value={formData.tube_size}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Size"
                    />
                    {errors.tube_size && (
                      <span className="text-danger fs-12">{errors.tube_size}</span>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Material</label>
                    <input
                      name="material"
                      value={formData.material}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Material"
                    />
                    {errors.material && (
                      <span className="text-danger fs-12">{errors.material}</span>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Additional Process</label>
                    <input
                      name="additionalProcess"
                      value={formData.additionalProcess}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Additional Process"
                    />
                    {errors.additionalProcess && (
                      <span className="text-danger fs-12">
                        {errors.additionalProcess}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label className="col-form-label">Supply</label>
                    <input
                      name="supply"
                      value={formData.supply}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Supply"
                    />
                    {errors.supply && (
                      <span className="text-danger fs-12">{errors.supply}</span>
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

export default TubeFittingsSection;
