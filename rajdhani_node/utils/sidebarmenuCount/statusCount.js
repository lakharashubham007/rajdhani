const { ProductionSheetDetails } = require("../../models");

const getStatusCounts = async () => {
  const aggregation = await ProductionSheetDetails.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const result = {
    Pending: 0,
    "In Progress": 0,
    Completed: 0,
    Total: 0,
  };

  for (const item of aggregation) {
    result[item._id] = item.count;
    result.Total += item.count;
  }

  return result;
};

module.exports = {
  getStatusCounts,
};
