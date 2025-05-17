const BillingDetail = ({ billingDetail, setOpenBillingMdl }) => {
  console.log("billingDetail", billingDetail)
  return (
    <>
      <div className="col-sm-6 col-xl-4">
        <div className="billing-card">
          <div className="d-flex justify-content-between">
            <label className="col-form-label">Billing Detail</label>
            <button className="btn billing-edit-btn py-1" onClick={() => setOpenBillingMdl(true)}>Edit</button>
          </div>

          <hr className="w-100" />
          <div className="supplier-detail-div">
            {billingDetail?.company_name && (
            <p className="p-0 m-0">
              <span style={{ color: "#000000", fontWeight: "550", fontStyle: "italic" }}>
                {billingDetail?.company_name}
              </span>{" "}
              <span style={{ color: "#000000", fontWeight: "400" }}>
                ({billingDetail?.fname} {billingDetail?.lname})
              </span>
            </p>)
            }

            <p
              className="p-0 m-0"
              style={{ color: "#000000", fontWeight: "400" }}>
              {billingDetail?.name ? billingDetail?.name : ""}
            </p>
            <p
              className="p-0 m-0 d-flex"
              style={{ color: "#000000", fontWeight: "400" }}>
              {billingDetail?.city} {billingDetail?.state} {billingDetail?.country} {billingDetail?.pin_code}
            </p>
            <p
              className="p-0 m-0"
              style={{ color: "#000000", fontWeight: "400" }}
            ></p>

            {billingDetail?.mobile_no1 && (
              <div className="d-flex gap-1">
                <p className="p-0 m-0 fw-bold "
                  style={{ color: "black", fontWeight: "400" }} >Mobile No :</p>
                <p
                  className="p-0 m-0"
                  style={{ color: "#000000", fontWeight: "400" }}>
                  +91-{billingDetail?.mobile_no1}
                </p>
              </div>
            )}

            {billingDetail?.email && (
              <div className="d-flex gap-1">
                <p className="p-0 m-0 fw-bold "
                  style={{ color: "black", fontWeight: "400" }} >Email :</p>
                <p
                  className="p-0 m-0"
                  style={{ color: "#000000", fontWeight: "400" }}
                >
                  {billingDetail?.email}
                </p>
              </div>
            )}

            {billingDetail?.gstNumber && (
              <div className="d-flex gap-1">
                <p className="p-0 m-0 fw-bold "
                  style={{ color: "black", fontWeight: "400" }} >GST :</p>
                <p
                  className="p-0 m-0"
                  style={{ color: "#000000", fontWeight: "400" }}>
                  {billingDetail?.gstNumber ? billingDetail?.gstNumber : ""}
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
