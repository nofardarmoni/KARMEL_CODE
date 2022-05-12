export const sirensStatuses = {
  normal: { key: "normal", value: 1, label: "תקין", color: "green" },
  minor: { key: "minor", value: 2, label: "מינורי", color: "orange" },
  declined: { key: "declined", value: 3, label: "ירידה משרידות", color: "red" },
  disabled: { key: "disabled", value: 4, label: "מושבת", color: "gray" },
};

export const defaultSirensStatus = sirensStatuses.normal;

export const minAlertCount = 0;
export const maxAlertCount = 11;
