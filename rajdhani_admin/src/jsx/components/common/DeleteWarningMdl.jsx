import {
  Row,
  Col,
  Dropdown,
  Button,
  Modal,
  Container,
  Card,
  Form,
} from "react-bootstrap";
import { IoWarningOutline } from "react-icons/io5";

const DeleteWarningMdl = ({
  title,
  showDeleteMdl,
  setShowDeleteMdl,
  setDeleteTableDataId,
  handleDeleteSubmit,
}) => {
  return (
    <>
      <Modal
        className="fade"
        show={showDeleteMdl}
        onHide={setShowDeleteMdl}
        centered>
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>
            <div className=" ">
              <IoWarningOutline color="#ffcc00" size={40} />
            </div>
          </Modal.Title>
          {/* <Button
            onClick={() => {
             setShowDeleteMdl(false);
             setDeleteTableDataId("");
            }}
            variant=""
            className="btn-close"
          ></Button> */}
        </Modal.Header>
        <Modal.Body>
          <div className="col-xl-12 col-lg-12 ">
            <h4 className="text-center">
              Do you want to delete this {title} ?
            </h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowDeleteMdl(false);
              setDeleteTableDataId("");
            }}
            variant=" light" >
            No
          </Button>
          <Button
            onClick={() => {
              handleDeleteSubmit();
            }}
            variant="danger light">
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteWarningMdl;
