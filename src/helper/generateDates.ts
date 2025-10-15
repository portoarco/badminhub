export const generateDates = (newDate: Date, days: number) => {
  const dates = [];
  const today = new Date();
  const startDate = new Date(newDate);

  for (let i = 0; i < days; i++) {
    const date = new Date();
    if (startDate) {
      date.setDate(startDate.getDate() + i);
    } else {
      date.setDate(today.getDate() + i);
    }

    const dayName = date.toLocaleDateString("id-ID", { weekday: "short" });
    const day = date.getDate();
    const monthName = date.toLocaleDateString("id-ID", { month: "short" });

    dates.push({
      id: i,
      dayName,
      dateText: `${day} ${monthName} `,
      fullDate: date.toISOString().split("T")[0],
    });
  }
  return dates;
};
