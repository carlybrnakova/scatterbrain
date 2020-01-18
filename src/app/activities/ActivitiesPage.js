import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import activities from "./activities";

const Page = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: center;
`;

const ActivitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
`;

const Button = styled.button`
  background-color: ${props => (props.active ? "#66cc00" : "#ffff4d")};
  margin-top: 2px;
`;

const GoHomeButton = styled.button`
  margin-top: 12px;
  border-width: 2px;

  &:hover {
    background-color: #cccc00;
  }
`;

export default class ActivitiesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: null
    };
  }

  // TODO: clicking the active button
  onClick = e => {
    const newDate = new Date();

    this.setState({
      started: newDate
    });
    this.props.onActivityChange(
      this.state.started,
      newDate,
      e.target.innerText
    );
  };

  endDay = () => {
    this.setState({ started: null });
    this.props.homeClick();
  };

  render() {
    return (
      <Page>
        <ActivitiesContainer>
          {this.props.activities.map(activity => {
            return (
              <Button
                active={this.props.selectedButton === activity.title}
                key={activity.title}
                onClick={this.onClick}
              >
                {activity.title}
              </Button>
            );
          })}
          <GoHomeButton onClick={this.endDay}>Going home!</GoHomeButton>
        </ActivitiesContainer>
      </Page>
    );
  }
}
