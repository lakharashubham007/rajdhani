
import React, { useState } from "react";
import Select from "react-select";


const DustCapSection = (props) => {
  const {
    formData,
    setFormData,
    errors,
    setErrors,

    //colors
    dustCapColorsOptions,
    setDustCapColorOption,
    selectedDustCapColorOption,
    setSelectedDustCapColorOption,
    //Fitting Thread
    dustCapThreadTypeOptions,
    selectedFittingThreadOption,
    setSelectedFittingThreadOption,
    //Fitting Dash Size Option
    fittingDashSizeOption,
    selectedFittingDashSizeOption,
    setSelectedfittingDashSizeOption,
    //POD
    pipeODOption,
    setSelectpipeODOption,
    selectedpipeODOption,
    //Type
    fittingTypeOption,
    setfittingTypeOption,
    selectedFittingTypeOption,
    setSelectedFittingTypeOption,
    


    //Fitting and description code
    fittingCode,
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
                        <h4 className="card-title">Dust Cap</h4>
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
                {/**Thread */}
                <div className="col-md-3">
                  <label className="col-form-label">Thread Type</label>
                  <Select
                    value={selectedFittingThreadOption}
                    onChange={(option) => {
                      setSelectedFittingThreadOption(option);
                      setFormData({
                        ...formData,
                        fitting_thread: option?.value,
                      });
                      setErrors({
                        ...errors,
                        fitting_thread: null
                      })
                    }}
                    defaultValue={selectedFittingThreadOption}
                    options={dustCapThreadTypeOptions}
                    isClearable
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.fitting_thread && (
                    <span className="text-danger fs-12">
                      {errors.fitting_thread}
                    </span>
                  )}
                </div>
                {/**Size combo */}
                {selectedFittingThreadOption?.value !== "METRIC" ?
                  (<>
                    {selectedFittingThreadOption?.value === "SAE 61" || selectedFittingThreadOption?.value === "SAE 62" ?
                      (<>
                         <div className="col-md-3">
                          <label className="col-form-label">Thread Size*(POD)</label>
                          <Select
                            value={selectedFittingDashSizeOption}
                            onChange={(option) => {
                              setSelectedfittingDashSizeOption(option);
                              setFormData({
                                ...formData,
                                size: option.value,
                              });
                              setErrors({
                                ...errors,
                                size: null
                              })
                            }}
                            defaultValue={selectedFittingDashSizeOption}
                            options={fittingDashSizeOption}
                            style={{
                              lineHeight: "40px",
                              color: "#7e7e7e",
                              paddingLeft: " 15px",
                            }}
                          />
                          {errors.size && (
                            <span className="text-danger fs-12">
                              {errors.size}
                            </span>
                          )}
                        </div> 
                       
                      </>) : (<>
                        <div className="col-md-3">
                          <label className="col-form-label">Thread Size</label>
                          <Select
                            value={selectedFittingDashSizeOption}
                            onChange={(option) => {
                              setSelectedfittingDashSizeOption(option);
                              setFormData({
                                ...formData,
                                size: option.value,

                              });
                              setErrors({
                                ...errors,
                                size: null
                              })
                            }}
                            defaultValue={selectedFittingDashSizeOption}
                            options={fittingDashSizeOption}
                            style={{
                              lineHeight: "40px",
                              color: "#7e7e7e",
                              paddingLeft: " 15px",
                            }}
                          />
                          {errors.size && (
                            <span className="text-danger fs-12">
                              {errors.size}
                            </span>
                          )}
                        </div>
                      </>)
                    }
                  </>
                  ) : (
                    <>
                      {/* POD */}
                      {/* <div className="col-md-3">
                        <label className="col-form-label">Thread Size*(POD)</label>
                        <Select
                          value={selectedpipeODOption}
                          onChange={(option) => {
                            setSelectpipeODOption(option);
                            setFormData({
                              ...formData,
                              size: option.value,
                            });
                            setErrors({
                              ...errors,
                              size: null
                            })
                          }}
                          defaultValue={selectedpipeODOption}
                          options={pipeODOption}
                          style={{
                            lineHeight: "40px",
                            color: "#7e7e7e",
                            paddingLeft: " 15px",
                          }}
                        />
                        {errors.size && (
                          <span className="text-danger fs-12">
                            {errors.size}
                          </span>
                        )}
                      </div> */}
                        <div className="col-md-3">
                          <label className="col-form-label">Thread Size</label>
                          <Select
                            value={selectedFittingDashSizeOption}
                            onChange={(option) => {
                              setSelectedfittingDashSizeOption(option);
                              setFormData({
                                ...formData,
                                size: option?.value,

                              });
                              setErrors({
                                ...errors,
                                size: null
                              })
                            }}
                            defaultValue={selectedFittingDashSizeOption}
                            options={fittingDashSizeOption}
                           
                            style={{
                              lineHeight: "40px",
                              color: "#7e7e7e",
                              paddingLeft: " 15px",
                            }}
                          />
                          {errors.size && (
                            <span className="text-danger fs-12">
                              {errors.size}
                            </span>
                          )}
                        </div>
                    </>
                  )
                }
                {/* Color Type */}
                <div className="col-md-3">
                    <label className="col-form-label">Color</label> 
                    <Select
                      value={selectedDustCapColorOption}
                      onChange={(option) => {
                        setSelectedDustCapColorOption(option);
                        setFormData({
                          ...formData,
                          dustcap_color: option?.value,
                        });
                      }}
                      defaultValue={selectedDustCapColorOption}
                      options={dustCapColorsOptions}
                      isClearable
                    />
                    {errors.dustcap_color && (
                      <span className="text-danger fs-12">
                        {errors.dustcap_color}
                      </span>
                    )}
                  </div>

                   {selectedFittingThreadOption?.value !== "Flange" &&
                  <div className="col-md-3">
                  <label className="col-form-label">Male/Female Type</label>
                  <Select
                    value={selectedFittingTypeOption}
                    onChange={(option) => {
                      setSelectedFittingTypeOption(option);
                      setFormData({
                        ...formData,
                        male_female_type: option?.value,
                      });
                      setErrors({
                        ...errors,
                        male_female_type: null
                      })
                    }}
                    defaultValue={selectedFittingTypeOption}
                    options={fittingTypeOption}
                    isClearable
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors.male_female_type && (
                    <span className="text-danger fs-12">
                      {errors.male_female_type}
                    </span>
                  )}
                </div>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DustCapSection;
