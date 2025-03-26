import React, { useState } from "react";
import Select from "react-select";


const VinylCoverSection = (props) => {
  const {
    formData,
    setFormData,
    errors,
    setErrors,

    descCode,
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

                {/**Inner Diameter(MM) */}
                <div className="col-md-4">
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
                
                {/**Length(Mtr) */}
                <div className="col-md-4">
                  <label className="col-form-label">Length (Mtr)</label>
                  <input
                    name="length"
                    value={formData.length}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Enter Length"
                  />
                  {errors.length && (
                    <span className="text-danger fs-12">{errors.length}</span>
                  )}
                </div>

                {/**Thickness(MM) */}
                <div className="col-md-4">
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
    </>
  );
};

export default VinylCoverSection;


// Inner Diameter (MM)
// Length(Meter)
// Thickness(MM)