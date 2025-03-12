const BillingDetail = ({ billingDetail,setOpenBillingMdl }) => {
  console.log("billingDetail",billingDetail)
  return (
    <>
      <div className="col-sm-6 col-xl-4">
        <div className="billing-card">
        <div className="d-flex justify-content-between">
         <label className="col-form-label">Billing Detail</label>
         <button className="btn billing-edit-btn py-1" onClick={()=>setOpenBillingMdl(true)}>Edit</button>
        </div>
        
        <hr className="w-100" />
        <div className="supplier-detail-div">
          <p
            className="p-0 m-0"
            style={{ color: "#000000", fontWeight: "400" }}>
            {billingDetail?.name}
          </p>
          <p
            className="p-0 m-0 d-flex"
            style={{ color: "#000000", fontWeight: "400" }}>
            {billingDetail?.city} {billingDetail?.state_name} {billingDetail?.pin_code}
          </p>
          <p
            className="p-0 m-0"
            style={{ color: "#000000", fontWeight: "400" }}
          ></p>

          {billingDetail?.mobile_no1 && (
            <div className="d-flex gap-1">
              <p className="p-0 m-0">Phone: </p>
              <p
                className="p-0 m-0"
                style={{ color: "#000000", fontWeight: "400" }}>
                {billingDetail?.mobile_no1}
              </p>
            </div>
          )}

          {billingDetail?.email && (
            <div className="d-flex gap-1">
              <p className="p-0 m-0">Email: </p>
              <p
                className="p-0 m-0"
                style={{ color: "#000000", fontWeight: "400" }}
              >
                {billingDetail?.email}
              </p>
            </div>
          )}

          {billingDetail?.gstin && (
            <div className="d-flex gap-1">
              <p className="p-0 m-0">GST: </p>
              <p
                className="p-0 m-0"
                style={{ color: "#000000", fontWeight: "400" }}>
                {billingDetail?.gstin}
              </p>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
};

export default BillingDetail;
