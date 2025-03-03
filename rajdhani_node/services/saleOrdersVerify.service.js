const { BatchAllocation, StockMaintenance, StockArchive, Inventory } = require("../models");


// Verify a Sale Order
const verifySaleOrder = async (data) => {
  try {
    // Step 1: Extract all product IDs from the data array
    const productIds = data.map(item => item.product_id);

    // Step 2: Fetch all StockMaintenance entries matching the extracted product IDs
    const stockEntries = await StockMaintenance.find({ product_id: { $in: productIds } });

    const batchAllocations = [];

    // Step 3: Allocate stock for each order item
    for (const orderItem of data) {
      let remainingQuantity = orderItem.quantity;
      const productStockEntries = stockEntries.filter(entry => entry.product_id.toString() === orderItem.product_id);

      for (const stockEntry of productStockEntries) {
        if (remainingQuantity <= 0) break;

        // Determine how much can be allocated from this stock entry
        const allocatedQty = Math.min(stockEntry.remaining_qty, remainingQuantity);

        // Check if this stock entry will be fully depleted
        const isArchived = (allocatedQty === stockEntry.remaining_qty);

        // Create Batch Allocation entry
        batchAllocations.push({
          so_id: orderItem.so_id,
          stock_id: stockEntry._id, // Assigning stock entry ID
          product_id: orderItem.product_id,
          quantity: allocatedQty,
          is_archived: isArchived
        });

        // Update remaining quantity to be allocated
        remainingQuantity -= allocatedQty;
      }

      // Step 4: Log warning if stock is insufficient
      if (remainingQuantity > 0) {
        console.warn(`Warning: Not enough stock available for product_id: ${orderItem.product_id}. Remaining unallocated quantity: ${remainingQuantity}`);
      }
    }

    // Step 5: Insert batch allocations into BatchAllocation table
    if (batchAllocations.length > 0) {
      await BatchAllocation.insertMany(batchAllocations);
      console.log("Batch allocations created successfully:", batchAllocations);
    } else {
      console.warn("No batch allocations were created.");
    }

    // Step 6: Extract stock_ids where is_archived: true
    const archivedStockIds = batchAllocations
      .filter(item => item.is_archived === true)
      .map(item => item.stock_id);

    if (archivedStockIds.length === 0) {
      console.log("No archived stock entries found.");
      return;
    }

    // Step 7: Fetch archived stock entries from StockMaintenance
    const archivedStockEntries = await StockMaintenance.find({ _id: { $in: archivedStockIds } });

    // Step 8: Format archived stock entries
    const formattedArchivedStock = archivedStockEntries.map(archivedEntry => ({
      lot_id: archivedEntry.lot_id,
      product_id: archivedEntry.product_id,
      bill_id: archivedEntry.bill_id || null,
      po_so_id: archivedEntry.po_so_id,
      order_type_ref: archivedEntry.order_type_ref,
      order_type: archivedEntry.order_type,
      original_quantity: archivedEntry.original_quantity,
      used_qty: archivedEntry.used_qty,
      remaining_qty: archivedEntry.remaining_qty
    }));

    // Step 9: Format upcoming data
    const formattedUpcomingData = data.map(entry => ({
      lot_id: null, // No lot_id in the upcoming data
      product_id: entry.product_id,
      bill_id: null, // No bill_id in upcoming data
      po_so_id: entry.so_id,
      order_type_ref: entry.order_type_ref,
      order_type: entry.order_type,
      original_quantity: entry.quantity,
      used_qty: 0, // Newly allocated, so used_qty is 0
      remaining_qty: entry.quantity // Entire quantity is remaining initially
    }));

    // Step 10: Merge archived and upcoming stock entries
    const stockArchiveEntries = [...formattedArchivedStock, ...formattedUpcomingData];

    // Step 11: Insert formatted stock data into StockArchive
    if (stockArchiveEntries.length > 0) {
      const result = await StockArchive.insertMany(stockArchiveEntries);
      console.log("result", result);
    } else {
      console.warn("No StockArchive entries were created.");
    }

    // Step 12: Delete archived stock entries from StockMaintenance
    if (archivedStockIds.length > 0) {
      const deleteResult = await StockMaintenance.deleteMany({ _id: { $in: archivedStockIds } });
      console.log(`Deleted ${deleteResult.deletedCount} archived stock entries from StockMaintenance.`);
    }

    // Step 13: Update inventory table for each product
    await Promise.all(
      data.map(async (item) => {
        // Fetch all stock entries for the same product_id
        const stockRecords = await StockMaintenance.find({ product_id: item.product_id });

        // Calculate total remaining_qty for the product
        const totalRemainingQty = stockRecords.reduce((sum, record) => sum + record.remaining_qty, 0);

        // Update or create the inventory entry
        const existingInventory = await Inventory.findOne({ product_id: item.product_id });
        
        if (existingInventory) {
          // Update total_quantity in inventory
          existingInventory.total_quantity = totalRemainingQty;
          console.log("existingInventory 2", existingInventory.total_quantity, totalRemainingQty)
          await existingInventory.save();
        }
      })
    );
  } catch (error) {
    console.error("Error creating sale order:", error);
    throw error;
  }
};


module.exports = {
  verifySaleOrder,
};