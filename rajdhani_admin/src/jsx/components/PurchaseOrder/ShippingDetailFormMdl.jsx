import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ShippingDetailFormMdl = ({
  openShippingMdl,
  setOpenShippingMdl,
  errors,
  formShippingData,
  handleShippingDetailChange,
  selectedShippingCountryOption,
  handleShippingDetailCountryChange,
  handleShippingPhoneDetailChange,
  countriesList,

  selectedShippingStateOption,
  handleShippingDetailStateChange,
  stateList,

  selectedShippingCityOption,
  handleShippingDetailCityChange,
  cityList,
}) => {


  return (
    <>
      <Modal
        className="fade"
        show={openShippingMdl}
        onHide={setOpenShippingMdl}
        centered
        size="lg">
        <Modal.Header>
          <Modal.Title>Shipping Detail</Modal.Title>
          <Button
            onClick={() => {
              setOpenShippingMdl(false);
            }}
            variant=""
            className="btn-close"
          ></Button>
        </Modal.Header>
        <Modal.Body>
        <div className="mb-3">
                <div className="row mb-3">

                  <div className="col-sm-6 col-xl-4">
                    <label className=" col-form-label">Name<span className="text-danger">*</span></label>
                    <input
                      name="name"
                      value={formShippingData?.name}
                      onChange={handleShippingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />

                    {errors?.shipping_name && (
                      <span className="text-danger fs-12">
                        {errors?.shipping_name}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-4">
                    <label className=" col-form-label">Email<span className="text-danger">*</span></label>
                    <input
                      name="email"
                      value={formShippingData?.email}
                      onChange={handleShippingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC@gmail.com"
                    />

                    {errors?.shipping_email && (
                      <span className="text-danger fs-12">
                        {errors?.shipping_email}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-4">
                    <label className=" col-form-label">Mobile No.1<span className="text-danger">*</span></label>
                    <input
                      name="mobile_no1"
                      value={formShippingData?.mobile_no1}
                      onChange={handleShippingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: +91 9876-555-555"
                    />
                     {/* <PhoneInput
                      className=""
                      inputClass=""
                      country={"in"}
                      value={formShippingData?.mobile_no1}
                      onChange={(value) => handleShippingPhoneDetailChange(value, "mobile_no1")}
                      // onChange={handleOnChange}
                    /> */}

                    {errors?.shipping_mobile_no1 && (
                      <span className="text-danger fs-12">
                        {errors?.shipping_mobile_no1}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-4">
                    <label className=" col-form-label">Mobile No.2</label>
                    <input
                      name="mobile_no2"
                      value={formShippingData?.mobile_no2}
                      onChange={handleShippingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex:  +91 9876-555-555"
                    />
                    {/* <PhoneInput
                      className=""
                      inputClass=""
                      country={"in"}
                      value={formShippingData?.mobile_no2}
                      onChange={(value) => handleShippingPhoneDetailChange(value, "mobile_no2")}
                      // onChange={handleOnChange}
                    /> */}
                    {errors?.shipping_mobile_no2 && (
                      <span className="text-danger fs-12">
                        {errors?.shipping_mobile_no2}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-4">
                    <label className="col-form-label">GSTIN<span className="text-danger">*</span></label>
                    <input
                      name="gstNumber"
                      value={formShippingData?.gstNumber}
                      onChange={handleShippingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: 22AAAAA0000A1Z5"
                    />

                    {errors?.shipping_gstin && (
                      <span className="text-danger fs-12">
                        {errors?.shipping_gstin}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                <div className="col-sm-6 col-xl-4">
                    <label className="col-form-label">Country<span className="text-danger">*</span></label>
                    <Select
                      value={selectedShippingCountryOption}
                      onChange={handleShippingDetailCountryChange}
                      defaultValue={selectedShippingCountryOption}
                      options={countriesList}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors?.shipping_country && (
                      <span className="text-danger fs-12">
                        {errors?.shipping_country}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-4">
                    <label className="col-form-label">State<span className="text-danger">*</span></label>
                    <Select
                      value={selectedShippingStateOption}
                      onChange={handleShippingDetailStateChange}
                      defaultValue={selectedShippingStateOption}
                      options={stateList}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors?.shipping_state_name && (
                      <span className="text-danger fs-12">
                        {errors?.shipping_state_name}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-4">
                    <label className="col-form-label">City<span className="text-danger">*</span></label>
                    <Select
                      value={selectedShippingCityOption}
                      onChange={handleShippingDetailCityChange}
                      defaultValue={selectedShippingCityOption}
                      options={cityList}
                      style={{
                        lineHeight: "40px",
                        color: "#7e7e7e",
                        paddingLeft: " 15px",
                      }}
                    />
                    {errors?.shipping_city_name && (
                      <span className="text-danger fs-12">
                        {errors?.shipping_city_name}
                      </span>
                    )}
                  </div>

                  <div className="col-sm-6 col-xl-4">
                    <label className="col-form-label">Pincode<span className="text-danger">*</span></label>
                    <input
                      name="pin_code"
                      value={formShippingData?.pin_code}
                      onChange={handleShippingDetailChange}
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
                    <label className="col-form-label">TIN</label>
                    <input
                      name="state_code"
                      value={formShippingData?.state_tin_code}
                      onChange={handleShippingDetailChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: 08"
                      disabled
                    />

                    {errors?.state_tin_code && (
                      <span className="text-danger fs-12">
                        {errors?.state_tin_code}
                      </span>
                    )}
                  </div>
                  <div className="col-xl-12">
                    <label className="col-sm-3 col-form-label">Address<span className="text-danger">*</span></label>
                    <input
                      name="address"
                      value={formShippingData?.address}
                      onChange={handleShippingDetailChange}
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
              setOpenShippingMdl(false);
            }}
            variant="danger light">
            Close
          </Button>
          <Button
             onClick={() => {
                setOpenShippingMdl(false);
              }}
            variant="primary">
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShippingDetailFormMdl;
