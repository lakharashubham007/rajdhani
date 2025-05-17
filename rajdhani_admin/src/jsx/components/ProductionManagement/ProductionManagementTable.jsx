import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { MdEdit } from "react-icons/md";
import DeleteWarningMdl from '../common/DeleteWarningMdl';

const ProductionManagementTable = ({ 
  rows, 
  productionSheetData, 
  isEdit, 
  setIsEdit,
  editProductionId, 
  setEditProductionId, 
  productionSheetDetailsData, 
  productionSheetItemsDetailsData,
  setProductionSheetItemsDetailsData,
  setEditHoseAssemblyShowModal,
  setSelectedRowData,
  rowsPerPage,
  currentPage

}) => {

  console.log("rows per page is here",rowsPerPage,currentPage)

  // Filter the items first
const filteredItems = productionSheetItemsDetailsData?.filter(
  (data) => data.product_type === "Hose Assembly"
) || [];

// Calculate pagination indices
const startIndex = (currentPage - 1) * rowsPerPage;
const endIndex = startIndex + rowsPerPage;

// Slice the filtered items based on the calculated indices
const paginatedItems = filteredItems.slice(startIndex, endIndex);



  const [showDeleteMdl, setShowDeleteMdl] = useState(false);
  const [deleteTableDataId, setDeleteTableDataId] = useState("");

  const handleDeleteProduction = (id) => {
    setDeleteTableDataId(id);
    setShowDeleteMdl(true)
  }
  const handleDeleteSubmit = async () => {
    // Assuming delete API will be called here if needed
    setProductionSheetItemsDetailsData((prevItems) =>
      prevItems.filter((item) => item._id !== deleteTableDataId)
    );
    setShowDeleteMdl(false);
    setDeleteTableDataId("");
  };

  const handleEditClick = (id,data) => {
    setEditHoseAssemblyShowModal(true)
    setSelectedRowData({ id, ...data}); // Set selected row data
    // setVerifyShowModal(true);
};


  // const handleEditProduction=async(id)=>{
  //   try{
  //     const res = await GetEditBrandData(id);
  //      if(res?.data?.success){
  //        const data = res?.data;
  //       //  setEditProductionId(data?._id);
  //       //  setFormData({
  //       //    name:data?.name,
  //       //    image:data?.image});
  //       //  setIsEdit(true);
  //      }
  //    }catch(err){
  //      console.log(err);
  //    } 
  // }

  return (<>
    <DeleteWarningMdl title={"table data"} showDeleteMdl={showDeleteMdl} setShowDeleteMdl={setShowDeleteMdl}
      setDeleteTableDataId={setDeleteTableDataId} handleDeleteSubmit={handleDeleteSubmit} />

    <div className='p-4'>
      <div className="">
        <table className="display dataTable no-footer w-100">
          <thead className="thead-dark">
          {currentPage === 1 && (
              <>
            <tr>
              <td className="table-td-border" colSpan="2">SHEET NO.: {productionSheetDetailsData?.sheet_no}</td>
              <td className="table-td-border" colSpan="1">MAKE: {productionSheetDetailsData?.make}</td>
              <td className="table-td-border" colSpan="3">DATE & TIME: {moment(productionSheetDetailsData?.date_time).format('DD MMM YYYY, h:mm:ss a')}</td>
              <td className="table-td-border text-capitalize" colSpan="6" >CREATED BY: {productionSheetDetailsData?.created_by}</td>
              {/* <td className="table-td-border">
                        <div className='d-flex justify-content-center'>
                         <button className="btn btn-light p-1" title="Edit Sheet Detail"><MdEdit size={20}/></button>
                        </div>
                      </td> */}
            </tr>

            <tr>
              <td className="table-td-border" colSpan="2">ORDER NO.: {productionSheetDetailsData?.order_no}</td>
              {/* <td className="table-td-border" colSpan="1">{productionSheetDetailsData?.order_no}</td> */}
              <td className="table-td-border" colSpan="4">ORDER DATE: {moment(productionSheetDetailsData?.order_date).format('DD MMM YYYY')} </td>
              <td className="table-td-border" colSpan="7" rowSpan="3"
                style={{
                  verticalAlign: "top",     // Align content to the top
                  textAlign: "left",        // Align text to the left
                  padding: "1rem",          // Optional: add padding
                }}
              >SPECIAL NOTE: {productionSheetDetailsData?.note}</td>
            </tr>

            <tr>
              <td className="table-td-border" colSpan="6">PARTY NAME: {productionSheetDetailsData?.party_name}</td>
            </tr>

            <tr>
              <td className="table-td-border" colSpan="6">ADDRESS: {productionSheetDetailsData?.address}</td>
            </tr>
  
            </>
          )}

            <tr className='bg-light'>
              <th className="table-td-border w-[150px]">PART NUMBER</th>
              <th className="table-td-border w-[100px]">HOSE</th>
              <th className="table-td-border w-[180px] text-sm">FITTING A</th>
              <th className="table-td-border w-[180px] text-sm">FITTING B</th>
              <th className="table-td-border w-[80px]">OA</th>
              <th className="table-td-border w-[90px] text-xs leading-tight break-words">
                ASSEMBLY<br />LENGTH
              </th>
              <th className="table-td-border w-[90px] text-xs">FITTING<br />LENGTH</th>
              <th className="table-td-border w-[90px] text-xs">CUT<br />LENGTH</th>
              <th className="table-td-border w-[60px]">QTY</th>
              <th className="table-td-border w-[80px]">GUARD</th>
              <th className="table-td-border w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems?.filter((data) => data.product_type === "Hose Assembly").map((data,index) => {
              
              return (<>
                <tr>
                  <td className="table-td-border">{data?.product_id?.part_no ? data?.product_id?.part_no : ""}</td>
                  <td className="table-td-border">{data?.product_id?.hose ? data?.product_id?.hose : ""}</td>
                  <td className="table-td-border">
                    <div className='d-flex flex-column gap-2'>
                      <div>{data?.product_id?.fitting_a_fitting_Code ? data?.product_id?.fitting_a_fitting_Code : ""}</div>
                      <div>{data?.product_id?.fitting_a_description ? data?.product_id?.fitting_a_description : ""}</div>
                    </div>
                  </td>
                  <td className="table-td-border">
                    <div className='d-flex flex-column gap-2'>
                      <div>{data?.product_id?.fitting_b_fitting_Code ? data?.product_id?.fitting_b_fitting_Code : ""}</div>
                      <div>{data?.product_id?.fitting_b_description ? data?.product_id?.fitting_b_description : ""}</div>
                    </div>
                  </td>
                  <td className="table-td-border">{data?.product_id?.oa ? data?.product_id?.oa : "-"}</td>
                  <td className="table-td-border">{data?.product_id?.assembly_length ? data?.product_id?.assembly_length : "-"}</td>
                  <td className="table-td-border">{data?.product_id?.fitting_length ? data?.product_id?.fitting_length : "-"}</td>
                  <td className="table-td-border">{data?.product_id?.cutting_length ? data?.product_id?.cutting_length : "-"}</td>
                  <td className="table-td-border">{data?.quantity ? data?.quantity : "-"}</td>
                  <td className="table-td-border">{data?.product_id?.guard ? data?.product_id?.guard : "-"}</td>
                  <td className="table-td-border">
                    <div className="d-flex">
                      <button className="btn btn-xs sharp btn-primary me-1"
                       onClick={()=>handleEditClick(index,data)}
                      >
                        <i className="fa fa-pencil" /></button>
                      <button className="btn btn-xs sharp btn-danger"
                        onClick={() => handleDeleteProduction(data?._id)}>
                        <i className="fa fa-trash" /></button>
                    </div>
                  </td>
                </tr>
              </>)
            })}

          </tbody>
        </table>
      </div>
    </div>
  </>
  );
};

export default ProductionManagementTable;