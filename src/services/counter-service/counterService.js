const countByProperty = (arr, prop) => {
  const counter = {};

  arr.forEach((cell) => {
    const key = cell[prop];

    if (!counter[key]) {
      counter[key] = 0;
    }

    counter[key]++;
  });

  return counter;
};

const addAmountToObjByProperty = (objs, prop, template) => {
  const count = countByProperty(objs, prop);

  const objsWithCount = template.map((obj) => ({
    ...obj,
    amount: count[obj[prop]],
  }));

  return objsWithCount;
};

export const counterService = {
  countByProperty,
  addAmountToObjByProperty,
};
