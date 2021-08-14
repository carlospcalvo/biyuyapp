import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import MainReducer from "./reducer";

export default createStore(MainReducer, applyMiddleware(thunk));