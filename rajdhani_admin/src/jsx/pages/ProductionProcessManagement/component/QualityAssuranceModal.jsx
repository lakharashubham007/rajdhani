import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from "sweetalert2";

const defaultCheckPoints = [
    "Default Hose brand verified as per Production Sheet.",
    "Hose size and type matched with Production Sheet.",
    "Hose length confirmed as per Production Sheet.",
    "Cutting angle maintained at 90° ± 3° tolerance."

];

const QualityAssuranceModal = ({ show, onClose, stage, checkPointsQA, onFinalize }) => {
    const [checkPoints, setCheckPoints] = useState([]);
    const [selectAll, setSelectAll] = useState(true);

    useEffect(() => {
        const pointsToUse = Array.isArray(checkPointsQA) && checkPointsQA.length > 0
            ? checkPointsQA
            : defaultCheckPoints;

        setCheckPoints(pointsToUse.map(point => ({ label: point, checked: true })));
        // setCheckPoints(checkPointsQA?.map(point => ({ label: point, checked: true })));
        setSelectAll(true);
    }, [show]);

    const handleCheckChange = (index) => {
        const updated = [...checkPoints];
        updated[index].checked = !updated[index].checked;
        setCheckPoints(updated);

        // Update selectAll based on check status
        const allChecked = updated.every(item => item.checked);
        setSelectAll(allChecked);
    };

    const handleSelectAll = () => {
        const updated = checkPoints.map(item => ({ ...item, checked: true }));
        setCheckPoints(updated);
        setSelectAll(true);
    };

    const handleFinalize = () => {
        const unchecked = checkPoints.filter(item => !item.checked);
        if (unchecked.length > 0) {
            Swal.fire({
                icon: 'info',
                title: 'All checks must be completed',
                text: 'Please verify all quality checks before finalizing.',
            });
            return;
        }
        onFinalize(); // Trigger parent action
        onClose();    // Close modal
    };

    return (
        <Modal show={show} onHide={onClose} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title>Quality Assurance - {stage}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="mb-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Checkpoints</h5>
                    <Button variant="outline-primary" onClick={handleSelectAll} size="sm">
                        Select All
                    </Button>
                </div>
                <Form>
                    {checkPoints.map((item, index) => (
                        <Form.Check
                            key={index}
                            type="checkbox"
                            label={item.label}
                            checked={item.checked}
                            onChange={() => handleCheckChange(index)}
                            className="mb-2"
                        />
                    ))}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleFinalize}>
                    Finalize Step
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default QualityAssuranceModal;
