import dayjs from "dayjs";
import { atom, selector } from "recoil";
import "dayjs/locale/fr";
dayjs.locale("fr");

export const departureState = atom({
  key: "departure",
  default: null,
});

export const arrivalState = atom({
  key: "arrival",
  default: null,
});

export const startDateState = atom({
  key: "startHour",
  default: dayjs(),
});

export const formattedStartDateState = selector({
  key: "formattedStartDate",
  get: ({ get }) => {
    const startDate = get(startDateState);
    return startDate.format("dddd,D MMMM YY");
  },
});
