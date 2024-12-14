import React, { useState } from "react";

const HoseAssemblySection = (props) => {
  const {formData, setFormData, errors} = props;

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
              <h4 className="card-title">Hose Assembly</h4>
            </div>
            <div className="card-body">
                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label className="col-form-label">Hose Brand</label>
                    <input
                      name="hoseBrand"
                      value={formData.hoseBrand}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Hose Brand"
                    />
                    {errors.hoseBrand && (
                      <span className="text-danger fs-12">{errors.hoseBrand}</span>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="col-form-label">Hose Type</label>
                    <input
                      name="hoseType"
                      value={formData.hoseType}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Hose Type"
                    />
                    {errors.hoseType && (
                      <span className="text-danger fs-12">{errors.hoseType}</span>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="col-form-label">Fitting-A</label>
                    <input
                      name="fittingA"
                      value={formData.fittingA}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Fitting-A"
                    />
                    {errors.fittingA && (
                      <span className="text-danger fs-12">{errors.fittingA}</span>
                    )}
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label className="col-form-label">Fitting-B</label>
                    <input
                      name="fittingB"
                      value={formData.fittingB}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Fitting-B"
                    />
                    {errors.fittingB && (
                      <span className="text-danger fs-12">{errors.fittingB}</span>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="col-form-label">Assembly Length</label>
                    <input
                      name="assemblyLength"
                      value={formData.assemblyLength}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Assembly Length"
                    />
                    {errors.assemblyLength && (
                      <span className="text-danger fs-12">{errors.assemblyLength}</span>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="col-form-label">Fitting Length</label>
                    <input
                      name="fittingLength"
                      value={formData.fittingLength}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Fitting Length"
                    />
                    {errors.fittingLength && (
                      <span className="text-danger fs-12">{errors.fittingLength}</span>
                    )}
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label className="col-form-label">Cut Length</label>
                    <input
                      name="cutLength"
                      value={formData.cutLength}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Cut Length"
                    />
                    {errors.cutLength && (
                      <span className="text-danger fs-12">{errors.cutLength}</span>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="col-form-label">Orientation Angle</label>
                    <input
                      name="orientationAngle"
                      value={formData.orientationAngle}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Orientation Angle"
                    />
                    {errors.orientationAngle && (
                      <span className="text-danger fs-12">
                        {errors.orientationAngle}
                      </span>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="col-form-label">Hose Protection</label>
                    <input
                      name="hoseProtection"
                      value={formData.hoseProtection}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Hose Protection"
                    />
                    {errors.hoseProtection && (
                      <span className="text-danger fs-12">
                        {errors.hoseProtection}
                      </span>
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

export default HoseAssemblySection;
