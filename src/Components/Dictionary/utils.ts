import { tDictionary } from "../../Common/Types/dictionary";

export const saveAndGetUpdatedDictionary = (
  prevDictionary: tDictionary,
  newWord: string,
  translation: string,
  translateFrom: string,
  translateTo: string
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
  translateFrom: string,
  translateTo: string
): tDictionary => {
  // Delete direct translation
  let updatedDictionary = deleteAndGetUpdatedDictionaryObject(
    prevDictionary,
    newWord,
    // translation,
    translateFrom,
    translateTo
  );

  // Delete reverse translation
  updatedDictionary = deleteAndGetUpdatedDictionaryObject(
    updatedDictionary,
    translation,
    // newWord,
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
  translateFrom: string,
  translateTo: string
  // modified: Date = new Date()
): tDictionary => {
  if (prevDictionary[translateFrom]) {
    if (prevDictionary[translateFrom]?.[newWord]) {
      return {
        ...prevDictionary,
        [translateFrom]: {
          ...prevDictionary[translateFrom],
          [newWord]: {
            ...prevDictionary[translateFrom]?.[newWord],
            [translateTo]: [
              {
                translation: translation,
                modified: new Date(),
                order: 1, // TODO: For now we operate just the first element of translation array
              },
            ],
          },
        },
      };
    } else {
      return {
        ...prevDictionary,
        [translateFrom]: {
          ...prevDictionary[translateFrom],
          [newWord]: {
            [translateTo]: [
              {
                translation: translation,
                modified: new Date(),
                order: 1, // TODO: For now we operate just the first element of translation array
              },
            ],
          },
        },
      };
    }
  } else {
    return {
      ...prevDictionary,
      [translateFrom]: {
        [newWord]: {
          [translateTo]: [
            {
              translation: translation,
              modified: new Date(),
              order: 1, // TODO: For now we operate just the first element of translation array
            },
          ],
        },
      },
    };
  }
};

const deleteAndGetUpdatedDictionaryObject = (
  prevDictionary: tDictionary,
  newWord: string,
  // translation: string,
  translateFrom: string,
  translateTo: string
): tDictionary => {
  let updatedDictionary = Object.assign({}, prevDictionary);

  if (
    updatedDictionary?.[translateFrom]?.[newWord]?.[translateTo]?.[0] // TODO: For now we operate just the first element of translation array
      ?.translation
  ) {
    delete updatedDictionary?.[translateFrom]?.[newWord]?.[translateTo]?.[0]; // TODO: For now we operate just the first element of translation array

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
