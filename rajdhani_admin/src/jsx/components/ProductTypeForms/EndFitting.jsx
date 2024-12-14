import React, { useEffect, useState } from "react";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Toaster } from "../../components/Toaster/Toster";
import Loader from "../../components/Loader/Loader";
import { addProductApi } from "../../../services/apis/Product";
import { useNavigate } from "react-router-dom";

const EndFittingForm = (props) => {
  const {
    formData,
    setFormData,
    errors,
    resetForm,
    wireTypeOption,
    setWireTypeOption,
    selectedWireTypeOption,
    setSelectedWireTypeOption,
    withCapWithoutCapOption,
    setWithCapWithoutCapOption,
    selectedWithCapWithoutCapOption,
    setSelectedWithCapWithoutCapOption,
    fittingPieceOption,
    setFittingPieceOption,
    selectedFittingPieceOption,
    setSelectedFittingPieceOption,
    skiveTypeOption,
    setSkiveTypeOption,
    selectedSkiveTypeOption,
    setSelectedSkiveTypeOption,
    HoseDashSizeOption,
    setHoseDashSizeOption,
    selectedhoseDashSizeOption,
    setSelectedHoseDashSizeOption,
    fittingDashSizeOption,
    setfittingDashSizeOption,
    selectedFittingDashSizeOption,
    setSelectedfittingDashSizeOption,
    fittingThreadOption,
    setfittingThreadOption,
    selectedFittingThreadOption,
    setSelectedFittingThreadOption,
    fittingTypeOption,
    setfittingTypeOption,
    selectedFittingTypeOption,
    setSelectedFittingTypeOption,
    straightBendangleOption,
    setStraightBendangleOption,
    selectedStraightBendangleOption,
    setSelectedStraightBendangleOption,
    dropLengthOption,
    setDropLengthOption,
    selectedDropLengthOption,
    setSelectedDropLengthOption,
    neckLengthOption,
    setNeckLengthOption,
    selectedNeckLengthOption,
    setselectedNeckLengthOption,
  } =props;

  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // if(errors[name]) {
    //   setErrors({
    //     ...errors,
    //     [name]: null,
    //   });
    // }
  };

  const resetEndFittingForm = () => {
    setFormData({
      design: "",
      wire_type: "",
      with_cap: [],
      fitting_piece: "",
      skive_type: "",
      hose_dash_size: "",
      fitting_dash_size: "",
      fitting_thread: "",
      fitting_type: "",
      straight_bend_angle: "",
      drop_length: "",
      neck_length: "",

      ferrule_design: "",
      ferrule_wire_type: "",
      ferrule_hose_dash_size: "",
    });

    setSelectedWireTypeOption(null);
    setSelectedWithCapWithoutCapOption(null);
    setSelectedFittingPieceOption(null);
    setSelectedSkiveTypeOption(null);
    setSelectedHoseDashSizeOption(null);
    setSelectedFittingThreadOption(null);
    setSelectedStraightBendangleOption(null);
    setSelectedDropLengthOption(null);
  
    // setErrors({});
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <Loader visible={loading} />

      <div className="row">
        {/* SECTION 1ST */}
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">End Fitting</h4>
            </div>
            <div className="card-body">
              <div>
                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label className="col-form-label">Design</label>
                    <input
                      name="design"
                      value={formData.design}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.design && (
                      <span className="text-danger fs-12">{errors.design}</span>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Wire Type</label>
                    <Select
                      value={selectedWireTypeOption}
                      onChange={(option) => {
                        setSelectedWireTypeOption(option);
                        setFormData({
                          ...formData,
                          wire_type: option.value,
                        });
                      }}
                      defaultValue={selectedWireTypeOption}
                      options={wireTypeOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.wire_type && (
                      <span className="text-danger fs-12">
                        {errors.wire_type}
                      </span>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">
                      With Cap / Without Cap
                    </label>
                    <Select
                      isMulti 
                      value={selectedWithCapWithoutCapOption}
                      onChange={(selectedOptions) => {
                        setSelectedWithCapWithoutCapOption(selectedOptions); // Store the selected options
                        setFormData({
                          ...formData,
                          with_cap: selectedOptions?.map(option => option.value), // Extract values from selected options
                        });
                      }}
                      defaultValue={selectedWithCapWithoutCapOption}
                      options={withCapWithoutCapOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}/>
                    {errors.with_cap && (
                      <span className="text-danger fs-12">
                        {errors.with_cap}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label className="col-form-label">Fitting Piece</label>
                    <Select
                      value={selectedFittingPieceOption}
                      onChange={(option) => {
                        setSelectedFittingPieceOption(option);
                        setFormData({
                          ...formData,
                          fitting_piece: option.value,
                        });
                      }}
                      defaultValue={selectedFittingPieceOption}
                      options={fittingPieceOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.fitting_piece && (
                      <span className="text-danger fs-12">
                        {errors.fitting_piece}
                      </span>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Skive Type</label>
                    <Select
                      value={selectedSkiveTypeOption}
                      onChange={(option) => {
                        setSelectedSkiveTypeOption(option);
                        setFormData({
                          ...formData,
                          skive_type: option.value,
                        });
                      }}
                      defaultValue={selectedSkiveTypeOption}
                      options={skiveTypeOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.skive_type && (
                      <span className="text-danger fs-12">
                        {errors.skive_type}
                      </span>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Hose Dash Size</label>
                    <Select
                      value={selectedhoseDashSizeOption}
                      onChange={(option) => {
                        setSelectedHoseDashSizeOption(option);
                        setFormData({
                          ...formData,
                          hose_dash_size: option.value,
                        });
                      }}
                      defaultValue={selectedhoseDashSizeOption}
                      options={HoseDashSizeOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.hose_dash_size && (
                      <span className="text-danger fs-12">
                        {errors.hose_dash_size}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label className="col-form-label">Fitting Dash Size</label>
                    <Select
                      value={selectedFittingDashSizeOption}
                      onChange={(option) => {
                        setSelectedfittingDashSizeOption(option);
                        setFormData({
                          ...formData,
                          fitting_dash_size: option.value,
                        });
                      }}
                      defaultValue={selectedFittingDashSizeOption}
                      options={fittingDashSizeOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.fitting_dash_size && (
                      <span className="text-danger fs-12">
                        {errors.fitting_dash_size}
                      </span>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Fitting Thread</label>
                    <Select
                      value={selectedFittingThreadOption}
                      onChange={(option) => {
                        setSelectedFittingThreadOption(option);
                        setFormData({
                          ...formData,
                          fitting_thread: option.value,
                        });
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

                  <div className="col-md-4">
                    <label className="col-form-label">Fitting Type</label>
                    <Select
                      value={selectedFittingTypeOption}
                      onChange={(option) => {
                        setSelectedFittingTypeOption(option);
                        setFormData({
                          ...formData,
                          fitting_type: option.value,
                        });
                      }}
                      defaultValue={selectedFittingTypeOption}
                      options={fittingTypeOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.fitting_type && (
                      <span className="text-danger fs-12">
                        {errors.fitting_type}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label className="col-form-label">
                      Straight Bend Angle
                    </label>
                    <Select
                      value={selectedStraightBendangleOption}
                      onChange={(option) => {
                        setSelectedStraightBendangleOption(option);
                        setFormData({
                          ...formData,
                          straight_bend_angle: option.value,
                        });
                      }}
                      defaultValue={selectedStraightBendangleOption}
                      options={straightBendangleOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.straight_bend_angle && (
                      <span className="text-danger fs-12">
                        {errors.straight_bend_angle}
                      </span>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Drop Length</label>
                    <Select
                      value={selectedDropLengthOption}
                      onChange={(option) => {
                        setSelectedDropLengthOption(option);
                        setFormData({
                          ...formData,
                          drop_length: option.value,
                        });
                      }}
                      defaultValue={selectedDropLengthOption}
                      options={dropLengthOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.drop_length && (
                      <span className="text-danger fs-12">
                        {errors.drop_length}
                      </span>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Neck Length</label>
                    <Select
                      value={selectedNeckLengthOption}
                      onChange={(option) => {
                        setselectedNeckLengthOption(option);
                        setFormData({
                          ...formData,
                          neck_length: option.value,
                        });
                      }}
                      defaultValue={selectedNeckLengthOption}
                      options={neckLengthOption}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors.neck_length && (
                      <span className="text-danger fs-12">
                        {errors.neck_length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        <div className="row">
          {/* SECTION 1ST */}
          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Ferrule(Part of End Fittings)</h4>
              </div>
              <div className="card-body">
                <div className="mb-3 row">
                  <div className="col-md-4">
                    <label className="col-form-label">Design</label>
                    <input
                      name="ferrule_design"
                      value={formData.ferrule_design}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.ferrule_design && (
                      <span className="text-danger fs-12">
                        {errors.ferrule_design}
                      </span>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Wire Type</label>
                    <input
                      name="ferrule_wire_type"
                      value={formData.ferrule_wire_type}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.ferrule_wire_type && (
                      <span className="text-danger fs-12">
                        {errors.ferrule_wire_type}
                      </span>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label className="col-form-label">Hose Dash Size</label>
                    <input
                      name="ferrule_hose_dash_size"
                      value={formData.ferrule_hose_dash_size}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.ferrule_hose_dash_size && (
                      <span className="text-danger fs-12">
                        {errors.ferrule_hose_dash_size}
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

export default EndFittingForm;
