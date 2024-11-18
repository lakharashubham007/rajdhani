import { signUp } from "../AuthService"; // Load environment variables

// Define the base URL for the API from .env
const BASE_URL = 'https://api.i2rtest.in/v1';

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
        rolesList: `${BASE_URL}/private/role/roles-list`
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

    // getAllThreadList: `${BASE_URL}/private/products/get-all-products`,
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
   }
   
};

export default apis;