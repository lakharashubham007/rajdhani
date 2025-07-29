// /services/product/product.utils.js

const buildFilters = (params) => {
  const {
    isDeleted,
    status,
    date_from,
    date_to,
    product_types,
    parts,
    wire_types,
    ferrules,
    fitting_dash_sizes,
    hose_dash_sizes,
    fitting_threads,
    bend_angles,
    fitting_pieces,
    skive_types,
    designs,
    brands,
    materials,
  } = params;

  const filter = {
    isDeleted: isDeleted === "true" || isDeleted === true || false,
  };

  const inFilterMap = [
    { key: 'part', value: parts },
    { key: 'wire_type', value: wire_types },
    { key: 'ferrule', value: ferrules },
    { key: 'fitting_dash_size', value: fitting_dash_sizes },
    { key: 'hose_dash_size', value: hose_dash_sizes },
    { key: 'fitting_thread', value: fitting_threads },
    { key: 'straight_bend_angle', value: bend_angles },
    { key: 'fitting_piece', value: fitting_pieces },
    { key: 'skive_type', value: skive_types },
    { key: 'design', value: designs },
    { key: 'brand', value: brands },
    { key: 'material', value: materials },
  ];

  inFilterMap.forEach(({ key, value }) => {
    if (typeof value === 'string') {
      const values = value.split(',').map(v => decodeURIComponent(v.trim())).filter(Boolean);
      if (values.length) filter[key] = { $in: values };
    }
  });

  // Special product_type filter
  if (product_types) {
    const values = product_types.split(',').map(v => decodeURIComponent(v.trim()));
    if (values.length) {
      filter.$or = [
        { product_type: { $in: values } },
        { part: { $in: values } }
      ];
    }
  }

  if (status !== undefined && status !== "") {
    filter.status = status === "true" || status === true;
  }

  // Date range filter
  if (date_from || date_to) {
    const created_at = {};
    if (date_from) {
      const from = new Date(date_from);
      if (!isNaN(from)) created_at.$gte = from;
    }
    if (date_to) {
      const to = new Date(date_to);
      if (!isNaN(to)) {
        to.setHours(23, 59, 59, 999);
        created_at.$lte = to;
      }
    }
    if (Object.keys(created_at).length) {
      filter.created_at = created_at;
    }
  }

  return filter;
};

const buildSortOptions = (sort_by = "created_at", sort_order = "desc") => {
  const sort = {};

  if (typeof sort_by === 'string' && sort_by.includes(':')) {
    const [field, order] = sort_by.split(':');
    sort[field] = order === 'dsc' ? -1 : 1;
  } else {
    switch (sort_by) {
      case "Last Month":
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        sort.created_at = -1;
        break;
      case "Last 7 Days":
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sort.created_at = -1;
        break;
      case "Recently Added":
        sort.created_at = -1;
        break;
      case "Ascending":
        sort.product_code = 1;
        break;
      case "Descending":
        sort.product_code = -1;
        break;
      default:
        sort[sort_by] = sort_order === 'desc' ? -1 : 1;
    }
  }

  return sort;
};

module.exports = {
  buildFilters,
  buildSortOptions,
};
