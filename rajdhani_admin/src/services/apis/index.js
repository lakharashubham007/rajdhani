import { signUp } from "../AuthService";

// Define the base URL for the API
const BASE_URL = 'http://localhost:8087/v1';

// Define the endpoints
const apis = {
    baseurl: {
        Baseimageurl: `http://localhost:8087/v1/get-Images/image/`
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
         addCategory: `${BASE_URL}/category/create-categories`,
        categoriesList: `${BASE_URL}/category/categories-list`,
        addSubcategory: `${BASE_URL}/category/create-subcategory`
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
    }
};

export default apis;