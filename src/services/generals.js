import moment from "moment";

export const isDateRelevant = (date) => {
  return moment().isBefore(moment(date));
};
