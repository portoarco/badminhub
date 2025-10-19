export const convertTimeToISO = (time: string) => {
  const [hours, minutes] = time.split(".");
  return `${hours.padStart(2, "0")}:${(minutes || "00").padStart(2, "0")}:00`;
};
