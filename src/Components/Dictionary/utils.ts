import { tDictionary } from "../../Common/Types/dictionary";

export const saveAndGetUpdatedDictionary = (
  prevDictionary: tDictionary,
  newWord: string,
  translation: string,
  translationFrom: string,
  translationTo: string
): tDictionary => {
  // Save direct translation
  let updatedDictionary = saveAndGetUpdatedDictionaryObject(
    prevDictionary,
    newWord,
    translation,
    translationFrom,
    translationTo
  );

  // Save reverse translation
  updatedDictionary = saveAndGetUpdatedDictionaryObject(
    updatedDictionary,
    translation,
    newWord,
    translationTo,
    translationFrom
  );
  // TODO: Now it's not optimized because it copies an object two times

  return updatedDictionary;
};

export const deleteAndGetUpdatedDictionary = (
  prevDictionary: tDictionary,
  newWord: string,
  translation: string,
  translationFrom: string,
  translationTo: string
): tDictionary => {
  // Delete direct translation
  let updatedDictionary = deleteAndGetUpdatedDictionaryObject(
    prevDictionary,
    newWord,
    // translation,
    translationFrom,
    translationTo
  );

  // Delete reverse translation
  updatedDictionary = deleteAndGetUpdatedDictionaryObject(
    updatedDictionary,
    translation,
    // newWord,
    translationTo,
    translationFrom
  );
  // TODO: Now it's not optimized because it copies an object two times

  return updatedDictionary;
};

const saveAndGetUpdatedDictionaryObject = (
  prevDictionary: tDictionary,
  newWord: string,
  translation: string,
  translationFrom: string,
  translationTo: string
  // modified: Date = new Date()
): tDictionary => {
  if (prevDictionary[translationFrom]) {
    if (prevDictionary[translationFrom]?.[newWord]) {
      return {
        ...prevDictionary,
        [translationFrom]: {
          ...prevDictionary[translationFrom],
          [newWord]: {
            ...prevDictionary[translationFrom]?.[newWord],
            [translationTo]: [
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
        [translationFrom]: {
          ...prevDictionary[translationFrom],
          [newWord]: {
            [translationTo]: [
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
      [translationFrom]: {
        [newWord]: {
          [translationTo]: [
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
  translationFrom: string,
  translationTo: string
): tDictionary => {
  let updatedDictionary = Object.assign({}, prevDictionary);

  if (
    updatedDictionary?.[translationFrom]?.[newWord]?.[translationTo]?.[0] // TODO: For now we operate just the first element of translation array
      ?.translation
  ) {
    delete updatedDictionary?.[translationFrom]?.[newWord]?.[translationTo]?.[0]; // TODO: For now we operate just the first element of translation array

    if (
      !Object.keys(
        updatedDictionary[translationFrom]?.[newWord].translation || {}
      ).length
    ) {
      delete updatedDictionary[translationFrom]?.[newWord];
    }
  }

  return updatedDictionary;
};
