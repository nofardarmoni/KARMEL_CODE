export const defaultPolicy = "noPolicy";

export const defensePolicies = {
  noPolicy: {
    value: 0,
    isHidden: true,
  },
  easy: {
    value: 1,
    color: "green",
    label: "קלה",
  },
  medium1: {
    value: 2,
    color: "yellow",
    label: "ביניים 1",
  },
  medium2: {
    value: 3,
    color: "orange",
    label: "ביניים 2",
  },
  severe: {
    value: 4,
    color: "red",
    label: "מחמירה",
  },
  shelter: {
    value: 5,
    color: "darkgray",
    label: "מרחב מוגן",
  },
};
