import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getStateListTinApi } from "../../../services/apis/CommonApi";
import { useEffect, useState } from "react";


 


const CustomerBillingDetailForm = ({
  customerBillingDetailsModal,
  setCustomerBillingDetailsModal,
  formCustomerBillingDetailsData,
  handleCustomerBillingDetailChange,
  errors,

  
  handleCountryChange,
  handleStateChange,
  handleCityChange,

  selectedCustomerBillingCountryOption,
  setSelectedCustomerBillingCountryOption,
  countriesList,
  selectedCustomerBillingStateOption,
  setSelectedCustomerBillingStateOption,
  stateList,
  selectedCustomerBillingCityOption,
  setSelectedCustomerBillingCityOption,
  cityList,
  
}) => {


  return (
    <>
      <Modal
        className="fade"
        show={customerBillingDetailsModal}
        onHide={setCustomerBillingDetailsModal}
        centered
        size="lg">
        <Modal.Header>
          <Modal.Title>Billing Detail</Modal.Title>
          <Button
            onClick={() => {
              setCustomerBillingDetailsModal(false);
            }}
            variant=""
            className="btn-close"
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            {/* <h4 className="card-title">Billing Detail</h4> */}
            <div className="row mb-3">
              {/* name */}
              <div className="col-sm-6 col-xl-4">
                <label className=" col-form-label">
                 Company Name<span className="text-danger">*</span>
                </label>
                <input
                  name="name"
                  value={formCustomerBillingDetailsData?.name}
                  onChange={handleCustomerBillingDetailChange}
                  type="text"
                  className="form-control"
                  placeholder="Ex: Suyox Plastics"
                />

                {errors?.name && (
                  <span className="text-danger fs-12">
                    {errors?.name}
                  </span>
                )}
              </div>
              {/* email */}
              <div className="col-sm-6 col-xl-4">
                <label className=" col-form-label">
                  Email<span className="text-danger">*</span>
                </label>
                <input
                  name="email"
                  value={formCustomerBillingDetailsData?.email}
                  onChange={handleCustomerBillingDetailChange}
                  type="text"
                  className="form-control"
                  placeholder="Ex: suyox@gmail.com"
                />
                {errors?.email && (
                  <span className="text-danger fs-12">
                    {errors?.email}
                  </span>
                )}
              </div>
              {/* mobile number */}
              <div className="col-sm-6 col-xl-4">
                <label className=" col-form-label">
                  Mobile No.1<span className="text-danger">*</span>
                </label>
                <input
                      name="mobile_no1"
                      value={formCustomerBillingDetailsData?.mobile_no1}
                      onChange={handleCustomerBillingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: +91 9876-555-555"
                    />
                {/* <PhoneInput
                  className=""
                  inputClass=""
                  country={"IN"}
                  value={formBillingData?.mobile_no1}
                  onChange={(value) =>
                    handleBillingPhoneDetailChange(value, "mobile_no1")
                  }
                  // onChange={handleOnChange}
                /> */}

                {errors?.mobile_no1 && (
                  <span className="text-danger fs-12">
                    {errors?.mobile_no1}
                  </span>
                )}
              </div>
              {/* mobile number */}
              <div className="col-sm-6 col-xl-4">
                <label className=" col-form-label">Mobile No.2</label>
                <input
                      name="mobile_no2"
                      value={formCustomerBillingDetailsData?.mobile_no2}
                      onChange={handleCustomerBillingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex:  +91 9876-555-555"
                    />
                {/* <PhoneInput
                  className=""
                  inputClass=""
                  country={"IN"}
                  value={formBillingData?.mobile_no2}
                  onChange={(value) =>
                    handleBillingPhoneDetailChange(value, "mobile_no2")
                  }
                  // onChange={handleOnChange}
                /> */}
                {errors?.mobile_no2 && (
                  <span className="text-danger fs-12">
                    {errors?.mobile_no2}
                  </span>
                )}
              </div>

              <div className="col-sm-6 col-xl-4">
                <label className="col-form-label">
                  GSTIN<span className="text-danger">*</span>
                </label>
                <input
                  name="gstNumber"
                  value={formCustomerBillingDetailsData?.gstNumber}
                  onChange={handleCustomerBillingDetailChange}
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

               {/* Pincode */}
               <div className="col-sm-6 col-xl-4">
                <label className="col-form-label">
                  Pincode<span className="text-danger">*</span>
                </label>
                <input
                  name="pin_code"
                  value={formCustomerBillingDetailsData?.pin_code}
                  onChange={handleCustomerBillingDetailChange}
                  type="text"
                  className="form-control"
                  placeholder="Ex: 313001"
                />

                {errors?.billing_pin_code && (
                  <span className="text-danger fs-12">
                    {errors?.billing_pin_code}
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
                  value={selectedCustomerBillingCountryOption}
                  onChange={handleCountryChange}
                  defaultValue={selectedCustomerBillingCountryOption}
                  options={countriesList}
                  style={{
                    lineHeight: "40px",
                    color: "#7e7e7e",
                    paddingLeft: " 15px",
                  }}
                />
                {errors?.billing_country_name && (
                  <span className="text-danger fs-12">
                    {errors?.billing_country_name}
                  </span>
                )}
              </div>
              {/* state */}
              <div className="col-sm-6 col-xl-4">
                <label className="col-form-label">
                  State<span className="text-danger">*</span>
                </label>
                <Select
                  value={selectedCustomerBillingStateOption}
                  onChange={handleStateChange}
                  defaultValue={selectedCustomerBillingStateOption}
                  options={stateList}
                  style={{
                    lineHeight: "40px",
                    color: "#7e7e7e",
                    paddingLeft: " 15px",
                  }}
                />
                {errors?.billing_state_name && (
                  <span className="text-danger fs-12">
                    {errors?.billing_state_name}
                  </span>
                )}
              </div>
              {/* city */}
              <div className="col-sm-6 col-xl-4">
                <label className="col-form-label">
                  City<span className="text-danger">*</span>
                </label>
                <Select
                  value={selectedCustomerBillingCityOption}
                  onChange={handleCityChange}
                  defaultValue={selectedCustomerBillingCityOption}
                  options={cityList}
                  style={{
                    lineHeight: "40px",
                    color: "#7e7e7e",
                    paddingLeft: " 15px",
                  }}
                />
                {errors?.billing_state_name && (
                  <span className="text-danger fs-12">
                    {errors?.billing_state_name}
                  </span>
                )}
              </div>
             
              {/* TIN */}
              {/* <div className="col-sm-6 col-xl-4">
                <label className="col-form-label flex-wrap">TIN</label>
                <input
                  name="state_code"
                  value={formBillingData?.state_tin_code}
                  onChange={handleBillingDetailChange}
                  type="text"
                  className="form-control"
                  placeholder="Ex: 12"
                  disabled
                />

                {errors?.billing_state_code && (
                  <span className="text-danger fs-12">
                    {errors?.billing_state_code}
                  </span>
                )}
              </div> */}
              <div className="col-xl-12">
                <label className="col-sm-3 col-form-label">
                  Address<span className="text-danger">*</span>
                </label>
                <input
                  name="address"
                  value={formCustomerBillingDetailsData?.address}
                  onChange={handleCustomerBillingDetailChange}
                  type="text"
                  className="form-control"
                  placeholder="Ex: ABC"
                />

                {errors?.billing_address && (
                  <span className="text-danger fs-12">
                    {errors?.billing_address}
                  </span>
                )}
              </div>
        
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setCustomerBillingDetailsModal(false);
            }}
            variant="danger light"
          >
            Close
          </Button>
          <Button
             onClick={() => {
              setCustomerBillingDetailsModal(false);
              }}
            variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomerBillingDetailForm;
