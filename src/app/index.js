import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import ActivitesPage from "./activities/ActivitiesPage";
import DailyGraph from "./graph/DailyGraph";
import MonthlyGraph from "./graph/MonthlyGraph";
import api from "./utils/api";
import createNode from "./utils/createNode";
import createLink from "./utils/createLink";
import { createStore, applyMiddleware } from "redux";
// import activityReducer from "./redux/activityReducer";
import { Provider, connect } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import {
  fetchActivities,
  fetchDailyActivityLogs,
  fetchMonthlyActivityLogs,
  changeActivity,
  addActivityLog,
  changeSelectedDay,
  changeSelectedMonth
} from "./redux/actions";
import rootReducer from "./redux/reducers";
import getDayKey from "./utils/getDayKey";
import getMonthKey from "./utils/getMonthKey";

const loggerMiddleware = createLogger();
const rootStore = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      links: [],
      editMode: false
    };
  }

  componentDidMount() {
    // const { dispatch } = this.props
    this.props.fetchActivities();

    // api.getActivityTypes().then(types => {
    // createTestDataLogs(types);

    // const nodes = types.map(activity => ({
    //   id: activity.title,
    //   name: activity.title
    // }));

    // // const d = new Date();
    // // console.log("d is", d);
    // const theDate = new Date();
    // // console.log(
    // //   "the date is",
    // //   theDate.getFullYear(),
    // //   theDate.getMonth(),
    // //   theDate.getDate(),
    // //   theDate.getTimezoneOffset()
    // // );
    //   return api
    //     .getLogsForDay(
    //       theDate.getFullYear(),
    //       theDate.getMonth(),
    //       theDate.getDate(),
    //       theDate.getTimezoneOffset()
    //     )
    //     .then(results => {
    //       console.log("results", results);

    //       // append all the logs to the nodes
    //       const n = nodes.concat(
    //         results.map(r => createNode(new Date(r.startDate)))
    //       );

    //       // create links for all the logs
    //       const links = results.map(r =>
    //         createLink(
    //           new Date(Date.parse(r.startDate)),
    //           new Date(Date.parse(r.endDate)),
    //           r.activity
    //         )
    //       );
    //       // console.log("links", links);

    //       this.setState({
    //         activityTypes: types,
    //         nodes: n,
    //         links,
    //         dateToShow: theDate
    //       });
    //     });
    // });

    const createTestDataLogs = types => {
      // Jan 13
      let logs = types.map((type, index) => {
        const date = new Date(2020, 0, 14, 8, index * 100, 0);
        return {
          // startTimeMs: date.getMilliseconds(),
          // startTimeStr: date.toString(),
          // endTimeMs: date.getMilliseconds(),
          // endTimeStr: date.toString(),
          startDate: date,
          endDate: new Date(2020, 0, 14, 8, index * 200, 0),
          magnitudeSec: index * 100,
          activity: type.title
        };
      });

      // Jan 14
      logs = logs.concat(
        types.map((type, index) => {
          const mag = (types.length - index) * 100;
          const date = new Date(2020, 0, 13, 8, mag, 0);
          return {
            // startTimeMs: date.getMilliseconds(),
            // startTimeStr: date.toString(),
            // endTimeMs: date.getMilliseconds(),
            // endTimeStr: date.toString(),
            startDate: date,
            endDate: new Date(2020, 0, 13, 8, mag * 2, 0),
            magnitudeSec: mag,
            activity: type.title
          };
        })
      );
      // console.log("test logs ------", logs);

      api.insertLogs(logs);
    };
  }

  onActivityChange = (startDate, endDate, newActivityType) => {
    if (startDate !== null) {
      //   const node = createNode(startDate);
      //   const link = createLink(startDate, endDate, newActivityType);

      //   this.setState({ nodes: this.state.nodes.concat(node) });
      //   this.setState({ links: this.state.links.concat(link) });

      //   api.createLogEntry({
      //     // startTimeMs: startDate.getMilliseconds(),
      //     // startTimeStr: startDate.toString(),
      //     // endTimeMs: endDate.getMilliseconds(),
      //     // endTimeStr: endDate.toString(),
      //     startDate,
      //     endDate,
      //     magnitudeSec: node.value,
      //     activity: link.target
      //   });
      this.props.addActivityLog(startDate, endDate, newActivityType);
    }

    this.props.changeActivity(newActivityType);
  };

  onDateChange = newDate => {
    // notify the store that the date has changed
    this.props.changeSelectedDay(newDate);

    // get the new data to view... if we don't have it already
    const key = getDayKey(newDate);
    if (!this.props.allDailyData[key]) {
      this.props.fetchDailyActivityLogs(newDate);
    }
    // this.setState({ dateToShow: newDate }, () => {
    //   const { nodes, links } = this.state;
    //   if (
    //     this.filterLinksForSelectedDay().length > 0 &&
    //     this.filterNodesForSelectedDay().length > 0
    //   ) {
    //     return;
    //   }

    // assume if we need one, we need both
    // api
    //   .getLogsForDay(
    //     newDate.getFullYear(),
    //     newDate.getMonth(),
    //     newDate.getDate(),
    //     newDate.getTimezoneOffset()
    //   )
    //   .then(results => {
    //     // append all the logs to the nodes
    //     const n = nodes.concat(
    //       results.map(r => createNode(new Date(r.startDate)))
    //     );

    //     // create links for all the logs
    //     const l = links.concat(
    //       results.map(r => {
    //         // console.log("r is", r);
    //         // console.log(
    //         //   "and link is",
    //         //   createLink(
    //         //     new Date(r.startDate),
    //         //     new Date(r.endDate),
    //         //     r.activity
    //         //   )
    //         // );

    //         return createLink(
    //           new Date(r.startDate),
    //           new Date(r.endDate),
    //           r.activity
    //         );
    //       })
    //     );

    //     this.setState({
    //       nodes: n,
    //       links: l
    //     });
    //   });
    // });
  };

  onMonthChange = newDate => {
    this.props.changeSelectedMonth(newDate);

    // get the new data to view... if we don't have it already
    const key = getMonthKey(newDate);
    if (!this.props.allMonthlyData[key]) {
      this.props.fetchMonthlyActivityLogs(newDate);
    }
  };

  filterLinksForSelectedDay = () => {
    const { links } = this.state;
    const currentYear = this.props.selectedDay.getFullYear();
    const currentDay = this.props.selectedDay.getDate();
    const currentMonth = this.props.selectedDay.getMonth();

    return links.filter(link => {
      const parsedDate = new Date(Date.parse(link.source));
      return (
        parsedDate.getFullYear() === currentYear &&
        parsedDate.getMonth() === currentMonth &&
        parsedDate.getDate() === currentDay
      );
    });
  };

  filterNodesForSelectedDay = () => {
    const { nodes } = this.state;
    const currentYear = this.props.selectedDay.getFullYear();
    const currentDay = this.props.selectedDay.getDate();
    const currentMonth = this.props.selectedDay.getMonth();

    return nodes.filter(node => {
      const parsedDate = new Date(Date.parse(node.name));
      return (
        parsedDate.getFullYear() === currentYear &&
        parsedDate.getMonth() === currentMonth &&
        parsedDate.getDate() === currentDay
      );
    });
  };

  render() {
    const { nodes, editMode } = this.state;

    const handleGoingHomeForTheDay = () => {
      this.props.changeActivity(null);
    };

    return (
      <div className="App">
        <div>
          <button onClick={() => this.setState({ editMode: !editMode })}>
            Edit Mode
          </button>
          <Link to="activities">Go to Activities</Link>
          <Link to="graph">Go to Daily Graph</Link>
          <Link to="graph/monthly">Go to Monthly Graph</Link>
        </div>
        <Router>
          <ActivitesPage
            activities={this.props.activityTypes}
            path="activities"
            onActivityChange={this.onActivityChange}
            selectedButton={this.props.currentActivity}
            homeClick={handleGoingHomeForTheDay}
          />
          <DailyGraph
            loading={this.props.loadingDailyActivities}
            path="graph"
            activityNodes={this.props.activityNodes}
            data={this.props.allDailyData[getDayKey(this.props.selectedDay)]}
            onDateChange={this.onDateChange}
            dateToShow={this.props.selectedDay}
          />
          <MonthlyGraph
            loading={this.props.loadingMonthlyActivities}
            path="graph/monthly"
            activityNodes={this.props.activityNodes}
            data={
              this.props.allMonthlyData[getMonthKey(this.props.selectedMonth)]
            }
            onDateChange={this.onMonthChange}
            dateToShow={this.props.selectedMonth}
          />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    activityTypes: state.activities.activityTypes,
    loadingActivities: state.activities.loadingActivities,
    activityNodes: state.activities.activityNodes,
    currentActivity: state.view.currentActivity,
    selectedDay: state.view.currentDate,
    selectedMonth: state.view.currentMonth,
    allDailyData: state.daily,
    allMonthlyData: state.monthly,
    loadingDailyActivities: state.daily.loadingDailyActivities,
    loadingMonthlyActivities: state.daily.loadingMonthlyActivities
  };
};

const mapDispatchToProps = {
  changeActivity,
  fetchDailyActivityLogs,
  fetchMonthlyActivityLogs,
  addActivityLog,
  fetchActivities,
  changeSelectedDay,
  changeSelectedMonth
};

const RealApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={rootStore}>
    <RealApp />
  </Provider>,
  rootElement
);
