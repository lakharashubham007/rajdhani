import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Row, Col, Dropdown, Button, Modal, Container, Card,Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageTitle from '../../layouts/PageTitle';
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    Polyline,
    Polygon,
} from "@react-google-maps/api";
import { createZoneApi, getZonesApi } from '../../../services/apis/ZoneApi';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Loader from '../../components/Loader/Loader';
import { Toaster } from '../../components/Toaster/Toster';


const containerStyle = {
    width: "100%",
    height: "300px",
};

const center = {
    lat: 28.6139, // Default latitude (New Delhi)
    lng: 77.209, // Default longitude (New Delhi)
};


const holidayTable = [
    { id: 1, sno: '01', title: '1', subject: 'Shubhashnagar', status: 'In Stock' },
];

const theadData = [
    { heading: 'S.No.', sortingVale: "sno" },
    { heading: 'Zone Id', sortingVale: "zone-id" },
    { heading: 'Name', sortingVale: "name" },
    { heading: 'Status', sortingVale: "status" },
    { heading: 'Action', sortingVale: "action" }
];

const Zone = () => {
    const [sort, setSortata] = useState(10);
    const [modalCentered, setModalCentered] = useState(false);
    const [logo, setLogo] = useState(null);
    const [data, setData] = useState(
        document.querySelectorAll('#holidayList tbody tr')
    )
    const activePag = useRef(0)
    const [test, settest] = useState(0)
    const [zoneList, setZonesList] = useState();
    const [updateZones, setUpdateZones] = useState(false);
    const [loading, setLoading] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [polygonCoords, setPolygonCoords] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [zoneName, setZoneName] = useState('');
    const [mapCenter, setMapCenter] = useState(center); // Map center state
    const [searchQuery, setSearchQuery] = useState(""); // Search input state
    const [errors, setErrors] = useState({});



    const resetFormData = () => {
        setZoneName('');
        setErrors({}); // Reset errors
    };

    const validateForm = () => {
        const newErrors = {};

        // Required field validation
        if (!zoneName) newErrors.zoneName = "Business zone name is required.";
        if (!selectedRegion) newErrors.selectedRegion = "Please select a Valid region.";



        // Set errors to the state
        setErrors(newErrors);

        // If there are no errors, return true (valid form), otherwise false
        return Object.keys(newErrors).length === 0;
    };


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



    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form before making API calls
        if (!validateForm()) {
            return;  // If validation fails, do not proceed further
        }


        setLoading(true); // Start loading
        setErrors(null);   // Clear previous errors

        let parsedCoordinates = selectedRegion;

        // Try to parse the coordinates from a string, if necessary
        try {
            parsedCoordinates = JSON.parse(selectedRegion);
        } catch (error) {
            console.error("Error parsing coordinates:", error);
            Toaster.error("Invalid coordinates format.");
            setLoading(false); // Stop loader on error
            return; // Exit function
        }

        const formData = {
            name: zoneName,
            cordinates: parsedCoordinates,
        };

        try {
            const res = await createZoneApi(formData); // Make API call

            if (res.status === 200) {
                setUpdateZones(true);
                resetFormData();
                Swal.fire({
                    icon: 'success',
                    title: "Zone",
                    text: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })

            } else {
                // Handle non-200 response (error)
                const errorMessage = res.data?.message || "Failed to create the zone. Please try again.";
                Toaster.error(errorMessage); // Show error via Toaster
            }
        } catch (error) {
            console.error("Error creating zone:", error);
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again later.";
            Toaster.error(errorMessage); // Show error via Toaster
        } finally {
            setLoading(false); // Stop loading regardless of the outcome
        }
    };

    const fetchZones = async () => {
        try {
            setLoading(true);
            const res = await getZonesApi();
            setZonesList(res.data?.zones);
            setUpdateZones(false);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchZones()
    }, [updateZones])


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



    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDYyyGMM0zllMp348jloXddoH5rDciNVew", // Your API key
    });

    // Handle map click to place the + sign (marker)
    const handleMapClick = useCallback((event) => {
        const newMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    }, []);

    // Handle marker click to complete the polygon
    const handleMarkerClick = (index) => {
        // If the user clicks on the first marker again and there are at least 3 markers
        if (index === 0 && markers.length > 2) {
            setPolygonCoords(markers); // Complete the polygon
            setSelectedRegion(JSON.stringify(markers, null, 2)); // Set selected region coordinates
            setMarkers([]); // Clear markers after completion
        }
        setErrors({
            ...errors,
            selectedRegion: ''
        });
    };

    const handleReset = () => {
        setMarkers([]);
        setPolygonCoords([]);
        setSelectedRegion("");
        setZoneName('');
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    // Function to handle the change event
    const handleZoneNameChange = (e) => {
        setZoneName(e.target.value);
        setErrors({
            ...errors,
            zoneName: ''
        });
    };

    // Handle search input change ̰
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        // Use Geocoding API to find the location
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: searchQuery }, (results, status) => {
            if (status === "OK" && results.length > 0) {
                const location = results[0].geometry.location;
                setMapCenter({
                    lat: location.lat(),
                    lng: location.lng(),
                });
            } else {
                alert("Location not found!");
            }
        });
    };



    return (
        <>
            <ToastContainer />
            <Loader visible={loading} />
            <PageTitle activeMenu={"Zone Setup"} motherMenu={"Restaurants"} />
            {/* SECTION 3RD Restaurant Info*/}
            <div className="col-xl-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Zone Setup</h4>
                    </div>
                    <div className="card-body">


                        <div className='row'>

                            <div className="col-sm-6 mt-2 mt-sm-0">

                                <div className="md:w-5/12">
                                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                        {/* Instructions Title */}
                                        <div className="mb-4 mt-2">
                                            {/* <h6 className="text-lg font-semibold text-yellow-500">Instructions</h6> */}
                                            <h4 style={{ color: '#f8923b' }}>Instruction</h4>
                                            <p className="text-gray-600">
                                                Create &amp; connect dots in a specific area on the map to add a new business zone.
                                            </p>
                                        </div>

                                        {/* Hand Tool Instruction */}
                                        <div className="flex items-center mb-4">
                                            <div className="text-2xl mr-4 text-blue-500">
                                                <i className="tio-hand-draw"></i>
                                            </div>
                                            <div className="text-gray-700">
                                                Use this ‘Hand Tool’ to find your target zone.
                                            </div>
                                        </div>

                                        {/* Shape Tool Instruction */}
                                        <div className="flex items-center mb-4">
                                            <div className="text-2xl mr-4 text-blue-500">
                                                <i className="tio-free-transform"></i>
                                            </div>
                                            <div className="text-gray-700">
                                                Use this ‘Shape Tool’ to point out the areas and connect the dots. A minimum of 3 points/dots is required.
                                            </div>
                                        </div>

                                        {/* GIF Image */}
                                        <div className="mt-4">
                                            <img
                                                src="https://restaurant.idea2reality.tech/public/assets/admin/img/instructions.gif"
                                                alt="instructions"
                                                className="rounded-lg shadow-lg"
                                                height={'220px'}
                                                width={'450px'}
                                            />
                                        </div>
                                    </div>
                                </div>


                            </div>



                            <div className="col ">
                                {/* Business Zone Name Input */}
                                <div className="col-sm-12 mt-2 mb-4 mt-sm-0 ">
                                    <label className="col-form-label">Business Zone Name</label>
                                    <input
                                        value={zoneName}
                                        type="text"
                                        className="form-control"
                                        placeholder="Type new zone name here"
                                        onChange={handleZoneNameChange} // Replace with your handler
                                    />
                                    {errors?.zoneName && <span className="text-danger fs-12">{errors?.zoneName}</span>}

                                </div>

                                {/* Search Input on the Map */}
                                <div className="col-sm-12 mt-2 mt-sm-0" style={{ position: "relative" }}>
                                    {/* Search Input Field */}
                                    <div style={{ position: "absolute", marginLeft: '220px', top: "10px", left: "10px", zIndex: "10" }}>
                                        <form onSubmit={handleSearchSubmit}>

                                            <div className="input-group" style={{ width: "220px" }}>
                                                <input
                                                    type="text"
                                                    placeholder="Search for a place"
                                                    value={searchQuery}
                                                    onChange={handleSearchChange}
                                                    className="form-control"
                                                    style={{
                                                        padding: "10px",
                                                        borderRadius: "4px 0 0 4px", // Rounded only on the left
                                                        border: "1px solid #ccc",
                                                    }}
                                                />
                                                <span
                                                    className="input-group-text"
                                                    onClick={handleSearchSubmit}
                                                    style={{
                                                        backgroundColor: "#6a73fa",
                                                        border: "none",
                                                        borderRadius: "0 4px 4px 0", // Rounded only on the right
                                                        cursor: "pointer",
                                                        padding: "10px",
                                                        // color: "white",
                                                    }}
                                                >
                                                    <i className="fas fa-search text-white" ></i> {/* Font Awesome search icon */}
                                                </span>
                                            </div>
                                        </form>
                                    </div>

                                    {/* Google Map */}
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={mapCenter} // Use dynamic center based on search or default
                                        zoom={10}
                                        onClick={handleMapClick} // Handle click to place markers
                                    >
                                        {/* Place markers at clicked locations */}
                                        {markers.map((marker, index) => (
                                            <Marker
                                                key={index}
                                                position={marker}
                                                label="+"
                                                title="Click points to connect"
                                                onClick={() => handleMarkerClick(index)} // Handle marker click
                                            />
                                        ))}

                                        {/* Draw lines connecting the markers (polyline) */}
                                        {markers.length > 1 && (
                                            <Polyline
                                                path={markers}
                                                options={{
                                                    strokeColor: "#2196F3",
                                                    strokeOpacity: 1,
                                                    strokeWeight: 2,
                                                }}
                                            />
                                        )}

                                        {/* Once polygon is complete, draw the polygon */}
                                        {polygonCoords.length > 2 && (
                                            <Polygon
                                                path={polygonCoords}
                                                options={{
                                                    fillColor: "#2196F3",
                                                    fillOpacity: 0.4,
                                                    strokeColor: "#2196F3",
                                                    strokeOpacity: 1,
                                                    strokeWeight: 2,
                                                    clickable: false,
                                                    draggable: false,
                                                    editable: false,
                                                }}
                                            />
                                        )}
                                    </GoogleMap>
                                     {errors?.selectedRegion && <span className="text-danger fs-12">{errors?.selectedRegion}</span>}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div>
                        <div className="d-flex justify-content-end p-3">

                            <button onClick={handleReset} className="btn btn-primary rounded-sm me-2">Reset</button>
                            <button onClick={handleSubmit} className="btn btn-primary rounded-sm">Submit</button>

                        </div>
                    </div>

                </div>
            </div>
            {/* table data is here */}
            <Row>
                <Col lg={12}>
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Zone List</h4>
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
                                            {zoneList?.map((data, ind) => (
                                                <tr key={ind}>
                                                    <td><strong>{ind + 1}</strong> </td>
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

export default Zone;