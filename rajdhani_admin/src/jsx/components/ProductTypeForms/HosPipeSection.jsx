import React, { useState } from "react";

const HosPipeSection = (props) => {
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
              <h4 className="card-title">Hose Pipe</h4>
            </div>
            <div className="card-body">
                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label className="col-form-label">Brand</label>
                    <input
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      type="text"
                      className={`form-control`}
                      placeholder="Enter Brand"
                    />
                    {errors.brand && <span className="text-danger fs-12 fs-12">{errors.brand}</span>}
                  </div>
                  <div className="col-md-4">
                    <label className="col-form-label">Brand Lay Line</label>
                    <input
                      name="brandLayLine"
                      value={formData.brandLayLine}
                      onChange={handleChange}
                      type="text"
                      className={`form-control`}
                      placeholder="Enter Brand Lay Line"
                    />
                    {errors.brandLayLine && (
                      <span className="text-danger fs-12">{errors.brandLayLine}</span>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="col-form-label">MFC</label>
                    <input
                      name="mfc"
                      value={formData.mfc}
                      onChange={handleChange}
                      type="text"
                      className={`form-control`}
                      placeholder="Enter MFC"
                    />
                    {errors.mfc && <span className="text-danger fs-12">{errors.mfc}</span>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label className="col-form-label">Hose Dash Size</label>
                    <input
                      name="hoseDashSize"
                      value={formData.hoseDashSize}
                      onChange={handleChange}
                      type="text"
                      className={`form-control`}
                      placeholder="Enter Hose Dash Size"
                    />
                    {errors.hoseDashSize && (
                      <span className="text-danger fs-12">{errors.hoseDashSize}</span>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="col-form-label">Hose Type</label>
                    <input
                      name="hoseType"
                      value={formData.hoseType}
                      onChange={handleChange}
                      type="text"
                      className={`form-control`}
                      placeholder="Enter Hose Type"
                    />
                    {errors.hoseType && (
                      <span className="text-danger fs-12">{errors.hoseType}</span>
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

export default HosPipeSection;
