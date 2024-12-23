import { SortedDictionary } from "../../../../Common/Types/dictionary";
import { fields, sortOrders } from "./TranslationTable";

export const sort = (
  orderBy: sortOrders,
  sortByColumn: string,
  sortByField: fields,
  sortedDictionary: SortedDictionary,
  translationFrom: string,
  translationTo: string
) => {
  if (sortByColumn === translationFrom) {
    sortedDictionary.sort((a, b) => {
      if (sortByField === fields.NAME) {
        return (
          (orderBy === sortOrders.DESC ? -1 : 1) * a[0].localeCompare(b[0])
        );
      } else {
        // default sorting by modified
        return (
          (orderBy === sortOrders.DESC ? -1 : 1) *
          (a[1][translationTo][0].modified > b[1][translationTo][0].modified
            ? 1
            : -1)
        );
      }
    });
  } else {
    sortedDictionary.sort((a, b) => {
      if (sortByField === fields.NAME) {
        return (
          (orderBy === sortOrders.DESC ? -1 : 1) *
          a[1][translationTo][0].translation.localeCompare(
            b[1][translationTo][0].translation
          )
        );
      } else {
        // default sorting by modified
        return (
          (orderBy === sortOrders.DESC ? -1 : 1) *
          (a[1][translationTo][0].modified > b[1][translationTo][0].modified
            ? 1
            : -1)
        );
      }
    });
  }
};
