const minutesInHour = 60;
const minutesInDay = 1440;

const minutesToDaysHoursMinutes = (m) => {
  const days = Math.floor(m / minutesInDay); // Hele dager
  const remainingMinutesAfterDays = m % minutesInDay;

  const hours = Math.floor(remainingMinutesAfterDays / minutesInHour); // Hele timer
  const minutes = remainingMinutesAfterDays % minutesInHour; // Resterende minutter

  return {
    days: days,
    hours: hours,
    minutes: minutes,
  };
};

// Tester
console.log(minutesToDaysHoursMinutes(60));     // { days: 0, hours: 1, minutes: 0 }
console.log(minutesToDaysHoursMinutes(90));     // { days: 0, hours: 1, minutes: 30 }
console.log(minutesToDaysHoursMinutes(560));    // { days: 0, hours: 9, minutes: 20 }
console.log(minutesToDaysHoursMinutes(2634));   // { days: 1, hours: 19, minutes: 54 }
console.log(minutesToDaysHoursMinutes(1051408)); // { days: 730, hours: 3, minutes: 28 }
