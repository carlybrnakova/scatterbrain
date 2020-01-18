import { REQUEST_MONTH_ACTIVITIES, RECEIVE_MONTH_ACTIVITIES } from "./actions";
import createNode from "../utils/createNode";
import createLink from "../utils/createLink";
import getMonthKey from "../utils/getMonthKey";

const initialState = {
  loadingMonthlyActivities: false
};

/*
This store's keys should be a string that has a value
of the format "yyyy-m-d" where "yyyy" is the exact
year, "m" is the 0-indexed month of the year (with no
leading zeros), and day is the 1-indexed day of the
month (with no leading zeros).

Example of what this store should look like:

{
  { "2020-0-1" : {
    nodes: [],
    links: []
  },
  { "2020-0-2" : {
    nodes: []
    links: []
  }
}
*/

export default function daily(state = initialState, action) {
  switch (action.type) {
    case REQUEST_MONTH_ACTIVITIES:
      return Object.assign({}, state, {
        loadingMonthlyActivities: true
      });
    case RECEIVE_MONTH_ACTIVITIES:
      // make a list of all nodes and links for this day and
      // assign it without any kind of merging
      const activityLogObject = {
        nodes: action.activityLogs.map(log =>
          createNode(new Date(log.startDate))
        ),
        links: action.activityLogs.map(log =>
          createLink(
            new Date(log.startDate),
            new Date(log.endDate),
            log.activity
          )
        )
      };

      return Object.assign({}, state, {
        [getMonthKey(action.date)]: activityLogObject,
        loadingMonthlyActivities: false
      });
    default:
      return state;
  }
}
