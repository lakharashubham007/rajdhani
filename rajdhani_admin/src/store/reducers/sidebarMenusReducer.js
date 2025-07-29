import {
  GET_SIDEBAR_MENUS_REQUEST,
  GET_SIDEBAR_MENUS_SUCCESS,
  GET_SIDEBAR_MENUS_FAILURE,
} from '../actions/SidebarMenusActions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const sidebarMenusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SIDEBAR_MENUS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_SIDEBAR_MENUS_SUCCESS:
    //  console.log("✅ Sidebar Menus fetched successfully:", action.payload);
      return { ...state, loading: false, data: action.payload };
    case GET_SIDEBAR_MENUS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

