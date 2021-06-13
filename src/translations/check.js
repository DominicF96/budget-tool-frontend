const en = require("./en");
const fr = require("./fr");

/*
 * This script validates that every translation is available in every language,
 * indicating the missing values to prevent partial translations.
 *
 * The script considers that the dictionnaries are flat (no object).
 */

const translations = [
  {
    lang: "en",
    dict: en,
  },
  {
    lang: "fr",
    dict: fr,
  },
];

function _mergeTranslations() {
  // console.log('Merging translations...');
  const expected = [];
  const allKeys = {};
  translations.forEach((translation) => {
    expected.push(translation.lang);
    Object.keys(translation.dict).forEach((key) => {
      if (allKeys[key]) {
        allKeys[key] = [...allKeys[key], translation.lang];
      } else {
        allKeys[key] = [translation.lang];
      }
    });
  });
  // console.log('Merged dictionaries', allKeys);
  return {
    expected,
    allKeys,
  };
}

// Having a second pass of the merged array is not optimal
// (check could be made once last translation key is added),
// but with the size of translation files, it shouldn't be
// an issue and it keeps things cleaner.
function _findMissingTranslations(expected, allKeys) {
  const missings = [];
  Object.keys(allKeys).forEach((key) => {
    const missingLanguages = expected.filter((k) => allKeys[key].indexOf(k) === -1);
    if (missingLanguages.length > 0) {
      missings.push({
        key,
        missingLanguages,
      });
    }
  });
  return missings;
}

function _printMissings(missings) {
  missings.forEach((missing) => {
    console.error(`MISSING >>> [${missing.missingLanguages}] for "${missing.key}".`);
  });
}

module.exports.run = function () {
  console.log("===========================================");
  console.log("Validating Translations");
  console.log("-------------------------------------------");
  const {expected, allKeys} = _mergeTranslations();
  const missings = _findMissingTranslations(expected, allKeys);
  if (missings.length > 0) {
    _printMissings(missings);
    console.error("-------------------------------------------");
    console.error("There are missing translations (see above).");
    console.error("===========================================");
    throw new Error("There are missing translations (see above)"); // Check Failed
  }
  console.log("No Missing Translations Found!");
  console.log("===========================================");
  return 0; // Check succeeded.
};
