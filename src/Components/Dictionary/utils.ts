import { tDictionary } from "./AddWord/AddWord";
import { languageCodes } from "./Dictionary";

export const getUpdatedDictionary = (
  prevDictionary: tDictionary,
  newWord: string,
  translation: string,
  translateFrom: languageCodes,
  translateTo: languageCodes
): tDictionary => {
  // Save direct translation
  prevDictionary = getUpdatedDictionaryObject(
    prevDictionary,
    newWord,
    translation,
    translateFrom,
    translateTo
  );

  // Save reverse translation
  prevDictionary = getUpdatedDictionaryObject(
    prevDictionary,
    translation,
    newWord,
    translateTo,
    translateFrom,
  );

  return prevDictionary;
};

const getUpdatedDictionaryObject = (
  prevDictionary: tDictionary,
  newWord: string,
  translation: string,
  translateFrom: languageCodes,
  translateTo: languageCodes
): tDictionary => {
  if (prevDictionary[translateFrom]) {
    if (prevDictionary[translateFrom]?.[newWord]) {
      return {
        ...prevDictionary,
        [translateFrom]: {
          ...prevDictionary[translateFrom],
          [newWord]: {
            ...prevDictionary[translateFrom]?.[newWord],
            translation: {
              ...prevDictionary[translateFrom]?.[newWord].translation,
              [translateTo]: translation,
            },
          },
        },
      };
    } else {
      return {
        ...prevDictionary,
        [translateFrom]: {
          ...prevDictionary[translateFrom],
          [newWord]: {
            translation: {
              [translateTo]: translation,
            },
          },
        },
      };
    }
  } else {
    return {
      ...prevDictionary,
      [translateFrom]: {
        [newWord]: {
          translation: {
            [translateTo]: translation,
          },
        },
      },
    };
  }
};
