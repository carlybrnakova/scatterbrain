import { combineReducers } from "redux";
import activities from "./activityReducer";
import daily from "./dailyReducer";
import view from "./viewReducer";

const rootReducer = combineReducers({
  activities,
  daily,
  view
});
export default rootReducer;
