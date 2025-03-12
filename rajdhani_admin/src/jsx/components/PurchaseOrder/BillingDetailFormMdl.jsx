import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const BillingDetailFormMdl = ({
  openBillingMdl,
  setOpenBillingMdl,
  formBillingData,
  handleBillingDetailChange,
  errors,

  selectedBillingCountryOption,
  handleBillingDetailCountryChange,
  setSelectedBillingCountryOption,
  countriesList,
  selectedBillingStateOption,
  handleBillingDetailStateChange,
  stateList,

  selectedBillingCityOption,
  handleBillingDetailCityChange,
  cityList,
  handleBillingPhoneDetailChange
}) => {


  return (
    <>
      <Modal
        className="fade"
        show={openBillingMdl}
        onHide={setOpenBillingMdl}
        centered
        size="lg">
        <Modal.Header>
          <Modal.Title>Billing Detail</Modal.Title>
          <Button
            onClick={() => {
              setOpenBillingMdl(false);
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
                  Name<span className="text-danger">*</span>
                </label>
                <input
                  name="name"
                  value={formBillingData?.name}
                  onChange={handleBillingDetailChange}
                  type="text"
                  className="form-control"
                  placeholder="Ex: ABC"
                />

                {errors.billing_name && (
                  <span className="text-danger fs-12">
                    {errors.billing_name}
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
                  value={formBillingData?.email}
                  onChange={handleBillingDetailChange}
                  type="text"
                  className="form-control"
                  placeholder="Ex: ABC@gmail.com"
                />
                {errors.billing_email && (
                  <span className="text-danger fs-12">
                    {errors.billing_email}
                  </span>
                )}
              </div>
              {/* mobile number */}
              <div className="col-sm-6 col-xl-4">
                <label className=" col-form-label">
                  Mobile No.1<span className="text-danger">*</span>
                </label>
                {/* <input
                      name="mobile_no1"
                      value={formBillingData?.mobile_no1}
                      onChange={handleBillingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: +91 9876-555-555"
                    /> */}
                <PhoneInput
                  className=""
                  inputClass=""
                  country={"in"}
                  value={formBillingData?.mobile_no1}
                  onChange={(value) =>
                    handleBillingPhoneDetailChange(value, "mobile_no1")
                  }
                  // onChange={handleOnChange}
                />

                {errors.billing_mobile_no1 && (
                  <span className="text-danger fs-12">
                    {errors.billing_mobile_no1}
                  </span>
                )}
              </div>
              {/* mobile number */}
              <div className="col-sm-6 col-xl-4">
                <label className=" col-form-label">Mobile No.2</label>
                {/* <input
                      name="mobile_no2"
                      value={formBillingData?.mobile_no2}
                      onChange={handleBillingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex:  +91 9876-555-555"
                    /> */}
                <PhoneInput
                  className=""
                  inputClass=""
                  country={"in"}
                  value={formBillingData?.mobile_no2}
                  onChange={(value) =>
                    handleBillingPhoneDetailChange(value, "mobile_no2")
                  }
                  // onChange={handleOnChange}
                />
                {errors.billing_mobile_no2 && (
                  <span className="text-danger fs-12">
                    {errors.billing_mobile_no2}
                  </span>
                )}
              </div>

              <div className="col-sm-6 col-xl-4">
                <label className="col-form-label">
                  GSTIN<span className="text-danger">*</span>
                </label>
                <input
                  name="gstin"
                  value={formBillingData?.gstin}
                  onChange={handleBillingDetailChange}
                  type="text"
                  className="form-control"
                  placeholder="Ex: 22AAAAA0000A1Z5"
                />

                {errors.billing_gstin && (
                  <span className="text-danger fs-12">
                    {errors.billing_gstin}
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
                  value={selectedBillingCountryOption}
                  onChange={handleBillingDetailCountryChange}
                  defaultValue={setSelectedBillingCountryOption}
                  options={countriesList}
                  style={{
                    lineHeight: "40px",
                    color: "#7e7e7e",
                    paddingLeft: " 15px",
                  }}
                />
                {errors.billing_country_name && (
                  <span className="text-danger fs-12">
                    {errors.billing_country_name}
                  </span>
                )}
              </div>
              {/* state */}
              <div className="col-sm-6 col-xl-4">
                <label className="col-form-label">
                  State<span className="text-danger">*</span>
                </label>
                <Select
                  value={selectedBillingStateOption}
                  onChange={handleBillingDetailStateChange}
                  defaultValue={selectedBillingStateOption}
                  options={stateList}
                  style={{
                    lineHeight: "40px",
                    color: "#7e7e7e",
                    paddingLeft: " 15px",
                  }}
                />
                {errors.billing_state_name && (
                  <span className="text-danger fs-12">
                    {errors.billing_state_name}
                  </span>
                )}
              </div>
              {/* city */}
              <div className="col-sm-6 col-xl-4">
                <label className="col-form-label">
                  City<span className="text-danger">*</span>
                </label>
                <Select
                  value={selectedBillingCityOption}
                  onChange={handleBillingDetailCityChange}
                  defaultValue={selectedBillingCityOption}
                  options={cityList}
                  style={{
                    lineHeight: "40px",
                    color: "#7e7e7e",
                    paddingLeft: " 15px",
                  }}
                />
                {errors.billing_state_name && (
                  <span className="text-danger fs-12">
                    {errors.billing_state_name}
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
                  value={formBillingData?.pin_code}
                  onChange={handleBillingDetailChange}
                  type="text"
                  className="form-control"
                  placeholder="Ex: 313001"
                />

                {errors.billing_pin_code && (
                  <span className="text-danger fs-12">
                    {errors.billing_pin_code}
                  </span>
                )}
              </div>
              {/* TIN */}
              <div className="col-sm-6 col-xl-4">
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

                {errors.billing_state_code && (
                  <span className="text-danger fs-12">
                    {errors.billing_state_code}
                  </span>
                )}
              </div>
              <div className="col-xl-12">
                <label className="col-sm-3 col-form-label">
                  Address<span className="text-danger">*</span>
                </label>
                <input
                  name="address"
                  value={formBillingData?.address}
                  onChange={handleBillingDetailChange}
                  type="text"
                  className="form-control"
                  placeholder="Ex: ABC"
                />

                {errors.billing_address && (
                  <span className="text-danger fs-12">
                    {errors.billing_address}
                  </span>
                )}
              </div>
        
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setOpenBillingMdl(false);
            }}
            variant="danger light"
          >
            Close
          </Button>
          <Button
             onClick={() => {
                setOpenBillingMdl(false);
              }}
            variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BillingDetailFormMdl;
