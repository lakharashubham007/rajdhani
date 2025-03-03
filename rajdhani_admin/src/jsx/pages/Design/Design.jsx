import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Dropdown, Button, Modal } from "react-bootstrap";
import PageTitle from "../../layouts/PageTitle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Toaster } from "../../components/Toaster/Toster";
import Loader from "../../components/Loader/Loader";
import moment from "moment";
import Switch from "react-switch";
import ReactPaginate from "react-paginate";
import DeleteWarningMdl from "../../components/common/DeleteWarningMdl";
import useDebounce from "../../components/common/Debounce";
import {
  addDesignApi,
  deleteDesignApi,
  getDesignApi,
  GetEditDesignData,
  UpdateDesign,
  UpdateDesignStatus,
} from "../../../services/apis/Design";

const theadData = [
  { heading: "S.No.", sortingVale: "sno" },
  // { heading: "Id", sortingVale: "_id" },
  { heading: "Name", sortingVale: "name" },
  { heading: "Created At", sortingVale: "created_at" },
  { heading: "Status", sortingVale: "status" },
  { heading: "Action", sortingVale: "action" },
];

const Design = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  // selected options
  const [sort, setSortata] = useState(10);
  const [modalCentered, setModalCentered] = useState(false);
  const [data, setData] = useState(
    document.querySelectorAll("#holidayList tbody tr")
  );

  const [UpdateCategory, setUpdateCategory] = useState(false);
  const [designList, setDesignList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editPartId, setEditPartId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [iconData, setIconDate] = useState({ complete: false, ind: Number });
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const [showDeleteMdl, setShowDeleteMdl] = useState(false);
  const [deleteTableDataId, setDeleteTableDataId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
  });
  const debouncedSearchValue = useDebounce(searchInputValue, 500);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Dynamically update the field (name, etc.)
    });
    setErrors({
      ...errors,
      name: "",
    });
  };

  //   getSubCategoriesApi
  const fetchDesign = async (sortValue) => {
    // Set loading to true when the API call starts
    setLoading(true);
    try {
      const res = await getDesignApi(
        currentPage,
        sort,
        sortValue,
        searchInputValue
      );
      setDesignList(res?.data?.designs);
      setUpdateCategory(false);
    } catch (error) {
      // Catch and handle errors
      console.error("Error fetching cuisines:", error);
      Toaster.error("Failed to load cuisines. Please try again.");
    } finally {
      // Always set loading to false when the API call is done (whether successful or failed)
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDesign();
  }, [UpdateCategory, currentPage, sort, debouncedSearchValue]);

  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };

  useEffect(() => {
    setData(document.querySelectorAll("#holidayList tbody tr"));
  }, [test]);

  activePag.current === 0 && chageData(0, sort);

  function SotingData(name, ind) {
    if (iconData.complete) {
      const sortValue = { value:name, type: "asc" };
      fetchDesign(sortValue);
    } else {
      const sortValue = { value:name, type: "dsc" };
      fetchDesign(sortValue);
    }
  }

  const handleEditDesign = async (id) => {
    try {
      const res = await GetEditDesignData(id);
      if (res?.data?.success) {
        const data = res?.data?.design;
        setEditPartId(data?._id);

        setFormData({
          name: data?.name,
        });
        // setModalCentered(true);
        setIsEdit(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePart = (id) => {
    setDeleteTableDataId(id);
    setShowDeleteMdl(true);
  };

  const handleDeleteSubmit = async () => {
    try {
      const res = await deleteDesignApi(deleteTableDataId);
      if (res.status === 200) {
        Toaster.success(res?.data?.message); // Display success message
        fetchDesign();
        setDeleteTableDataId("");
        setShowDeleteMdl(false);
      } else {
        Toaster.error(
          res?.data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChange = async (partId, currentStatus) => {
    const fdata = {
      status: !currentStatus,
    };
    try {
      const res = await UpdateDesignStatus(partId, fdata);
      if (res.status === 200) {
        Toaster.success(res?.data?.message); // Display success message
        fetchDesign();
      } else {
        Toaster.error(
          res?.data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.log(err);
    }

    // console.log("newStatus",newStatus)
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
    });

    setErrors({});
    setLoading(false);
  };

  const validateForm = () => {
    const newErrors = {};
    // Required field validation
    if (!formData.name) newErrors.name = "Name is required.";
    // Set errors to the state
    setErrors(newErrors);
    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateSubmit = async () => {
    try {
      const res = await UpdateDesign(editPartId, formData);
      if (res.status === 200) {
        setUpdateCategory(true);
        Toaster.success(res?.data?.message);
        resetForm();
        setModalCentered(false);
        setIsEdit(false);
        fetchDesign();
        setSelectedOption(null);
      } else {
        Toaster.error(
          res?.data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      Toaster.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error("Error:", error.message);
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isEdit) {
      handleUpdateSubmit();
    } else {
      setLoading(true);
      try {
        const res = await addDesignApi(formData);
        if (res.data?.success) {
          setLoading(false);
          Toaster.success(res?.data?.message);
          resetForm(); // Reset form after success
          fetchDesign();
        } else {
          setLoading(false);
          Toaster.error(res.data?.message);
          console.error("Food creation error:", res);
        }
      } catch (error) {
        setLoading(false);
        Toaster.error(
          error.response?.data?.message ||
            "An error occurred while processing your request"
        );
      }
    }
  };

  return (
    <>
      <DeleteWarningMdl
        title={"table data"}
        showDeleteMdl={showDeleteMdl}
        setShowDeleteMdl={setShowDeleteMdl}
        setDeleteTableDataId={setDeleteTableDataId}
        handleDeleteSubmit={handleDeleteSubmit}
      />

      <ToastContainer />
      <Loader visible={loading} />
      <PageTitle activeMenu={"Design"} motherMenu={"Home"} />
      <div className="row">
        {/* SECTION 1ST */}
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Basic Info</h4>
            </div>
            <div className="card-body">
              <div>
                <div className="mb-3 row">
                  <div className="col-sm-6 col-xl-3">
                    <label className=" col-form-label">Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Ex: ABC"
                    />
                    {errors.name && (
                      <span className="text-danger fs-12">{errors.name}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-end">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary rounded-sm">
                  Save Information
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Section Submit button */}
      </div>

      <Row>
        <Col lg={12}>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Design List</h4>
              {/* <Link to={"/add-staff"} className="btn btn-primary">+ Add New</Link> */}
              {/* <Button
                variant="primary"
                type="button"
                className="mb-2 me-2"
                onClick={handleAddNewBrand}
              >
                + Add New Sub Category
              </Button> */}
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <div id="holidayList" className="dataTables_wrapper no-footer">
                  <div className="justify-content-between d-sm-flex">
                    <div className="dataTables_length">
                      <label className="d-flex align-items-center">
                        Show
                        <Dropdown className="search-drop">
                          <Dropdown.Toggle as="div" className="search-drop-btn">
                            {sort}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSortata("2")}>
                              2
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortata("5")}>
                              5
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortata("10")}>
                              10
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortata("15")}>
                              15
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortata("20")}>
                              20
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        entries
                      </label>
                    </div>
                    <div className="dataTables_filter">
                      <label>
                        Search :
                        <input
                          type="search"
                          className=""
                          placeholder=""
                          onChange={(e) => setSearchInputValue(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                  <table
                    id="example4"
                    className="display dataTable no-footer w-100">
                    <thead>
                      <tr>
                        {theadData?.map((item, ind) => {
                          return (
                            <th
                              key={ind}
                              onClick={() => {
                                SotingData(item?.sortingVale, ind);
                                setIconDate((prevState) => ({
                                  complete: !prevState.complete,
                                  ind: ind,
                                }));
                              }}>
                              {item?.heading}
                              <span>
                                {ind !== iconData.ind && (
                                  <i
                                    className="fa fa-sort ms-2 fs-12"
                                    style={{ opacity: "0.3" }}
                                  />
                                )}
                                {ind === iconData.ind &&
                                  (iconData.complete ? (
                                    <i
                                      className="fa fa-arrow-down ms-2 fs-12"
                                      style={{ opacity: "0.7" }}
                                    />
                                  ) : (
                                    <i
                                      className="fa fa-arrow-up ms-2 fs-12"
                                      style={{ opacity: "0.7" }}
                                    />
                                  ))}
                              </span>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {designList?.designs?.map((data, ind) => (
                        <tr key={ind}>
                          <td>
                            {/* <strong>{ind + 1}</strong> */}
                            <strong>
                              {(currentPage - 1) * sort + ind + 1}
                            </strong>
                          </td>
                          {/* <td>{data?._id}</td> */}
                          <td className="">
                            {data?.name}
                          </td>
                          <td>{moment(data?.created_at).format("DD MMM YYYY, h:mm:ss a")}
                          </td>
                          <td>
                            <Switch
                              checked={data?.status}
                              onChange={()=> handleStatusChange(data?._id, data?.status)}
                              offColor="#f0f1ff"
                              onColor="#6a73fa"
                              offHandleColor="#6a73fa"
                              onHandleColor="#fff"
                              uncheckedIcon={false}
                              checkedIcon={false}
                              width={40} // Adjust width of the switch
                              height={20} // Adjust height of the switch
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-xs sharp btn-primary me-1"
                              onClick={() => handleEditDesign(data?._id)}>
                              <i className="fa fa-pencil" />
                            </button>
                            <button
                              className="btn btn-xs sharp btn-danger"
                              onClick={() => handleDeletePart(data?._id)}>
                              <i className="fa fa-trash" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div>
                    {/* {brandList?.data?.length < brandList?.total && ( */}
                    <div className="d-sm-flex text-center justify-content-end align-items-center mt-3">
                      <div className="pagination-container">
                        <ReactPaginate
                          pageCount={Math.ceil(
                            designList?.totalDesigns / designList?.rowsPerPage
                          )}
                          pageRangeDisplayed={1}
                          marginPagesDisplayed={2}
                          onPageChange={handlePageClick}
                          containerClassName="pagination"
                          activeClassName="selected"
                          disabledClassName="disabled"
                        />
                      </div>
                    </div>
                    {/* )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Modal --> */}
          <Modal
            className="fade"
            show={modalCentered}
            onHide={setModalCentered}
            centered>
            <Modal.Header>
              <Modal.Title>
                {" "}
                {isEdit ? "Edit Sub Category" : "+ Add New Sub Category"}
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
                      <div className="mb-3 row mt-3">
                        <div className="col-sm-12">
                          <label className="col-sm-3 col-form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData?.name}
                            className="form-control"
                            placeholder="New Sub Category"
                            onChange={handleInputChange}
                          />
                          {errors?.name && (
                            <span className="text-danger fs-12">
                              {errors?.name}
                            </span>
                          )}
                        </div>
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
        </Col>
      </Row>
    </>
  );
};

export default Design;
