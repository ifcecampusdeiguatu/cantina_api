const dateNow: Date = new Date();

export const dateObject = {
  year: dateNow.getFullYear(),
  month: dateNow.getMonth() + 1,
  day: dateNow.getDate(),
};

export function calcDate(add = 0) {
  let dayAdded = dateObject.day + add;
  let nextMonth = dateObject.month;

  if (dayAdded > 30) {
    dayAdded -= 30;
    nextMonth += 1;
  }

  if (nextMonth > 12) nextMonth = 1;

  return {
    d: String(dayAdded).padStart(2, "0"),
    m: String(nextMonth).padStart(2, "0"),
  };
}
