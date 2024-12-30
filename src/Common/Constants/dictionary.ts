import { LanguageCodes, DictionaryObj } from "../Types/dictionary";

export const languageCodes: LanguageCodes = {
  // ISO 639-2 Code
  ENG: "ENG",
  RUS: "RUS",
  UKR: "UKR",
  SPA: "SPA",
  GER: "GER",
};

/*
export const dictionaryObj: tDictionary = {
  // ver 2
  ENG: {
    water: {
      translation: {
        RUS: "вода",
        SPA: "agua",
      },
    },
  },
  RUS: {
    вода: {
      translation: {
        ENG: "water",
        SPA: "agua",
      },
    },
  },
};
*/

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

// dictionary structure ver 3
/*
export const dictionaryObj: tDictionary = {
  ENG: {
    water: {
      RUS: [
        {
          translation: "вода",
          modified: new Date("2019/05/11 20:04:32"),
          order: 1,
        },
        // {
        //   translation: "водичка",
        //   modified: new Date("2019/05/11 20:04:32"),
        //   order: 2,
        // },
      ],
      ESP: [
        {
          translation: "agua",
          modified: new Date("2019/05/11 20:04:32"),
          order: 1,
        },
      ],
    },
  },
  RUS: {
    вода: {
      ENG: [
        {
          translation: "water",
          modified: new Date("2019/05/11 20:04:32"),
          order: 1,
        },
      ],
    },
  },
};

 */

// ver 4
export const dictionaryObj: DictionaryObj = {
  id: "",
  user_id: "",
  dictionary: {
    ENG: {
      water: {
        RUS: [
          {
            translation: "вода",
            modified: new Date("2019/05/11 20:04:32"),
            order: 1,
          },
        ],
        ESP: [
          {
            translation: "agua",
            modified: new Date("2019/05/11 20:04:32"),
            order: 1,
          },
        ],
      },
    },
    RUS: {
      вода: {
        ENG: [
          {
            translation: "water",
            modified: new Date("2019/05/11 20:04:32"),
            order: 1,
          },
        ],
      },
    },
  },
};
