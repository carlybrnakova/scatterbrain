import React from "react";
import activities from "./activities";
import styled from "styled-components";

const Button = styled.button`
  color: green;
  grid-area: activities;
`;

const Activities = styled.div`
  display: flex;
  flex-direction: column;
`;

export default () => {
  return (
    <Activities>
      {activities.map(a => (
        <Button>{a}</Button>
      ))}
    </Activities>
  );
};
