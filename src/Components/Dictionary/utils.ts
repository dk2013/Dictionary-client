import { tDictionary } from "../../Common/Types/dictionary";
import { languageCodes } from "../../Common/Constants/dictionary";

export const saveAndGetUpdatedDictionary = (
  prevDictionary: tDictionary,
  newWord: string,
  translation: string,
  translateFrom: languageCodes,
  translateTo: languageCodes
): tDictionary => {
  // Save direct translation
  let updatedDictionary = saveAndGetUpdatedDictionaryObject(
    prevDictionary,
    newWord,
    translation,
    translateFrom,
    translateTo
  );

  // Save reverse translation
  updatedDictionary = saveAndGetUpdatedDictionaryObject(
    updatedDictionary,
    translation,
    newWord,
    translateTo,
    translateFrom
  );
  // TODO: Now it's not optimized because it copies an object two times

  return updatedDictionary;
};

export const deleteAndGetUpdatedDictionary = (
  prevDictionary: tDictionary,
  newWord: string,
  translation: string,
  translateFrom: languageCodes,
  translateTo: languageCodes
): tDictionary => {
  // Delete direct translation
  let updatedDictionary = deleteAndGetUpdatedDictionaryObject(
    prevDictionary,
    newWord,
    translation,
    translateFrom,
    translateTo
  );

  // Delete reverse translation
  updatedDictionary = deleteAndGetUpdatedDictionaryObject(
    updatedDictionary,
    translation,
    newWord,
    translateTo,
    translateFrom
  );
  // TODO: Now it's not optimized because it copies an object two times

  return updatedDictionary;
};

const saveAndGetUpdatedDictionaryObject = (
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

const deleteAndGetUpdatedDictionaryObject = (
  prevDictionary: tDictionary,
  newWord: string,
  translation: string,
  translateFrom: languageCodes,
  translateTo: languageCodes
): tDictionary => {
  let updatedDictionary = Object.assign({}, prevDictionary);

  if (
    updatedDictionary?.[translateFrom]?.[newWord]?.translation?.[translateTo]
  ) {
    delete updatedDictionary[translateFrom]?.[newWord].translation?.[
      translateTo
    ];

    if (
      !Object.keys(
        updatedDictionary[translateFrom]?.[newWord].translation || {}
      ).length
    ) {
      delete updatedDictionary[translateFrom]?.[newWord];
    }
  }

  return updatedDictionary;
};
