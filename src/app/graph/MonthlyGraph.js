import React, { useState, useEffect } from "react";
import GraphPage from "./GraphPage";
import DatePicker from "react-date-picker";

export default props => {
  const filterLinksForMonth = () => {
    return props.links.filter(link => {
      return link != null;
    });
  };

  return (
    <>
      <DatePicker
        onChange={props.onDateChange}
        value={props.dateToShow}
        clearIcon={null}
        maxDetail="year"
      />
      <GraphPage
        onDateChange={props.onDateChange}
        dateToShow={props.dateToShow}
        nodes={props.nodes}
        links={filterLinksForMonth()}
        editMode={props.editMode}
      />
    </>
  );
};
