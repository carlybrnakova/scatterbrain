export const REQUEST_ACTIVITIES = "REQUEST_ACTIVITIES";
export function requestActivities() {
  console.log("request activities");
  return {
    type: REQUEST_ACTIVITIES
  };
}

export const RECEIVE_ACTIVITIES = "RECEIVE_ACTIVITIES";
export function receiveActivities(activities) {
  return {
    type: RECEIVE_ACTIVITIES,
    activities
  };
}

export const CHANGE_ACTIVITY = "CHANGE_ACTIVITY";
export function changeActivity(newActivity) {
  return {
    type: CHANGE_ACTIVITY,
    newActivity
  };
}

export const CHANGE_SELECTED_DAY = "CHANGE_SELECTED_DAY";
export function changeSelectedDay(date) {
  return {
    type: CHANGE_SELECTED_DAY,
    date
  };
}

export const CHANGE_SELECTED_MONTH = "CHANGE_SELECTED_MONTH";
export function changeSelectedMonth(date) {
  return {
    type: CHANGE_SELECTED_MONTH,
    date
  };
}

export const ADD_NODE = "ADD_NODE";
export function addNode(node) {
  return {
    type: ADD_NODE,
    node
  };
}

export const ADD_LINK = "ADD_LINK";
export function addLink(link) {
  return {
    type: ADD_LINK,
    link
  };
}

export const ADD_ACTIVITY_LOG = "ADD_ACTIVITY_LOG";
export function addActivityLog(startDate, endDate, newActivityType) {
  return {
    type: ADD_ACTIVITY_LOG,
    startDate,
    endDate,
    newActivityType
  };
}

export const REQUEST_DAY_ACTIVITIES = "REQUEST_DAY_ACTIVITIES";
export function requestDailyActivities(date) {
  return {
    type: REQUEST_DAY_ACTIVITIES,
    date
  };
}

export const RECEIVE_DAY_ACTIVITIES = "RECEIVE_DAY_ACTIVITIES";
export function receiveDailyActivities(date, activityLogs) {
  return {
    type: RECEIVE_DAY_ACTIVITIES,
    date,
    activityLogs
  };
}

const url = "https://svwp0.sse.codesandbox.io";

export function fetchActivities() {
  return function(dispatch) {
    dispatch(requestActivities());

    return fetch(url + "/activities")
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log("An error occurred.", error)
      )
      .then(json => {
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        return dispatch(receiveActivities(json));
      });
  };
}

export function fetchDailyActivityLogs(date) {
  return function(dispatch) {
    dispatch(requestDailyActivities());

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const tzOffset = 0; // TODO
    return fetch(
      `${url}/logs?year=${year}&month=${month}&day=${day}&offset=${tzOffset}`
    )
      .then(data => data.json())
      .then(logs => {
        console.log("logs", logs);
        return dispatch(receiveDailyActivities(date, logs));
      });
  };
}

export const REQUEST_MONTH_ACTIVITIES = "REQUEST_MONTH_ACTIVITIES";
export function requestMonthlyActivities(date) {
  return {
    type: REQUEST_MONTH_ACTIVITIES,
    date
  };
}

export const RECEIVE_MONTH_ACTIVITIES = "RECEIVE_MONTH_ACTIVITIES";
export function receiveMonthlyActivities(date, activityLogs) {
  return {
    type: RECEIVE_MONTH_ACTIVITIES,
    date,
    activityLogs
  };
}

export function fetchMonthlyActivityLogs(date) {
  return function(dispatch) {
    dispatch(requestMonthlyActivities());

    const year = date.getFullYear();
    const month = date.getMonth();
    // const day = date.getDate();
    const tzOffset = 0; // TODO
    return fetch(`${url}/logs?year=${year}&month=${month}`)
      .then(data => data.json())
      .then(logs => {
        console.log("logs", logs);
        return dispatch(receiveMonthlyActivities(date, logs));
      });
  };
}
