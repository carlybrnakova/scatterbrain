import { REQUEST_ACTIVITIES, RECEIVE_ACTIVITIES } from "./actions";

const initialActivitiesState = {
  loadingActivities: false,
  activityTypes: [],
  activityNodes: []
};

export default function activities(state = initialActivitiesState, action) {
  switch (action.type) {
    case REQUEST_ACTIVITIES:
      return Object.assign({}, state, { loadingActivities: action.loading });
    case RECEIVE_ACTIVITIES:
      return {
        loadingActivities: false,
        activityTypes: action.activities,
        activityNodes: action.activities.map(activity => ({
          id: activity.title,
          name: activity.title
        }))
      };
    default:
      return state;
  }
}
