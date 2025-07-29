// store.js
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { PostsReducer, toggleMenu } from './reducers/PostsReducer';
import { AuthReducer } from './reducers/AuthReducer';
import todoReducers from './reducers/Reducers';
import rootSaga from './sagas'; // 👈 Root saga file you'll create
import { productionProcessReducer } from './reducers/ProductionProcessReducer';
import { sidebarMenusReducer } from './reducers/sidebarMenusReducer';

import { thunk } from 'redux-thunk';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Optionally keep thunk if you're using both
// import { thunk } from 'redux-thunk';
// const middleware = applyMiddleware(thunk, sagaMiddleware);

const middleware = applyMiddleware(thunk,sagaMiddleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  sideMenu: toggleMenu,
  posts: PostsReducer,
  auth: AuthReducer,
  productionProcess: productionProcessReducer,
  sidebarMenus: sidebarMenusReducer,
  //Add next reducer here
  todoReducers,
});

export const store = createStore(reducers, composeEnhancers(middleware));

// Run the root saga
sagaMiddleware.run(rootSaga);


// import { applyMiddleware, combineReducers, compose,createStore,} from 'redux';
// import {PostsReducer, toggleMenu} from './reducers/PostsReducer';
// import {thunk} from 'redux-thunk';
// import { AuthReducer } from './reducers/AuthReducer';
// import todoReducers from './reducers/Reducers';
// const middleware = applyMiddleware(thunk);

// const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const reducers = combineReducers({
//     sideMenu: toggleMenu,
//     posts: PostsReducer,
//     auth: AuthReducer,
// 		todoReducers,
	
// });

// export const store = createStore(reducers,  composeEnhancers(middleware));
