import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Dropdown, Button, Modal, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select from "react-select";

import PageTitle from '../../layouts/PageTitle';
import { getRestaurantsApi } from '../../../services/apis/RestaurantsApi';
import { addAddonsApi, getAddonsApi } from '../../../services/apis/AddOnServiceApi';
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
    { heading: 'Name', sortingVale: "name" },
    { heading: 'Restaurant', sortingVale: "restaurant" },
    { heading: 'Price', sortingVale: "price" },
    { heading: 'Status', sortingVale: "status" },
    { heading: 'Action', sortingVale: "action" }
];

const Addons = () => {
    const [sort, setSortata] = useState(10);
    const [modalCentered, setModalCentered] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [logo, setLogo] = useState(null);
    const [data, setData] = useState(
        document.querySelectorAll('#holidayList tbody tr')
    )
    const activePag = useRef(0)
    const [test, settest] = useState(0)
    const [restaurantList, setRestaurantList] = useState();
    const [formData, serFormData] = useState({ name: '', restaurant_id: '', price: '', restaurantName: '' });
    const [updatedAddons, setUpdateAddons] = useState();
    const [addonsList, setAddonsList] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({}); // To manage the error state

    console.log("List is here", addonsList);


    const chageData = (frist, sec) => {
        for (var i = 0; i < data.length; ++i) {
            if (i >= frist && i < sec) {
                data[i].classList.remove('d-none')
            } else {
                data[i].classList.add('d-none')
            }
        }
    }

    const resetFormData = () => {
        serFormData({ name: '', restaurant_id: '', price: '', restaurantName: '' })
    }

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.restaurant_id) newErrors.restaurant_id = "Please select restaurant.";
        if (!formData.price) newErrors.price = "Price is required.";

        setError(newErrors);

        // If there are no errors, return true (valid form), otherwise false
        return Object.keys(newErrors).length === 0;
    };


    const fetchRestaurants = async () => {
        setLoading(true);
        try {
            const res = await getRestaurantsApi(); // Use the appropriate API function for categories
            console.log(res.data, "restaurant are here");
            const dropdownRestaurant = res.data?.restaurants.map(restaurant => ({
                value: restaurant._id,
                label: restaurant.restaurantName
            }));
            setRestaurantList(dropdownRestaurant); // Update state to store categories
            // setUpdateSubcategory(false)
        } catch (error) {
            console.error("Error fetching categories:", error); // Handle error appropriately
        } finally {
            setLoading(false);
        }
    };

    const fetchAddons = async () => {
        setLoading(true);
        try {
            const res = await getAddonsApi();
            setAddonsList(res?.data?.addons);
            setUpdateAddons(false);
        } catch (error) {
            console.log("error is here", error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAddons();
        fetchRestaurants(); // Call fetchCategories instead of fetchCuisines
    }, [updatedAddons]);


    useEffect(() => {
        setData(document.querySelectorAll('#holidayList tbody tr'))
    }, [test])

    // Handle change when a new option is selected
    const handleSelectChange = (selected) => {
        setSelectedOption(selected); // Update selected option
        serFormData({
            ...formData,
            restaurantName: selected ? selected.label : '',
            restaurant_id: selected ? selected.value : ''
        });

        setError({
            ...error,
            restaurant_id: ''
        });


    };


    const handleInputChange = (e) => {
        serFormData({
            ...formData,
            [e.target.name]: e.target.value, // Dynamically update the field (name, etc.)
        });

        setError({
            ...error,
            [e.target.name]: ''
        });
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;  // If validation fails, do not proceed further
        }


        try {
            // Show loader
            setLoading(true);

            // Call the API to add the addons
            const res = await addAddonsApi(formData);
            if (res.status === 200) {
                setUpdateAddons(true);  // Update the state if necessary
                Toaster.success(res?.data?.message);

                // Reset the form
                resetFormData();

            } else {
                Toaster.error(res?.data?.message || "Failed to create addons. Please try again.");
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
            <PageTitle activeMenu={"Add new addon"} motherMenu={"Addons"} />
            {/* SECTION 3RD Restaurant Info*/}
            <div className="col-xl-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Add new addon</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-4 mt-2 mt-sm-0">
                                <label className="col-form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ex: Add new addons name"
                                    name="name"
                                    onChange={handleInputChange}
                                    value={formData?.name}
                                />
                                {error?.name && <span className="text-danger fs-12">{error?.name}</span>}
                            </div>
                            <div className="col-sm-4">
                                <label className="col-sm-3 col-form-label">
                                    Restaurant
                                </label>
                                <Select
                                    defaultValue={selectedOption}
                                    value={selectedOption}
                                    onChange={handleSelectChange}
                                    options={restaurantList}
                                    style={{
                                        lineHeight: "40px",
                                        color: "#7e7e7e",
                                        paddingLeft: " 15px",
                                    }}
                                />
                                {error?.restaurant_id && <span className="text-danger fs-12">{error?.restaurant_id}</span>}
                            </div>
                            <div className="col-sm-4 mt-2 mt-sm-0">
                                <label className="col-form-label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Ex: 100"
                                    name="price"
                                    onChange={handleInputChange}
                                    value={formData?.price}
                                />
                                {error?.price && <span className="text-danger fs-12">{error?.price}</span>}
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
                            <h4 className="card-title">Addon list</h4>
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
                                            {addonsList?.map((data, ind) => (
                                                <tr key={ind}>
                                                    <td><strong>{ind + 1}</strong> </td>
                                                    <td>{data.name}</td>
                                                    <td>{data.restaurantName}</td>
                                                    <td>{data.price} INR</td>
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

                </Col>
            </Row>

        </>
    );
};

export default Addons;