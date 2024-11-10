import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Dropdown, Button, Modal, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PageTitle from '../../layouts/PageTitle';
import { addCuisinesApi, getCuisinesApi } from '../../../services/apis/cuisinesApi';
import Loader from '../../components/Loader/Loader';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Toaster } from '../../components/Toaster/Toster';
import uplodIcon from '../../../assets/images/upload-icon.png'

const holidayTable = [
    { id: 1, sno: '01', title: 'Technical Author', subject: 'Designing', department: 'Architecture', year: '3', type: 'Book', status: 'In Stock' },
    { id: 10, sno: '02', title: 'Team Leader', subject: 'Computer', department: 'Office', year: '2', type: 'Comics', status: 'Out of Stock' },
    { id: 3, sno: '03', title: 'Software Engineer', subject: 'Computer', department: 'Data Entry', year: '1', type: 'Book', status: 'In Stock' },
    { id: 4, sno: '04', title: 'Integration Specialist', subject: 'Manager', department: 'Management', year: '2', type: 'Newspaper', status: 'In Stock' },
    { id: 2, sno: '05', title: 'Office Manager', subject: 'Head', department: 'Architecture', year: '1', type: 'Book', status: 'Out of Stock' },
    { id: 9, sno: '06', title: 'Brielle Williamson', subject: 'Gaurd', department: 'Security Department', year: '3', type: 'Newspaper', status: 'Out of Stock' },
    { id: 7, sno: '07', title: 'Regional Marketing', subject: 'Hardware', department: 'Office', year: '2', type: 'Comics', status: 'In Stock' },
    { id: 8, sno: '08', title: 'Technical Author', subject: 'Operator', department: 'Data Entry', year: '4', type: 'Newspaper', status: 'Out of Stock' },
    { id: 6, sno: '09', title: 'Networking', subject: 'Manager', department: 'Management', year: '1', type: 'Book', status: 'In Stock' },
    { id: 5, sno: '10', title: 'Systems Administrator', subject: 'Head', department: 'Architecture', year: '2', type: 'Newspaper', status: 'In Stock' },
    { id: 11, sno: '11', title: 'Office Manager', subject: 'Computer', department: 'Data Entry', year: '3', type: 'Book', status: 'Out of Stock' },
    { id: 15, sno: '12', title: 'Brielle Williamson', subject: 'Designing', department: 'Management', year: '4', type: 'Comics', status: 'In Stock' },
    { id: 13, sno: '13', title: 'Javascript Developer', subject: 'Employe', department: 'Office', year: '2', type: 'Comics', status: 'Out of Stock' },
    { id: 14, sno: '14', title: 'Technical Author', subject: 'Head', department: 'Architecture', year: '3', type: 'Book', status: 'In Stock' },
    { id: 12, sno: '15', title: 'Networking', subject: 'Computer', department: 'Data Entry', year: '1', type: 'Newspaper', status: 'Out of Stock' },
];

const theadData = [
    { heading: 'S.No.', sortingVale: "sno" },
    { heading: 'Cuisine sId', sortingVale: "cuisine_id" },
    { heading: 'Cuisine Name', sortingVale: "cuisine_name" },
    { heading: 'Status', sortingVale: "status" },
    { heading: 'Action', sortingVale: "action" }
];

const Cuisine = () => {
    const [sort, setSortata] = useState(10);
    const [loading, setLoading] = useState(false);
    const [modalCentered, setModalCentered] = useState(false);
    const [logo, setLogo] = useState(null);
    const [data, setData] = useState(
        document.querySelectorAll('#holidayList tbody tr')
    )
    const [formData, setFormData] = useState({
        name: "",
        image: null,
    });
    const [updateCuisines, setUpdateCuisines] = useState(false);
    const [cuisineList, setCuisineList] = useState();
    const [error, setErrors] = useState(null); // To manage the error state


    const resetForm = () => {
        setFormData({
            name: "",
            image: null,
        });
        setLogo(null); // Reset the displayed image
        setErrors({});  // Clear errors
    };


    const validateForm = () => {
        const newErrors = {};

        // Required field validation
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.image) newErrors.image = "Please select a image.";



        // Set errors to the state
        setErrors(newErrors);

        // If there are no errors, return true (valid form), otherwise false
        return Object.keys(newErrors).length === 0;
    };

    const fetchCuisines = async () => {
        // Set loading to true when the API call starts
        setLoading(true);
        try {
            const res = await getCuisinesApi();
            console.log(res.data, "Cuisines fetched");
            setCuisineList(res.data?.cuisines);
            setUpdateCuisines(false);
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
        fetchCuisines()
    }, [updateCuisines])


    // Handle input change for text fields (e.g., name)
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, // Dynamically update the field (name, etc.)
        });
        setErrors({
            ...error,
            name: ''
        });
    };



    // Handle the logo image change
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setLogo(reader.result);
            };
            reader.readAsDataURL(file);
            setFormData({
                ...formData,
                image: file, // Update the image field with the selected file
            });
            setErrors({
                ...error,
                image: null
            });
        }
    };

    const handleDeleteLogo = () => {
        setLogo(null);
        
        document.getElementById("logoUpload").value = ""; // Reset file input

        setFormData({
            ...formData,
            image: null,
        });
    };


    const handleSubmit = async () => {

        if (!validateForm()) {
            return;  // If validation fails, do not proceed further
        }

        setLoading(true);  // Start the loader
        try {
            // Assuming `addCuisinesApi` is the API call and `formData` contains the required data
            const res = await addCuisinesApi(formData);
            console.log(res, "response is here")
            // If response is successful (based on your API structure)
            if (res.status === 200) {
                setUpdateCuisines(true);
                Toaster.success(res?.data?.message); // Display success message
                resetForm();
                setModalCentered(false); // Close modal if necessary
            } else {
                // Handle any non-200 response cases
                Toaster.error(res?.data?.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            // If there's an error in the request itself (network error, timeout, etc.)
            Toaster.error(error.response?.data?.message || "An error occurred. Please try again.");
            console.error("Error:", error.message);
        } finally {
            setLoading(false);  // Stop the loader
        }
    };


    const activePag = useRef(0)
    const [test, settest] = useState(0)

    const chageData = (frist, sec) => {
        for (var i = 0; i < data.length; ++i) {
            if (i >= frist && i < sec) {
                data[i].classList.remove('d-none')
            } else {
                data[i].classList.add('d-none')
            }
        }
    }

    useEffect(() => {
        setData(document.querySelectorAll('#holidayList tbody tr'))
    }, [test])




    activePag.current === 0 && chageData(0, sort)

    let paggination = Array(Math.ceil(data.length / sort))
        .fill()
        .map((_, i) => i + 1)


    const onClick = (i) => {
        activePag.current = i
        chageData(activePag.current * sort, (activePag.current + 1) * sort)
        settest(i)
    }

    const [feeData, setFeeDate] = useState([...holidayTable]);
    const [iconData, setIconDate] = useState({ complete: false, ind: Number });


    function SotingData(name) {
        const sortedPeople = [...feeData];
        switch (name) {
            case "sno":
                sortedPeople.sort((a, b) => {
                    return a.sno < b.sno ? -1 : 1
                });
                break;
            case "title":
                sortedPeople.sort((a, b) => {
                    return iconData.complete ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
                });
                break;
            case "subject":
                sortedPeople.sort((a, b) => {
                    return iconData.complete ? a.subject.localeCompare(b.subject) : b.subject.localeCompare(a.subject)
                });
                break;
            case "department":
                sortedPeople.sort((a, b) => {
                    return iconData.complete ? a.department.localeCompare(b.department) : b.department.localeCompare(a.department)
                });
                break;
            case "type":
                sortedPeople.sort((a, b) => {
                    return iconData.complete ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type)
                });
                break;
            case "cap":
                sortedPeople.sort((a, b) => {
                    return iconData.complete ? a.cap.localeCompare(b.cap) : b.cap.localeCompare(a.cap)
                });
                break;
            case "status":
                sortedPeople.sort((a, b) => {
                    return iconData.complete ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
                });
                break;
            default:
                break;
        }
        setFeeDate(sortedPeople);
    }

    function DataSearch(e) {
        const updatesDate = holidayTable.filter(item => {
            let selectdata = `${item.hod} ${item.type} ${item.department} ${item.subject} ${item.cap} ${item.status}`.toLowerCase();
            return selectdata.includes(e.target.value.toLowerCase())
        });
        setFeeDate([...updatesDate])
    }

    const styles = {
        container: {
            border: '2px dashed #ccc',
            borderRadius: '8px',
            width: '150px', // Logo size
            height: '150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: '#f9f9f9',
            position: 'relative',
            textAlign: 'center',
            overflow: 'hidden',
        },
        coverContainer: {
            border: '2px dashed #ccc',
            borderRadius: '8px',
            width: '300px', // Cover size (2:1 ratio)
            height: '150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: '#f9f9f9',
            position: 'relative',
            textAlign: 'center',
            overflow: 'hidden',
        },
        placeholder: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            textAlign: 'center',
        },
        img: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
        },
        hover: {
            borderColor: '#007bff',
            backgroundColor: '#e9f4ff',
        },
        uploadIcon: {
            color: '#888',
            fontSize: '16px',
            fontWeight: 'bold',
        },
        deleteIcon: {
            position: 'absolute',
            top: '0px',
            right: '0px',
            backgroundColor: '#FF6D6D',
            color: 'white',
            borderRadius: '100%',
            padding: '5px 10px',
            cursor: 'pointer',
            zIndex: 2,
            fontSize: '10px',
            fontWeight: 'bold',
        }
    };

    return (
        <>
            <ToastContainer />
            <Loader visible={loading} />
            <PageTitle activeMenu={"Cuisine List"} motherMenu={"Restaurants"} />
            <Row>
                <Col lg={12}>
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Cuisine List</h4>
                            {/* <Link to={"/add-staff"} className="btn btn-primary">+ Add New</Link> */}
                            <Button
                                variant="primary"
                                type="button"
                                className="mb-2 me-2"
                                onClick={() => setModalCentered(true)}
                            >
                                + Add New Cuisine
                            </Button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <div id='holidayList' className='dataTables_wrapper no-footer'>
                                    <div className='justify-content-between d-sm-flex'>
                                        <div className='dataTables_length'>
                                            <label className='d-flex align-items-center'>
                                                Show
                                                <Dropdown className='search-drop'>
                                                    <Dropdown.Toggle as="div" className="search-drop-btn">
                                                        {sort}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => setSortata('10')}>10</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSortata('20')}>20</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                entries
                                            </label>
                                        </div>
                                        <div className="dataTables_filter">
                                            <label>Search : <input type="search" className="" placeholder=""
                                                onChange={DataSearch}
                                            />
                                            </label>
                                        </div>
                                    </div>
                                    <table id="example4" className="display dataTable no-footer w-100" >
                                        <thead>
                                            <tr>
                                                {theadData.map((item, ind) => (
                                                    <th key={ind}
                                                        onClick={() => { SotingData(item.sortingVale); setIconDate(prevState => ({ complete: !prevState.complete, ind: ind })) }}
                                                    >{item.heading}
                                                        <span>
                                                            {ind !== iconData.ind &&
                                                                <i className="fa fa-sort ms-2 fs-12" style={{ opacity: '0.3' }} />
                                                            }
                                                            {ind === iconData.ind && (
                                                                iconData.complete ?
                                                                    <i className="fa fa-arrow-down ms-2 fs-12" style={{ opacity: '0.7' }} />
                                                                    :
                                                                    <i className="fa fa-arrow-up ms-2 fs-12" style={{ opacity: '0.7' }} />
                                                            )
                                                            }
                                                        </span>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cuisineList?.map((data, ind) => (
                                                <tr key={ind}>
                                                    <td><strong>{ind + 1}</strong></td>
                                                    <td>{data._id}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.status}</td>
                                                    <td>
                                                        <Link to={"#"} className="btn btn-xs sharp btn-primary me-1"><i className="fa fa-pencil" /></Link>
                                                        <Link to={"#"} className="btn btn-xs sharp btn-danger"><i className="fa fa-trash" /></Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className='d-sm-flex text-center justify-content-between align-items-center mt-3'>
                                        <div className='dataTables_info'>
                                            Showing {activePag.current * sort + 1} to{' '}
                                            {data.length > (activePag.current + 1) * sort
                                                ? (activePag.current + 1) * sort
                                                : data.length}{' '}
                                            of {data.length} entries
                                        </div>
                                        <div
                                            className='dataTables_paginate paging_simple_numbers'
                                            id='example5_paginate'
                                        >
                                            <Link
                                                className='paginate_button previous disabled'
                                                to={'#'}
                                                onClick={() =>
                                                    activePag.current > 0 && onClick(activePag.current - 1)
                                                }
                                            >
                                                Previous
                                            </Link>
                                            <span>
                                                {paggination.map((number, i) => (
                                                    <Link
                                                        key={i}
                                                        to={'#'}
                                                        className={`paginate_button  ${activePag.current === i ? 'current' : ''
                                                            } `}
                                                        onClick={() => onClick(i)}
                                                    >
                                                        {number}
                                                    </Link>
                                                ))}
                                            </span>
                                            <Link
                                                className='paginate_button next'
                                                to={'#'}
                                                onClick={() =>
                                                    activePag.current + 1 < paggination.length &&
                                                    onClick(activePag.current + 1)
                                                }
                                            >
                                                Next
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Modal --> */}
                    <Modal className="fade" show={modalCentered} onHide={setModalCentered} centered>
                        <Modal.Header>
                            <Modal.Title>+ Add new cuisine</Modal.Title>
                            <Button
                                onClick={() => setModalCentered(false)}
                                variant=""
                                className="btn-close"
                            >

                            </Button>
                        </Modal.Header>
                        <Modal.Body>

                            <div className="col-xl-12 col-lg-12 ">
                                <div className="card">
                                    <div className="card-body">
                                        <div>
                                            <div className="mb-3 row">
                                                <div className="col-sm-12">
                                                    <label className="col-sm-3 col-form-label">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="form-control"
                                                        placeholder="New cuisine"
                                                        onChange={handleInputChange}

                                                    />
                                                    {error?.name && <span className="text-danger fs-12">{error?.name}</span>}

                                                </div>
                                            </div>

                                            {/* <div className="mb-3 row flex justify-center items-center">
                                                <div className="col-sm-12">
                                                    <label className="col-form-label">Cuisine image</label>
                                                    <div style={styles.container}>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleLogoChange}
                                                            style={{ display: 'none' }}
                                                            id="logoUpload"
                                                        />
                                                        <label htmlFor="logoUpload" style={styles.placeholder}>
                                                            {logo ? (
                                                                <img src={logo} alt="Logo" style={styles.img} />
                                                            ) : (
                                                                <div style={styles.uploadIcon}>Upload Image</div>
                                                            )}
                                                        </label>

                                                    </div>
                                                    <p>Image format - jpg png jpeg gif<br />Image Size - maximum size 2 MB<br />Image Ratio - 1:1</p>
                                                </div>

                                            </div> */}
                                            <div className="col-sm-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                <label className="col-form-label">Logo</label>
                                                <div style={styles.container}>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleLogoChange}
                                                        style={{ display: 'none' }}
                                                        id="logoUpload"
                                                    />
                                                    {logo ? (
                                                        <>
                                                            {/* Simple 'X' button as the delete icon */}
                                                            <div style={styles.deleteIcon} onClick={handleDeleteLogo}>
                                                                ⛌
                                                            </div>
                                                            <img src={logo} alt="Logo" style={styles.img} />
                                                        </>
                                                    ) : (
                                                        <label htmlFor="logoUpload" style={styles.placeholder}>
                                                            <div style={styles.uploadIcon} className='flex flex-col cursor-pointer'>
                                                                <img width="30" src={uplodIcon} alt="Upload Icon"></img>
                                                                <p>Upload Image</p>
                                                            </div>
                                                        </label>
                                                    )}
                                                </div>
                                                <p className='mt-2'>Image format - jpg png jpeg gif<br />Image Size - maximum size 2 MB<br />Image Ratio - 1:1</p>
                                                {error?.image && <span className="text-danger fs-12">{error?.image}</span>}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                onClick={() => setModalCentered(false)}
                                variant="danger light"
                            >
                                Close
                            </Button>
                            <Button onClick={() => { handleSubmit() }} variant="primary">Save changes</Button>
                        </Modal.Footer>
                    </Modal>

                </Col>
            </Row>
        </>
    );
};

export default Cuisine;