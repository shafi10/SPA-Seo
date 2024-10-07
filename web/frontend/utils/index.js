export function formattedDate(dateString) {
  const date = new Date(dateString);

  const formatDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // 12-hour format with AM/PM
  }).format(date);
  return formatDate;
}
