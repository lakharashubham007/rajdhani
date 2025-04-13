import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { MdEdit } from "react-icons/md";
import DeleteWarningMdl from '../common/DeleteWarningMdl';

const ProductionManagementTable = ({rows,productionSheetData,isEdit, setIsEdit, 
     editProductionId, setEditProductionId}) => {
   
      const [showDeleteMdl,setShowDeleteMdl]=useState(false);
      const [deleteTableDataId,setDeleteTableDataId] = useState("");

        const handleDeleteProduction=(id)=>{
          setDeleteTableDataId(id);
          setShowDeleteMdl(true)
        }
    
        const handleDeleteSubmit=async()=>{
         // try{
         //   const res = await deleteBrandsApi(deleteTableDataId)
         //   if (res.status === 200) {
         //    Toaster.success(res?.data?.message); // Display success message
         //    fetchBrands();
         //    setDeleteTableDataId("");
         //    setShowDeleteMdl(false);
         //  } else {
         //    Toaster.error(res?.data?.message || "Something went wrong. Please try again.");
         //  }
         //  }catch(err){
         //    console.log(err)
         //  }
        }

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
           setDeleteTableDataId={setDeleteTableDataId} handleDeleteSubmit={handleDeleteSubmit}/>

        <div className='card-body'>
        <div className=" my-4">
            <table className="display dataTable no-footer w-100">
                <thead className="thead-dark">
                    <tr>
                      <td className="table-td-border" colSpan="2">SHEET NO.: {productionSheetData?.sheet_no}</td>
                      <td className="table-td-border" colSpan="1">MAKE: {productionSheetData?.make}</td>
                      <td className="table-td-border" colSpan="2">DATE & TIME: {moment(productionSheetData?.date_time).format('DD MMM YYYY, h:mm:ss a')}</td>
                      <td className="table-td-border text-capitalize" colSpan="5" >CREATED BY: {productionSheetData?.created_by}</td>
                      <td className="table-td-border">
                        <div className='d-flex justify-content-center'>
                         <button className="btn btn-light p-1" title="Edit Sheet Detail"><MdEdit size={20}/></button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="table-td-border" colSpan="2">ORDER NO.: {productionSheetData?.order_no}</td>
                      <td className="table-td-border" colSpan="1">SB/SO/1001/24-25/</td>
                      <td className="table-td-border" colSpan="2">ORDER DATE: {moment(productionSheetData?.order_date).format('DD MMM YYYY')} </td>
                      <td className="table-td-border" colSpan="7" rowSpan="3">SPECIAL NOTE: {productionSheetData?.note}</td>
                    </tr>

                    <tr>
                      <td className="table-td-border" colSpan="5">PART NAME: {productionSheetData?.part_name}</td>
                    </tr>
                    
                    <tr>
                      <td className="table-td-border" colSpan="5">ADDRESS: {productionSheetData?.address}</td>
                    </tr>
                    
                    <tr className='bg-light'>
                      <th className="table-td-border">PART NUMBER</th>
                      <th className="table-td-border">HOSE</th>
                      <th className="table-td-border">FITTING A</th>
                      <th className="table-td-border">FITTING B</th>
                      <th className="table-td-border">OA</th>
                      <th className="table-td-border">ASSEMBLY LENGTH</th>
                      <th className="table-td-border">FITTING LENGTH</th>
                      <th className="table-td-border">CUT LENGTH</th>
                      <th className="table-td-border">QTY</th>
                      <th className="table-td-border">GUARD</th>
                      <th className="table-td-border">Action</th>
                    </tr>
                </thead>
                <tbody>
                  {rows?.map((val)=>{
                      return(<>
                       <tr>
                        <td className="table-td-border">332/Y2233</td>
                        <td className="table-td-border">1/4" R2 R PARTS IBN</td>
                        <td className="table-td-border">
                           <div className='d-flex flex-column gap-2'>
                            <div>SB3-SK-0404-B-FS</div>  
                            <div>BR BSP 1/4"X1/4" FEMALE STRAIGHT (SKIVE)</div>  
                          </div>
                        </td>
                        <td className="table-td-border">
                          <div className='d-flex flex-column gap-2'>
                            <div>SB3-SK-0404-B-FS</div>  
                            <div>BR BSP 1/4"X1/4" FEMALE STRAIGHT (SKIVE)</div>  
                          </div>
                        </td>
                        <td >-</td>
                        <td >570</td>
                        <td >50</td>
                        <td >520</td>
                        <td >3</td>
                        <td >-</td>
                        <td className="table-td-border">
                          <div className="d-flex">
                          <button className="btn btn-xs sharp btn-primary me-1"
                           //  onClick={()=>handleEditProduction(data?._id)}
                           >
                           <i className="fa fa-pencil" /></button>
                          <button className="btn btn-xs sharp btn-danger"
                            onClick={()=>handleDeleteProduction(val?._id)}>
                           <i className="fa fa-trash" /></button>
                           </div>
                        </td>
                    </tr>
                      </>)
                    })}
                    <tr>
                        <td className="table-td-border">40/301907</td>
                        <td className="table-td-border">3/8" R2 R PARTS IBN</td>
                        <td className="table-td-border">
                          <div className='d-flex flex-column gap-2'>
                            <div>SB3-SK-0606-B-FS</div>  
                            <div>BR BSP 3/8"X3/8" FEMALE STRAIGHT (SKIVE)</div>  
                          </div>
                        </td>
                        <td className="table-td-border">
                          <div className='d-flex flex-column gap-2'>
                            <div>SB3-SK-0606-B-F90</div>  
                            <div>BR BSP 3/8"X3/8" FEMALE BEND 90 (SKIVE)</div>  
                          </div>
                        </td>
                        <td className="table-td-border">-</td>
                        <td className="table-td-border">2100</td>
                        <td className="table-td-border">65</td>
                        <td className="table-td-border">2035</td>
                        <td className="table-td-border">1</td>
                        <td className="table-td-border">-</td>
                        <td className="table-td-border">
                          <div className="d-flex">
                          <button className="btn btn-xs sharp btn-primary me-1"
                           // onClick={()=>handleEditProduction(data?._id)}
                           >
                           <i className="fa fa-pencil" /></button>
                       
                          <button className="btn btn-xs sharp btn-danger"
                            onClick={()=>handleDeleteProduction('')}
                           >
                           <i className="fa fa-trash" /></button>
                           </div>
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
          </div>
          </>
    );
};

export default ProductionManagementTable;