import React, { useState } from "react";

const O_ringSection = (props) => {
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
              <h4 className="card-title">O-Ring</h4>
            </div>
            <div className="card-body">
                <div className="mb-3 row">
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
                    <label className="col-form-label">Inner Diameter</label>
                    <input
                      name="innerDiameter"
                      value={formData.innerDiameter}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Inner Diameter"
                    />
                    {errors.innerDiameter && (
                      <span className="text-danger fs-12">
                        {errors.innerDiameter}
                      </span>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Thickness</label>
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
                </div>

                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label className="col-form-label">Hardness</label>
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
    </>
  );
};

export default O_ringSection;
