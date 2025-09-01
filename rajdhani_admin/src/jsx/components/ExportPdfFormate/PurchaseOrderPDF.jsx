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


const ExportPDFModal = ({
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
// Sample Purchase Order Details
const purchaseOrderDetails = {
  invoice_to: `
    SB Parts Pvt. Ltd.<br/>
    Sukher, Udaipur<br/>
    GSTIN/UIN: 18<br/>
    State Name: Rajasthan, Code: 08<br/>
    E-Mail: gourav@rajdhaniudaipur.com
  `,
  consignee: `
    SB Parts Pvt. Ltd.<br/>
    Sukher, Udaipur<br/>
    GSTIN/UIN: 18<br/>
    State Name: Rajasthan, Code: 08<br/>
    E-Mail: gourav@rajdhaniudaipur.com
  `,
  supplier: `
    A<br/>
    GSTIN/UIN: --<br/>
    State Name: Rajasthan, Code: 08
  `,
  voucher_no: "SB/PO/24-25/41",
  reference_no: "SB/PO/24-25/41",
  date: "2024-11-11",
  payment_terms: "Immediate / As per Contract",
  other_references: "-",
  dispatch_through: "By Road",
  destination: "Udaipur",
  delivery_terms: `
    - Mention PO No. in Your Invoice<br/>
    - Extra Quantity Other Than PO Is Not Acceptable
  `,
  total_qty: "110.00",
  total_unit: "SET"
};

// Sample Items
const purchaseOrderItems = [
  {
    description: "(H) BR-20029 -BSP 1.1/2X1.1/2 CONICAL ST.<br/>HYD COUP-D1-1/2’’ 290 BAR LP, M-FLEX-FS",
    quantity: "10.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
  {
    description: "(H) BR-20185 -BSP 5/8X5/8 ORING ST.<br/>HYD COUP-D5/8’’ 350 BAR LP, M-FLEX-FS",
    quantity: "20.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
  {
    description: "(H) BR-20274 -JIC 1/2X7/8 ST.",
    quantity: "40.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
  {
    description: "(H) BR-20143 -BSP 3/4X3/4 ORING ST.<br/>HYD COUP-D3/4’’ 420 BAR LP, M-FLEX-FS",
    quantity: "20.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
  {
    description: "(H) SP-40374 - JIC 1.1/4X1.5/8 ST SP4<br/>HYD COUP-S1-1/4’’ 325BAR HP L-FLEX-FS",
    quantity: "20.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
   {
    description: "(H) BR-20029 -BSP 1.1/2X1.1/2 CONICAL ST.<br/>HYD COUP-D1-1/2’’ 290 BAR LP, M-FLEX-FS",
    quantity: "10.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
  {
    description: "(H) BR-20185 -BSP 5/8X5/8 ORING ST.<br/>HYD COUP-D5/8’’ 350 BAR LP, M-FLEX-FS",
    quantity: "20.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
  {
    description: "(H) BR-20274 -JIC 1/2X7/8 ST.",
    quantity: "40.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
  {
    description: "(H) BR-20143 -BSP 3/4X3/4 ORING ST.<br/>HYD COUP-D3/4’’ 420 BAR LP, M-FLEX-FS",
    quantity: "20.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
  {
    description: "(H) SP-40374 - JIC 1.1/4X1.5/8 ST SP4<br/>HYD COUP-S1-1/4’’ 325BAR HP L-FLEX-FS",
    quantity: "20.00",
    unit: "SET",
    due_on: "2024-11-11"
  }, {
    description: "(H) BR-20029 -BSP 1.1/2X1.1/2 CONICAL ST.<br/>HYD COUP-D1-1/2’’ 290 BAR LP, M-FLEX-FS",
    quantity: "10.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
  {
    description: "(H) BR-20185 -BSP 5/8X5/8 ORING ST.<br/>HYD COUP-D5/8’’ 350 BAR LP, M-FLEX-FS",
    quantity: "20.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
  {
    description: "(H) BR-20274 -JIC 1/2X7/8 ST.",
    quantity: "40.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
  {
    description: "(H) BR-20143 -BSP 3/4X3/4 ORING ST.<br/>HYD COUP-D3/4’’ 420 BAR LP, M-FLEX-FS",
    quantity: "20.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
  {
    description: "(H) SP-40374 - JIC 1.1/4X1.5/8 ST SP4<br/>HYD COUP-S1-1/4’’ 325BAR HP L-FLEX-FS",
    quantity: "20.00",
    unit: "SET",
    due_on: "2024-11-11"
  }, {
    description: "(H) BR-20029 -BSP 1.1/2X1.1/2 CONICAL ST.<br/>HYD COUP-D1-1/2’’ 290 BAR LP, M-FLEX-FS",
    quantity: "10.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
  {
    description: "(H) BR-20185 -BSP 5/8X5/8 ORING ST.<br/>HYD COUP-D5/8’’ 350 BAR LP, M-FLEX-FS",
    quantity: "20.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
  {
    description: "(H) BR-20274 -JIC 1/2X7/8 ST.",
    quantity: "40.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
  {
    description: "(H) BR-20143 -BSP 3/4X3/4 ORING ST.<br/>HYD COUP-D3/4’’ 420 BAR LP, M-FLEX-FS",
    quantity: "20.00",
    unit: "SET",
    due_on: "2024-11-11"
  },
  {
    description: "(H) SP-40374 - JIC 1.1/4X1.5/8 ST SP4<br/>HYD COUP-S1-1/4’’ 325BAR HP L-FLEX-FS",
    quantity: "20.00",
    unit: "SET",
    due_on: "2024-11-11"
  }
];

const exportPDF = async () => {
  setLoading(true);
  try {
    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const rowsPerPage = 10; // max rows per page

    const filteredItems = purchaseOrderItems || [];
    const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      const startIndex = pageIndex * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const paginatedItems = filteredItems.slice(startIndex, endIndex);

      const container = document.createElement("div");
      container.style.padding = "20px";
      container.style.background = "#fff";
      container.style.width = "800px";
      document.body.appendChild(container);

      // Only show header on first page
      if (pageIndex === 0) {
        container.innerHTML = `
          <div style="font-size: 12pt; font-family: Arial;">
            <!-- Title -->
            <h2 style="text-align: center; font-weight: bold; margin-bottom: 15px;">PURCHASE ORDER</h2>

            <!-- Top Info Section -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 11pt;">
              <tr>
                <td style="border: 1px solid #000; padding: 6px; width: 33%;">
                  <b>Invoice To</b><br/>${purchaseOrderDetails?.invoice_to || ""}
                </td>
                <td style="border: 1px solid #000; padding: 6px; width: 33%;">
                  <b>Consignee (Ship To)</b><br/>${purchaseOrderDetails?.consignee || ""}
                </td>
                <td style="border: 1px solid #000; padding: 6px; width: 33%;">
                  <b>Supplier (Bill From)</b><br/>${purchaseOrderDetails?.supplier || ""}
                </td>
              </tr>
            </table>

            <!-- Voucher Info -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 11pt;">
              <tr>
                <td style="border: 1px solid #000; padding: 6px;">Voucher No.<br/><b>${purchaseOrderDetails?.voucher_no || ""}</b></td>
                <td style="border: 1px solid #000; padding: 6px;">Reference No.<br/><b>${purchaseOrderDetails?.reference_no || ""}</b></td>
                <td style="border: 1px solid #000; padding: 6px;">Dated<br/><b>${moment(purchaseOrderDetails?.date).format("DD-MMM-YYYY")}</b></td>
                <td style="border: 1px solid #000; padding: 6px;">Payment Terms<br/><b>${purchaseOrderDetails?.payment_terms || ""}</b></td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 6px;">Other References<br/><b>${purchaseOrderDetails?.other_references || ""}</b></td>
                <td style="border: 1px solid #000; padding: 6px;">Dispatched Through<br/><b>${purchaseOrderDetails?.dispatch_through || ""}</b></td>
                <td style="border: 1px solid #000; padding: 6px;">Destination<br/><b>${purchaseOrderDetails?.destination || ""}</b></td>
                <td style="border: 1px solid #000; padding: 6px;">Delivery Terms<br/><b>${purchaseOrderDetails?.delivery_terms || ""}</b></td>
              </tr>
            </table>
          </div>
        `;
      }

      // Items Table (always show)
      container.innerHTML += `
        <table style="width: 100%; border-collapse: collapse; font-size: 11pt; margin-top: 10px;">
          <thead>
            <tr style="background: #e0e0e0; font-weight: bold; text-align: center;">
              <th style="border: 1px solid #000; padding: 5px; width: 40px;">Sl</th>
              <th style="border: 1px solid #000; padding: 5px;">Description of Goods</th>
              <th style="border: 1px solid #000; padding: 5px; width: 100px;">Quantity</th>
              <th style="border: 1px solid #000; padding: 5px; width: 100px;">Due On</th>
            </tr>
          </thead>
          <tbody>
            ${paginatedItems.map((data, idx) => `
              <tr style="background: ${idx % 2 === 0 ? "#fff" : "#f9f9f9"};">
                <td style="border: 1px solid #000; padding: 6px; text-align: center;">${startIndex + idx + 1}</td>
                <td style="border: 1px solid #000; padding: 6px;">${data.description || ""}</td>
                <td style="border: 1px solid #000; padding: 6px; text-align: center;">${data.quantity || ""} ${data.unit || ""}</td>
                <td style="border: 1px solid #000; padding: 6px; text-align: center;">${moment(data.due_on).format("DD-MMM-YYYY")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;

      // Footer only on last page
      if (pageIndex === totalPages - 1) {
        container.innerHTML += `
          <div style="margin-top: 20px; font-size: 11pt;">
            <p><strong>Total: </strong>${purchaseOrderDetails?.total_qty || ""} ${purchaseOrderDetails?.total_unit || ""}</p>
            <p style="font-size: 10pt;">E. & O.E</p>
            <div style="display: flex; justify-content: space-between; margin-top: 40px; font-size: 11pt;">
              <span>Prepared by</span>
              <span>Verified by</span>
              <span>Authorised Signatory</span>
            </div>
            <p style="margin-top: 30px; font-size: 9pt; text-align:center;">This is a Computer Generated Document</p>
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

    pdf.save(`PurchaseOrder_${purchaseOrderDetails?.voucher_no || "PO"}.pdf`);
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

export default ExportPDFModal;

