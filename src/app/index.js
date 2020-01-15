import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import ActivitesPage from "./activities/ActivitiesPage";
import GraphPage from "./graph/GraphPage";
import api from "./utils/api";
import createNode from "./utils/createNode";
import createLink from "./utils/createLink";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityTypes: [],
      nodes: [],
      links: [],
      selectedButton: null,
      editMode: false
    };
  }

  componentDidMount() {
    api.getActivityTypes().then(types => {
      // createTestDataLogs(types);

      this.setState({
        activityTypes: types,
        nodes: types.map(activity => ({
          id: activity.title,
          name: activity.title
        }))
      });

      api.getLogsForDay(2020, 0, 14).then(results => {
        console.log("results", results);
      });
    });

    const createTestDataLogs = types => {
      // Jan 13
      let logs = types.map((type, index) => {
        const date = new Date(2020, 0, 14, 8, index * 100, 0);
        return {
          startTimeMs: date.getMilliseconds(),
          startTimeStr: date.toString(),
          endTimeMs: date.getMilliseconds(),
          endTimeStr: date.toString(),
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
            startTimeMs: date.getMilliseconds(),
            startTimeStr: date.toString(),
            endTimeMs: date.getMilliseconds(),
            endTimeStr: date.toString(),
            magnitudeSec: mag,
            activity: type.title
          };
        })
      );
      console.log("test logs ------", logs);

      api.insertLogs(logs);
    };
  }

  onActivityChange = (startDate, endDate, newActivityType) => {
    if (startDate !== null) {
      const node = createNode(startDate);
      const link = createLink(startDate, endDate, newActivityType);

      this.setState({ nodes: this.state.nodes.concat(node) });
      this.setState({ links: this.state.links.concat(link) });

      api.createLogEntry({
        startTimeMs: startDate.getMilliseconds(),
        startTimeStr: startDate.toString(),
        endTimeMs: endDate.getMilliseconds(),
        endTimeStr: endDate.toString(),
        magnitudeSec: node.value,
        activity: link.target
      });
    }

    this.setState({ selectedButton: newActivityType });
  };

  render() {
    const {
      nodes,
      links,
      selectedButton,
      editMode,
      activityTypes
    } = this.state;

    const handleGoingHomeForTheDay = () => {
      this.setState({ selectedButton: null });
    };

    return (
      <div className="App">
        <div>
          <button onClick={() => this.setState({ editMode: !editMode })}>
            Edit Mode
          </button>
          <Link to="activities">Go to Activities</Link>
          <Link to="graph">Go to Graph</Link>
        </div>
        <Router>
          <ActivitesPage
            activities={activityTypes}
            path="activities"
            onActivityChange={this.onActivityChange}
            selectedButton={selectedButton}
            homeClick={handleGoingHomeForTheDay}
          />
          <GraphPage path="graph" nodes={nodes} links={links} />
        </Router>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
