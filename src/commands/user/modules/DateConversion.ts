export function getDateDifferenceFormatted(createdAt: Date): string {
  // Getting When User Joined Discord
  const discordYear = createdAt.getFullYear();
  const discordMonth = createdAt.getMonth();
  const discordDay = createdAt.getDay();

  //Getting Current Date
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDay();

  // The Date Difference
  let years = currentYear - discordYear;
  let months = currentMonth - discordMonth;
  let days = currentDay - discordDay;

  // Handling Negative Dates
  if (days < 0) {
    months--;
    const lastMonth = new Date(currentYear, currentMonth, 0).getDate();
    days += lastMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} years ${months} months ${days} days`;
}

