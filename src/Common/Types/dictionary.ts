import { languageCodes } from "../Constants/dictionary";

type Translation = {
  [index in languageCodes]?: string;
};

type Word = {
  [index: string]: {
    translation: Translation;
  };
};

export type tDictionary = {
  [index in languageCodes]?: Word;
};
