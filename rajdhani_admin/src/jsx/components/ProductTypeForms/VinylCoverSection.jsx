import React, { useState } from "react";
import Select from "react-select";


const VinylCoverSection = (props) => {
  const {
    formData,
    setFormData,
    errors,
    setErrors,

    vcSizeOptions,
    selectedVCSizeOption,
    setSelectedVCSizeOption,

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
      [name]: null
    })
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
                        <h4 className="card-title">Vinyl Cove</h4>
                      </div>
                    </div>

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

                {/* Sleeve Size */}
                <div className="col-md-3">
                  <label className="col-form-label">Size</label>
                  <Select
                    value={selectedVCSizeOption}
                    onChange={(option) => {
                      setSelectedVCSizeOption(option);
                      setFormData({
                        ...formData,
                        size: option?.value,
                      });
                      setErrors({
                        ...errors,
                        size: null
                      })
                    }}
                    defaultValue={selectedVCSizeOption}
                    options={vcSizeOptions}
                    isClearable
                  />
                  {errors.size && (
                    <span className="text-danger fs-12">
                      {errors.size}
                    </span>
                  )}
                </div>


                {/**Inner Diameter(MM) */}
                <div className="col-md-3">
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

                {/**Outer Diameter(MM) */}
                <div className="col-md-3">
                  <label className="col-form-label">Outer Diameter*(in mm)</label>
                  <input
                    name="outer_diameter"
                    value={formData.outer_diameter}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter Outer Diameter"
                  />
                  {errors.outer_diameter && (
                    <span className="text-danger fs-12">{errors.outer_diameter}</span>
                  )}
                </div>

                {/**Thickness(MM) */}
                <div className="col-md-3">
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

export default VinylCoverSection;


// Inner Diameter (MM)
// Length(Meter)
// Thickness(MM)