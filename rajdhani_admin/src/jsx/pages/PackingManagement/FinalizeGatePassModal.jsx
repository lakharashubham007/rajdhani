import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

const FinalizeGatePassModal = ({ show, onHide, selectedRowData, onSubmit }) => {
    const [formData, setFormData] = useState({
        packed_date: "",
        total_bags: "",
        total_roll: "",
        total_weight: "",
        total_qty_pc: "",
        total_qty_mtr: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                packingDetails_id: selectedRowData?._id, // ensure you pass it
                product_id: selectedRowData?.product_id?._id,
                packing: selectedRowData?.packing || [],
                operator_id: selectedRowData?.operator_id || [],
                operator_name: selectedRowData?.operator_name || [],
                ...formData,
            };

            console.log("🚀 Finalize Payload:", payload);

            // 🔥 Call your API
            await axios.put(`/api/packingDetails/update`, payload);

            Swal.fire({
                icon: "success",
                title: "Gate Pass Finalized",
                text: "Packing details updated successfully!",
            });

            onHide();
        } catch (error) {
            console.error("❌ Error updating packing details:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to finalize gate pass",
            });
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // call parent function with data
        onHide();
    };

    return (
        <Modal
            centered
            show={show}
            onHide={onHide}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add All Packing Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="packed_date"
                            value={formData.packed_date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Total Bags</label>
                        <input
                            type="number"
                            className="form-control"
                            name="total_bags"
                            value={formData.total_bags}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Total Roll</label>
                        <input
                            type="number"
                            className="form-control"
                            name="total_roll"
                            value={formData.total_roll}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Total Weight</label>
                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            name="total_weight"
                            value={formData.total_weight}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Total Qty (PCS)</label>
                        <input
                            type="number"
                            className="form-control"
                            name="total_qty_pc"
                            value={formData.total_qty_pc}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Total Qty (MTR)</label>
                        <input
                            type="number"
                            className="form-control"
                            name="total_qty_mtr"
                            value={formData.total_qty_mtr}
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleFormSubmit}>
          Finalize Packing & Request GatePass
        </Button> */}
                {/* <Button
                    onClick={onHide}
                    style={{
                        backgroundColor: "#f44336", // red for cancel
                        border: "none",
                        color: "#fff",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#d32f2f")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#f44336")}
                >
                    Cancel
                </Button>

                <Button
                    onClick={handleFormSubmit}
                    style={{
                        backgroundColor: "#4CAF50", // green for success
                        border: "none",
                        color: "#fff",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#388E3C")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
                >
                    Finalize & Request GatePass
                </Button> */}

                <Button
                    onClick={onHide}
                    style={{
                        background: "linear-gradient(90deg, #FF6B6B, #FF4C4C)",
                        color: "white",
                        padding: "10px 24px",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease-in-out",
                        boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
                    }}
                    onMouseOver={(e) => {
                        e.target.style.background =
                            "linear-gradient(90deg, #FF4C4C, #E63946)";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0px 6px 12px rgba(0,0,0,0.2)";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background =
                            "linear-gradient(90deg, #FF6B6B, #FF4C4C)";
                        e.target.style.transform = "translateY(0px)";
                        e.target.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.15)";
                    }}
                >
                    Cancel
                </Button>


                <Button
                    onClick={handleFormSubmit}
                    style={{
                        background: "linear-gradient(90deg, #4CAF50, #388E3C)", // Green for success
                        color: "white",
                        padding: "10px 24px",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease-in-out",
                        boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
                    }}
                    onMouseOver={(e) => {
                        e.target.style.background = "linear-gradient(90deg, #43A047, #2E7D32)";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0px 6px 12px rgba(0,0,0,0.2)";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background = "linear-gradient(90deg, #4CAF50, #388E3C)";
                        e.target.style.transform = "translateY(0px)";
                        e.target.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.15)";
                    }}
                >
                    Finalize & Request GatePass
                </Button>


            </Modal.Footer>
        </Modal>
    );
};

export default FinalizeGatePassModal;
