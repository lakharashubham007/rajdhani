import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import { useEffect, useState } from "react";

const CustomerShippingDetailForm = ({
    customerShippingDetailsModal,
    setCustomerShippingDetailsModal,
    formCustomerShippingDetailsData,
    handleCustomerShippingDetailChange,
    errors,

    handleShippingCountryChange,
    handleShippingStateChange,
    handleShippingCityChange,

    selectedCustomerShippingCountryOption,
    setSelectedCustomerShippingCountryOption,
    countriesList,
    selectedCustomerShippingStateOption,
    setSelectedCustomerShippingStateOption,
    stateList,
    selectedCustomerShippingCityOption,
    setSelectedCustomerShippingCityOption,
    cityList,

}) => {
    return (
        <>
            <Modal
                className="fade"
                show={customerShippingDetailsModal}
                onHide={setCustomerShippingDetailsModal}
                centered
                size="lg"
            >
                <Modal.Header>
                    <Modal.Title>Shipping Detail</Modal.Title>
                    <Button
                        onClick={() => {
                            setCustomerShippingDetailsModal(false);
                        }}
                        variant=""
                        className="btn-close"
                    ></Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <div className="row mb-3">
                            {/* name */}
                            <div className="col-sm-6 col-xl-4">
                                <label className="col-form-label">
                                    Company Name<span className="text-danger">*</span>
                                </label>
                                <input
                                    name="name"
                                    value={formCustomerShippingDetailsData?.name}
                                    onChange={handleCustomerShippingDetailChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Ex: Suyox Plastics"
                                />
                                {errors?.name && (
                                    <span className="text-danger fs-12">{errors?.name}</span>
                                )}
                            </div>

                            {/* email */}
                            <div className="col-sm-6 col-xl-4">
                                <label className="col-form-label">
                                    Email<span className="text-danger">*</span>
                                </label>
                                <input
                                    name="email"
                                    value={formCustomerShippingDetailsData?.email}
                                    onChange={handleCustomerShippingDetailChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Ex: suyox@gmail.com"
                                />
                                {errors?.email && (
                                    <span className="text-danger fs-12">{errors?.email}</span>
                                )}
                            </div>

                            {/* mobile no 1 */}
                            <div className="col-sm-6 col-xl-4">
                                <label className="col-form-label">
                                    Mobile No.1<span className="text-danger">*</span>
                                </label>
                                <input
                                    name="mobile_no1"
                                    value={formCustomerShippingDetailsData?.mobile_no1}
                                    onChange={handleCustomerShippingDetailChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Ex: +91 9876-555-555"
                                />
                                {errors?.mobile_no1 && (
                                    <span className="text-danger fs-12">{errors?.mobile_no1}</span>
                                )}
                            </div>

                            {/* mobile no 2 */}
                            <div className="col-sm-6 col-xl-4">
                                <label className="col-form-label">Mobile No.2</label>
                                <input
                                    name="mobile_no2"
                                    value={formCustomerShippingDetailsData?.mobile_no2}
                                    onChange={handleCustomerShippingDetailChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Ex: +91 9876-555-555"
                                />
                                {errors?.mobile_no2 && (
                                    <span className="text-danger fs-12">{errors?.mobile_no2}</span>
                                )}
                            </div>

                            {/* pincode */}
                            <div className="col-sm-6 col-xl-4">
                                <label className="col-form-label">
                                    Pincode<span className="text-danger">*</span>
                                </label>
                                <input
                                    name="pin_code"
                                    value={formCustomerShippingDetailsData?.pin_code}
                                    onChange={handleCustomerShippingDetailChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Ex: 313001"
                                />
                                {errors?.shipping_pin_code && (
                                    <span className="text-danger fs-12">
                                        {errors?.shipping_pin_code}
                                    </span>
                                )}
                            </div>
                            <div className="col-sm-6 col-xl-4">
                                <label className="col-form-label">
                                    GSTIN<span className="text-danger">*</span>
                                </label>
                                <input
                                    name="gstNumber"
                                    value={formCustomerShippingDetailsData?.gstNumber}
                                    onChange={handleCustomerShippingDetailChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Ex: 22AAAAA0000A1Z5"
                                />

                                {errors?.gstNumber && (
                                    <span className="text-danger fs-12">
                                        {errors?.gstNumber}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="row mb-3">
                            {/* country */}
                            <div className="col-sm-6 col-xl-4">
                                <label className="col-form-label">
                                    Country<span className="text-danger">*</span>
                                </label>
                                <Select
                                    value={selectedCustomerShippingCountryOption}
                                    onChange={handleShippingCountryChange}
                                    defaultValue={selectedCustomerShippingCountryOption}
                                    options={countriesList}
                                />
                                {errors?.shipping_country_name && (
                                    <span className="text-danger fs-12">
                                        {errors?.shipping_country_name}
                                    </span>
                                )}
                            </div>

                            {/* state */}
                            <div className="col-sm-6 col-xl-4">
                                <label className="col-form-label">
                                    State<span className="text-danger">*</span>
                                </label>
                                <Select
                                    value={selectedCustomerShippingStateOption}
                                    onChange={handleShippingStateChange}
                                    defaultValue={selectedCustomerShippingStateOption}
                                    options={stateList}
                                />
                                {errors?.shipping_state_name && (
                                    <span className="text-danger fs-12">
                                        {errors?.shipping_state_name}
                                    </span>
                                )}
                            </div>

                            {/* city */}
                            <div className="col-sm-6 col-xl-4">
                                <label className="col-form-label">
                                    City<span className="text-danger">*</span>
                                </label>
                                <Select
                                    value={selectedCustomerShippingCityOption}
                                    onChange={handleShippingCityChange}
                                    defaultValue={selectedCustomerShippingCityOption}
                                    options={cityList}
                                />
                                {errors?.shipping_city_name && (
                                    <span className="text-danger fs-12">
                                        {errors?.shipping_city_name}
                                    </span>
                                )}
                            </div>

                            {/* address */}
                            <div className="col-xl-12">
                                <label className="col-form-label">
                                    Address<span className="text-danger">*</span>
                                </label>
                                <input
                                    name="address"
                                    value={formCustomerShippingDetailsData?.address}
                                    onChange={handleCustomerShippingDetailChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Ex: ABC"
                                />
                                {errors?.shipping_address && (
                                    <span className="text-danger fs-12">
                                        {errors?.shipping_address}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            setCustomerShippingDetailsModal(false);
                        }}
                        variant="danger light"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={() => {
                            setCustomerShippingDetailsModal(false);
                        }}
                        variant="primary"
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CustomerShippingDetailForm;
