/**
 * Creates a Link for the Sankey graph.
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {string} activityTitle
 * @return {Link} has source, target, and value:
 *   - source: a string representing the start time (no date included)
 *   - target: the type of activity that was worked on in this time
 *   - value: the number of seconds spent on this activity
 */
export default (startDate, endDate, activityTitle) => {
  return {
    source: startDate.toString(),
    target: activityTitle,
    value: Math.round((endDate.getTime() - startDate.getTime()) / 1000)
  };
};
