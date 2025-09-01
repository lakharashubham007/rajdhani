
//
import React, { useState } from "react";
import Select from "react-select";


const PackingSection = (props) => {
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
                        <h4 className="card-title">Packinge</h4>
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
              <div className="mb-3 row">
                {/**Item Name  */}
                <div className="col-md-6">
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

export default PackingSection;

