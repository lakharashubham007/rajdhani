import React, { useState, useRef, useEffect } from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Container, Collapse, TabContent, TabPane, NavLink, Row, Col, Table } from 'reactstrap'
import PageTitle from '../../layouts/PageTitle';
import { getSidebarMenusApi } from '../../../services/apis/SidebarMenuApi';
import { getPermissionApi } from '../../../services/apis/permisssionApi';
import { createRoleApi, getRolesApi } from '../../../services/apis/RolesApi';
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
    { heading: 'Modules', sortingVale: "modules" },
    { heading: 'Created At', sortingVale: "createdAt" },
    { heading: 'Action', sortingVale: "action" }
];

const EmployeeRole = () => {
    const [sort, setSortata] = useState(10);
    const [modalCentered, setModalCentered] = useState(false);
    const [logo, setLogo] = useState(null);
    const [data, setData] = useState(document.querySelectorAll('#holidayList tbody tr'))
    const activePag = useRef(0)
    const [test, settest] = useState(0);
    const [permission, setPermission] = useState();
    const [modules, setModules] = useState();
    const [rolesData, setRolesData] = useState();
    const [updateRoles, setUpdateRoles] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [selectedModuleIds, setSelectedModuleIds] = useState([]);
    const [selectedPermissionIds, setSelectedPermissionIds] = useState([]);
    const [roleName, setRoleName] = useState('');
    const [feeData, setFeeDate] = useState([...holidayTable]);
    const [iconData, setIconDate] = useState({ complete: false, ind: Number });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        // Required field validation
        if (!roleName) newErrors.roleName = "Role Name is required.";
        // if (!formData.image) newErrors.image = "Please select a image.";



        // Set errors to the state
        setErrors(newErrors);

        // If there are no errors, return true (valid form), otherwise false
        return Object.keys(newErrors).length === 0;
    };


    // Function to handle the change event
    const handleRoleNameChange = (e) => {
        setRoleName(e.target.value);
        setErrors({})
      
    };

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


    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;  // If validation fails, do not proceed further
        }
        setLoading(true);

        const formData = {
            name: roleName,
            sidebarMenus: selectedModuleIds,
            permissions: selectedPermissionIds,
        };

        try {
            const res = await createRoleApi(formData);
            if (res.status === 201) {
                Toaster.success(res?.data?.role?.message);
                setUpdateRoles(true);


                // Clear form data after successful submission
                setRoleName(''); // Reset roleName
                setSelectedModuleIds([]); // Reset selectedModuleIds
                setSelectedPermissionIds([]); // Reset selectedPermissionIds
            }
        } catch (error) {
            // Handle the error appropriately
            Toaster.error(error.response?.data?.message || 'An error occurred while creating the role.');
        } finally {
            setLoading(false);
        }
    };


    // // Handle form submit
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     const formData = {
    //         name: roleName,
    //         sidebarMenus: selectedModuleIds,
    //         permissions: selectedPermissionIds,
    //     };
    //     const res = await createRoleApi(formData);
    //     if (res.status === 201) {
    //         setLoading(false);
    //         Toaster.success(res?.data?.role?.message);
    //         setUpdateRoles(true)
    //     }
    //     setLoading(false);
    // };

    //Sweet alert
    //   Swal.fire({     
    //     icon: 'success',                   
    //     title: "success!!",
    //     text: res?.data?.role?.message,
    //     showConfirmButton: false,                  
    //     timer: 1500
    //   })

    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Good job!',
    //     text: res?.data?.role?.message,                        
    //   })


    // Define the function to fetch sidebar menus
    const fetchSidebarMenus = async () => {
        try {
            setLoading(true);
            const response = await getSidebarMenusApi();
            const menus = response?.data?.MenuList;
            setModules(menus);
            setLoading(false); // Set loading to false when data is fetched
        } catch (err) {
            //   setError(err.message);
            setLoading(false); // Set loading to false even on error
        }
    };

    const fetchPermission = async () => {
        try {
            setLoading(true);
            const res = await getPermissionApi();
            setPermission(res.data?.permissions)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const res = await getRolesApi();
            console.log(res.data, "roles is here");
            setRolesData(res.data?.roles)
            setUpdateRoles(false)
            setLoading(false);

        } catch (error) {
            setLoading(false);

        }
    }

    // useEffect to call fetchSidebarMenus when component mounts
    useEffect(() => {
        fetchSidebarMenus();
        fetchPermission();
        fetchRoles();
    }, [updateRoles]);

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


    // Organize permissions data by module and type
    const permissionData = {};
    permission?.forEach((perm) => {
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
            <PageTitle activeMenu={"Employee Role"} motherMenu={"Employee Managment"} />
            {/* SECTION Restaurant Info*/}
            <div className="col-xl-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Employee Role</h4>
                    </div>
                    <div className="card-body">
                        <div className="col">
                            {/* Name field */}
                            <div className="col-sm-5 mt-2 mt-sm-0">
                                <label className="col-form-label" style={{ marginLeft: '5px' }}>Role Name</label>
                                <input
                                    style={{ marginLeft: '3px' }}
                                    type="text"
                                    className="form-control"
                                    placeholder="Ex: Role Name"
                                    onChange={handleRoleNameChange}
                                    value={roleName}
                                />
                                {errors.roleName && <span className="text-danger fs-12">{errors.roleName}</span>}
                            </div>

                            {/* sidebar menus */}
                            <Col xl={12} className='mt-4'>
                                <Card >
                                    <CardBody>
                                        <h4
                                            className="card-title"
                                            onClick={toggleCollapse}
                                            style={{ cursor: "pointer" }}>
                                            Sidebar Menu <span style={{ cursor: "pointer", fontSize: 'x-large', marginLeft: '15px', fontWeight: 'bold' }}>+</span></h4>
                                        <p className="card-title-desc">Select the specific sidebar menus to be accessible for this role.</p>
                                        <Collapse isOpen={isOpen}>
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>Menu Item</th>
                                                        <th>Activate</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {modules?.filter((module) => module.classChange !== "menu-title").map((module) => (
                                                        <tr key={module._id}>
                                                            <td>{module.title}</td>
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    id={`square-switch${module._id}`}
                                                                    switch="none"
                                                                    checked={selectedModuleIds.includes(module._id)}
                                                                    onChange={() => handleToggleMenuItem(module._id)}
                                                                />
                                                                <label htmlFor={`square-switch${module._id}`} data-on-label="Yes" data-off-label="No" />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Collapse>
                                    </CardBody>
                                </Card>
                            </Col>

                            {/* permission menu */}
                            <Col xl={12}>
                                <Card>
                                    <CardBody>
                                        <h4 className="card-title" onClick={toggleCollapse1} style={{ cursor: "pointer" }}>
                                            Permission Menu<span style={{ cursor: "pointer", fontSize: 'x-large', marginLeft: '15px', fontWeight: 'bold' }}>+</span>
                                        </h4>
                                        <p className="card-title-desc">Customize role permissions to define specific access rights and privileges for user roles.</p>
                                        <Collapse isOpen={isOpen1}>
                                            <div className="card card-body mb-0">
                                                <div className="permissions-table-container">
                                                    <table className="table permissions-table">
                                                        <thead >
                                                            <tr >
                                                                <th className="permissions-column">Module</th>
                                                                <th className="permissions-column">Permissions</th> {/* New column for permissions */}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Object.entries(permissionData)?.map(([moduleName, modulePermissions]) => (
                                                                <tr key={moduleName}>
                                                                    <td>{moduleName}</td>
                                                                    <td className="permissions-column">
                                                                        {Object.entries(modulePermissions)
                                                                            .sort(([typeA], [typeB]) => {
                                                                                const order = ['View', 'Create', 'Edit', 'Delete'];
                                                                                return order.indexOf(typeA) - order.indexOf(typeB);
                                                                            })
                                                                            .map(([type, permissionsArray]) => (
                                                                                <div className='d-flex align-items-center' key={type}>
                                                                                    {permissionsArray.map((perm) => (
                                                                                        <label className='d-flex align-items-center' key={perm._id}>
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                checked={selectedPermissionIds.includes(perm._id)}
                                                                                                onChange={() => handleSelect(perm._id)}
                                                                                            />{' '}
                                                                                            <span className='mx-2'>{perm?.type?.charAt(0).toUpperCase() + perm?.type?.slice(1)} </span>
                                                                                        </label>
                                                                                    ))}
                                                                                    <br />
                                                                                </div>
                                                                            ))}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </CardBody>
                                </Card>
                            </Col>

                        </div>
                    </div>
                    <div className="text-end p-3">
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary rounded-sm">Submit</button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <Row>
                <Col lg={12}>
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Employee Role Table
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
                                                {theadData?.map((item, ind) => (
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
                                            {rolesData?.map((data, ind) => (
                                                <tr key={ind}>
                                                    <td><strong>{ind + 1}</strong> </td>
                                                    <td>{data.name}</td>
                                                    <td>
                                                        {data?.sidebarMenus?.map(menu => menu.title)
                                                            .reduce((resultArray, item, index) => {
                                                                const chunkIndex = Math.floor(index / 3); // Change 3 to adjust how many titles per line

                                                                if (!resultArray[chunkIndex]) {
                                                                    resultArray[chunkIndex] = []; // Start a new chunk
                                                                }

                                                                resultArray[chunkIndex].push(item); // Add the title to the current chunk

                                                                return resultArray;
                                                            }, [])
                                                            .map((chunk, index) => (
                                                                <div key={index}>
                                                                    {chunk.join(', ')}
                                                                </div>
                                                            ))
                                                        }
                                                    </td>
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

export default EmployeeRole;