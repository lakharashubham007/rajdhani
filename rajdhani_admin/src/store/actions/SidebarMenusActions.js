// Action Types
export const GET_SIDEBAR_MENUS_REQUEST = 'GET_SIDEBAR_MENUS_REQUEST';
export const GET_SIDEBAR_MENUS_SUCCESS = 'GET_SIDEBAR_MENUS_SUCCESS';
export const GET_SIDEBAR_MENUS_FAILURE = 'GET_SIDEBAR_MENUS_FAILURE';

// Action Creators
export const getSidebarMenusRequest = () => ({
  type: GET_SIDEBAR_MENUS_REQUEST,
});

export const getSidebarMenusSuccess = (menus) => ({
  type: GET_SIDEBAR_MENUS_SUCCESS,
  payload: menus,
});

export const getSidebarMenusFailure = (error) => ({
  type: GET_SIDEBAR_MENUS_FAILURE,
  payload: error,
});
