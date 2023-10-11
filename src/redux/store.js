import { createStore } from "redux";
import notebookReducer from "./reducer";

const store = createStore(notebookReducer);

export default store;
