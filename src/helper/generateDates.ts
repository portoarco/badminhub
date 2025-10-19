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

    // ✅ Gunakan tanggal lokal (bukan UTC)
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    dates.push({
      id: i,
      dayName,
      dateText: `${day} ${monthName}`,
      fullDate: `${yyyy}-${mm}-${dd}`, // ← aman, tanpa toISOString()
    });
  }
  return dates;
};
