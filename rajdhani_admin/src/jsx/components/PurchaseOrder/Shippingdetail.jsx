const ShippingDetail = ({ shippingDetail, setOpenShippingMdl}) => {
  return (
    <>
      <div className="col-sm-6 col-xl-4">
        <div className="shipping-card">
        <div className="d-flex justify-content-between">
         <label className="col-form-label">Shipping Detail</label>
         <button className="btn shipping-edit-btn py-1" onClick={()=>setOpenShippingMdl(true)}>Edit</button>
        </div>
        
        
        <hr className="w-100" />
        <div className="supplier-detail-div">
          <p
            className="p-0 m-0"
            style={{ color: "#000000", fontWeight: "400" }}>
            {shippingDetail?.name}
          </p>
          <p
            className="p-0 m-0 d-flex"
            style={{ color: "#000000", fontWeight: "400" }} >
            {shippingDetail?.city} {shippingDetail?.state_name} {shippingDetail?.pin_code}
          </p>
          <p
            className="p-0 m-0"
            style={{ color: "#000000", fontWeight: "400" }}
          ></p>

          {shippingDetail?.mobile_no1 && (
            <div className="d-flex gap-1">
              <p className="p-0 m-0">Phone: </p>
              <p
                className="p-0 m-0"
                style={{ color: "#000000", fontWeight: "400" }} >
                {shippingDetail?.mobile_no1}
              </p>
            </div>
          )}

          {shippingDetail?.email && (
            <div className="d-flex gap-1">
              <p className="p-0 m-0">Email: </p>
              <p
                className="p-0 m-0"
                style={{ color: "#000000", fontWeight: "400" }}>
                {shippingDetail?.email}
              </p>
            </div>
          )}

          {shippingDetail?.gstin && (
            <div className="d-flex gap-1">
              <p className="p-0 m-0">GST: </p>
              <p
                className="p-0 m-0"
                style={{ color: "#000000", fontWeight: "400" }}>
                {shippingDetail?.gstin}
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
