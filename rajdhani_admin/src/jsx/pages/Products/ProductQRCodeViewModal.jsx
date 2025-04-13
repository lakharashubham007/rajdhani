import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { FaCopy, FaExternalLinkAlt } from "react-icons/fa"; // Import icons
import { useState } from "react";


const ProductQrCodeViewModal = ({
  productDetailData,
  showProductQrDetailModal,
  setShowProductQrDetailModal,
}) => {
  console.log("productDetailData", productDetailData);

  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (!productDetailData?.qr_url) return;
  
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(productDetailData.qr_url)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error("Error copying link: ", err));
    } else {
      // Fallback for unsupported browsers
      const textArea = document.createElement("textarea");
      textArea.value = productDetailData.qr_url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
  
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  


  // Function to handle redirect to QR URL (open in a new tab)
  const handleRedirect = () => {
    if (productDetailData?.qr_url) {
      window.open(productDetailData?.qr_url, "_blank"); // Open in a new tab
    }
  };

  return (
    <>
      <Modal
        className="fade card-body"
        show={showProductQrDetailModal}
        onHide={() => setShowProductQrDetailModal(false)}
        size="sm"
        centered
      >
        <Modal.Header>
          <Modal.Title>Scan QR Tag</Modal.Title>
          <Button
            variant=""
            className="btn-close"
            onClick={() => setShowProductQrDetailModal(false)}
          ></Button>
        </Modal.Header>
        <Modal.Body>
          {/* Header Section */}
          <div className="header-section text-center mb-3">
            <h4 className="fw-bold">QR Code</h4>
          </div>

          {/* Description Section */}
          <div className="desc-section text-center mb-2">
            <h6 className="text-muted">{productDetailData?.desc_Code}</h6>
          </div>

          {/* Fitting Code Section */}
          <div className="fitting-code text-center mb-3">
            <span className="badge bg-primary">{productDetailData?.fitting_Code}</span>
          </div>

          {/* QR Code Section */}
          <div className="qr-section text-center position-relative">
            <div
              className="qr-border mx-auto d-inline-block position-relative"
              style={{
                display: "inline-block",
                padding: "15px",
                borderRadius: "10px",
                position: "relative",
              }}
            >
              <img
                src={productDetailData?.qr_code}
                alt="QR Code"
                className="img-fluid"
                style={{ maxWidth: "200px" }}
              />

              {/* Scanner-like corner effect */}
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  left: "5px",
                  width: "20px",
                  height: "20px",
                  borderLeft: "3px solid #ff7a41",
                  borderTop: "3px solid #ff7a41",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  width: "20px",
                  height: "20px",
                  borderRight: "3px solid #ff7a41",
                  borderTop: "3px solid #ff7a41",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  bottom: "5px",
                  left: "5px",
                  width: "20px",
                  height: "20px",
                  borderLeft: "3px solid #ff7a41",
                  borderBottom: "3px solid #ff7a41",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  bottom: "5px",
                  right: "5px",
                  width: "20px",
                  height: "20px",
                  borderRight: "3px solid #ff7a41",
                  borderBottom: "3px solid #ff7a41",
                }}
              ></div>
            </div>
          </div>

          {/* QR URL with Copy and Redirect Options */}

          <div className="qr-url-section mt-3 text-center">
            <InputGroup className="mb-2">
              <FormControl value={productDetailData?.qr_url || ""} readOnly />
            </InputGroup>
            <div className="d-flex justify-content-center gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleCopyLink}
                disabled={copied} // Optional: Disable button while showing "Copied!"
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button variant="outline-primary" size="sm" onClick={handleRedirect}>
                Open
              </Button>
            </div>
          </div>

          {/* Scan Camera Info */}
          <div className="text-center mt-2 text-muted">
            <small>Use your camera or any QR scanner to access product details.</small>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductQrCodeViewModal;
