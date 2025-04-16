import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { Button, Modal, Table } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";

const PdfView = ({ openPdfModal, setOpenPdfModal, fileUrl, fileType, excelData }) => {
  const documents = [{ uri:fileUrl, fileType }];

  return (
    <Modal
      className="fade card-body"
      show={openPdfModal}
      onHide={() => setOpenPdfModal(false)}
      size="xl">
      <Modal.Header>
        <Modal.Title>File Viewer</Modal.Title>
        <Button variant="" className="btn-close" onClick={()=> setOpenPdfModal(false)}>
          {/* <IoCloseSharp size={20} /> */}
        </Button>
      </Modal.Header>
      <Modal.Body>
        {fileType === "xlsx" && excelData?.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                {excelData[0]?.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData?.slice(1)?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row?.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <DocViewer documents={documents} pluginRenderers={DocViewerRenderers} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PdfView;
