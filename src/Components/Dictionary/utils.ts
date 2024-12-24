import { tDictionary } from "../../Common/Types/dictionary";

export const saveAndGetUpdatedDictionary = (
  prevDictionary: tDictionary,
  newWord: string,
  translation: string,
  translationFrom: string,
  translationTo: string
): tDictionary => {
  // Delete current reversed translation
  let updatedDictionary = deleteAndGetUpdatedDictionary(
    prevDictionary,
    newWord,
    translationFrom,
    translationTo
  );

  // Save direct translation
  updatedDictionary = saveAndGetUpdatedDictionaryObject(
    updatedDictionary,
    newWord,
    translation,
    translationFrom,
    translationTo
  );

  // Save reversed translation
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
  translationFrom: string,
  translationTo: string
): tDictionary => {
  const currentTranslation =
    prevDictionary[translationFrom]?.[newWord]?.[translationTo]?.[0]
      ?.translation;

  // Delete direct translation
  let updatedDictionary = deleteAndGetUpdatedDictionaryObject(
    prevDictionary,
    newWord,
    translationFrom,
    translationTo
  );

  // Delete reversed translation
  updatedDictionary = deleteAndGetUpdatedDictionaryObject(
    updatedDictionary,
    currentTranslation,
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
  translationFrom: string,
  translationTo: string
): tDictionary => {
  let updatedDictionary = Object.assign({}, prevDictionary);

  if (
    updatedDictionary?.[translationFrom]?.[newWord]?.[translationTo]?.[0] // TODO: For now we operate just the first element of translation array
      ?.translation
  ) {
    delete updatedDictionary?.[translationFrom]?.[newWord]?.[translationTo]; // TODO: For now we operate just the first element of translation array

    if (
      !Object.keys(updatedDictionary[translationFrom]?.[newWord] || {}).length
    ) {
      delete updatedDictionary[translationFrom]?.[newWord];
    }
  }

  return updatedDictionary;
};
