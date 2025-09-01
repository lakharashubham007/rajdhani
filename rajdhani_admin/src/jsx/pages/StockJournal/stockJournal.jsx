import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";

import "./StockJournal.css";
import { GetAllProductList, SearchProductsApi } from "../../../services/apis/Product";
import { Toaster } from "../../components/Toaster/Toster";
import TransferLoader from "./components/TransferLoader";
import { checkProductsInInventoryApi } from "../../../services/apis/InventoryApi";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { updateItemQuantityWithLogsInInventoryApi, updateStockJournalLogAndInventory } from "../../../services/apis/InventoryItemLogsApi";

export default function StockJournal() {
    const [transferLoading, setTransferLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchDestinationTerm, setSearchDestinationTerm] = useState("");
    const [productOption, setProductOption] = useState(null);
    const [productDestinationOption, setProductDestinationOption] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedDestProduct, setSelectedDestProduct] = useState(null);
    const [availableQty, setAvailableQty] = useState(0);
    const [availableDestQty, setAvailableDestQty] = useState(0);
    const authData = useSelector((state) => state.auth.auth);
    const [narration, setNarration] = useState("");
    const [sourceProductID, setSourceProductID] = useState("");
    const [destProductID, setDestProductID] = useState("");
    const [sourceDesc, setSourceDesc] = useState("");
    const [sourceCode, setSourceCode] = useState("");
    const [sourceQty, setSourceQty] = useState("");
    const [destDesc, setDestDesc] = useState("");
    const [destCode, setDestCode] = useState("");
    const [destQty, setDestQty] = useState("");
    const [sourceRows, setSourceRows] = useState([]);
    const [destRows, setDestRows] = useState([]);
    const debounceTimer = useRef(null);

    const [productformData, setProductFormData] = useState({
        product_code: "",
        quantity: "",
        uom: "",
        weight: "",
        price: "",
        discount_per_unit: "",
        total_discount: "",
        cgst: "",
        sgst: "",
        igst: "",
        cess: "",
        amount: "",
    });

    const fetchProductAllList = async () => {
        // setLoading(true);
        try {
            const res = await GetAllProductList();
            const dropdownProductList = res?.data?.products?.map((product) => ({
                value: product?.desc_Code,
                label: `[${product?.product_code}] ${product?.desc_Code}`,
                id: product?._id,
                product_code: product?.product_code,
                uom: product?.uom,
                weight: product?.weight,
                price: product?.price,
                gst: product?.gst,
                fitting_Code: product?.fitting_Code,
                product_type: product?.product_type
            }));
            setProductOption(dropdownProductList);
            setProductDestinationOption(dropdownProductList)
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };


    const fetchProductSearchResults = async (query) => {
        if (!query) return; // Prevent empty requests
        // setLoading(true);

        try {
            const res = await SearchProductsApi(query); // API should support search
            const dropdownProductList = res?.data?.products.map((product) => ({
                value: product?.desc_Code,
                label: `[${product?.product_code}]  [${product?.desc_Code}]  ${product?.fitting_Code ? ` ⇨[${product?.fitting_Code}]` : ""}`,
                id: product?._id,
                product_code: product?.product_code,
                uom: product?.uom,
                weight: product?.weight,
                price: product?.price,
                gst: product?.gst,
                fitting_Code: product?.fitting_Code,
                product_type: product?.product_type,
            }));

            setProductOption(dropdownProductList);
            setProductDestinationOption(dropdownProductList)
        } catch (error) {
            console.error("Error fetching products:", error);
            Toaster.error("Failed to load products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleProductDataChange = async (selectedOption) => {
        console.log("selectedOption", selectedOption, 'coed =-=-= ', selectedOption?.fitting_Code)
        setSourceProductID(selectedOption?.id)
        setSourceDesc(selectedOption?.value)
        setSourceCode(selectedOption?.fitting_Code)
        setSelectedProduct(selectedOption);
        setProductFormData(selectedOption);

        if (selectedOption?.id) {
            try {

                const productIds = [selectedOption.id];

                // Remove duplicates (safe if later you allow multiple)
                const uniqueProductIds = [...new Set(productIds)];

                const res = await checkProductsInInventoryApi({
                    product_ids: uniqueProductIds,
                });

                setAvailableQty(res?.data?.products[0]?.inventoryDetails?.available_quantity || 0);
            } catch (err) {
                console.error("Error fetching inventory:", err);
                setAvailableQty(0);
            }
        } else {
            setAvailableQty(0);
        }
    };

    const handleDestinationProductDataChange = async (selectedOption) => {
        setDestProductID(selectedOption?.id)
        setDestDesc(selectedOption?.value)
        setDestCode(selectedOption?.fitting_Code)
        setSelectedDestProduct(selectedOption)
        // setSelectedProduct(selectedOption);
        setProductFormData(selectedOption);

        if (selectedOption?.id) {
            try {

                const productIds = [selectedOption.id];

                // Remove duplicates (safe if later you allow multiple)
                const uniqueProductIds = [...new Set(productIds)];

                const res = await checkProductsInInventoryApi({
                    product_ids: uniqueProductIds,
                });

                setAvailableDestQty(res?.data?.products[0]?.inventoryDetails?.available_quantity || 0);
            } catch (err) {
                console.error("Error fetching inventory:", err);
                setAvailableDestQty(0);
            }
        } else {
            setAvailableDestQty(0);
        }
    };

    // **Debounce Function (Delays API call until user stops typing)**
    const debounceSearch = (query) => {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            fetchProductSearchResults(query);
        }, 500); // 500ms delay
    };

    const handleSearch = (inputValue) => {
        setSearchTerm(inputValue);
        if (inputValue.length > 1) {
            debounceSearch(inputValue)
        }
    };

    const handleDestinationSearch = (inputValue) => {
        setSearchDestinationTerm(inputValue);
        if (inputValue.length > 1) {
            debounceSearch(inputValue)
        }
    };


    // Dummy product list
    const products = [
        { desc: "BR BSP Elbow 90°", code: "BR-BSP-1/2x1/4-M90" },
        { desc: "Straight Pipe", code: "SP-0404-M90-WF" },
        { desc: "Nut", code: "Nut-S40-1/2" },
        { desc: "Nail", code: "Nail-S04-WF" },
        { desc: "SP JIC Elbow", code: "SP-JIC-1/2-14-WF" },
        { desc: "Rubber Pipe", code: "RP-0808-M90-WF" },
    ];

    // Add Source Item
    const handleAddSource = () => {
        console.log(sourceDesc, sourceCode, sourceQty)
        if (sourceProductID && sourceDesc && sourceCode && sourceQty) {
            setSourceRows([
                ...sourceRows,
                { product_id: sourceProductID, desc: sourceDesc, code: sourceCode, qty: sourceQty },
            ]);
            setSourceDesc("");
            setSourceCode("");
            setSourceQty("");
            setSelectedProduct(null);
        }
    };

    // Add Destination Item
    const handleAddDest = () => {
        if (destProductID && destDesc && destCode && destQty) {
            setDestRows([
                ...destRows,
                { product_id: destProductID, desc: destDesc, code: destCode, qty: destQty },
            ]);
            setDestDesc("");
            setDestCode("");
            setDestQty("");
            setSelectedDestProduct(null);
        }
    };

    // Delete Source Row
    const handleDeleteSource = (index) => {
        const updatedRows = sourceRows?.filter((_, i) => i !== index);
        setSourceRows(updatedRows);
    };

    // Delete Destination Row
    const handleDeleteDest = (index) => {
        const updatedRows = destRows?.filter((_, i) => i !== index);
        setDestRows(updatedRows);
    };

    const handleTransfer = async () => {
        setTransferLoading(true);

        if (sourceRows.length === 0 || destRows.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Selection Required",
                text: "Please select at least one item in both Source and Destination!",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
            setTransferLoading(false);
            return;
        }

        const sourcePayload = sourceRows?.map((row) => ({
            product_id: row?.product_id, // use _id if available
            quantity: row?.qty,
            type: "source",
            created_by: authData?.user?._id,
            narration: narration
        }));

        const destPayload = destRows?.map((row) => ({
            product_id: row?.product_id, // use _id if available
            quantity: row.qty,
            type: "destination",
            created_by: authData?.user?._id,
            narration: narration
        }));

        const payload = [...sourcePayload, ...destPayload];

        console.log("TRANSFER PAYLOAD:", payload);

        const res = await updateStockJournalLogAndInventory(payload)

        console.log("response is here", res)


        // simulate API
        // await new Promise((res) => setTimeout(res, 2000));

        setTransferLoading(false);
        setSourceRows([]);
        setDestRows([]);
        setNarration("")
    }

    useEffect(() => {
        fetchProductAllList();
    }, []);

    return (
        <>
            {loading && <Loader visible={loading} />}
            {transferLoading && <div className="loader-overlay"><TransferLoader /></div>}
            <div className="stock-journal">
                <h2 className="title">STOCK JOURNAL</h2>

                {/* Voucher Details */}
                <div className="voucher-section">
                    <div>
                        <label>Voucher No:</label>
                        <input type="text" placeholder="Enter voucher no" />
                    </div>
                    <div>
                        <label>Date:</label>
                        <input type="date" />
                    </div>
                </div>

                <h3 className="subtitle">Transfer of Materials</h3>

                <div className="input-section">
                    {/* Source */}
                    <div className="source">
                        <h4 >Source (Consumption)</h4>
                        <Select
                            options={searchTerm ? productOption : []}
                            placeholder="Search product by name or code ..."
                            isLoading={loading}
                            value={selectedProduct}
                            onChange={handleProductDataChange}
                            onInputChange={handleSearch}
                            noOptionsMessage={() => "No matching products found"}
                            isClearable
                            menuIsOpen={!!searchTerm}

                        />


                        <div style={{ marginTop: "10px", position: "relative" }}>
                            <input
                                type="number"
                                value={sourceQty}
                                onChange={(e) => setSourceQty(e.target.value)}
                                placeholder="Quantity"
                                style={{
                                    width: "100%",
                                    paddingRight: "100px", // leave space for the indicator
                                    boxSizing: "border-box",
                                }}
                            />

                            {selectedProduct && (
                                <div
                                    className="qty-indicator-box"
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        width: "80px",
                                    }}
                                >
                                    {Number(availableQty) > 0 ? (
                                        <>
                                            {/* Quantity number */}
                                            <span
                                                style={{
                                                    fontWeight: "600",
                                                    fontSize: "13px",
                                                    minWidth: "24px",
                                                    textAlign: "right",
                                                    color: "#333",
                                                }}
                                            >
                                                {availableQty}
                                            </span>

                                            {/* Progress bar */}
                                            <div
                                                style={{
                                                    flex: 1,
                                                    height: "8px",
                                                    background: "#eee",
                                                    borderRadius: "4px",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: `${Math.min(availableQty, 100)}%`,
                                                        height: "100%",
                                                        background: "#4caf50",
                                                        transition: "width 250ms ease",
                                                    }}
                                                ></div>
                                            </div>
                                        </>
                                    ) : (
                                        <span
                                            style={{
                                                color: "#d32f2f",
                                                fontWeight: 600,
                                                fontSize: "12px",
                                            }}
                                        >
                                            N/A in Inventory
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>


                        <button className="add-btn" onClick={handleAddSource}>
                            + Add Source
                        </button>

                        <table className="side-table">
                            <thead>
                                <tr>
                                    <th>Name of Item</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sourceRows?.map((row, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div className="two-line">
                                                <div>{row.desc}</div>
                                                <div className="code">{row.code}</div>
                                            </div>
                                        </td>
                                        <td>{row.qty}</td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteSource(i)}
                                                style={{
                                                    backgroundColor: "red",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    padding: "5px 8px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="divider-stock-journal"></div>

                    {/* Destination */}
                    <div className="dest">
                        <h4>Destination (Production)</h4>
                        <Select
                            options={searchDestinationTerm ? productDestinationOption : []}
                            placeholder="Search product by name or code ..."
                            isLoading={loading}
                            value={selectedDestProduct}
                            onChange={handleDestinationProductDataChange}
                            onInputChange={handleDestinationSearch}
                            noOptionsMessage={() => "No matching products found"}
                            isClearable
                            menuIsOpen={!!searchDestinationTerm}

                        />
                        {/* <input
                            style={{ marginTop: '10px' }}
                            type="number"
                            value={destQty}
                            onChange={(e) => setDestQty(e.target.value)}
                            placeholder="Quantity"
                        /> */}
                        <div style={{ marginTop: "10px", position: "relative" }}>
                            <input
                                type="number"
                                value={destQty}
                                onChange={(e) => setDestQty(e.target.value)}
                                placeholder="Quantity"
                                style={{
                                    width: "100%",
                                    paddingRight: "100px", // leave space for the indicator
                                    boxSizing: "border-box",
                                }}
                            />

                            {selectedDestProduct && (
                                <div
                                    className="qty-indicator-box"
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        width: "80px",
                                    }}
                                >
                                    {Number(availableDestQty) > 0 ? (
                                        <>
                                            {/* Quantity number */}
                                            <span
                                                style={{
                                                    fontWeight: "600",
                                                    fontSize: "13px",
                                                    minWidth: "24px",
                                                    textAlign: "right",
                                                    color: "#333",
                                                }}
                                            >
                                                {availableDestQty}
                                            </span>

                                            {/* Progress bar */}
                                            <div
                                                style={{
                                                    flex: 1,
                                                    height: "8px",
                                                    background: "#eee",
                                                    borderRadius: "4px",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: `${Math.min(availableDestQty, 100)}%`,
                                                        height: "100%",
                                                        background: "#4caf50",
                                                        transition: "width 250ms ease",
                                                    }}
                                                ></div>
                                            </div>
                                        </>
                                    ) : (
                                        <span
                                            style={{
                                                color: "#d32f2f",
                                                fontWeight: 600,
                                                fontSize: "12px",
                                            }}
                                        >
                                            N/A in Inventory
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>


                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button className="add-btn" onClick={handleAddDest}>
                                + Add Destination
                            </button>
                            <span className="text-gray-700" >
                                If Product not available in inventory or system?{" "}
                                <a
                                    href="/addnewproduct"
                                    className="text-blue-500 font-medium hover:underline"
                                >
                                    Create New
                                </a>
                            </span>
                        </div>

                        <table className="side-table">
                            <thead>
                                <tr>
                                    <th>Name of Item</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {destRows?.map((row, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div className="two-line">
                                                <div>{row.desc}</div>
                                                <div className="code">{row.code}</div>
                                            </div>
                                        </td>
                                        <td>{row.qty}</td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteDest(i)}
                                                style={{
                                                    backgroundColor: "red",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    padding: "5px 8px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Narration */}
                <div className="narration mt-4">
                    <label className="block font-medium mb-1">Narration:</label>
                    <textarea
                        rows="3"
                        placeholder="Enter narration..."
                        value={narration}
                        onChange={(e) => setNarration(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <hr className="my-6 border-gray-400" />

                <div className="transfer-stock-container">
                    <button className="transfer-stock-btn" onClick={handleTransfer}>
                        Transfer Stock
                    </button>
                </div>
            </div>
        </>
    );
}




