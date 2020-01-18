import React, { useState, useEffect } from "react";
import GraphPage from "./GraphPage";
import DatePicker from "react-date-picker";

export default props => {
  const onDateChange = d => {
    console.log("d is now", d);
    props.onDateChange(d);
  };

  console.log("daily is rendering", props);
  return (
    <>
      <DatePicker
        onChange={onDateChange}
        value={props.dateToShow}
        clearIcon={null}
      />
      {props.loading || !props.data ? (
        <h1>waiting...</h1>
      ) : (
        <GraphPage
          onDateChange={props.onDateChange}
          dateToShow={props.dateToShow}
          nodes={props.data.nodes.concat(props.activityNodes)}
          links={props.data.links}
          editMode={props.editMode}
        />
      )}
    </>
  );
};
