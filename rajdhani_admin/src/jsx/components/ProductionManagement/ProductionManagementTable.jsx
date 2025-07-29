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

  const handleEditClick = (id, data) => {
    setEditHoseAssemblyShowModal(true)
    setSelectedRowData({ id, ...data }); // Set selected row data
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
      <div style={{ overflowX: 'auto' }}>
      <div style={{ transform: 'scale(1)',  }}>
        <table className="display dataTable no-footer w-100">
          <thead className="thead-dark">
            {currentPage === 1 && (
              <>
                <tr>
                  <td className="table-td-border" colSpan="2" style={{fontWeight: 'bold' , fontSize: '16px'}}>SHEET NO. : <span style={{fontWeight: 'normal'}}>{productionSheetDetailsData?.sheet_no}</span></td>
                  <td className="table-td-border" colSpan="1" style={{fontWeight: 'bold' , fontSize: '16px'}}>MAKE:  <span style={{fontWeight: 'normal'}}>{productionSheetDetailsData?.make}</span></td>
                  <td className="table-td-border" colSpan="3" style={{fontWeight: 'bold' , fontSize: '16px'}}>DATE & TIME:  <span style={{fontWeight: 'normal'}}>{moment(productionSheetDetailsData?.date_time).format('DD MMM YYYY, h:mm:ss a')}</span></td>
                  <td className="table-td-border text-capitalize" colSpan="6" style={{fontWeight: 'bold' , fontSize: '16px'}}>CREATED BY:  <span style={{fontWeight: 'normal'}}>{productionSheetDetailsData?.created_by}</span></td>
                  {/* <td className="table-td-border">
                        <div className='d-flex justify-content-center'>
                         <button className="btn btn-light p-1" title="Edit Sheet Detail"><MdEdit size={20}/></button>
                        </div>
                      </td> */}
                </tr>

                <tr>
                  <td className="table-td-border" colSpan="2" style={{fontWeight: 'bold' , fontSize: '16px'}}>ORDER NO.:  <span style={{fontWeight: 'normal'}}>{productionSheetDetailsData?.order_no}</span></td>
                  <td className="table-td-border" colSpan="4" style={{fontWeight: 'bold' , fontSize: '16px'}}>ORDER DATE:  <span style={{fontWeight: 'normal'}}>{moment(productionSheetDetailsData?.order_date).format('DD MMM YYYY')}</span> </td>
                  <td className="table-td-border" colSpan="7" rowSpan="3"
                    style={{
                      verticalAlign: "top",     // Align content to the top
                      textAlign: "left",        // Align text to the left
                      padding: "1rem",          // Optional: add padding
                      fontWeight: 'bold' , fontSize: '18px',
                      // color: 'white',
                      // fontStyle: 'italic',
                      background: '#EAEAEA'
                    }}
                  >SPECIAL NOTE:  <span style={{fontWeight: 'normal', fontSize: '19px', fontStyle: 'italic',fontWeight: 'bold'}}>{productionSheetDetailsData?.note}</span></td>
                </tr>

                <tr>
                  <td className="table-td-border" colSpan="6" style={{fontWeight: 'bold' , fontSize: '16px'}}>PARTY NAME:  <span style={{fontWeight: 'normal'}}>{productionSheetDetailsData?.party_name}</span></td>
                </tr>

                <tr>
                  <td className="table-td-border" colSpan="6" style={{fontWeight: 'bold' , fontSize: '16px'}}>ADDRESS:  <span style={{fontWeight: 'normal'}}>{productionSheetDetailsData?.address}</span></td>
                </tr>

              </>
            )}

            <tr style={{ background: 'rgb(164 164 164)' }}>
              <th className="table-td-border " style={{ width: '80px' , fontWeight: 'bold'}}>PART NUMBER</th>
              <th className="table-td-border " style={{ width: '120px',fontWeight: 'bold' }}>HOSE</th>
              <th className="table-td-border w-[180px] text-sm" style={{fontWeight: 'bold'}}>FITTING A</th>
              <th className="table-td-border w-[180px] text-sm" style={{fontWeight: 'bold'}}>FITTING B</th>
              <th className="table-td-border w-[80px]" style={{fontWeight: 'bold'}}>OA</th>
              <th className="table-td-border  text-xs leading-tight break-words" style={{width: '40px',fontWeight: 'bold'}}>
                <span style={{ display: "flex", justifyContent: 'center' }}>A Len</span>
              </th>
              <th className="table-td-border  text-xs"><span style={{ display: "flex", justifyContent: 'center',fontWeight: 'bold' }}>F Len</span></th>
              <th className="table-td-border  text-xs"><span style={{ display: "flex", justifyContent: 'center' ,fontWeight: 'bold'}}>C Len</span></th>
              <th className="table-td-border "><span style={{ display: "flex", justifyContent: 'center',fontWeight: 'bold' }}>QTY</span></th>
              <th className="table-td-border " style={{ width: '120px' }}><span style={{ display: "flex", justifyContent: 'center',fontWeight: 'bold' }}>GUARD</span></th>
              <th className="table-td-border w-[100px]" style={{fontWeight: 'bold'}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems?.filter((data) => data.product_type === "Hose Assembly").map((data, index) => {
              return (
                <>
                  <tr
                    key={index}
                    style={{
                      background: index % 2 === 0 ? "#ffffff" : "#f3f3f3"
                    }}
                  >
                    <td className="table-td-border" style={{ width: '80px', fontSize: '18px' }}>{data?.product_id?.part_no ? data?.product_id?.part_no : ""}</td>
                    {/* <td className="table-td-border" style={{ width: '120px' }}>{data?.product_id?.hose ? data?.product_id?.hose : ""}</td> */}
                    <td className="table-td-border" style={{ width: '180px', whiteSpace: 'normal', wordBreak: 'break-word',fontSize: '18px' }}>
                      {data?.product_id?.hose
                        ? data.product_id.hose.match(/.{1,10}/g)?.map((chunk, i) => (
                          <span key={i}>
                            {chunk}
                            <br />
                          </span>
                        ))
                        : ""}
                    </td>
                    <td className="table-td-border" style={{ width: '450px',fontSize: '18px' }}>
                      <div className='d-flex flex-column gap-2' >
                        <div style={{ fontWeight: "bold", display: "inline", whiteSpace: 'nowrap' ,  }}>{data?.product_id?.fitting_a_fitting_Code ? data?.product_id?.fitting_a_fitting_Code : ""}</div>
                        <div>{data?.product_id?.fitting_a_description ? data?.product_id?.fitting_a_description : ""}</div>
                      </div>
                    </td>
                    <td className="table-td-border" style={{ width: '450px',fontSize: '18px' }}>
                      <div className='d-flex flex-column gap-2'>
                        <div style={{ fontWeight: "bold", display: "inline", whiteSpace: 'nowrap' }}>{data?.product_id?.fitting_b_fitting_Code ? data?.product_id?.fitting_b_fitting_Code : ""}</div>
                        <div>{data?.product_id?.fitting_b_description ? data?.product_id?.fitting_b_description : ""}</div>
                      </div>
                    </td>
                    <td className="table-td-border"
                      style={
                        data?.product_id?.oa
                          ? { background: '#686D76', color: 'white', width: '40px', alignItems: 'center',fontSize: '18px', fontWeight: 'bold' }
                          : { alignItems: 'center', width: '40px',fontSize: '18px',fontWeight: 'bold' }
                      }
                    ><span style={{ display: "flex", justifyContent: 'center', }}>{data?.product_id?.oa ? data?.product_id?.oa : "-"}</span></td>
                    <td className="table-td-border" style={{width: '40px',fontSize: '18px', fontWeight: 'bold' }}><span style={{ display: "flex", justifyContent: 'center' }}>{data?.product_id?.assembly_length ? data?.product_id?.assembly_length : "-"}</span></td>
                    <td className="table-td-border" style={{width: '40px',fontSize: '18px', fontWeight: 'bold'}}><span style={{ display: "flex", justifyContent: 'center' }}>{data?.product_id?.fitting_length ? data?.product_id?.fitting_length : "-"}</span></td>
                    <td className="table-td-border" style={{ background: '#B6CBBD', width: '40px',fontSize: '18px', fontWeight: 'bold' }}><span style={{ display: "flex", justifyContent: 'center' }}>{data?.product_id?.cutting_length ? data?.product_id?.cutting_length : "-"}</span></td>
                    <td className="table-td-border" style={{width: '40px',fontSize: '18px', fontWeight: 'bold'}}><span style={{ display: "flex", justifyContent: 'center' }}>{data?.quantity ? data?.quantity : "-"}</span></td>
                    <td className="table-td-border" style={
                      data?.product_id?.guard
                        ? { background: '#4A4947', color: 'white', width: '140px',fontSize: '18px',  }
                        : { width: '140px',fontSize: '18px', }
                    }>{data?.product_id?.guard ? data?.product_id?.guard : "-"}</td>
                   


                    <td className="table-td-border" style={{width: '40px'}}>
                      <div className="d-flex">
                        <button className="btn btn-xs sharp btn-primary me-1"
                          onClick={() => handleEditClick(index, data)}
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
    </div>
  </>
  );
};

export default ProductionManagementTable;