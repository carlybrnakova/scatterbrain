import { combineReducers } from "redux";
import activities from "./activityReducer";
import daily from "./dailyReducer";
import monthly from "./monthlyReducer";
import view from "./viewReducer";

const rootReducer = combineReducers({
  activities,
  daily,
  monthly,
  view
});
export default rootReducer;
