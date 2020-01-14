import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { node } from "prop-types";
import Buttons from "./Buttons";
import SankeyGraph from "./SankeyGraph";
import styled from "styled-components";
import { Router, Link } from "@reach/router";
import ActivitesPage from "./ActivitiesPage";
import GraphPage from "./GraphPage";
import api from "./api";
// import activities from "./activities";
// import { createStore } from 'redux'

// const reducer = (state = {nodes: [], links: []}, action) => {
//   switch(action.type) {
//     case 'NEW_ACTIVITY_LOG':
//       return {
//         nodes: state.nodes.push(action.node),
//         links: state.links.push(action.link)
//       }
//       default:
//         return state;
//   }
// }

// let store = createStore(reducer)

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
  // const [activityTypes, setActivityTypes] = useState([]);
  // useEffect(() => {
  //   api.getActivityTypes();
  // return () => {

  // }
  // });
  // const [activityTypes, setActivityTypes] = useState()
  componentDidMount() {
    api.getActivityTypes().then(types =>
      this.setState({
        activityTypes: types,
        nodes: types.map(activity => ({
          id: activity.title,
          name: activity.title
        }))
      })
    );
  }

  render() {
    const {
      nodes,
      links,
      selectedButton,
      editMode,
      activityTypes
    } = this.state;

    const addActivityLog = (node, link) => {
      console.log("Add Activity Log", node, link);
      nodes.push(node);
      this.setState({ nodes });
      links.push(link);
      console.log("now links is", links);
      this.setState({ links });
      api.saveLogEntry({
        startTimeMs: 1,
        startTimeStr: "",
        endTimeMs: 1,
        endTimeStr: "",
        activity: ""
      });
    };

    const homeClick = () => {
      this.setState({ selectedButton: null });
    };

    const onButtonChange = newButton =>
      this.setState({ selectedButton: newButton });

    console.log("the index component", selectedButton, nodes, links);
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
            path="/activities"
            onButtonChange={onButtonChange}
            onChange={addActivityLog}
            selectedButton={selectedButton}
            homeClick={homeClick}
          />
          <GraphPage path="graph" nodes={nodes} links={links} />
        </Router>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
