import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Dropdown, Button, Modal, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select from "react-select";

import PageTitle from '../../layouts/PageTitle';
import { addSubCategoryApi, getCategoriesApi } from '../../../services/apis/CategoryApi';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import uplodIcon from '../../../assets/images/upload-icon.png'
import { Toaster } from '../../components/Toaster/Toster';
import Loader from '../../components/Loader/Loader';

const options = [
    { value: "demo", label: "Demo zone" },
    { value: "new", label: "New" },
    { value: "north", label: "North" },
];

const holidayTable = [
    { id: 1, sno: '01', title: 'Technical Author', subject: 'Designing', department: 'Architecture', year: '3', type: 'Book', status: 'In Stock' },
    { id: 10, sno: '02', title: 'Team Leader', subject: 'Computer', department: 'Office', year: '2', type: 'Comics', status: 'Out of Stock' },
    { id: 3, sno: '03', title: 'Software Engineer', subject: 'Computer', department: 'Data Entry', year: '1', type: 'Book', status: 'In Stock' },
    { id: 4, sno: '04', title: 'Integration Specialist', subject: 'Manager', department: 'Management', year: '2', type: 'Newspaper', status: 'In Stock' },
    { id: 12, sno: '15', title: 'Networking', subject: 'Computer', department: 'Data Entry', year: '1', type: 'Newspaper', status: 'Out of Stock' },
];

const theadData = [
    { heading: 'S.No.', sortingVale: "sno" },
    { heading: 'SubCategory Id', sortingVale: "subcategory_id" },
    { heading: 'Name', sortingVale: "name" },


    { heading: 'Status', sortingVale: "status" },
    { heading: 'Action', sortingVale: "action" }
];

const SubCategories = () => {
    const [sort, setSortata] = useState(10);
    const [modalCentered, setModalCentered] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [logo, setLogo] = useState(null);
    const [data, setData] = useState(
        document.querySelectorAll('#holidayList tbody tr')
    )
    const activePag = useRef(0)
    const [test, settest] = useState(0)
    const [categoryList, setCategoryList] = useState();
    const [subCategoriesList, setSubCategoriesList] = useState();
    const [formData, setFormData] = useState({ name: '', category: '' });
    const chageData = (frist, sec) => {
        for (var i = 0; i < data.length; ++i) {
            if (i >= frist && i < sec) {
                data[i].classList.remove('d-none')
            } else {
                data[i].classList.add('d-none')
            }
        }
    }
    const [loading, setLoading] = useState(false);
    const [updateSubcategory, setUpdateSubcategory] = useState(false);
    const [error, setError] = useState({});

    useEffect(() => {
        setData(document.querySelectorAll('#holidayList tbody tr'))
    }, [test])


    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await getCategoriesApi(); // Call the API to get categories
            console.log(res.data, "categories are here");

            // Filter and set the subcategories
            setSubCategoriesList(res.data.categories.filter(category => category.type === "sub-category"));

            // Filter categories to only include main categories
            const dropdownCategory = res.data.categories
                .filter(category => category.type === "main-category") // Only include main categories
                .map(category => ({
                    value: category._id,
                    label: category.name,
                }));

            // Update the state with main categories for the dropdown
            setCategoryList(dropdownCategory);
            setUpdateSubcategory(false);
        } catch (error) {
            console.error("Error fetching categories:", error); // Handle error appropriately
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories(); // Call fetchCategories instead of fetchCuisines
    }, [updateSubcategory]);

    // Handle the logo image change
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setLogo(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        if (!formData.name || !selectedOption?.value) {
            setError({
                name: !formData.name ? "Name is required" : "",
                category: !selectedOption?.value ? "Main category is required" : "",
            });
            return;
        }

        // Prepare the data to be sent to the API
        const data = {
            name: formData.name,
            parent_id: selectedOption.value,
        };

        try {
            // Show loader
            setLoading(true);
            // Call the API to add subcategory
            const res = await addSubCategoryApi(data);
            if (res.status === 200) {
                setUpdateSubcategory(true);  // Trigger any necessary state updates
                Toaster.success(res?.data?.message);  // Show success message

                // Reset the form
                setFormData({ name: "", category: null });
                setSelectedOption(null);
            } else {
                Toaster.error(res?.data?.message || "Failed to add subcategory. Please try again.");
            }
        } catch (error) {
            Toaster.error(error.response?.data?.message || "An error occurred. Please try again.");
            console.error("Error:", error);
        } finally {
            // Hide loader
            setLoading(false);
        }
    };


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

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, // Dynamically update the field (name, etc.)
        });
        setError({
            ...error,
            name: ''
        });
    };

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

    // Inline styles
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
            width: '250px', // Cover size (2:1 ratio)
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
            <PageTitle activeMenu={"Sub Category"} motherMenu={"Categories"} />
            {/* SECTION 3RD Restaurant Info*/}
            <div className="col-xl-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Sub Category</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <label className="col-sm-3 col-form-label">
                                    Main Category*
                                </label>
                                <Select
                                    defaultValue={selectedOption}
                                    // onChange={setSelectedOption}
                                    onChange={(option) => {
                                        setSelectedOption(option); // Update the selected option
                                        setFormData({
                                            ...formData,
                                            category: option.value, // Update the form data with the selected category value
                                        });

                                        // Clear the category error if there was one
                                        if (error.category) {
                                            setError((prevError) => ({
                                                ...prevError,
                                                category: "", // Clear the error for category
                                            }));
                                        }
                                    }}

                                    options={categoryList}
                                    style={{
                                        lineHeight: "40px",
                                        color: "#7e7e7e",
                                        paddingLeft: " 15px",
                                    }}
                                />
                                {error?.category && <span className="text-danger fs-12">{error?.category}</span>}
                            </div>
                            <div className="col-sm-6 mt-2 mt-sm-0">
                                <label className="col-form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ex: Sub Category Name"
                                    name="name"
                                    onChange={handleInputChange}
                                    value={formData?.name}
                                />
                                {error?.name && <span className="text-danger fs-12">{error?.name}</span>}

                            </div>


                        </div>
                    </div>
                    <div className="text-end p-3">
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary rounded-sm">Submit</button>
                    </div>
                </div>
            </div>
            <Row>
                <Col lg={12}>
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Sub category list</h4>
                            {/* <Link to={"/add-staff"} className="btn btn-primary">+ Add New</Link> */}
                            <Button
                                variant="primary"
                                type="button"
                                className="mb-2 me-2"
                                onClick={() => setModalCentered(true)}
                            >
                                Export
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
                                            {subCategoriesList?.map((data, ind) => (
                                                <tr key={ind}>
                                                    <td><strong>{ind + 1}</strong> </td>
                                                    <td>{data._id}</td>
                                                    <td>{data.name}</td>

                                                    {/* <td>{data.parent_category}</td> */}
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

                            <div className="col-xl-12 col-lg-12">
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
                                                        className="form-control"
                                                        placeholder="New cuisine"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
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
                            <Button variant="primary">Save changes</Button>
                        </Modal.Footer>
                    </Modal>

                </Col>
            </Row>

        </>
    );
};

export default SubCategories;