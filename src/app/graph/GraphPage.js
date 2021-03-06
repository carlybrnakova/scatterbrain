import React, { useState, useEffect } from "react";
import SankeyGraph from "./SankeyGraph";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * Show the start time of an activity, with the magnitude of how many
 * minutes between that and the next activity start time
 */
export default props => {
  return (
    <Container>
      {props.links.length === 0 ? (
        <div>Go start tracking activities!</div>
      ) : (
        <SankeyGraph
          nodes={props.nodes}
          links={props.links}
          editMode={props.editMode}
        />
      )}
    </Container>
  );
};
