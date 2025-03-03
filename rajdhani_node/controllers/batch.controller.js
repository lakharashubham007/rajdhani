const { batchService } = require("../services");

// Create a new Batch
const createBatch = async (req, res) => {
    try {
        const batch = await batchService.createBatch(req.body);
        res.json({ success: true, batch: batch, message: 'Batch created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all Batches
const getAllBatches = async (req, res) => {
    try {
        const batches = await batchService.getAllBatches();
        res.json({ success: true, batches });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get Batches with pagination, sorting, and search
const getBatches = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
        const sort = req.query.sort || 'created_at'; // Default sorting by created_at
        const search = req.query.search || ''; // Default empty search
        const batches = await batchService.getBatches(page, limit, sort, search);
        res.json({ success: true, batches: batches });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get a single Batch by ID
const getBatchById = async (req, res) => {
    try {
        const batch = await batchService.getBatchById(req.params.id);
        if (!batch) {
            return res.status(404).json({ success: false, message: 'Batch not found' });
        }
        res.json({ success: true, batch: batch });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update a Batch
const updateBatch = async (req, res) => {
    try {
        const updateData = {};

        if (req.body.lot_no) {
            updateData.lot_no = req.body.lot_no;
        }
        if (req.body.po_id) {
            updateData.po_id = req.body.po_id;
        }
        if (req.body.bill_id) {
            updateData.bill_id = req.body.bill_id;
        }
        if (req.body.created_by) {
            updateData.created_by = req.body.created_by;
        }

        updateData.updated_at = Date.now();

        const batch = await batchService.updateBatch(req.params.id, updateData);

        if (!batch) {
            return res.status(404).json({ success: false, message: 'Batch not found' });
        }
        res.json({ success: true, batch: batch, message: 'Batch updated successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete a Batch by ID
const deleteBatch = async (req, res) => {
    try {
        const batch = await batchService.deleteBatch(req.params.id);
        if (!batch) {
            return res.status(404).json({ success: false, message: 'Batch not found' });
        }
        res.json({ success: true, message: 'Batch deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const updateBatchStatus = async (req, res) => {
    try {
      const batchId = req.params.id;
      const status = req.body.status; // Expecting { "status": true } or { "status": false }
      const updatedBatch = await batchService.updateBatchStatus(batchId, status);
  
      if (!updatedBatch) {
        return res.status(404).json({ success: false, message: 'Batch not found' });
      }
  
      res.json({
        success: true,
        batch: updatedBatch,
        message: 'Batch status updated successfully!'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

module.exports = {
    createBatch,
    getAllBatches,
    getBatches,
    getBatchById,
    updateBatch,
    deleteBatch,
    updateBatchStatus
};
