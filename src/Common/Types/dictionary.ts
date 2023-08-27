type Translation = {
  [index: string]: string;
};

type Word = {
  [index: string]: {
    translation: Translation;
  };
};

export type tDictionary = {
  [index: string]: Word;
};
