import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Dropdown, Button, Modal, Container, Card, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageTitle from '../../layouts/PageTitle';
import { addCuisinesApi, getCuisinesApi } from '../../../services/apis/cuisinesApi';
import Loader from '../../components/Loader/Loader';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/css/brand.css";
import Swal from "sweetalert2";
import { Toaster } from '../../components/Toaster/Toster';
import uplodIcon from '../../../assets/images/upload-icon.png'
import { addBrandsApi, deleteBrandsApi, getBrandsApi, GetEditBrandData, UpdateBrand, UpdateBrandStatus } from '../../../services/apis/BrandApi';
import Switch from "react-switch";
import ReactPaginate from 'react-paginate';
import { addCategoryApi, deleteCategoriesApi, getCategoriesApi, GetCategoryById, UpdateCategory, UpdateCategoryApi, UpdateCategoryStatusApi } from '../../../services/apis/CategoryApi';
import moment from 'moment';
import DeleteWarningMdl from '../../components/common/DeleteWarningMdl';
import useDebounce from '../../components/common/Debounce';

const theadData = [
    { heading: 'S.No.', sortingVale: "sno" },
    { heading: 'Category Id', sortingVale: "_id" },
    { heading: 'Category Name', sortingVale: "name" },
    { heading: 'Created At', sortingVale: "created_at"},
    { heading: 'Status', sortingVale: "status" },
    { heading: 'Action', sortingVale: "action" }
];

const Categories = () => {
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
    const [UpdateCategory, setUpdateCategory] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [originalCategoryList, setOriginalCategoryList] = useState([]);
    const [isEdit,setIsEdit]=useState(false);
    const [imageChanged,setImageChanged]=useState(false);
    const [editCategoryId,setEditCategoryId]=useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInputValue,setSearchInputValue]=useState("");
    const [feeData, setFeeDate] = useState([]);
    const [iconData, setIconDate] = useState({ complete: false, ind: Number });
    const [error, setErrors] = useState(null); // To manage the error state
    const activePag = useRef(0)
    const [test, settest] = useState(0);
    const [showDeleteMdl,setShowDeleteMdl]=useState(false);
    const [deleteTableDataId,setDeleteTableDataId] = useState("");
    const debouncedSearchValue = useDebounce(searchInputValue, 500);

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
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.image) newErrors.image = "Please select a image.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
            setImageChanged(true)
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setLogo(reader.result);
                };
                reader.readAsDataURL(file);
                setFormData({
                    ...formData,
                    image: file,
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

    const fetchCategories = async (sortValue) => {
        // Set loading to true when the API call starts
        setLoading(true);
        try {
            const res = await getCategoriesApi(currentPage,sort,sortValue,searchInputValue);
            setCategoryList(res.data?.categories);
            setOriginalCategoryList(res.data?.categories)
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
        fetchCategories()
    }, [UpdateCategory,currentPage,sort,debouncedSearchValue])

    const handleUpdateSubmit=async()=>{
        try {
            const res = await UpdateCategoryApi(editCategoryId,formData);
            if (res.status === 200) {
                setUpdateCategory(true);
                Toaster.success(res?.data?.message); 
                resetForm();
                setModalCentered(false); 
                setIsEdit(false);
                setImageChanged(false)
                fetchCategories()
            } else {
                Toaster.error(res?.data?.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            Toaster.error(error.response?.data?.message || "An error occurred. Please try again.");
            console.error("Error:", error.message);
        } finally {
            setLoading(false);  // Stop the loader
        }
    }

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;  // If validation fails, do not proceed further
        }
        if(isEdit){
           handleUpdateSubmit();
        }else{
        setLoading(true);  // Start the loader
        try {
            const res = await addCategoryApi(formData);
            if (res.status === 200) {
                setUpdateCategory(true);
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
      }
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


    activePag.current === 0 && chageData(0, sort)

    let paggination = Array(Math.ceil(data.length / sort))
        .fill()
        .map((_, i) => i + 1)


    const onClick = (i) => {
        activePag.current = i
        chageData(activePag.current * sort, (activePag.current + 1) * sort)
        settest(i)
    }


    function SotingData(name,ind) {
        const sortedPeople = [...categoryList?.categories];
          
        if(iconData.complete){
           const sortValue = {value:name, type:"asc"}
            fetchCategories(sortValue);
        }else{
            const sortValue = {value:name, type:"dsc"}
            fetchCategories(sortValue);
        }
    }

    function DataSearch(e) {
        const updatesDate = originalCategoryList?.filter(item => {
            let selectdata = `${item._id} ${item.name} ${item.status}`.toLowerCase();
            return selectdata?.includes(e.target.value?.toLowerCase())
        });

        setCategoryList([...updatesDate])
    }

    const handleEditCategory=async (id)=>{
      try{
       const res = await GetCategoryById(id);
        if(res?.data?.success){
          const data = res?.data?.category;
          setLogo(data?.image);
          setEditCategoryId(data?._id);
          setFormData({
            name:data?.name,
            image:data?.image});
          setModalCentered(true)
          setIsEdit(true);
          setImageChanged(false);
        }

      }catch(err){
        console.log(err);
      } 
    }

    const handleDeleteCategory=async(id)=>{
        setDeleteTableDataId(id);
        setShowDeleteMdl(true)
    }

    const handleDeleteSubmit= async()=>{
        try{
            const res = await deleteCategoriesApi(deleteTableDataId)
          //   console.log("response",res);
            if (res.status === 200) {
             Toaster.success(res?.data?.message); // Display success message
             fetchCategories();
             setDeleteTableDataId("");
             setShowDeleteMdl(false);
          } else {
            Toaster.error(res?.data?.message || "Something went wrong. Please try again.");
          }
         }catch(err){
           console.log(err)
         }
    }


    const handleStatusChange =async (categoryId, currentStatus) => {
        const fdata={
            status:!currentStatus
        }
        try{
            const res =await UpdateCategoryStatusApi(categoryId,fdata);
            console.log("response",res)
            if (res.status === 200) {
             Toaster.success(res?.data?.message); // Display success message
             fetchCategories()
          } else {
            Toaster.error(res?.data?.message || "Something went wrong. Please try again.");
          }
         }catch(err){
           console.log(err)
         }
        
        // console.log("newStatus",newStatus)
      };

      const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected + 1);
      };
      
      const handleAddNewBrand=()=>{
        setModalCentered(true);
        setIsEdit(false);
        setImageChanged(false);
        setEditCategoryId("");
        resetForm();
      }

    return (
        <>
           <DeleteWarningMdl title={"table data"} showDeleteMdl={showDeleteMdl} setShowDeleteMdl={setShowDeleteMdl} 
              setDeleteTableDataId={setDeleteTableDataId} handleDeleteSubmit={handleDeleteSubmit}/>
            <ToastContainer />
            <Loader visible={loading} />
            <PageTitle activeMenu={"Category"} motherMenu={"Categories"} motherMenuLink={"#"}/>
            <Row>
                <Col lg={12}>
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Category List</h4>
                            {/* <Link to={"/add-staff"} className="btn btn-primary">+ Add New</Link> */}
                            <Button
                                variant="primary"
                                type="button"
                                className="mb-2 me-2"
                                onClick={handleAddNewBrand}>
                                + Add New Category
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
                                                       <Dropdown.Item onClick={() => setSortata('2')}>2</Dropdown.Item>
                                                       <Dropdown.Item onClick={() => setSortata('5')}>5</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSortata('10')}>10</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSortata('15')}>15</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setSortata('20')}>20</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                entries
                                            </label>
                                        </div>
                                        <div className="dataTables_filter">
                                            <label>Search : <input type="search" className="" placeholder=""
                                                onChange={(e)=>setSearchInputValue(e.target.value)}/>
                                            </label>
                                        </div>
                                    </div>
                                    <table id="example4" className="display dataTable no-footer w-100" >
                                        <thead>
                                            <tr>
                                                {theadData?.map((item, ind) =>{ 
                                                   return(
                                                    <th key={ind} onClick={()=>{SotingData(item?.sortingVale,ind); setIconDate(prevState => ({ complete: !prevState.complete, ind: ind })) }}
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
                                                )})}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categoryList?.categories?.map((data, ind) => (
                                                <tr key={ind}>
                                                    <td><strong>{ind + 1}</strong></td>
                                                    <td>{data?._id}</td>
                                                    <td className='d-flex align-items-center gap-2'>{data?.image ? (
                                                    <img className='select-file-img' src={`https://api.i2rtest.in/v1/images/image/${data?.image}`} alt={data?.name}/>
                                                    
                                                    ) : (
                                                        ""
                                                        // <span>No Image Available</span>
                                                    )}{data?.name}</td>
                                                    <td>{moment(data?.created_at).format('DD MMM YYYY, h:mm:ss a')}</td>
                                                    <td> 
                                                    <Switch 
                                                     checked={data?.status} 
                                                     onChange={() => handleStatusChange(data?._id, data?.status)} 
                                                     offColor="#f0f1ff" 
                                                     onColor="#6a73fa"
                                                     offHandleColor="#6a73fa"
                                                     onHandleColor="#fff"
                                                     uncheckedIcon={false}
                                                     checkedIcon={false}
                                                     width={40}  // Adjust width of the switch
                                                     height={20} // Adjust height of the switch
                                                    />
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-xs sharp btn-primary me-1" onClick={()=>handleEditCategory(data?._id)}>
                                                         <i className="fa fa-pencil" /></button>
                                                        <button className="btn btn-xs sharp btn-danger" onClick={()=>handleDeleteCategory(data?._id)}>
                                                         <i className="fa fa-trash" /></button>
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
                                           pageCount={Math.ceil(categoryList?.totalCategories / categoryList?.rowsPerPage )}
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
                    <Modal className="fade" show={modalCentered} onHide={setModalCentered} centered>
                        <Modal.Header>
                            <Modal.Title> {isEdit ? "Edit Category" : "+ Add New Category"}</Modal.Title>
                            <Button
                                onClick={() => {setModalCentered(false); resetForm(); setIsEdit(false)}}
                                variant=""
                                className="btn-close">
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
                                                        value={formData?.name}
                                                        className="form-control"
                                                        placeholder="New Category"
                                                        onChange={handleInputChange}

                                                    />
                                                    {error?.name && <span className="text-danger fs-12">{error?.name}</span>}

                                                </div>
                                            </div>

                                            <div className="col-sm-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                <label className="col-form-label">Logo</label>
                                                <div className=' uploadImageContainer' >
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        //value={formData?.image}
                                                        onChange={handleLogoChange}
                                                        style={{ display: 'none' }}
                                                        id="logoUpload"
                                                    />
                                                    {logo ? (
                                                        <>
                                                            {
                                                             isEdit && !imageChanged ?
                                                            <>
                                                            {/* Simple 'X' button as the delete icon */}
                                                             <div className="deleteIcon" onClick={handleDeleteLogo}> ⛌ </div>
                                                             <img className='img' src={`https://api.i2rtest.in/v1/images/image/${logo}`} alt="Logo" />
                                                            </>
                                                             :
                                                            <>
                                                             <div className='deleteIcon' onClick={handleDeleteLogo}> ⛌ </div>
                                                             <img className='img' src={logo} alt="Logo" />
                                                            </>   
                                                          }
                                                        </>
                                                    ) : (
                                                        <label htmlFor="logoUpload" className="imgPlaceholder" >
                                                            <div className='flex flex-col cursor-pointer imgUploadIcon'>
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
                                onClick={() => {setModalCentered(false); resetForm(); setIsEdit(false)}}
                                variant="danger light">
                                Close
                            </Button>
                            <Button onClick={()=>{handleSubmit();}} variant="primary">Save changes</Button>
                        </Modal.Footer>
                    </Modal>

                </Col>
            </Row>
        </>
    );
};

export default Categories;