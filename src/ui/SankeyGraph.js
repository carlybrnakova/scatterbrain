import React, { useState, useEffect } from "react";
import Sankey from "./Sankey";
import activities from "./activities";
import addAllTimeNodes from "./addAllTimeNodes";
import styled from "styled-components";

const GraphContainer = styled.div``;

export default props => {
  const [editMode, setEditMode] = useState(false);
  const [links, addLink] = useState([]);

  // addAllTimeNodes(nodes);

  // 08:00:00 GMT-0700 (Mountain Standard Time)
  // const testLinks = [
  //   {
  //     source: "08:00:00 GMT-0700 (Mountain Standard Time)",
  //     target: "JIRA",
  //     value: 1
  //   },
  //   {
  //     source: "08:01:00 GMT-0700 (Mountain Standard Time)",
  //     target: "Email",
  //     value: 1
  //   },
  //   {
  //     source: "08:02:00 GMT-0700 (Mountain Standard Time)",
  //     target: "JIRA",
  //     value: 1
  //   }
  // ];

  const data = {
    nodes: props.nodes,
    links: props.links
  };

  return (
    <>
      {data.links.length === 0 ? (
        <div>Go start tracking activities!</div>
      ) : (
        <Sankey data={data} edit={editMode} />
      )}
    </>
  );
};
