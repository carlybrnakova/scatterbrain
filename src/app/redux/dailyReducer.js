import {
  ADD_ACTIVITY_LOG,
  REQUEST_DAY_ACTIVITIES,
  RECEIVE_DAY_ACTIVITIES
} from "./actions";
import createNode from "../utils/createNode";
import createLink from "../utils/createLink";
import getKey from "../utils/getKey";

const initialState = {
  loadingDailyActivities: false
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
    // This action should ALWAYS result in a new entry
    case ADD_ACTIVITY_LOG:
      // create the node and link we will need to add
      const node = createNode(action.startDate);
      const link = createLink(
        action.startDate,
        action.endDate,
        action.newActivityType
      );

      // if the date doesn't exist yet, create a new
      // entry for that date
      const key = getKey(action.startDate);
      if (!state[key]) {
        return Object.assign({}, state, {
          [key]: {
            nodes: [node],
            links: [link]
          }
        });
      }

      // then put in the node and link
      const newDayObject = Object.assign({}, state[key]);
      newDayObject.nodes.push(node);
      newDayObject.links.push(link);

      return Object.assign({}, state, {
        [key]: newDayObject
      });
    case REQUEST_DAY_ACTIVITIES:
      return Object.assign({}, state, {
        loadingDailyActivities: true
      });
    case RECEIVE_DAY_ACTIVITIES:
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
        [getKey(action.date)]: activityLogObject,
        loadingDailyActivities: false
      });
    default:
      return state;
  }
}
