import React, { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment';
import Select from "react-select";
import Loader from '../Loader/Loader';

const orientationOption = [
  { value: 'portrait', label: 'Portrait' },
  { value: 'landscape', label: 'Landscape' },
]

const pageSizeOptions = [
  { value: 'a4', label: 'A4' },
  { value: 'a5', label: 'A5' },
  { value: 'letter', label: 'Letter' },
]


const ExportSheetModal = ({
  productionSheetDetailsData,
  productionSheetItemsDetailsData,
}) => {
  const hiddenContainerRef = useRef();

  // Custom PDF options
  const [orientation, setOrientation] = useState(orientationOption[1]?.value);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]?.value);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [scale, setScale] = useState(4);
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);


  const exportPDF = async () => {
    setLoading(true);
    try {
      const pdf = new jsPDF(orientation === 'landscape' ? 'l' : 'p', 'pt', pageSize);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Filter the items first
      const filteredItems = productionSheetItemsDetailsData?.filter(
        (data) => data.product_type === 'Hose Assembly'
      ) || [];

      const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        const startIndex = pageIndex * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const paginatedItems = filteredItems.slice(startIndex, endIndex);

        // Create a temporary container for rendering
        const container = document.createElement('div');


        // Define padding in pixels (around the table)
        const padding = 30;

        // Let's define a fixed width for the container smaller than pageWidth to allow padding
        // You can adjust this value or compute dynamically if needed
        // const containerWidth = pageWidth - 2 * padding;

        // container.style.width = `${containerWidth}px`;
        // Add padding inside the container for better visual spacing
        container.style.padding = `${padding}px`;
        // Optional: add a white background to avoid transparency issues
        container.style.background = '#fff';

        // container.style.position = 'absolute';
        // container.style.left = '-9999px';
        // container.style.top = '0';
        container.style.width = 'fit-content';

        document.body.appendChild(container);

        const formatTextWithBreaks = (text) => {
          return text?.match(/.{1,10}/g)?.join('<wbr>') || '';
        };

        // Render the content into the container
        // container.innerHTML = `
        //   <table class="display dataTable no-footer w-100" style="font-size: 10pt;">
        //     <thead class="thead-dark">
        //       ${pageIndex === 0 ? `
        //         <tr>
        //           <td class="table-td-border" colspan="2">SHEET NO.: ${productionSheetDetailsData?.sheet_no || ''}</td>
        //           <td class="table-td-border" colspan="1">MAKE: ${productionSheetDetailsData?.make || ''}</td>
        //           <td class="table-td-border" colspan="3">DATE & TIME: ${moment(productionSheetDetailsData?.date_time).format('DD MMM YYYY, h:mm:ss a')}</td>
        //           <td class="table-td-border text-capitalize" colspan="6">CREATED BY: ${productionSheetDetailsData?.created_by || ''}</td>
        //         </tr>
        //         <tr>
        //           <td class="table-td-border" colspan="2">ORDER NO.: ${productionSheetDetailsData?.order_no || ''}</td>
        //           <td class="table-td-border" colspan="4">ORDER DATE: ${moment(productionSheetDetailsData?.order_date).format('DD MMM YYYY')}</td>
        //           <td class="table-td-border" colspan="7" rowspan="3" style="vertical-align: top; text-align: left; padding: 1rem;">
        //             SPECIAL NOTE: ${productionSheetDetailsData?.note || ''}
        //           </td>
        //         </tr>
        //         <tr>
        //           <td class="table-td-border" colspan="6">PARTY NAME: ${productionSheetDetailsData?.party_name || ''}</td>
        //         </tr>
        //         <tr>
        //           <td class="table-td-border" colspan="6">ADDRESS: ${productionSheetDetailsData?.address || ''}</td>
        //         </tr>
        //       ` : ''}
        //       <tr class="bg-light">
        //         <th class="table-td-border w-[150px]">PART NUMBER</th>
        //         <th class="table-td-border w-[100px]">HOSE</th>
        //         <th class="table-td-border w-[180px] text-sm">FITTING A</th>
        //         <th class="table-td-border w-[180px] text-sm">FITTING B</th>
        //         <th class="table-td-border w-[80px]">OA</th>
        //         <th class="table-td-border w-[90px] text-xs leading-tight break-words">ASSEMBLY<br />LENGTH</th>
        //         <th class="table-td-border w-[90px] text-xs">FITTING<br />LENGTH</th>
        //         <th class="table-td-border w-[90px] text-xs">CUT<br />LENGTH</th>
        //         <th class="table-td-border w-[60px]">QTY</th>
        //         <th class="table-td-border w-[80px]">GUARD</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       ${paginatedItems.map(data => `
        //         <tr>
        //           <td class="table-td-border">${data?.product_id?.part_no || ''}</td>
        //           <td class="table-td-border">${data?.product_id?.hose || ''}</td>
        //           <td class="table-td-border">
        //             <div class="d-flex flex-column gap-2">
        //               <div>${data?.product_id?.fitting_a_fitting_Code || ''}</div>
        //               <div>${data?.product_id?.fitting_a_description || ''}</div>
        //             </div>
        //           </td>
        //           <td class="table-td-border">
        //             <div class="d-flex flex-column gap-2">
        //               <div>${data?.product_id?.fitting_b_fitting_Code || ''}</div>
        //               <div>${data?.product_id?.fitting_b_description || ''}</div>
        //             </div>
        //           </td>
        //           <td class="table-td-border">${data?.product_id?.oa || '-'}</td>
        //           <td class="table-td-border">${data?.product_id?.assembly_length || '-'}</td>
        //           <td class="table-td-border">${data?.product_id?.fitting_length || '-'}</td>
        //           <td class="table-td-border">${data?.product_id?.cutting_length || '-'}</td>
        //           <td class="table-td-border">${data?.quantity || '-'}</td>
        //           <td class="table-td-border">${data?.product_id?.guard || '-'}</td>
        //         </tr>
        //       `).join('')}
        //     </tbody>
        //   </table>
        // `;


        container.innerHTML = `
          <table class="display dataTable no-footer w-100" style="font-size: 10pt;">
            <thead class="thead-dark">
              ${pageIndex === 0 ? `
                <tr>
                  <td class="table-td-border" colspan="2" style="font-weight: bold; font-size: 16px;">SHEET NO.: <span style="font-weight: normal;">${productionSheetDetailsData?.sheet_no || ''}</span></td>
                  <td class="table-td-border" colspan="1" style="font-weight: bold; font-size: 16px;">MAKE: <span style="font-weight: normal;">${productionSheetDetailsData?.make || ''}</span></td>
                  <td class="table-td-border" colspan="3" style="font-weight: bold; font-size: 16px;">DATE & TIME: <span style="font-weight: normal;">${moment(productionSheetDetailsData?.date_time).format('DD MMM YYYY, h:mm:ss a')}</span></td>
                  <td class="table-td-border text-capitalize" colspan="6" style="font-weight: bold; font-size: 16px;">CREATED BY: <span style="font-weight: normal;">${productionSheetDetailsData?.created_by || ''}</span></td>
                </tr>
                <tr>
                  <td class="table-td-border" colspan="2" style="font-weight: bold; font-size: 16px;">
                    ORDER NO.: <span style="font-weight: normal;">${productionSheetDetailsData?.order_no || ''}</span>
                  </td>
                  <td class="table-td-border" colspan="4" style="font-weight: bold; font-size: 16px;">
                    ORDER DATE: <span style="font-weight: normal;">${moment(productionSheetDetailsData?.order_date).format('DD MMM YYYY')}</span>
                  </td>
                  <td class="table-td-border" colspan="7" rowspan="3" style="vertical-align: top; text-align: left; padding: 1rem; font-weight: bold; font-size: 18px; background: #EAEAEA;">
                    SPECIAL NOTE: <span style="font-weight: bold; font-size: 19px; font-style: italic;">${productionSheetDetailsData?.note || ''}</span>
                  </td>       
                </tr>
               <tr>
                <td class="table-td-border" colspan="6" style="font-weight: bold; font-size: 16px;">
                  PARTY NAME: <span style="font-weight: normal;">${productionSheetDetailsData?.party_name || ''}</span>
                </td>
              </tr>
              <tr>
                <td class="table-td-border" colspan="6" style="font-weight: bold; font-size: 16px;">
                  ADDRESS: <span style="font-weight: normal;">${productionSheetDetailsData?.address || ''}</span>
                </td>
              </tr>
              ` : ''}
              <tr style="background: rgb(164 164 164);">
                <th class="table-td-border" style="width: 80px; font-weight: bold;">PART NUMBER</th>
                <th class="table-td-border" style="width: 120px; font-weight: bold;">HOSE</th>
                <th class="table-td-border" style="width: 180px; font-weight: bold;">FITTING A</th>
                <th class="table-td-border" style="width: 180px; font-weight: bold;">FITTING B</th>
                <th class="table-td-border" style="width: 80px; font-weight: bold;">OA</th>
                <th class="table-td-border" style="width: 40px; font-weight: bold;"><div style="display: flex; justify-content: center;">A Len</div></th>
                <th class="table-td-border" style="font-weight: bold;"><div style="display: flex; justify-content: center;">F Len</div></th>
                <th class="table-td-border" style="font-weight: bold;"><div style="display: flex; justify-content: center;">C Len</div></th>
                <th class="table-td-border" style="font-weight: bold;"><div style="display: flex; justify-content: center;">QTY</div></th>
                <th class="table-td-border" style="width: 120px; font-weight: bold;"><div style="display: flex; justify-content: center;">GUARD</div></th>
              </tr>

            </thead>
            <tbody>
              ${paginatedItems.map((data, index) => `
                 <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f3f3f3'};">
                
                  <td class="table-td-border" style="width: 80px; font-size: 18px;">${data?.product_id?.part_no || ''}</td>
                  
                    <td class="table-td-border" style="width: 80px; white-space: normal; word-break: break-word; font-size: 18px;">
                      ${formatTextWithBreaks(data?.product_id?.hose)}
                    </td>

                  <td class="table-td-border" style="width: 450px; font-size: 18px;">
                    <div>
                      <div style="font-weight: bold; white-space: nowrap;">
                        ${data?.product_id?.fitting_a_fitting_Code || ''}
                      </div>
                      <div>
                        ${data?.product_id?.fitting_a_description || ''}
                      </div>
                    </div>
                  </td>

                  <td class="table-td-border" style="width: 450px; font-size: 18px;">
                        <div>
                        <div style="font-weight: bold; white-space: nowrap;">
                          ${data?.product_id?.fitting_b_fitting_Code || ''}
                        </div>
                        <div>
                          ${data?.product_id?.fitting_b_description || ''}
                        </div>
                      </div>
                   </td>

                  <td class="table-td-border" style="${data?.product_id?.oa ? 'background:#686D76; color:white; width:40px; font-size:18px; font-weight:bold;  align-items:center;' : 'width:40px; font-size:18px; font-weight:bold; align-items:center;'}">
                   <span style="display:flex; justify-content:center;"> ${data?.product_id?.oa ? data.product_id.oa : '-'}</span>
                  </td>

                  <td class="table-td-border" style="width:40px; font-size:18px; font-weight:bold; align-items:center;">
                    <span style="display:flex; justify-content:center;">${data?.product_id?.assembly_length || '-'}</span>
                  </td>

                  <td class="table-td-border" style="width:40px; font-size:18px; font-weight:bold;align-items:center;">
                    <span style="display:flex; justify-content:center;">${data?.product_id?.fitting_length || '-'}</span>
                  </td>

                  <td class="table-td-border" style="${data?.product_id?.cutting_length ? 'background:#B6CBBD; width:40px; font-size:18px; font-weight:bold;  align-items:center;' : 'width:40px; font-size:18px; font-weight:bold;  align-items:center;'}">
                    <span style="display:flex; justify-content:center;">${data?.product_id?.cutting_length ? data.product_id.cutting_length : '-'}</span>
                  </td>


                  <td class="table-td-border" style="width:40px; font-size:18px; font-weight:bold;">
                    <span style="display:flex; justify-content:center;">${data?.quantity || '-'}</span>
                  </td>

                  
                  <td class="table-td-border" style="${data?.product_id?.guard ? 'background:#4A4947; color:white; width:140px; font-size:18px; align-items:center; padding-left:8px;' : 'width:140px; font-size:18px;'}">
                    ${data?.product_id?.guard || '-'}
                  </td>

                </tr>
              `).join('')}
            </tbody>
          </table>
        `;



        const canvas = await html2canvas(container, {
          scale: 1.5,
          useCORS: true,
        });

        // const imgData = canvas.toDataURL('image/png');
        const imgData = canvas.toDataURL('image/jpeg', 0.7);
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pageWidth;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

        if (pageIndex > 0) {
          pdf.addPage();
        }

        // pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');

        // Clean up the container
        document.body.removeChild(container);
      }

      pdf.save(`ProductionSheet_${productionSheetDetailsData?.sheet_no || 'Sheet'}.pdf`);
    } catch (error) {
      console.log("error", error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader visible={loading} />
      <div>
        <div className="mb-3 row">

          <div className="col-sm-3 col-xl-4">
            <label className="col-form-label">
              Orientation
            </label>
            <Select
              value={orientation}
              onChange={(e) => setOrientation(e.target)}
              options={orientationOption}
              style={{
                lineHeight: "20px",
                color: "#7e7e7e",
                paddingLeft: " 15px",
              }}
            />
            {errors?.orientation && (
              <span className="text-danger fs-12">{errors?.orientation}</span>
            )}
          </div>





          <div className="col-sm-3 col-xl-4">
            <label className="col-form-label">
              Page Size
            </label>
            <Select
              value={pageSize}
              onChange={(e) => setPageSize(e.target)}
              options={pageSizeOptions}
              style={{
                lineHeight: "20px",
                color: "#7e7e7e",
                paddingLeft: " 15px",
              }}
            />
            {errors?.pageSize && (
              <span className="text-danger fs-12">{errors?.pageSize}</span>
            )}
          </div>

          <div className="col-sm-3 col-xl-4">
            <label className="col-form-label">Rows per Page </label>
            <input
              name="rowsPerPage"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              type="number"
              className="form-control"
              placeholder="Ex: 10"

            />
            {errors?.rowsPerPage && (
              <span className="text-danger fs-12">{errors?.rowsPerPage}</span>
            )}
          </div>




        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="btn btn-warning" onClick={exportPDF}>
            Download PDF
          </button>
        </div>

      </div>
    </>
  );
};

export default ExportSheetModal;

