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
    // console.log("e", e.target.innerText);
    const newDate = new Date();
    if (this.state.started !== null) {
      const link = {
        source: this.state.started.toTimeString(),
        target: this.props.selectedButton,
        value: Math.round(
          (newDate.getTime() - this.state.started.getTime()) / 1000
        )
      };
      console.log("link is now", link);

      const node = {
        id: this.state.started.toTimeString(),
        name: this.state.started.toTimeString()
      };
      this.props.onChange(node, link);
    }

    this.setState({
      started: new Date()
    });
    this.props.onButtonChange(e.target.innerText);
  };

  render() {
    return (
      <Page>
        <ActivitiesContainer>
          {this.props.activities.map(a => (
            <Button
              active={this.props.selectedButton === a.title}
              key={a.title}
              onClick={this.onClick}
            >
              {a.title}
            </Button>
          ))}
          <GoHomeButton onClick={this.props.homeClick}>
            Going home!
          </GoHomeButton>
        </ActivitiesContainer>
      </Page>
    );
  }
}
