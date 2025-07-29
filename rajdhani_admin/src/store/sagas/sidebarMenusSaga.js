import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_SIDEBAR_MENUS_REQUEST,
  getSidebarMenusSuccess,
  getSidebarMenusFailure
} from '../actions/SidebarMenusActions';

import { getSidebarMenusApi } from '../../services/apis/SidebarMenuApi';

function* handleGetSidebarMenus() {
  try {
    const response = yield call(getSidebarMenusApi);
    const menus = response?.data?.MenuList;

    const updatedMenus = menus.map(menu => {
      const classNameMatch = menu.iconStyle?.match(/className=['"]([^'"]+)['"]/);
      if (classNameMatch && classNameMatch[1]) {
        return {
          ...menu,
          iconStyle: <i className={classNameMatch[1]} />
        };
      }
      return menu;
    });

    const formattedMenus = updatedMenus
      .filter(menu => menu.module_id)
      .map(parent => ({
        ...parent,
        children: updatedMenus
          .filter(child => child.parent_module_id === parent.module_id)
          .sort((a, b) => a.module_menu_priority - b.module_menu_priority),
      }))
      .sort((a, b) => a.module_priority - b.module_priority);

    const extractIndividualEntries = (menus) => {
      let result = [];
      menus.forEach(menu => {
        result.push({ ...menu, children: undefined, content: undefined });
        if (menu?.children?.length > 0) {
          menu.children.forEach(child => result.push({ ...child }));
        }
      });
      return result;
    };

    yield put(getSidebarMenusSuccess(extractIndividualEntries(formattedMenus)));


  } catch (error) {
    yield put(getSidebarMenusFailure(error.message || 'Failed to fetch sidebar menus'));
  }
}

export function* watchSidebarMenusSaga() {
  yield takeLatest(GET_SIDEBAR_MENUS_REQUEST, handleGetSidebarMenus);
}
