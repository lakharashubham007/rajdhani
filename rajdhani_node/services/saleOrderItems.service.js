const { SaleOrderItem, Admins } = require("../models");
// const mongoose = require("mongoose");

// Create a new Sale Order Item
const createSaleOrderItem = async (data) => {
  try {
    const newItem = await SaleOrderItem.create(data);
    return newItem;
  } catch (error) {
    console.error("Error creating sale order item:", error);
    throw error;
  }
};

// Get all Sale Order Items
const getSaleOrderItems = async () => {
  try {
    const items = await SaleOrderItem.find();
    return items;
  } catch (error) {
    console.error("Error getting sale order items:", error);
    throw error;
  }
};

// Get Sale Order Items by Sale Order ID
const getSaleOrderItemById = async (id) => {
  try {
    const items = await SaleOrderItem.find({ so_id: id });
    return items;
  } catch (error) {
    console.error("Error getting sale order item by ID:", error);
    throw error;
  }
};

// Update a Sale Order Item by ID
const updateSaleOrderItem = async (id, updateData) => {
  try {
    const updatedItem = await SaleOrderItem.findByIdAndUpdate(id, updateData, { new: true });
    return updatedItem;
  } catch (error) {
    console.error("Error updating sale order item:", error);
    throw error;
  }
};

// Delete a Sale Order Item by ID
const deleteSaleOrderItem = async (id) => {
  try {
    const deletedItem = await SaleOrderItem.findByIdAndDelete(id);
    return deletedItem;
  } catch (error) {
    console.error("Error deleting sale order item:", error);
    throw error;
  }
};

// Update Specific Sale Order Items
const updateSpecificSaleOrderItems = async (id, itemsToUpdate) => {
  try {
    let updatedItems = [];

    for (const item of itemsToUpdate) {
      const updatedItem = await SaleOrderItem.findOneAndUpdate(
        { _id: item._id, so_id: id }, // Match document
        { $set: item }, // Update only provided fields
        { new: true } // Return the updated document
      );

      if (updatedItem) {
        updatedItems.push(updatedItem); // Add updated document to the result list
      }
    }
    return updatedItems; // Return all updated items
  } catch (error) {
    console.error("Error updating specific sale order items:", error);
    throw error;
  }
};

// const verifySaleOrderItems = async (so_id, itemIds, userId) => {
//   try {
//     const result = await SaleOrderItem.updateMany(
//       { _id: { $in: itemIds } },
//       {
//         $set: {
//           isVerified: true,
//           isVerifiedBy: userId,
//         },
//       }
//     );

//     return result;
//   } catch (error) {
//     console.error("Error in verifying sale order items:", error);
//     throw error;
//   }
// };

const verifySaleOrderItems = async (so_id, itemIds, userId) => {
  try {
    if (!so_id || !Array.isArray(itemIds)) {
      throw new Error('Invalid input');
    }

    // Fetch any one item to get the createdBy field (they all share same so_id)
    const sampleItem = await SaleOrderItem.findOne({ so_id }).lean();

    if (!sampleItem) {
      return new Error('Sale order item not found.');
    }

    // Prevent the creator from verifying
    if (sampleItem.createdBy.toString() === userId.toString()
    ) {
    //userId.toString()) { 674668cf82ff5f6473104454
      return { success: false, message: 'You are not allowed to verify items.'}
    }

    const verifyResult = await SaleOrderItem.updateMany(
      {
        _id: { $in: itemIds },
        so_id,
      },
      {
        $set: {
          isVerified: true,
          isVerifiedBy: userId,
        },
      }
    );

    const unverifyResult = await SaleOrderItem.updateMany(
      {
        so_id,
        _id: { $nin: itemIds },
      },
      {
        $set: {
          isVerified: false,
          isVerifiedBy: userId,
        },
      }
    );

    const totalSOItems = await SaleOrderItem.countDocuments({ so_id });

    const user = await Admins.findById(userId).select('firstName lastName');

    return {
      success: true,
      verifiedItemsCount: verifyResult.modifiedCount,
      unverifiedItemsCount: unverifyResult.modifiedCount,
      totalSOItems,
      verifiedBy: `${user.firstName} ${user.lastName}` || 'Unknown',
    };

  } catch (error) {
    console.error('verifySaleOrderItems error:', error);
    throw error;
  }
};

// Get all Sale Orders by Customer ID
const getSaleOrderItemsBySOId = async (SOId) => {
  try {
    const saleOrders = await SaleOrderItem.find({ so_id: SOId }).populate([
      { path: 'product_id' }
    ]);
    console.log(saleOrders)
    return saleOrders;
  } catch (error) {
    console.error("Error fetching sale orders by customer ID:", error);
    throw error;
  }
};


module.exports = {
  createSaleOrderItem,
  getSaleOrderItems,
  getSaleOrderItemById,
  updateSaleOrderItem,
  deleteSaleOrderItem,
  updateSpecificSaleOrderItems,
  verifySaleOrderItems,
  getSaleOrderItemsBySOId
};
