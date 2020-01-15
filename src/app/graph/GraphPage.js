import React, { useState, useEffect } from "react";
import SankeyGraph from "./SankeyGraph";
import DatePicker from "react-date-picker";

/**
 * Show the start time of an activity, with the magnitude of how many
 * minutes between that and the next activity start time
 */
export default props => {
  const [date, setDate] = useState(new Date());

  const onDateChange = d => {};

  return (
    <>
      <DatePicker onChange={onDateChange} value={date} />
      {props.links.length === 0 ? (
        <div>Go start tracking activities!</div>
      ) : (
        <SankeyGraph
          nodes={props.nodes}
          links={props.links}
          editMode={props.editMode}
        />
      )}
    </>
  );
};
