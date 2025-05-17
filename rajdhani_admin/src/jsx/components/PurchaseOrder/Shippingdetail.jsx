const ShippingDetail = ({ shippingDetail, setOpenShippingMdl }) => {
  // console.log("shippingDetail hrere in card",shippingDetail)
  return (
    <>
      <div className="col-sm-6 col-xl-4">
        <div className="shipping-card">
          <div className="d-flex justify-content-between">
            <label className="col-form-label">Shipping Detail</label>
            <button className="btn shipping-edit-btn py-1" onClick={() => setOpenShippingMdl(true)}>Edit</button>
          </div>


          <hr className="w-100" />
          <div className="supplier-detail-div">
            {shippingDetail?.company_name && (
              <p className="p-0 m-0">
                <span style={{ color: "#000000", fontWeight: "550", fontStyle: "italic" }}>
                  {shippingDetail?.company_name}
                </span>{" "}
                <span style={{ color: "#000000", fontWeight: "400" }}>
                  ({shippingDetail?.fname} {shippingDetail?.lname})
                </span>
              </p>)
            }
            <p
              className="p-0 m-0"
              style={{ color: "#000000", fontWeight: "400" }}>
              {shippingDetail?.name}
            </p>
            <p
              className="p-0 m-0 d-flex"
              style={{ color: "#000000", fontWeight: "400" }} >
              {shippingDetail?.city} {shippingDetail?.state}  {shippingDetail?.country} {shippingDetail?.pin_code}
            </p>
            <p
              className="p-0 m-0"
              style={{ color: "#000000", fontWeight: "400" }}
            ></p>

            {shippingDetail?.mobile_no1 && (
              <div className="d-flex gap-1">
                <p className="p-0 m-0 fw-bold "
                  style={{ color: "black", fontWeight: "400" }} >Mobile No :</p>
                <p
                  className="p-0 m-0"
                  style={{ color: "#000000", fontWeight: "400" }} >
                  {shippingDetail?.mobile_no1}
                </p>
              </div>
            )}

            {shippingDetail?.email && (
              <div className="d-flex gap-1">
                <p className="p-0 m-0 fw-bold "
                  style={{ color: "black", fontWeight: "400" }} >Email :</p>
                <p
                  className="p-0 m-0"
                  style={{ color: "#000000", fontWeight: "400" }}>
                  {shippingDetail?.email}
                </p>
              </div>
            )}

            {shippingDetail?.gstNumber && (
              <div className="d-flex gap-1">
                <p className="p-0 m-0 fw-bold "
                  style={{ color: "black", fontWeight: "400" }} >GST :</p>
                <p
                  className="p-0 m-0"
                  style={{ color: "#000000", fontWeight: "400" }}>
                  {shippingDetail?.gstNumber}
                </p>
              </div>
            )}


          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingDetail;
