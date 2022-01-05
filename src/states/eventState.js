import { atom } from "recoil";

export const eventListState = atom({
  key: "eventListState",
  default: [],
});

export const currentEventState = atom({
  key: "currentEventState",
  default: null,
});

export const eventSortModeState = atom({
  key: "eventSortMode",
  default: false,
});

export const updateEventList = (eventList, event) => {
  let eventListRep = [...eventList];
  const index = eventListRep.findIndex((e) => e.id === event.id);
  if (index === -1) {
    eventListRep.push(event);
    if (eventListRep.length <= 9) eventListRep = addSortNums(eventListRep);
  } else {
    event.rating = eventListRep[index].rating;
    eventListRep[index] = event;
  }
  return eventListRep;
};

const addSortNums = (list) => {
  if (list.length <= 9) {
    const ratingOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const getSortNum = () => {
      let rating = ratingOptions[Math.floor(Math.random() * list.length + 1)];
      while (rating === 0)
        rating = ratingOptions[Math.floor(Math.random() * list.length + 1)];
      ratingOptions[rating] = 0;
      return rating;
    };
    return list.map((e) => ({
      ...e,
      rating: getSortNum(),
    }));
  }
};
