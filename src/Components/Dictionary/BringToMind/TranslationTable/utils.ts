import { SortedDictionary } from "../../../../Common/Types/dictionary";
import { fields, sortOrders } from "./TranslationTable";

export const sort = (
  orderBy: sortOrders,
  sortByColumn: string,
  sortByField: fields,
  sortedDictionary: SortedDictionary,
  translateFrom: string,
  translateTo: string
) => {
  if (sortByColumn === translateFrom) {
    sortedDictionary.sort((a, b) => {
      if (sortByField === fields.NAME) {
        return (
          (orderBy === sortOrders.DESC ? -1 : 1) * a[0].localeCompare(b[0])
        );
      } else {
        // default sorting by modified
        return (
          (orderBy === sortOrders.DESC ? -1 : 1) *
          (a[1][translateTo][0].modified > b[1][translateTo][0].modified
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
          a[1][translateTo][0].translation.localeCompare(
            b[1][translateTo][0].translation
          )
        );
      } else {
        // default sorting by modified
        return (
          (orderBy === sortOrders.DESC ? -1 : 1) *
          (a[1][translateTo][0].modified > b[1][translateTo][0].modified
            ? 1
            : -1)
        );
      }
    });
  }
};
