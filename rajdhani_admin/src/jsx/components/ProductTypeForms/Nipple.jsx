import React, { useEffect, useState } from "react";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Toaster } from "../../components/Toaster/Toster";
import Loader from "../../components/Loader/Loader";
import { addProductApi } from "../../../services/apis/Product";
import { useNavigate } from "react-router-dom";

const Nipple = (props) => {
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
        variantOption,
        setVariantOption,
        selectedvariantOption,
        setSelectedvariantOption,
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

        pipeODOption,
        setpipeODOption,
        selectpipeODOption,
        setSelectpipeODOption,
        selectedpipeODOption,

        matricTypeOption,
        setMatricTypeOption,
        selectedmetricTypeOptions,
        setSelectedmetricTypeOptions,

        fittingCode,
        descCode,


        setSelectedDesignOption,
        selectedDesignOption,
        designOption

    } = props;

    const [loading, setLoading] = useState(false);


    console.log("sselectpipeODOption", selectedpipeODOption)

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
                        <div className="mb-3 row">
                            <div className="col-md-12">
                                <div className="">
                                    {/* <h4 className="card-title">End Fitting</h4> */}
                                    <div className="card-header row">
                                        <div className="col-md-4">
                                            <div className="d-flex align-items-center">
                                                <h4 className="card-title">Nipple</h4>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <span style={{
                                                    backgroundColor: '#6a73fa',
                                                    color: 'white',
                                                    borderRadius: '12px',
                                                    padding: '5px 10px',
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    marginRight: '100px'
                                                }}>
                                                    FittingCode :- {fittingCode}
                                                </span>
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
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    Description :- {descCode}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div>
                                <div className="mb-3 row">
                                    <div className="col-md-3">
                                        <label className="col-form-label">Design</label>
                                        <Select
                                            value={selectedDesignOption}
                                            onChange={(option) => {
                                                setSelectedDesignOption(option);
                                                setFormData({
                                                    ...formData,
                                                    design: option.value,
                                                });
                                            }}
                                            defaultValue={selectedDesignOption}
                                            options={designOption}
                                            style={{
                                                lineHeight: "40px",
                                                color: "#7e7e7e",
                                                paddingLeft: " 15px",
                                            }}
                                        />
                                        {errors.design && (
                                            <span className="text-danger fs-12">
                                                {errors.design}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Section2 */}
            <div className="row">
                {/* SECTION  */}
                <div className="col-xl-12 col-lg-12">
                    <div className="card">

                        <div className="card-header" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            padding: '10px',
                            // backgroundColor: '#f8f9fa'
                        }}>
                            <h4 className="card-title" style={{ marginLeft: 15 }}>Nut Thread & Size</h4>

                        </div>
                        <div className="card-body">
                            {/* First */}
                            <div className="mb-3 row">

                                <div className="col-md-3">
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


                                <div className="col-md-3">
                                    <label className="col-form-label">Fitting Dash Size</label>
                                    <Select
                                        value={selectedFittingDashSizeOption}
                                        onChange={(option) => {
                                            setSelectedfittingDashSizeOption(option);
                                            setFormData({
                                                ...formData,
                                                fitting_dash_size: option,

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


                                <div className="col-md-3">
                                    <label className="col-form-label">
                                        Nut Hex <small style={{ color: "grey" }} >(In mm)*</small>
                                    </label>
                                    <input
                                        name="nut_hex"
                                        value={formData.neck_length}
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: 15"
                                    />
                                    {errors.nut_hex && (
                                        <span className="text-danger fs-12">{errors.nut_hex}</span>
                                    )}
                                </div>

                                <div className="col-md-3">
                                    <label className="col-form-label">
                                        Nut Length <small style={{ color: "grey" }} >(In mm)*</small>
                                    </label>
                                    <input
                                        name="nut_hex"
                                        value={formData.nut_length}
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: 15"
                                    />
                                    {errors.nut_length && (
                                        <span className="text-danger fs-12">{errors.nut_length}</span>
                                    )}
                                </div>

                            </div>
                            <div className="mb-3 row">

                                {/* <div className="col-md-3">
                                    <label className="col-form-label">
                                        Nut Hex <small style={{ color: "grey" }} >(In mm)*</small>
                                    </label>
                                    <input
                                        name="nut_hex"
                                        value={formData.neck_length}
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: 15"
                                    />
                                    {errors.nut_hex && (
                                        <span className="text-danger fs-12">{errors.nut_hex}</span>
                                    )}
                                </div> */}

                                {/* <div className="col-md-3">
                                    <label className="col-form-label">
                                        Nut Length <small style={{ color: "grey" }} >(In mm)*</small>
                                    </label>
                                    <input
                                        name="nut_hex"
                                        value={formData.nut_length}
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: 15"
                                    />
                                    {errors.nut_length && (
                                        <span className="text-danger fs-12">{errors.nut_length}</span>
                                    )}
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Nipple;
