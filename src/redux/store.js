// import { createStore } from "redux";
// import notebookReducer from "./reducer";

// const store = createStore(notebookReducer);

// export default store;

import { createStore, applyMiddleware, compose } from "redux";

import notebookReducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  notebookReducer,
  composeEnhancers(applyMiddleware(/* 中介軟體（如果有的話） */))
);

export default store;
