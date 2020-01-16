/**
 * Creates a Node for the Sankey graph. Each link
 * will require a node to connect from to represent the start
 * time of an activity.
 * @param {} startDate
 * @returns {Node} has id and name; both are a Time String from the start Date
 */
export default startDate => {
  return {
    id: startDate.toString(),
    name: startDate.toString()
  };
};
