export type LanguageCodes = {
  [index: string]: string;
};

type Translation = string;
type Modified = Date;
type Order = number;

type Word = {
  translation: Translation;
  modified: Modified;
  order: Order;
};

type Translations = {
  [index in keyof LanguageCodes]: Word[];
};

type Words = {
  [index: string]: Translations;
};

export type tDictionary = {
  [index in keyof LanguageCodes]: Words;
};
