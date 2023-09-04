type Translation = {
  [index: string]: string;
};

type Modified = Date;

type Word = {
  [index: string]: {
    translation: Translation;
    // modified: Modified;
  };
};

export type tDictionary = {
  [index: string]: Word;
};

export type LanguageCodes = {
  [index: string]: string;
};