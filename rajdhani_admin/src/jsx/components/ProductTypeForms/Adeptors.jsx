
//
import React, { useState } from "react";
import Select from "react-select";
import { NULL } from "sass";


const Adeptors = (props) => {
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    descCode,
    partADescCode,
    partBDescCode,
    partCDescCode,



    adaptorOption,
    selectedadaptortOption,
    setSelectedadaptorOption,

    //partA
    adaptorMfcOptions,
    selectedAdaptorMFCOption,
    setSelectedAdaptorMFCOption,

    fittingThreadOption,
    selectedFittingThreadOption,
    setSelectedFittingThreadOption,

    fittingDashSizeOption,
    selectedFittingDashSizeOption,
    setSelectedfittingDashSizeOption,


    aditionaladaptorOptions,
    setSelectedAdaptorAditionalOption,
    selectedAdaptorAditionaOption,


    maleFemaleoptionsForAdaptor,
    selectedMaleFemaleoptionsForAdaptor,
    setSelectedMaleFemaleoptionsForAdaptor,


    //part B
    adaptorMfcOptionsB,
    selectedAdaptorMFCOptionB,
    setSelectedAdaptorMFCOptionB,

    fittingThreadOptionB,
    selectedFittingThreadOptionB,
    setSelectedFittingThreadOptionB,

    fittingDashSizeOptionB,
    selectedFittingDashSizeOptionB,
    setSelectedfittingDashSizeOptionB,

    aditionaladaptorOptionsB,
    setSelectedAdaptorAditionalOptionB,
    selectedAdaptorAditionaOptionB,

    maleFemaleoptionsForAdaptorB,
    selectedMaleFemaleoptionsForAdaptorB,
    setSelectedMaleFemaleoptionsForAdaptorB,



    //part C
    adaptorMfcOptionsC,
    selectedAdaptorMFCOptionC,
    setSelectedAdaptorMFCOptionC,

    fittingThreadOptionC,
    selectedFittingThreadOptionC,
    setSelectedFittingThreadOptionC,

    fittingDashSizeOptionC,
    selectedFittingDashSizeOptionC,
    setSelectedfittingDashSizeOptionC,

    aditionaladaptorOptionsC,
    setSelectedAdaptorAditionalOptionC,
    selectedAdaptorAditionaOptionC,

    maleFemaleoptionsForAdaptorC,
    selectedMaleFemaleoptionsForAdaptorC,
    setSelectedMaleFemaleoptionsForAdaptorC,


    elbowAngleOptions,
    selectedElbowAngleOptions,
    setSelectedElbowAngleOptions,







  } = props;

  console.log("selectedadaptortOption", fittingDashSizeOption)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const showPartA = [
    "PLUG MALE",
    "PLUG FEMALE",
    "ADAPTOR",
    "REDUCER",
    "ELBOW",
    "MALE TEE",
    "FEMALE TEE",
    "RUN TEE",
    "BRANCH TEE"
  ];

  const showPartB = [
    "ADAPTOR",
    "REDUCER",
    "ELBOW",
    "MALE TEE",
    "FEMALE TEE",
    "RUN TEE",
    "BRANCH TEE"
  ];

  const showPartC = [
    "MALE TEE",
    "FEMALE TEE",
    "RUN TEE",
    "BRANCH TEE"
  ];

  const selected = selectedadaptortOption?.value;



  return (
    <>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Adaptor</h4>
              <div className="col-md-4">
                <div className="d-flex justify-content-end">
                  <span style={{
                    backgroundColor: '#ff7a41',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '5px 10px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap'
                  }}>
                    Description :- {descCode}
                  </span>
                </div>
              </div>
            </div>
            <div className="card-body">

              <div className="mb-3 row">
                <div className="col-md-3">
                  <label className="col-form-label">Select Adaptor Type</label>
                  <Select
                    value={selectedadaptortOption}
                    isClearable
                    onChange={(option) => {
                      setSelectedadaptorOption(option);
                      setFormData({
                        ...formData,
                        adaptor_type: option ? option.value : null,
                      });
                      setErrors({
                        ...errors,
                        adaptor_type: null,
                      });
                    }}
                    // defaultValue={selectedDesignOption}
                    options={adaptorOption}
                    style={{
                      lineHeight: "40px",
                      color: "#7e7e7e",
                      paddingLeft: " 15px",
                    }}
                  />
                  {errors?.adaptor_type && (
                    <span className="text-danger fs-12">
                      {errors?.adaptor_type}
                    </span>
                  )}
                </div>

                {selectedadaptortOption?.value === "ELBOW" &&
                  <div className="col-md-3">
                    <label className="col-form-label">Elbow Angle</label>
                    <Select
                      value={selectedElbowAngleOptions}
                      isClearable
                      onChange={(option) => {
                        setSelectedElbowAngleOptions(option);

                        setFormData({
                          ...formData,
                          elbow_angle: option ? option.value : null,  // ✅ real null, not string
                        });

                        setErrors({
                          ...errors,
                          elbow_angle: null,
                        });
                      }}
                      options={elbowAngleOptions}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: "15px",
                      }}
                    />
                    {errors?.elbow_angle && (
                      <span className="text-danger fs-12">
                        {errors?.elbow_angle}
                      </span>
                    )}
                  </div>
                }

              </div>
            </div>

          </div>
        </div>
      </div>


      {showPartA.includes(selected) && (
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Part A</h4>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <span style={{
                      backgroundColor: '#00809D',
                      color: 'white',
                      borderRadius: '12px',
                      padding: '5px 10px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap'
                    }}>
                      Description :- {partADescCode}
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-3 row">


                  <div className="col-md-2">
                    <label className="col-form-label">MFC</label>
                    <Select
                      value={selectedAdaptorMFCOption}
                      isClearable
                      onChange={(option) => {
                        setSelectedAdaptorMFCOption(option);
                        setFormData((prev) => ({
                          ...prev,
                          part_a: {
                            ...prev.part_a,
                            mfc: option ? option.value : null,
                          },
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          mfc: null,
                        }));
                      }}
                      defaultValue={selectedAdaptorMFCOption}
                      options={adaptorMfcOptions}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.mfc && (
                      <span className="text-danger fs-12">
                        {errors.mfc}
                      </span>
                    )}
                  </div>


                  <div className="col-md-2">
                    <label className="col-form-label">Fitting Thread</label>
                    <Select
                      value={selectedFittingThreadOption}
                      onChange={(option) => {
                        setSelectedFittingThreadOption(option);
                        setFormData((prev) => ({
                          ...prev,
                          part_a: {
                            ...prev.part_a,
                            fitting_thread: option.value,
                          },
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          fitting_thread: null,
                        }));
                      }}
                      defaultValue={selectedFittingThreadOption}
                      options={fittingThreadOption}
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



                  <div className="col-md-2">
                    <label className="col-form-label">Size</label>
                    <Select
                      value={selectedFittingDashSizeOption}
                      onChange={(option) => {
                        setSelectedfittingDashSizeOption(option);
                        setFormData((prev) => ({
                          ...prev,
                          part_a: {
                            ...prev.part_a,
                            size: option?.value,
                          },
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          size: null,
                        }));
                      }}
                      defaultValue={selectedFittingDashSizeOption}
                      options={fittingDashSizeOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: "15px",
                      }}
                    />
                    {errors.size && (
                      <span className="text-danger fs-12">
                        {errors.size}
                      </span>
                    )}
                  </div>


                  <div className="col-md-2">
                    <label className="col-form-label">Male / Female Options</label>
                    <Select
                      value={selectedMaleFemaleoptionsForAdaptor}
                      onChange={(option) => {
                        setSelectedMaleFemaleoptionsForAdaptor(option);
                        setFormData((prev) => ({
                          ...prev,
                          part_a: {
                            ...prev.part_a,
                            male_female_type: option.value,
                          },
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          male_female_type: null,
                        }));
                      }}
                      defaultValue={selectedMaleFemaleoptionsForAdaptor}
                      options={maleFemaleoptionsForAdaptor}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: "15px",
                      }}
                    />
                    {errors.male_female_type && (
                      <span className="text-danger fs-12">
                        {errors.male_female_type}
                      </span>
                    )}
                  </div>


                  <div className="col-md-4">
                    <label className="col-form-label">Additional Options</label>
                    <Select
                      value={selectedAdaptorAditionaOption}
                      isClearable
                      onChange={(option) => {
                        setSelectedAdaptorAditionalOption(option);

                        setFormData((prev) => ({
                          ...prev,
                          part_a: {
                            ...prev.part_a,
                            additional_option: option ? option.value : null,
                          },
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          additional_option: null,
                        }));
                      }}
                      defaultValue={selectedAdaptorAditionaOption}
                      options={aditionaladaptorOptions}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: "15px",
                      }}
                    />
                    {errors.additional_option && (
                      <span className="text-danger fs-12">
                        {errors.additional_option}
                      </span>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPartB.includes(selected) && (
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Part B</h4>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <span style={{
                      backgroundColor: '#C71E64',
                      color: 'white',
                      borderRadius: '12px',
                      padding: '5px 10px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap'
                    }}>
                      Description :- {partBDescCode}
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-3 row">



                  <div className="col-md-2">
                    <label className="col-form-label">MFC</label>
                    <Select
                      value={selectedAdaptorMFCOptionB}
                      isClearable
                      onChange={(option) => {
                        setSelectedAdaptorMFCOptionB(option);
                        setFormData((prev) => ({
                          ...prev,
                          part_b: {
                            ...prev.part_b,
                            mfc: option ? option.value : null,
                          },
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          mfc: null,
                        }));
                      }}
                      defaultValue={selectedAdaptorMFCOptionB}
                      options={adaptorMfcOptionsB}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.mfc && (
                      <span className="text-danger fs-12">
                        {errors.mfc}
                      </span>
                    )}
                  </div>







                  <div className="col-md-2">
                    <label className="col-form-label">Fitting Thread</label>
                    <Select
                      value={selectedFittingThreadOptionB}
                      onChange={(option) => {
                        setSelectedFittingThreadOptionB(option);
                        setFormData((prev) => ({
                          ...prev,
                          part_b: {
                            ...prev.part_b,
                            fitting_thread: option.value,
                          },
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          fitting_thread: null,
                        }));
                      }}
                      defaultValue={selectedFittingThreadOptionB}
                      options={fittingThreadOptionB}
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



                  <div className="col-md-2">
                    <label className="col-form-label">Size</label>
                    <Select
                      value={selectedFittingDashSizeOptionB}
                      onChange={(option) => {
                        setSelectedfittingDashSizeOptionB(option);
                        setFormData((prev) => ({
                          ...prev,
                          part_b: {
                            ...prev.part_b,
                            size: option?.value,
                          },
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          size: null,
                        }));
                      }}
                      defaultValue={selectedFittingDashSizeOptionB}
                      options={fittingDashSizeOptionB}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: "15px",
                      }}
                    />
                    {errors.size && (
                      <span className="text-danger fs-12">
                        {errors.size}
                      </span>
                    )}
                  </div>


                  <div className="col-md-2">
                    <label className="col-form-label">Male / Female Options</label>
                    <Select
                      value={selectedMaleFemaleoptionsForAdaptorB}
                      onChange={(option) => {
                        setSelectedMaleFemaleoptionsForAdaptorB(option);
                        setFormData((prev) => ({
                          ...prev,
                          part_b: {
                            ...prev.part_b,
                            male_female_type: option.value,
                          },
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          male_female_type: null,
                        }));
                      }}
                      defaultValue={selectedMaleFemaleoptionsForAdaptorB}
                      options={maleFemaleoptionsForAdaptorB}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: "15px",
                      }}
                    />
                    {errors.male_female_type && (
                      <span className="text-danger fs-12">
                        {errors.male_female_type}
                      </span>
                    )}
                  </div>


                  <div className="col-md-4">
                    <label className="col-form-label">Additional Options</label>
                    <Select
                      value={selectedAdaptorAditionaOptionB}
                      isClearable
                      onChange={(option) => {
                        setSelectedAdaptorAditionalOptionB(option);
                        setFormData((prev) => ({
                          ...prev,
                          part_b: {
                            ...prev.part_b,
                            additional_option: option ? option.value : null,
                          },
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          additional_option: null,
                        }));
                      }}
                      defaultValue={selectedAdaptorAditionaOptionB}
                      options={aditionaladaptorOptionsB}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: "15px",
                      }}
                    />
                    {errors.additional_option && (
                      <span className="text-danger fs-12">
                        {errors.additional_option}
                      </span>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {showPartC.includes(selected) && (
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Part C</h4>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <span style={{
                      backgroundColor: '#556B2F',
                      color: 'white',
                      borderRadius: '12px',
                      padding: '5px 10px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap'
                    }}>
                      Description :- {partCDescCode}
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-3 row">

                  <div className="col-md-2">
                    <label className="col-form-label">MFC</label>
                    <Select
                      value={selectedAdaptorMFCOptionC}
                      isClearable
                      onChange={(option) => {
                        setSelectedAdaptorMFCOptionC(option);
                        setFormData((prev) => ({
                          ...prev,
                          part_b: {
                            ...prev.part_c,
                            mfc: option ? option.value : null,
                          },
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          mfc: null,
                        }));
                      }}
                      defaultValue={selectedAdaptorMFCOptionC}
                      options={adaptorMfcOptionsC}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.mfc && (
                      <span className="text-danger fs-12">
                        {errors.mfc}
                      </span>
                    )}
                  </div>


                  <div className="col-md-2">
                    <label className="col-form-label">Fitting Thread</label>
                    <Select
                      value={selectedFittingThreadOptionC}
                      onChange={(option) => {
                        setSelectedFittingThreadOptionC(option);
                        setFormData((prev) => ({
                          ...prev,
                          part_c: {
                            ...prev.part_c,
                            fitting_thread: option.value,
                          },
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          fitting_thread: null,
                        }));
                      }}
                      defaultValue={selectedFittingThreadOptionC}
                      options={fittingThreadOptionC}
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



                  <div className="col-md-2">
                    <label className="col-form-label">Size</label>
                    <Select
                      value={selectedFittingDashSizeOptionC}
                      onChange={(option) => {
                        setSelectedfittingDashSizeOptionC(option);
                        setFormData((prev) => ({
                          ...prev,
                          part_c: {
                            ...prev.partc,
                            size: option?.value,
                          },
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          size: null,
                        }));
                      }}
                      defaultValue={selectedFittingDashSizeOptionC}
                      options={fittingDashSizeOptionC}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: "15px",
                      }}
                    />
                    {errors.size && (
                      <span className="text-danger fs-12">
                        {errors.size}
                      </span>
                    )}
                  </div>


                  <div className="col-md-2">
                    <label className="col-form-label">Male / Female Options</label>
                    <Select
                      value={selectedMaleFemaleoptionsForAdaptorC}
                      onChange={(option) => {
                        setSelectedMaleFemaleoptionsForAdaptorC(option);
                        setFormData((prev) => ({
                          ...prev,
                          part_c: {
                            ...prev.part_c,
                            male_female_type: option.value,
                          },
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          male_female_type: null,
                        }));
                      }}
                      defaultValue={selectedMaleFemaleoptionsForAdaptorC}
                      options={maleFemaleoptionsForAdaptorC}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: "15px",
                      }}
                    />
                    {errors.male_female_type && (
                      <span className="text-danger fs-12">
                        {errors.male_female_type}
                      </span>
                    )}
                  </div>


                  <div className="col-md-4">
                    <label className="col-form-label">Additional Options</label>
                    <Select
                      value={selectedAdaptorAditionaOptionC}
                      isClearable
                      onChange={(option) => {
                        setSelectedAdaptorAditionalOptionC(option);
                        setFormData((prev) => ({
                          ...prev,
                          part_c: {
                            ...prev.part_c,
                            additional_option: option ? option.value : null,
                          },
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          additional_option: null,
                        }));
                      }}
                      defaultValue={selectedAdaptorAditionaOptionC}
                      options={aditionaladaptorOptionsC}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: "15px",
                      }}
                    />
                    {errors.additional_option && (
                      <span className="text-danger fs-12">
                        {errors.additional_option}
                      </span>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* 
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
      </div> */}
    </>
  );
};

export default Adeptors;

