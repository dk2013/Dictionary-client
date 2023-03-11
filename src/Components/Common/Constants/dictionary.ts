import { tDictionary } from "../Types/dictionary";

export const enum languageCodes { // ISO 639-2 Code
  ENG = "ENG",
  RUS = "RUS",
  UKR = "UKR",
  SPA = "SPA",
  GER = "GER",
}

export const dictionaryObj: tDictionary = {
  // ver 2
  ENG: {
    water: {
      translation: {
        RUS: "вода",
        SPA: "aqua",
      },
    },
  },
  RUS: {
    вода: {
      translation: {
        ENG: "water",
        SPA: "aqua",
      },
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
        esp: "aqua"
      }
    }
  },
  rus: {
    вода: {
      // word: "вода", // = key
      translation: {
        eng: "water",
        esp: "aqua"
      }
    }
  }
}

 */
