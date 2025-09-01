import React, { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment';
import Select from "react-select";
import Loader from '../../../components/Loader/Loader';


const orientationOption = [
  { value: 'portrait', label: 'Portrait' },
  { value: 'landscape', label: 'Landscape' },
]

const pageSizeOptions = [
  { value: 'a4', label: 'A4' },
  { value: 'a5', label: 'A5' },
  { value: 'letter', label: 'Letter' },
]


const GatePassPDF = ({
  gatePassDetails,
  gatePassItems,
}) => {

  console.log("gatePassDetails", gatePassDetails, gatePassItems)
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
      const pdf = new jsPDF("p", "pt", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const rowsPerPage = 10; // max rows per page

      const filteredItems = gatePassItems || [];
      const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        const startIndex = pageIndex * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const paginatedItems = filteredItems.slice(startIndex, endIndex);

        const container = document.createElement("div");
        container.style.padding = "15px";
        container.style.background = "#fff";
        container.style.width = "780px"; // fit to A4 width
        document.body.appendChild(container);

        // Header & Info only on first page
        if (pageIndex === 0) {
          container.innerHTML = `
          <div style="font-size: 10pt; font-family: Arial;">
            <!-- Title -->
            <h2 style="text-align: center; font-weight: bold; margin-bottom: 8px;">GATE PASS</h2>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: 9pt;">
              <tr>
               



                <!-- Left Column -->
    <td style="border: 1px solid #000; width: 50%; vertical-align: top; padding: 0;">
      <table style="width: 100%; border-collapse: collapse; font-size: 8pt;">
        
        <!-- Invoice To -->
        <tr>
          <td style="border-bottom: 1px solid #000; padding: 4px;">
            <b>Invoice To:</b><br/>
            ${gatePassDetails?.base_company_address?.name || ""}, 
            ${gatePassDetails?.base_company_address?.address || ""}, 
            ${gatePassDetails?.base_company_address?.city || ""}, 
            ${gatePassDetails?.base_company_address?.state_name || ""}, 
            ${gatePassDetails?.base_company_address?.country || ""}<br/>
            GST: ${gatePassDetails?.base_company_address?.gstNumber || ""}
          </td>
        </tr>

        <!-- Consignee -->
        <tr>
          <td style="border-bottom: 1px solid #000; padding: 4px;">
            <b>Consignee (Ship To):</b><br/>
            ${gatePassDetails?.shipping_details?.address || ""}, 
            ${gatePassDetails?.shipping_details?.city || ""}, 
            ${gatePassDetails?.shipping_details?.state_name || ""}, 
            ${gatePassDetails?.shipping_details?.country || ""}<br/>
            Mob: ${gatePassDetails?.shipping_details?.mobile_no1 || ""}, 
            ${gatePassDetails?.shipping_details?.mobile_no2 || ""}
          </td>
        </tr>

        <!-- Buyer -->
        <tr>
          <td style="padding: 4px;">
            <b>Buyer (Bill To):</b><br/>
            ${gatePassDetails?.customer_id?.company_name || ""} - 
            ${gatePassDetails?.customer_id?.fname || ""} ${gatePassDetails?.customer_id?.lname || ""}<br/>
            ${gatePassDetails?.customer_id?.address || ""}, 
            ${gatePassDetails?.customer_id?.city || ""}, 
            ${gatePassDetails?.customer_id?.state || ""}, 
            ${gatePassDetails?.customer_id?.country || ""}<br/>
            Email: ${gatePassDetails?.customer_id?.email || ""}, 
            Mob: ${gatePassDetails?.customer_id?.mobile_no1 || ""}, 
            ${gatePassDetails?.customer_id?.mobile_no2 || ""}
          </td>
        </tr>

      </table>
    </td>

                <!-- Right Column -->
                <td style="border: 1px solid #000; width: 50%; vertical-align: top; padding: 0;">
  <table style="width: 100%; border-collapse: collapse; font-size: 9pt;">

 <!-- Voucher No & Date in one line (with vertical separator) -->
<tr>
  <td style="border-bottom: 1px solid #000; border-right: 1px solid #000; padding: 4px; width: 50%;">
    <b>Voucher No:</b> ${gatePassDetails?.voucher_no || ""}
  </td>
  <td style="border-bottom: 1px solid #000; padding: 4px; width: 50%;">
    <b>Date:</b> ${moment(gatePassDetails?.date).format("DD-MMM-YYYY")}
  </td>
</tr>

<!-- Reference No & Other Reference -->
<tr>
  <td style="border-bottom: 1px solid #000; border-right: 1px solid #000; padding: 4px; width: 50%;">
    <b>Reference No:</b> ${gatePassDetails?.reference_no || ""}
  </td>
  <td style="border-bottom: 1px solid #000; padding: 4px; width: 50%;">
    <b>Other Ref:</b> ${gatePassDetails?.other_reference || ""}
  </td>
</tr>

<!-- Dispatched Through & Destination -->
<tr>
  <td style="border-bottom: 1px solid #000; border-right: 1px solid #000; padding: 4px; width: 50%;">
    <b>Dispatched Through:</b> ${gatePassDetails?.dispatch_through || ""}
  </td>
  <td style="border-bottom: 1px solid #000; padding: 4px; width: 50%;">
    <b>Destination:</b> ${gatePassDetails?.destination || ""}
  </td>
</tr>

<!-- Mode/Terms of Payment -->
<tr>
  <td colspan="2" style="border-bottom: 1px solid #000; padding: 4px;">
    <b>Mode/Terms of Payment:</b> ${gatePassDetails?.payment_terms || ""}
  </td>
</tr>

<!-- Terms of Delivery -->
<tr>
  <td colspan="2" style="padding: 4px;">
    <b>Terms of Delivery:</b> ${gatePassDetails?.delivery_terms || ""}
  </td>
</tr>



  </table>
</td>





                
              </tr>
            </table>
          </div>
        `;
        }

        // Items Table (always show)
        container.innerHTML += `
        
        <table style="width: 100%; border-collapse: collapse; font-size: 9pt; margin-top: 8px;">
  <thead>
    <tr style="background: #e0e0e0; font-weight: bold; text-align: center;">
      <th style="border: 1px solid #000; padding: 4px; width: 40px;">Sl</th>
      <th style="border: 1px solid #000; padding: 4px;">Description of Goods</th>
      <th style="border: 1px solid #000; padding: 4px; width: 120px;">Quantity & UOM</th>
      <th style="border: 1px solid #000; padding: 4px; width: 100px;">Due On</th>
    </tr>
  </thead>
  <tbody>
    ${paginatedItems.map((data, idx) => `
      <tr style="background: ${idx % 2 === 0 ? "#fff" : "#f9f9f9"};">
        <td style="border: 1px solid #000; padding: 4px; text-align: center;">
          ${startIndex + idx + 1}
        </td>
        <td style="border: 1px solid #000; padding: 4px;">
          <div style="font-weight: bold;">${data?.product_id?.desc_Code || ""}</div>
          <div style="font-size: 8.5pt; font-weight: 500; color: #333;">
            ${data?.product_id?.fitting_Code || ""}
          </div>
          <div style="font-size: 8pt; background: #e0e0e0; color: #000; padding: 2px 4px; display: inline-block; margin-top: 2px; border-radius: 3px;">
            ${data.Additional || ""}
          </div>
        </td>
        <td style="border: 1px solid #000; padding: 4px; text-align: center;">
          ${data.packing_quantity || ""} ${data?.product_id?.uom || ""}
        </td>
        <td style="border: 1px solid #000; padding: 4px; text-align: center;">
          ${gatePassDetails.order_details?.due_date ? moment(gatePassDetails.order_details?.due_date).format("DD-MMM-YYYY") : ""}
        </td>
      </tr>
    `).join("")}
  </tbody>
</table>

      `;

        // Footer only on last page
        if (pageIndex === totalPages - 1) {
          container.innerHTML += `
          <div style="margin-top: 15px; font-size: 9pt;">
            <p style="font-size: 8pt;">E. & O.E</p>
            <div style="display: flex; justify-content: space-between; margin-top: 25px; font-size: 9pt;">
              <span>Prepared by</span>
              <span>Verified by</span>
              <span>Authorised Signatory</span>
            </div>
            <p style="margin-top: 15px; font-size: 8pt; text-align:center;">This is a Computer Generated Document</p>
          </div>
        `;
        }

        // Convert to image
        const canvas = await html2canvas(container, { scale: 1.5, useCORS: true });
        const imgData = canvas.toDataURL("image/jpeg", 0.7);
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pageWidth;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

        if (pageIndex > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, undefined, "FAST");

        document.body.removeChild(container);
      }

      pdf.save(`GatePass_${gatePassDetails?.gatepass_no || "GP"}.pdf`);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Loader visible={loading} />
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="btn btn-warning" onClick={exportPDF}>
            Download PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default GatePassPDF;

