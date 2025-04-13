import React, { useState, useRef, useEffect } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Container,
  Collapse,
  TabContent,
  TabPane,
  NavLink,
  Row,
  Col,
  Table,
} from "reactstrap";
import PageTitle from "../../layouts/PageTitle";
import { getSidebarMenusApi } from "../../../services/apis/SidebarMenuApi";
import { getPermissionApi } from "../../../services/apis/permisssionApi";
import {
  createRoleApi,
  deleteRoleApi,
  GetEditRoleDataApi,
  getRolesApi,
  UpdateRoleApi,
} from "../../../services/apis/RolesApi";
import Loader from "../../components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Toaster } from "../../components/Toaster/Toster";
import DeleteWarningMdl from "../../components/common/DeleteWarningMdl";
// import SingleDeleteWarningMdl from "../../components/common/SingleDeleteWarningMdl";
import moment from "moment";
import ReactPaginate from "react-paginate";
// import { CreatelogActivityApi } from "../../../services/apis/IpAddress";
import { useSelector } from "react-redux";

const holidayTable = [
  {
    id: 1,
    sno: "01",
    employeeName: "John Doe",
    phone: "+91-8000-234-234",
    email: "john@example.com",
    createdAt: "01/10/2024",
  },
];

const theadData = [
  { heading: "S.No.", sortingVale: "sno" },
  { heading: "Employee Name", sortingVale: "name" },
  { heading: "Modules", sortingVale: "modules" },
  { heading: "Created At", sortingVale: "createdAt" },
  { heading: "Action", sortingVale: "action" },
];

const EmployeeRole = () => {
  const [sort, setSortata] = useState(10);
  const [modalCentered, setModalCentered] = useState(false);
  const [logo, setLogo] = useState(null);
  const [data, setData] = useState(document.querySelectorAll("#holidayList tbody tr"));
  const activePag = useRef(0);
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
  const [roleName, setRoleName] = useState("");
  const [feeData, setFeeDate] = useState([...holidayTable]);
  const [iconData, setIconDate] = useState({ complete: false, ind: Number });
  const [errors, setErrors] = useState({});
  const [showDeleteMdl, setShowDeleteMdl] = useState(false);
  const [deleteTableDataId, setDeleteTableDataId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editRoleId, setEditRoleId] = useState("");
  const [showRoleFormSection,setShowRoleFormSection]=useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInputValue, setSearchInputValue] = useState("");
  const informationIp = useSelector((data) => data?.ipAddressReducers?.ipAddressData);
  const user = useSelector((data) => data?.userReducers?.user);
//   const deviceType = {
//     type: isMobile
//       ? "Mobile"
//       : isTablet
//       ? "Tablet"
//       : isDesktop
//       ? "Desktop"
//       : "Unknown",
//     os: isAndroid ? "Android" : isIOS ? "iOS" : "Other",
//   };
  const tableRef = useRef(null);
  // console.log("permission",permission)

  const scrollToTable = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
    setErrors({});
  };

  // console.log("selectedModuleIds",selectedModuleIds)

  // const handleToggleMenuItem = (moduleId) => {
  //   const isSelected = selectedModuleIds.includes(moduleId);
  //   if (isSelected) {
  //     setSelectedModuleIds(selectedModuleIds.filter((id) => id !== moduleId));
  //   } else {
  //     setSelectedModuleIds([...selectedModuleIds, moduleId]);
  //   }
  // };

  const loggedActivity = async (logType) => {
    const data = {
      id: user?._id,
      ipAddress: informationIp?.query,
      lat: informationIp?.lat,
      long: informationIp?.lon,
      logType:logType,
      // deviceType: JSON.stringify(deviceType),
      city: informationIp?.city,
      countryCode: informationIp?.countryCode,
      regionCode: informationIp?.region,
    };
    // try {
    //   await CreatelogActivityApi(data);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleToggleMenuItem = (id) => {
    setSelectedModuleIds((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(id);
      let updatedSelection = [...prevSelected];
      if (isAlreadySelected) {
        updatedSelection = updatedSelection?.filter((moduleId) => moduleId !== id);
      
      
        const childItem = modules?.find((item) => item?._id === id);
        // console.log("childItem",childItem)

       if (childItem?.parent_module_id) {
         const parentItem = modules.find(
           (item) => item.module_id == childItem?.parent_module_id
         );
         
         if (parentItem && !updatedSelection.includes(parentItem._id)) {
           updatedSelection?.push(parentItem._id);
         }
       }else{
         const checkUn = modules?.filter((item) => item?._id == childItem?._id);
         console.log("checkUn",checkUn)
       }

      } else {
        updatedSelection?.push(id);

        // Find the item's parent and auto-select it
        const childItem = modules?.find((item) => item._id === id);
        //  console.log("childItem",childItem)

        if (childItem?.parent_module_id) {
          const parentItem = modules.find(
            (item) => item.module_id == childItem?.parent_module_id
          );

          // console.log("parentItem",parentItem)

          if (parentItem && !updatedSelection.includes(parentItem._id)) {
            updatedSelection?.push(parentItem._id);
          }
        }
      }
      return updatedSelection;
    });
  };
  
  // console.log("seee",selectedModuleIds);

  const handleSelect = (permissionId) => {
    const isSelected = selectedPermissionIds?.includes(permissionId);
    // Create a new array with updated selected permission IDs
    let updatedSelectedIds;
    if (isSelected) {
      updatedSelectedIds = selectedPermissionIds?.filter(
        (id) => id !== permissionId
      );
    } else {
      updatedSelectedIds = [...selectedPermissionIds, permissionId];
    }
    // Update the selectedPermissionIds state with the new array
    setSelectedPermissionIds(updatedSelectedIds);
  };

  // Handle form submit

  const handleUpdateRole = async (formData) => {
    // try {
    //   const res = await UpdateRoleApi(editRoleId, formData);
    //   if (res?.data?.success) {
    //     Toaster.success(res?.data?.message);
    //     setUpdateRoles(true);
    //     // Clear form data after successful submission
    //     setRoleName(""); // Reset roleName
    //     setSelectedModuleIds([]); // Reset selectedModuleIds
    //     setSelectedPermissionIds([]); // Reset selectedPermissionIds
    //     setIsEdit(false);
    //     setIsOpen(false);
    //     setIsOpen1(false);
    //     setShowRoleFormSection(false);
    //     loggedActivity("roleedit");
    //   }
    // } catch (error) {
    //   // Handle the error appropriately
    //   Toaster.error(
    //     error.response?.data?.message ||
    //       "An error occurred while creating the role."
    //   );
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // If validation fails, do not proceed further
    }
    setLoading(true);
    const formData = {
      name: roleName,
      sidebarMenus: selectedModuleIds,
      permissions: selectedPermissionIds,
    };
    if (isEdit) {
      handleUpdateRole(formData);
    } else {
    //   try {
    //     const res = await createRoleApi(formData);
    //     // console.log("resssss", res);
    //     if (res?.data?.success) {
    //       Toaster.success(res?.data?.message);
    //       setUpdateRoles(true);
    //       setRoleName("");
    //       setSelectedModuleIds([]); 
    //       setSelectedPermissionIds([]);
    //       setShowRoleFormSection(false);
    //       fetchRoles();
    //       loggedActivity("createrole");
    //     }
    //   } catch (error) {
    //     Toaster.error(error.response?.data?.message);
    //   } finally {
    //     setLoading(false);
    //   }
    }
  };

  // Handle form submit
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
      // Transform iconStyle strings into React elements
      const updatedMenus = menus?.map((menu) => {
        if (menu.iconStyle) {
          // Extract the className from the string (e.g., 'la la-home')
          const classNameMatch = menu.iconStyle.match(
            /className=['"]([^'"]+)['"]/
          );

          if (classNameMatch && classNameMatch[1]) {
            const iconClass = classNameMatch[1];

            // Convert the string into a React element
            return {
              ...menu,
              iconStyle: <i className={iconClass} />,
            };
          }
        }
        return menu;
      });
      // Organize menus by module_id and children
      const formattedMenus = updatedMenus
        ?.filter((menu) => menu.module_id) // Get parent modules
        ?.map((parent) => ({
          ...parent,
          children: updatedMenus
           ?.filter((child) => child.parent_module_id === parent.module_id) // Match children
           ?.sort((a, b) => a.module_menu_priority - b.module_menu_priority), // Sort by child priority
        }))
        .sort((a, b) => a.module_priority - b.module_priority);
      // Extract Values individually
      const extractIndividualEntries = (menus) => {
        let result = [];
        menus.forEach((menu) => {
          // Add parent menu
          result?.push({
            ...menu,
            children: undefined, // Remove children
            content: undefined, // Remove content
          });

          // Add children menus
          if (menu?.children && menu?.children?.length > 0) {
            menu?.children.forEach((child) => {
              result.push({
                ...child,
              });
            });
          }
        });
        return result;
      };

      const individualEntries = extractIndividualEntries(formattedMenus);
      setModules(individualEntries);
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
      // console.log("ressss",res)
      setPermission(res?.data?.permissions);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchRoles = async (sortValue) => {
    try {
      setLoading(true);
      const res = await getRolesApi(
        currentPage,
        sort,
        sortValue,
        searchInputValue
      );
      // console.log(res.data,"roles is here");
      setRolesData(res?.data);
      setUpdateRoles(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [updateRoles,currentPage,sort, searchInputValue]);

  // useEffect to call fetchSidebarMenus when component mounts
  useEffect(() => {
    fetchSidebarMenus();
    fetchPermission();
  }, [updateRoles]);

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

  activePag.current === 0 && chageData(0, sort);

  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };

  function SotingData(name) {
    if (iconData.complete) {
      const sortValue = { value: name, type: "asc" };
      fetchRoles(sortValue);
    } else {
      const sortValue = { value: name, type: "dsc" };
      fetchRoles(sortValue);
    }
  }

  function DataSearch(e) {
    const updatesDate = holidayTable.filter((item) => {
      let selectdata =
        `${item.hod} ${item.type} ${item.department} ${item.subject} ${item.cap} ${item.status}`.toLowerCase();
      return selectdata.includes(e.target.value.toLowerCase());
    });
    setFeeDate([...updatesDate]);
  }
  
  const styles = {
    container: {
      border: "2px dashed #ccc",
      borderRadius: "8px",
      width: "150px", // Logo size
      height: "150px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      backgroundColor: "#f9f9f9",
      position: "relative",
      textAlign: "center",
      overflow: "hidden",
    },
    coverContainer: {
      border: "2px dashed #ccc",
      borderRadius: "8px",
      width: "300px", // Cover size (2:1 ratio)
      height: "150px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      backgroundColor: "#f9f9f9",
      position: "relative",
      textAlign: "center",
      overflow: "hidden",
    },
    placeholder: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      textAlign: "center",
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "8px",
    },
    hover: {
      borderColor: "#007bff",
      backgroundColor: "#e9f4ff",
    },
    uploadIcon: {
      color: "#888",
      fontSize: "16px",
      fontWeight: "bold",
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

  console.log("permission",permission)

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const toggleCollapse1 = () => {
    setIsOpen1(!isOpen1);
  };

  const handleDeleteRole = (id) => {
    setDeleteTableDataId(id);
    setShowDeleteMdl(true);
  };

  const handleDeleteSubmit = async () => {
    // try {
    //   const res = await deleteRoleApi(deleteTableDataId);

    //   if (res?.data?.success) {
    //     Toaster.success(res?.data?.message);
    //     setShowDeleteMdl(false);
    //     fetchRoles();
    //     loggedActivity("roledelete");
    //   }
    // } catch (err) {
    //   Toaster.error(err.response?.data?.message);
    // }
  };

  const handleEditRole = async (id) => {
    // try {
    //   const res = await GetEditRoleDataApi(id);
    //   const resData = res?.data?.roleById;
    //   setSelectedModuleIds(resData?.sidebarMenus);
    //   setSelectedPermissionIds(resData?.permissions);
    //   setRoleName(resData?.name);
    //   setIsEdit(true);
    //   setEditRoleId(resData?._id);
    //   setIsOpen(true);
    //   setIsOpen1(true);
    // } catch (err) {
    //   Toaster.error(err.response?.data?.message);
    // }
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <>
      {/* <SingleDeleteWarningMdl
        title={"table data"}
        showDeleteMdl={showDeleteMdl}
        setShowDeleteMdl={setShowDeleteMdl}
        setDeleteTableDataId={setDeleteTableDataId}
        handleDeleteSubmit={handleDeleteSubmit}
      /> */}
      <ToastContainer />
      <Loader visible={loading} />
      <PageTitle
        activeMenu={"Employee Role"}
        motherMenu={"Employee Managment"}
      />
      {/* SECTION Restaurant Info*/}
      {
        showRoleFormSection && 
       <div className="">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Employee Role</h4>
            <Button
                variant="primary"
                type="button"
                className="mb-2 me-2"
                onClick={scrollToTable}>
                Employee Roles
            </Button>
          </div>
          <div className="card-body">
            <div className="col">
              {/* Name field */}
              <div className="col-sm-5 mt-2 mt-sm-0">
                <label className="col-form-label" style={{ marginLeft: "5px" }}>
                  Role Name
                </label>
                <input
                  style={{ marginLeft: "3px" }}
                  type="text"
                  className="form-control"
                  placeholder="Ex: Role Name"
                  onChange={handleRoleNameChange}
                  value={roleName}
                />
                {errors.roleName && (
                  <span className="text-danger fs-12">{errors.roleName}</span>
                )}
              </div>

              {/* sidebar menus */}
              <Col xl={12} className="mt-4">
                <Card>
                  <CardBody>
                    <h4
                      className="card-title"
                      onClick={toggleCollapse}
                      style={{ cursor: "pointer" }}>
                      Sidebar Menu
                      <span
                        style={{
                          cursor: "pointer",
                          fontSize: "x-large",
                          marginLeft: "15px",
                          fontWeight: "bold",
                        }}>
                        +
                      </span>
                    </h4>
                    <p className="card-title-desc">
                      Select the specific sidebar menus to be accessible for
                      this role.
                    </p>
                    <Collapse isOpen={isOpen}>
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Menu Item</th>
                            <th>Activate</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modules?.map((module) =>{ 
                            //console.log("module",module)
                            return(
                            <tr className={module?.classChange == "menu-title" ? "role-sidebar-head" : ""} key={module?._id}>
                              <td className={module?.classChange == "menu-title" ? "text-primary" : ""}>{module.title}</td>
                              <td>
                                <input
                                  type="checkbox"
                                  id={`square-switch${module?._id}`}
                                  switch="none"
                                  checked={selectedModuleIds.includes(
                                    module?._id
                                  )}
                                  onChange={() =>
                                    handleToggleMenuItem(module?._id)
                                  }/>
                                <label
                                  htmlFor={`square-switch${module?._id}`}
                                  data-on-label="Yes"
                                  data-off-label="No"
                                />
                              </td>
                            </tr>
                          )})}
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
                    <h4
                      className="card-title"
                      onClick={toggleCollapse1}
                      style={{ cursor: "pointer" }}>
                      Permission Menu
                      <span
                        style={{
                          cursor: "pointer",
                          fontSize: "x-large",
                          marginLeft: "15px",
                          fontWeight: "bold",
                        }}>
                        +
                      </span>
                    </h4>
                    <p className="card-title-desc">
                      Customize role permissions to define specific access
                      rights and privileges for user roles.
                    </p>
                    <Collapse isOpen={isOpen1}>
                      <div className="card card-body mb-0">
                        <div className="permissions-table-container">
                          <table className="table permissions-table">
                            <thead>
                              <tr>
                                <th className="permissions-column">Module</th>
                                <th className="permissions-column">
                                  Permissions
                                </th>
                                {/* New column for permissions */}
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(permissionData)?.map(
                                ([moduleName, modulePermissions]) => (
                                  <tr key={moduleName}>
                                    <td className="permission-module-td">
                                      {moduleName}
                                    </td>
                                    <td className="permissions-column">
                                      {Object.entries(modulePermissions)
                                        ?.sort(([typeA], [typeB]) => {
                                          const order = [
                                            "View",
                                            "Create",
                                            "Edit",
                                            "Delete",
                                          ];
                                          return (
                                            order.indexOf(typeA) -
                                            order.indexOf(typeB)
                                          );
                                        })
                                        ?.map(([type, permissionsArray]) => (
                                          <div
                                            className="d-flex align-items-center"
                                            key={type}>
                                            {permissionsArray.map((perm) => (
                                              <label
                                                className="d-flex align-items-center"
                                                key={perm._id}>
                                                <input
                                                  type="checkbox"
                                                  checked={selectedPermissionIds.includes(
                                                    perm._id
                                                  )}
                                                  onChange={() =>
                                                    handleSelect(perm._id)
                                                  }
                                                />
                                                <span className="mx-2">
                                                  {perm?.type
                                                    ?.charAt(0)
                                                    .toUpperCase() +
                                                    perm?.type?.slice(1)}
                                                </span>
                                              </label>
                                            ))}
                                            <br />
                                          </div>
                                        ))}
                                    </td>
                                  </tr>
                                )
                              )}
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
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary rounded-sm"
            >
              Submit
            </button>
          </div>
        </div>
       </div>
     }
      {/* Table */}
      <Row>
        <Col lg={12}>
          <div className="card" ref={tableRef}>
            <div className="card-header">
              <h4 className="card-title">Employee Roles</h4>
              <div>
           
              </div>
              {/* <Link to={"/add-staff"} className="btn btn-primary">+ Add New</Link> */}
              <div>
              <Button
                variant="danger"
                type="button"
                className="mb-2 me-2 btn-primary"
                onClick={() => setShowRoleFormSection(true)}>
                Create Role
              </Button>

              </div>
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
                        Entries
                      </label>
                    </div>
                    <div className="dataTables_filter">
                      <label>
                        Search :
                        <input
                          type="search"
                          className=""
                          placeholder=""
                          value={searchInputValue}
                          onChange={(e)=>setSearchInputValue(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                  <table
                    id="example4"
                    className="display dataTable no-footer w-100">
                    <thead>
                      <tr>
                        {theadData?.map((item, ind) => (
                          <th
                            key={ind}
                            onClick={() => {
                              SotingData(item.sortingVale);
                              setIconDate((prevState) => ({
                                complete: !prevState.complete,
                                ind: ind,
                              }));
                            }}>
                            {item.heading}
                            <span>
                              {ind !== iconData.ind && (
                                <i className="fa fa-sort ms-2 fs-12"
                                  style={{ opacity: "0.3" }}
                                />
                              )}
                              {ind === iconData.ind &&
                                (iconData.complete ? (
                                  <i className="fa fa-arrow-down ms-2 fs-12"
                                    style={{ opacity: "0.7" }}
                                  />
                                ) : (
                                  <i className="fa fa-arrow-up ms-2 fs-12"
                                    style={{ opacity: "0.7" }}
                                  />
                                ))}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rolesData?.roles?.map((data, ind) => (
                        <tr key={ind}>
                          <td>
                            {/* <strong>{ind + 1}</strong> */}
                            <strong>
                              {(currentPage - 1) * sort + ind + 1}
                            </strong>
                          </td>
                          <td>{data?.name}</td>
                          <td>
                            {data?.sidebarMenus?.map((menu) => menu?.title)
                              ?.reduce((resultArray, item, index) => {
                                const chunkIndex = Math.floor(index / 3); // Change 3 to adjust how many titles per line
                                if (!resultArray[chunkIndex]) {
                                  resultArray[chunkIndex] = []; // Start a new chunk
                                }
                                resultArray[chunkIndex]?.push(item); // Add the title to the current chunk
                                return resultArray;
                              }, [])
                              ?.map((chunk, index) => (
                                <div key={index}>{chunk.join(", ")}</div>
                              ))}
                          </td>
                          <td>
                            {moment(data?.createdAt).format("DD MMM YYYY, h:mm:ss a")}
                          </td>
                          <td>
                            <button
                              className="btn btn-xs sharp secondary me-1"
                              onClick={() => {handleEditRole(data?._id); setShowRoleFormSection(true)}}>
                              <i className="fa fa-pencil" />
                            </button>

                            <button
                              className="btn btn-xs sharp btn-danger"
                              onClick={() => handleDeleteRole(data?._id)}>
                              <i className="fa fa-trash" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                 
                 <div>
                 <div className="d-sm-flex text-center justify-content-end align-items-center mt-3">
                 <ReactPaginate
                        pageCount={Math.ceil(
                          rolesData?.total /
                            rolesData?.rowPerPage
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
                </div>
              </div>
            </div>
          </div>


        </Col>
      </Row>
    </>
  );
};

export default EmployeeRole;
