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
import activities from "./activities";
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

function App() {
  const activityNodes = activities.map(activity => ({
    id: activity,
    name: activity
  }));
  const [nodes, setNodes] = useState(activityNodes);
  const [links, setLinks] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const addActivityLog = (node, link) => {
    console.log("Add Activity Log");
    nodes.push(node);
    setNodes(nodes);
    links.push(link);
    console.log("now links is", links);
    setLinks(links);
  };

  // useEffect(() => {
  //   fetch("https://raw.githubusercontent.com/ozlongblack/d3/master/energy.json")
  //     .then(res => res.json())
  //     .then(data => setData(data));
  // }, []);
  const homeClick = () => {
    setSelectedButton(null);
  };

  const onButtonChange = newButton => setSelectedButton(newButton);

  console.log("the index component", selectedButton, nodes, links);
  return (
    <div className="App">
      <div>
        <button onClick={() => setEditMode(!editMode)}>Edit Mode</button>
        <Link to="activities">Go to Activities</Link>
        <Link to="graph">Go to Graph</Link>
      </div>
      <Router>
        <ActivitesPage
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

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
