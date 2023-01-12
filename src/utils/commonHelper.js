export const getHourFromDate = (date = "") => {
  try {
    let dateTimeParts = date.split("T");
    let timePart = dateTimeParts[1];
    return timePart.substring(0, 5);
  } catch (error) {
    return null;
  }
};
