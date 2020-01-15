import React, { useState, useEffect } from "react";
import Sankey from "./Sankey";
// import activities from "./activities";
// import addAllTimeNodes from "./addAllTimeNodes";
import styled from "styled-components";

export default props => {
  const data = {
    nodes: props.nodes,
    links: props.links
  };

  return <Sankey data={data} edit={props.editMode} />;
};
