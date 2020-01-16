import React, { useState, useEffect } from "react";
import GraphPage from "./GraphPage";

export default props => (
  <GraphPage
    onDateChange={props.onDateChange}
    dateToShow={props.dateToShow}
    nodes={props.nodes}
    links={props.links}
    editMode={props.editMode}
  />
);
