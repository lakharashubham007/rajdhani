import { signUp } from "../AuthService"; // Load environment variables

// Define the base URL for the API from .env
const BASE_URL = 'https://api.i2rtest.in/v1';
// const BASE_URL = 'http://localhost:8087/v1';
//updated

// Define the base URL for the API
// const BASE_URL = 'http://localhost:8087/v1';

// Define the endpoints
const apis = {
    baseurl: {
        Baseimageurl: `http://localhost:8087/v1/get-Images/image/` || `https://api.i2rtest.in/v1/get-Images/image/`
    },
    auth: {
        login: `${BASE_URL}/auth/login`,
        signUp: `${BASE_URL}/auth/register`,
        restaurant: `${BASE_URL}/auth/login-restaurant`
    },
    sidemenu: { sidebarmenu: `${BASE_URL}/menus/sidebar-menus` },
    permission: { permission: `${BASE_URL}/permission/permissions` },
    roles: {
        role: `${BASE_URL}/private/role/create-role`,
        rolesList: `${BASE_URL}/private/role/roles-list`,
        getById: `${BASE_URL}/public/role/roles-list`
    },
    zones: {
        AddZone: `${BASE_URL}/zones/add/zone`,
        zoneList: `${BASE_URL}/zones/zone/list`
    },
    employee: {
        createEmployee: `${BASE_URL}/auth/register`,
        employeeList: `${BASE_URL}/auth/admins`
    },
    cuisines: {
         addCuisines: `${BASE_URL}/auth/register`,
        cuisineList: `${BASE_URL}/cuisines/cusine-list`
    },
    restaurants: {
        addRestaurant: `${BASE_URL}/restaurant/add/restaurants`,
        restaurantsList: `${BASE_URL}/restaurant/restaurant-list`
    },
    categories: {
        addCategory: `${BASE_URL}/private/category/create-category`,
        categoriesList: `${BASE_URL}/private/category/category-list`,
        deleteCategorie:`${BASE_URL}/private/category/delete-category`,
        getCategoryById:`${BASE_URL}/private/category/category-list`,
        updateCategory:`${BASE_URL}/private/category/edit-category`,       
        updateCategoryStatus:`${BASE_URL}/private/category/update-category-status`,

        getAllCategoriesListApi: `${BASE_URL}/private/category/categories`,
        
        // Sub Category
        getAllCategoryList: `${BASE_URL}/private/category/category-list`,
        addSubcategory: `${BASE_URL}/private/category/create-subcategory`,
        subCategoriesList: `${BASE_URL}/private/category/subcategory-list`,
        deleteSubCategorie:`${BASE_URL}/private/category/delete-subcategory`,
        getSubCategoryById:`${BASE_URL}/private/category/subcategory-list`,
        updateSubCategory:`${BASE_URL}/private/category/edit-subcategory`,  
        
        getAllSubCategoriesListApi: `${BASE_URL}/private/category/subcategories`,
        
        // Sub Sub Category
        addSubSubcategory: `${BASE_URL}/private/category/create-subsubcategory`,
        subSubCategoriesList: `${BASE_URL}/private/category/subsubcategory-list`,
        deleteSubSubCategorie:`${BASE_URL}/private/category/delete-subsubcategory`,
        getSubSubCategoryById:`${BASE_URL}/private/category/subsubcategory-list`,
        updateSubSubCategory:`${BASE_URL}/private/category/edit-subsubcategory`,

        getAllSubSubCategoriesListApi: `${BASE_URL}/private/category/subsubcategories`,
    },

    addOns: {
        addAddons: `${BASE_URL}/addons/create-addon`,
        addOnsList: `${BASE_URL}/addons/addons-list`
    },
    food: {
        addFood: `${BASE_URL}/food/create-food`,
        foodList: `${BASE_URL}/food/food-list`,
        foodListById: `${BASE_URL}/food/food-item`,
        foodByRestaurantId: `${BASE_URL}/food/food-itemid`

    },
    vendor: {
        createVendor: `${BASE_URL}/private/vendor/create-vendor`,
    },

    brands: {
       addBrand: `${BASE_URL}/private/brand/create-brand`,
       brandList: `${BASE_URL}/private/brand/brand-list`,
       deleteBrand:`${BASE_URL}/private/brand/delete-brand`,
       getEditBrandData: `${BASE_URL}/private/brand/brand-list`,
       updateBrand: `${BASE_URL}/private/brand/edit-brand`,
       updateBrandStatus:`${BASE_URL}/private/brand/update-brand-status`,

       getAllBrandList: `${BASE_URL}/private/brand/brands`,
   },

   fittingSize: {
    addFittingSize: `${BASE_URL}/private/fittingsizes/create-fitting-size`,
    fittingSizeList: `${BASE_URL}/private/fittingsizes/fitting-size-list`,
    deleteFittingSize:`${BASE_URL}/private/fittingsizes/delete-fitting-size`,
    getEditFittingSizeData: `${BASE_URL}/private/fittingsizes/fitting-size-list`,
    updateFittingSize: `${BASE_URL}/private/fittingsizes/edit-fitting-size`,
    updateFittingSizeStatus:`${BASE_URL}/private/fittingsizes/update-fitting-size-status`,

    getAllFittingSizeList:`${BASE_URL}/private/fittingsizes/all-fitting-sizes`,

   },

   thread: {
    addThread: `${BASE_URL}/private/threads/create-thread`,
    threadList: `${BASE_URL}/private/threads/thread-list`,
    deleteThread:`${BASE_URL}/private/threads/delete-thread`,
    getEditThreadData: `${BASE_URL}/private/threads/thread-list`,
    updateThread: `${BASE_URL}/private/threads/edit-thread`,
    updateThreadStatus:`${BASE_URL}/private/threads/update-thread-status`,

    getAllThreadList: `${BASE_URL}/private/threads/all-threads`,
   },
   
   material:{
    addMaterial: `${BASE_URL}/private/materials/create-material`,
    materialList: `${BASE_URL}/private/materials/materials-list`,
    deleteMaterial:`${BASE_URL}/private/materials/delete-material`,
    getEditMaterialData: `${BASE_URL}/private/materials/materials-list`,
    updateMaterial: `${BASE_URL}/private/materials/edit-material`,
    updateMaterialStatus:`${BASE_URL}/private/materials/update-material-status`,

    getAllMaterialList: `${BASE_URL}/private/materials/materials-list`,
   },

   product:{
    addProduct: `${BASE_URL}/private/products/create-product`,
    productList: `${BASE_URL}/private/products/get-products`,
    deleteProduct:`${BASE_URL}/private/products/delete-product`,
    getEditProductData: `${BASE_URL}/private/products/get-products`,
    updateProduct: `${BASE_URL}/private/products/edit-product`,
    updateProductStatus:`${BASE_URL}/private/products/update-product-status`,
    getEditProductDetails: `${BASE_URL}/private/products/get-product-details`,
    getAllProductList: `${BASE_URL}/private/products/get-all-products`,
    searchProductForSuggestions: `${BASE_URL}/private/products/search`,
    searchSimilarProducts: `${BASE_URL}/private/products/simibrands`,
    generateQr: `${BASE_URL}/private/products/generateqr`,
   },

   variant:{
    addVariant: `${BASE_URL}/private/variants/create-variant`,
    variantList: `${BASE_URL}/private/variants/variant-list`,
    deleteVariant:`${BASE_URL}/private/variants/delete-variant`,
    getEditVariantData: `${BASE_URL}/private/variants/variant-list`,
    updateVariant: `${BASE_URL}/private/variants/edit-variant`,
    updateVariantStatus:`${BASE_URL}/private/variants/update-variant-status`,
    
    getAllThreadList: `${BASE_URL}/private/variants/all-variants`,
   },

   part:{
    addPart: `${BASE_URL}/private/parts/create-part`,
    partList: `${BASE_URL}/private/parts/parts-list`,
    deletePart:`${BASE_URL}/private/parts/delete-part`,
    getEditPartData: `${BASE_URL}/private/parts/parts-list`,
    updatePart: `${BASE_URL}/private/parts/edit-part`,
    updatePartStatus:`${BASE_URL}/private/parts/update-part-status`,
    
    getAllPartList: `${BASE_URL}/private/parts/parts-list`,
   },

   design:{
    addDesign: `${BASE_URL}/private/design/create-design`,
    designList: `${BASE_URL}/private/design/design-list`,
    deleteDesign:`${BASE_URL}/private/design/delete-design`,
    getEditDesignData: `${BASE_URL}/private/design/design-list`,
    updateDesign: `${BASE_URL}/private/design/edit-design`,
    updateDesignStatus:`${BASE_URL}/private/design/update-design-status`,
    
    getAllDesignList: `${BASE_URL}/private/design/designs`,
   },

   fittingthread:{
    addFittingThread: `${BASE_URL}/private/fittingthreads/create-fitting-thread`,
    fittingThreadList: `${BASE_URL}/private/fittingthreads/fitting-threads-list`,
    deleteFittingThread:`${BASE_URL}/private/fittingthreads/delete-fitting-threads`,
    getEditFittingThreadData: `${BASE_URL}/private/fittingthreads/fitting-thread`,
    updateFittingThread: `${BASE_URL}/private/fittingthreads/edit-fitting-thread`,
    updateFittingThreadStatus:`${BASE_URL}/private/fittingthreads/update-ft-status`,
    
    getAllFittingThreadList: `${BASE_URL}/private/fittingthreads/fitting-threads`,
   },

   hoseDashSize:{
    addHoseDashSize: `${BASE_URL}/private/hosedashsize/create-hosedashsize`,
    hoseDashSizeList: `${BASE_URL}/private/hosedashsize/hosedashsize-list`,
    deleteHoseDashSize:`${BASE_URL}/private/hosedashsize/delete-hosedashsize`,
    getEditHoseDashSizeData: `${BASE_URL}/private/hosedashsize`,
    updateHoseDashSize: `${BASE_URL}/private/hosedashsize/edit-hosedashsize`,
    updateHoseDashSizeStatus:`${BASE_URL}/private/hosedashsize/update-hosedashsize-status`,
    
    getAllHoseDashSizeList: `${BASE_URL}/private/hosedashsize/hosedashsizes`,
   },

   fittingDashSize:{
    addFittingDashSize: `${BASE_URL}/private/fittingdashsize/create-fittingdashsize`,
    fittingDashSizeList: `${BASE_URL}/private/fittingdashsize/fittingdashsize-list`,
    deleteFittingDashSize:`${BASE_URL}/private/fittingdashsize/delete-fittingdashsize`,
    getEditFittingDashSizeData: `${BASE_URL}/private/fittingdashsize`,
    updateFittingDashSize: `${BASE_URL}/private/fittingdashsize/edit-fittingdashsize`,
    updateFittingDashSizeStatus:`${BASE_URL}/private/fittingdashsize/update-fittingdashsize-status`,
    
    getAllFittingDashSizeList: `${BASE_URL}/private/fittingdashsize/fittingdashsizes`,
   },

    bendAngle:{
    addBendAngle: `${BASE_URL}/private/bendangle/create-bendangle`,
    bendAngleList: `${BASE_URL}/private/bendangle/bendangle-list`,
    deleteBendAngle:`${BASE_URL}/private/bendangle/delete-bendangle`,
    getEditBendAngleData: `${BASE_URL}/private/bendangle`,
    updateBendAngle: `${BASE_URL}/private/bendangle/edit-bendangle`,
    updateBendAngleStatus:`${BASE_URL}/private/bendangle/update-bendangle-status`,
    
    getAllBendAngleList: `${BASE_URL}/private/bendangle/bendangles`,
   },
   inventory: {
    checkProductInInventory: `${BASE_URL}/private/inventory/check-products`,
    addItemsInInventory: `${BASE_URL}/private/inventory/add-item`,
    getItemsInventory: `${BASE_URL}/private/inventory/items-inventory`,
    filterInventoryItems: `${BASE_URL}/private/inventory/filter-inventory`
   },
   stocks: {
    addStocksInMaintainenace: `${BASE_URL}/private/stock/add-stocks`,
   },

   brandLayLine:{
    addBrandLayLine: `${BASE_URL}/private/brandlayline/create-brandlayline`,
    brandLayLineList: `${BASE_URL}/private/brandlayline/brandlayline-list`,
    deleteBrandLayLine:`${BASE_URL}/private/brandlayline/delete-brandlayline`,
    getEditBrandLayLineData: `${BASE_URL}/private/brandlayline`,
    updateBrandLayLine: `${BASE_URL}/private/brandlayline/edit-brandlayline`,
    updateBrandLayLineStatus:`${BASE_URL}/private/brandlayline/update-brandlayline-status`,
    
    getAllBrandLayLineList: `${BASE_URL}/private/brandlayline/brandlayline`,
   },

   hoseType:{
    addHoseType: `${BASE_URL}/private/hosetype/create-hosetype`,
    hoseTypeList: `${BASE_URL}/private/hosetype/hosetype-list`,
    deleteHoseType:`${BASE_URL}/private/hosetype/delete-hosetype`,
    getEditHoseTypeData: `${BASE_URL}/private/hosetype`,
    updateHoseType: `${BASE_URL}/private/hosetype/edit-hosetype`,
    updateHoseTypeStatus:`${BASE_URL}/private/hosetype/update-hosetype-status`,
    
    getAllHoseTypeList: `${BASE_URL}/private/hosetype/hosetype`,
   },
   
   supplier:{
    addSupplier: `${BASE_URL}/private/suppliers/create-supplier`,
    supplierList: `${BASE_URL}/private/suppliers/supplier-list`,
    deleteSupplier:`${BASE_URL}/private/suppliers/delete-supplier`,
    getEditSupplierData: `${BASE_URL}/private/suppliers/supplier-list`,
    updateSupplier: `${BASE_URL}/private/suppliers/edit-supplier`,
    updateSupplierStatus:`${BASE_URL}/private/suppliers/update-supplier-status`,
    
    getAllSupplierList: `${BASE_URL}/private/suppliers/all-suppliers`,
   },

   purchaseorder:{
    addPurchaseOrder: `${BASE_URL}/private/purchaseorders/create-purchase-order`,
    createPoItem: `${BASE_URL}/private/purchaseorders/create-po-item`,
    purchase_OrderList: `${BASE_URL}/private/purchaseorders/purchase-order-list`,
    deletePurchaseOrder:`${BASE_URL}/private/suppliers/delete-supplier`,
    getEditPurchaseOrderData: `${BASE_URL}/private/suppliers/supplier-list`,
    updatePurchaseOrder: `${BASE_URL}/private/suppliers/edit-supplier`,
    updatePurchaseOrderStatus:`${BASE_URL}/private/suppliers/update-supplier-status`,
    getPurchaseOrderViewData:`${BASE_URL}/private/purchaseorders/purchase-order-list`,

    getPurchaseOrderItemsData:`${BASE_URL}/private/purchaseorders/po-items`,
    getPurchaseOrderCheckBill:`${BASE_URL}/private/pobills/check-bill`,
    
    getAllPurchaseOrderList: `${BASE_URL}/private/suppliers/all-suppliers`,

    //Bill apis
    addBillDetails: `${BASE_URL}/private/pobills/create-po-bill`,
    updatePOItems: `${BASE_URL}/private/purchaseorders/update-po-items`,
    createBillItems: `${BASE_URL}/private/pobills/create-pob-item`,
    returnOrderList: `${BASE_URL}/private/pobills/return-order-bills`,
    getReturnOrderViewData: `${BASE_URL}/private/pobills/return-orders`,
    updatePurchaseOrderStatus: `${BASE_URL}/private/purchaseorders/update-po-status`,

    getBillViewbyId:`${BASE_URL}/private/pobills/po-bill-details`,
    downloadBill:`${BASE_URL}/private/pobills/download-bill`,
   },

   salesorders:{
    addSalesOrder: `${BASE_URL}/private/so/create-sale-order`,
    createSOItem: `${BASE_URL}/private/so/create-so-item`,
    SOList: `${BASE_URL}/private/so/sale-order-list`,
    getSaleOrderViewData:`${BASE_URL}/private/so/sale-order-list`,
    getSaleOrderItemsData:`${BASE_URL}/private/so/so-items`,
    verifySO:`${BASE_URL}/private/so/verify-so`,

    
    },


   options: {
    dropwons: `${BASE_URL}/public/options/all`,
    baseAddress: `${BASE_URL}/public/options/basic-details`
   },

   batch: {
     createBatch: `${BASE_URL}/private/batch/create-batch`
   },
  
   common:{
    getStateList:`${BASE_URL}/public/states/states-list`,
    getStateListTin:`${BASE_URL}/private/locations/states-tin`,
    getCountryList: `${BASE_URL}/private/countries/country-list`
   },
   bulkImport: {
    addData:`${BASE_URL}/private/bulk/bulk-import`
   },
   countryStateCity: {
    country: `${BASE_URL}/private/locations/country-list`,
    state: `${BASE_URL}/private/locations/state`,
    city: `${BASE_URL}/private/locations/cities`,
   },
   customer:{
    addCustomer:`${BASE_URL}/private/customer/create-customer`,
    getCustomerList:`${BASE_URL}/private/customer/customer-list`,
    getAllCustomers:`${BASE_URL}/private/customer/customers-all`,
    getAll:`${BASE_URL}/private/locations/states-tin`,
    getCountryList: `${BASE_URL}/private/countries/country-list`
   },
};

export default apis;