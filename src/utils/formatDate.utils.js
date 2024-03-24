import { addNumberSuffix } from "./addNumberSuffix.utils";

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = addNumberSuffix(date.getDate());
  const monthAndYear = date.toLocaleString("en-us", {
    month: "short",
    year: "numeric",
  });

  return `${day} ${monthAndYear}`;
};
