export const formatDateToIST = (utcDateString) => {
  const utcDate = new Date(utcDateString);

  const dateOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  };

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };
  const formattedDate = utcDate
    .toLocaleDateString("en-US", dateOptions)
    .replaceAll(",", "");
  const formattedTime = utcDate.toLocaleTimeString("en-US", timeOptions);
  return { formattedDate, formattedTime };
};
