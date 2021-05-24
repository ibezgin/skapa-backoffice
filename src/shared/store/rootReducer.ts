import { combineReducers } from "redux";
import app from "./app/reducer";

const createRootReducer = () =>
    combineReducers({
        app,
    });

// eslint-disable-next-line import/no-default-export
export default createRootReducer;
