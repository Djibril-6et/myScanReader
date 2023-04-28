import { combineReducers } from "redux";
import favorites from "./favorites";
import viewedpage from "./viewedpage";
import mangas from "./mangas";

export default combineReducers({
    favorites,
    viewedpage,
    mangas
})