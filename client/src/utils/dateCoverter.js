export const dateCoverter = (stamp) => {
  let monthsArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let date = new Date(stamp);
  let options = { timeZone: "Asia/Kolkata" };
  let istTime = date.toLocaleString("en-IN", options);
  let arr = istTime.split(", ");
  let getDate = arr[0].split("/").map(Number);
  let mon = monthsArray[getDate[1] - 1];

  return { month: mon, date: getDate[0], year: getDate[2] };
};
