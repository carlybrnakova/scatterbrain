import {
  CHANGE_ACTIVITY,
  CHANGE_SELECTED_DAY,
  CHANGE_SELECTED_MONTH
} from "./actions";

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
    case CHANGE_SELECTED_MONTH:
      return Object.assign({}, state, { currentMonth: action.date });
    default:
      return state;
  }
}
