const getWeekDays = () => {
  const date = new Date();
  let actualDay = date.getDate();
  let actualYear = date.getFullYear();
  let actualMonth = date.getMonth() + 1;
  let monthName = date.toLocaleDateString("en-US", { month: "long" });
  const dayNumber = date.getDay();
  const monthLength = new Date(actualYear, actualMonth, 0).getDate();
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dateObject = [];
  for (let i = 0; i <= 6; i++) {
    if (actualDay > monthLength) {
      actualDay = 1;
      date.setMonth(actualMonth);
      monthName = date.toLocaleDateString("en-US", { month: "long" });
      if (actualMonth === 12) {
        actualYear += 1;
      }
    }
    dateObject.push({
      day: actualDay,
      dayWeek: weekDays[dayNumber + i].toLowerCase(),
      date: `${
        weekDays[dayNumber + i]
      } the ${actualDay}th, ${monthName} ${actualYear}`,
    });
    actualDay++;
  }
  return dateObject;
};

export default getWeekDays;
