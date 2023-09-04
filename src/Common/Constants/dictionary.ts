import { LanguageCodes, tDictionary } from "../Types/dictionary";

export const languageCodes: LanguageCodes = {
  // ISO 639-2 Code
  ENG: "ENG",
  RUS: "RUS",
  UKR: "UKR",
  SPA: "SPA",
  GER: "GER",
};

export const dictionaryObj: tDictionary = {
  // ver 2
  ENG: {
    water: {
      translation: {
        RUS: "вода",
        SPA: "agua",
      },
      // modified: new Date("2019/05/11 20:04:32"), // yyyy/MM/dd hh:mm:ss
    },
  },
  RUS: {
    вода: {
      translation: {
        ENG: "water",
        SPA: "agua",
      },
      // modified: new Date("2019/05/11 20:04:32"),
    },
  },
};

// кохання - любовь - love
// любов - любовь - love
/*
dictionary: { // ver 1
  eng: {
    word: "water",
    translation: {
      rus: "вода"
    }
  },
  rus: {
    word: "вода",
    translation: {
      eng: "water"
    }
  }
}

dictionary: { // ver 2
  eng: {
    water: {
      // word: "water", // = key
      translation: {
        rus: "вода",
        esp: "agua"
      }
    }
  },
  rus: {
    вода: {
      // word: "вода", // = key
      translation: {
        eng: "water",
        esp: "agua"
      }
    }
  }
}



 */
