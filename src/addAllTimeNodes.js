export default nodes => {
  // for current day, split notes into each minute from 8am to 5pm
  const startDate = new Date(2020, 0, 13, 8, 0, 0);
  const endDate = new Date(2020, 0, 13, 9, 0, 0);
  // const endDate = new Date(2020, 0, 13, 17, 0, 0);

  var i = startDate;
  var j = 0;
  const dateParams = {
    year: i.getFullYear(),
    month: i.getMonth(),
    day: i.getDay(),
    hours: i.getHours(),
    mins: i.getMinutes()
  };
  while (j <= 100) {
    const d = new Date(
      dateParams.year,
      dateParams.month,
      dateParams.day,
      dateParams.hours,
      dateParams.mins + j
    ).toTimeString();
    nodes.push({
      id: d,
      name: d
    });
    j++;
  }
};
