import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Dropdown, Button, Modal, Container, Card, Form} from 'react-bootstrap';
import uplodIcon from '../../../assets/images/upload-icon.png';

const AddNewBillMdl = () => {
  return (
    <>
      <Modal
        className="fade"
        show={modalCentered}
        onHide={setModalCentered}
        centered
        size='xl'
      >
        <Modal.Header>
          <Modal.Title>
            {/* {isEdit ? "Edit Brand" : "+ Add New Brand"} */}
            + Add New Bill
          </Modal.Title>
          <Button
            onClick={() => {
              setModalCentered(false);
              resetForm();
              setIsEdit(false);
            }}
            variant=""
            className="btn-close"
          ></Button>
        </Modal.Header>
        <Modal.Body>
          <div className="col-xl-12 col-lg-12 ">
            <div className="card">
              <div className="card-body">
                <div>
                  <div className="mb-3 row">
                    <div className="col-sm-12">
                      <label className="col-sm-3 col-form-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData?.name}
                        className="form-control"
                        placeholder="New Brand"
                        onChange={handleInputChange}
                      />
                      {error?.name && (
                        <span className="text-danger fs-12">{error?.name}</span>
                      )}
                    </div>
                  </div>

               
                  <div
                    className="col-sm-12"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <label className="col-form-label">Logo</label>
                    <div className=" uploadImageContainer">
                      <input
                        type="file"
                        accept="image/*"
                        //value={formData?.image}
                        onChange={handleLogoChange}
                        style={{ display: "none" }}
                        id="logoUpload"
                      />
                      {logo ? (
                        <>
                          {isEdit && !imageChanged ? (
                            <>
                              {/* Simple 'X' button as the delete icon */}
                              <div
                                className="deleteIcon"
                                onClick={handleDeleteLogo}>
                                ⛌
                              </div>
                              <img
                                className="img"
                                src={`https://api.i2rtest.in/v1/images/image/${logo}`}
                                alt="Logo"
                              />
                            </>
                          ) : (
                            <>
                              <div
                                className="deleteIcon"
                                onClick={handleDeleteLogo}>
                                ⛌
                              </div>
                              <img className="img" src={logo} alt="Logo" />
                            </>
                          )}
                        </>
                      ) : (
                        <label htmlFor="logoUpload" className="imgPlaceholder">
                          <div className="flex flex-col cursor-pointer imgUploadIcon">
                            <img
                              width="30"
                              src={uplodIcon}
                              alt="Upload Icon"
                            ></img>
                            <p>Upload Image</p>
                          </div>
                        </label>
                      )}
                    </div>
                    <p className="mt-2">
                      Image format - jpg png jpeg gif
                      <br />
                      Image Size - maximum size 2 MB
                      <br />
                      Image Ratio - 1:1
                    </p>
                    {error?.image && (
                      <span className="text-danger fs-12">{error?.image}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setModalCentered(false);
              resetForm();
              setIsEdit(false);
            }}
            variant="danger light">
            Close
          </Button>

          <Button
            onClick={() => {
              handleSubmit();
            }}
            variant="primary">
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNewBillMdl;