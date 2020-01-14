import React, { useState, useEffect } from "react";
import SankeyGraph from "./SankeyGraph";

/**
 * Show the start time of an activity, with the magnitude of how many
 * minutes between that and the next activity start time
 */
export default class GraphPage extends React.Component {
  render() {
    console.log("graph gets...", this.props.nodes, this.props.links);
    return (
      <div>
        <SankeyGraph nodes={this.props.nodes} links={this.props.links} />
      </div>
    );
  }
}
