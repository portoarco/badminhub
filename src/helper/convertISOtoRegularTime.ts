export const convertISOToTimeString = (isoString: string) => {
  const timePart = isoString.split("T")[1]; // "09:00:00Z"
  const [hour, minute] = timePart.replace("Z", "").split(":");
  return `${hour}.${minute}`;
};
