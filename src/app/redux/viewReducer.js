import { CHANGE_ACTIVITY, CHANGE_SELECTED_DAY } from "./actions";

const initialViewState = {
  currentDate: new Date(),
  currentActivity: null,
  currentMonth: new Date()
};

export default function view(state = initialViewState, action) {
  switch (action.type) {
    case CHANGE_ACTIVITY:
      return Object.assign({}, state, { currentActivity: action.newActivity });
    case CHANGE_SELECTED_DAY:
      return Object.assign({}, state, { currentDate: action.date });
    default:
      return state;
  }
}
