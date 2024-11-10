import React, { useState, useRef, useEffect } from 'react';
// import { Row, Col, Dropdown, Button, Modal, Container, Card } from 'react-bootstrap';

import { Dropdown, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Container, Collapse, TabContent, TabPane, NavLink, Row, Col, Table } from 'reactstrap'

import PageTitle from '../../layouts/PageTitle';
import { getEmployeesApi } from '../../../services/apis/EmployeeApi';
import Loader from '../../components/Loader/Loader';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Toaster } from '../../components/Toaster/Toster';

const holidayTable = [
    { id: 1, sno: '01', employeeName: 'John Doe', phone: '+91-8000-234-234', email: 'john@example.com', createdAt: '01/10/2024' },
    ];

const theadData = [
    { heading: 'S.No.', sortingVale: "sno" },
    { heading: 'Employee Name', sortingVale: "employeeName" },
    { heading: 'Phone', sortingVale: "phone" },
    { heading: 'Email', sortingVale: "email" },
    { heading: 'Created At', sortingVale: "createdAt" },
    { heading: 'Action', sortingVale: "action" }
];

const modules = [
    {
        _id: "659501b4bde1213351e1f2de",
        menu: "Dashboard",
        parentMenu: "Dashboard",
        type: "mainMenu",
        icon: "dashboard",
        route: "dashboard",
        priority: 1,
        menuCategory: "Menu",
        subMenu: []
    },
    {
        _id: "659502a1bde1213351e1f2e3",
        menu: "Hotels",
        parentMenu: "Hotels",
        type: "mainMenu",
        route: "hotels",
        icon: "hotel",
        priority: 2,
        menuCategory: "Menu",
        subMenu: []
    },
    {
        _id: "65994d966f1ccc27ffdc91ba",
        menu: "Room",
        parentMenu: "Room",
        type: "mainMenu",
        route: "rooms",
        icon: "home",
        menuCategory: "Menu",
        priority: 3,
        subMenu: []
    },
]

const permission =
    [
        {
            "_id": "658403b68ecdd0c7b0837d46",
            "permission_name": "Create Hotel",
            "route": "create-hotel",
            "module_name": "Hotel",
            "type": "Create"
        },
        {
            "_id": "663232c421bc44964a792db4",
            "permission_name": "View Sidebar Menu",
            "description": "Permission to view Sidebar menu",
            "route": "sidebar-menus"
        },
        {
            "_id": "6634799563d4ea8933f94db5",
            "permission_name": "View Hotels",
            "route": "hotels-list",
            "module_name": "Hotel",
            "type": "View"
        },
        {
            "_id": "663479ee63d4ea8933f94db8",
            "permission_name": "Delete Hotels",
            "route": "delete-hotel",
            "module_name": "Hotel",
            "type": "Delete"
        },
        {
            "_id": "66347a1363d4ea8933f94db9",
            "permission_name": "CreateRoom",
            "route": "create-room",
            "module_name": "Room",
            "type": "Create"
        },
        {
            "_id": "6635b95b5719d91165748842",
            "permission_name": "Edit Hotels",
            "route": "edit-hotel",
            "module_name": "Hotel",
            "type": "Edit"
        },
        {
            "_id": "6645ab1dee0270ccb9e40b59",
            "permission_name": "View Rooms",
            "route": "room-list",
            "module_name": "Room",
            "type": "View"
        },
        {
            "_id": "6645c6f9ee0270ccb9e40b5e",
            "permission_name": "Edit Room",
            "route": "edit-room",
            "module_name": "Room",
            "type": "Edit"
        },
        {
            "_id": "6645c7edee0270ccb9e40b62",
            "permission_name": "Delete Room",
            "route": "delete-room",
            "module_name": "Room",
            "type": "Delete"
        },
        {
            "_id": "6645cfebee0270ccb9e40b67",
            "permission_name": "View Room Category",
            "route": "roomcategory-list",
            "module_name": "Room Category",
            "type": "View"
        },
        {
            "_id": "6645d5f3ee0270ccb9e40b6a",
            "permission_name": "Edit Room Category",
            "route": "edit-roomcategory",
            "module_name": "Room Category",
            "type": "Edit"
        },
        {
            "_id": "6645da36ee0270ccb9e40b72",
            "permission_name": "Delete Room Category",
            "route": "delete-roomcategory",
            "module_name": "Room Category",
            "type": "Delete"
        },
        {
            "_id": "6645db6cee0270ccb9e40b77",
            "permission_name": "Create Room Category",
            "route": "create-roomcategory",
            "module_name": "Room Category",
            "type": "Create"
        },
        {
            "_id": "6646f18a8b5abae7db63704e",
            "permission_name": "Create Hotel Category",
            "route": "create-hotelcategory",
            "module_name": "Hotel Category",
            "type": "Create"
        },
        {
            "_id": "6646f1ac8b5abae7db63704f",
            "permission_name": "Edit Hotel Category",
            "route": "edit-hotelcategory",
            "module_name": "Hotel Category",
            "type": "Edit"
        },
        {
            "_id": "6646f1c48b5abae7db637050",
            "permission_name": "View Hotel Category",
            "route": "hotelcategory-list",
            "module_name": "Hotel Category",
            "type": "View"
        },
        {
            "_id": "6646f1e38b5abae7db637051",
            "permission_name": "Delete Hotel Category",
            "route": "delete-hotelcategory",
            "module_name": "Hotel Category",
            "type": "Delete"
        },
    ]

const EmployeeList = () => {
    const [sort, setSortata] = useState(10);
    const [modalCentered, setModalCentered] = useState(false);
    const [logo, setLogo] = useState(null);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState(
        document.querySelectorAll('#holidayList tbody tr')
    )
    const activePag = useRef(0)
    const [test, settest] = useState(0);
    const [employeeData, setEmployeeData] = useState();
    console.log("employeeData  employeeData",employeeData);

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

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const res = await getEmployeesApi();
            console.log(res.data, "roles is here");
            setEmployeeData(res.data?.admins)
            // setUpdateRoles(false)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=> {
        fetchEmployees()
    },[])


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
    };
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [selectedModuleIds, setSelectedModuleIds] = useState([]);
    const [selectedPermissionIds, setSelectedPermissionIds] = useState([]);


    const handleToggleMenuItem = (moduleId) => {
        const isSelected = selectedModuleIds.includes(moduleId);
        if (isSelected) {
            // Module is already selected, so remove it from the array
            setSelectedModuleIds(selectedModuleIds.filter(id => id !== moduleId));
        } else {
            // Module is not selected, so add it to the array
            setSelectedModuleIds([...selectedModuleIds, moduleId]);
        }
    };

    const handleSelect = (permissionId) => {
        const isSelected = selectedPermissionIds.includes(permissionId);
        // Create a new array with updated selected permission IDs
        let updatedSelectedIds;
        if (isSelected) {
            updatedSelectedIds = selectedPermissionIds.filter((id) => id !== permissionId);
        } else {
            updatedSelectedIds = [...selectedPermissionIds, permissionId];
        }
        // Update the selectedPermissionIds state with the new array
        setSelectedPermissionIds(updatedSelectedIds);
    };

    // Organize permissions data by module and type
    const permissionData = {};
    permission.forEach((perm) => {
        const { module_name, type } = perm;
        if (!permissionData[module_name]) {
            permissionData[module_name] = {};
        }
        if (!permissionData[module_name][type]) {
            permissionData[module_name][type] = [];
        }
        permissionData[module_name][type].push(perm);
    });



    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    const toggleCollapse1 = () => {
        setIsOpen1(!isOpen1);
    };
    return (
        <>
         <ToastContainer />
         <Loader visible={loading} />
            <PageTitle activeMenu={"Employee List"} motherMenu={"Employees"} />
            <Row>
                <Col lg={12}>
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Employee List
                            </h4>
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
                                            {employeeData?.map((data, ind) => (
                                                <tr key={ind}>
                                                    <td><strong>{ind + 1}</strong> </td>
                                                    <td>{`${data?.firstName} ${data?.lastName}`}</td>
                                                    <td>{data?.phone}</td>
                                                    <td>{data?.email}</td>
                                                    <td>
                                                        {new Date(data.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit',
                                                            hour12: true // to show AM/PM format
                                                        })}
                                                    </td>
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

export default EmployeeList;