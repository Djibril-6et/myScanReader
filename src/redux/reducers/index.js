import { combineReducers } from "redux";
import favorites from "./favorites";
import viewedpage from "./viewedpage";

export default combineReducers({
    favorites,
    viewedpage
})