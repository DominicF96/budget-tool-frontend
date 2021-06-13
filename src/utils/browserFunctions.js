/**
 * Returns the standardized version of the browser's language.
 *
 * @returns 'fr' or 'en'
 */
const getLang = () => {
  let lang;
  if (navigator.languages !== undefined) lang = navigator.languages[0];
  lang = navigator.language;

  // Standardizes language names.
  if (lang.toLowerCase().indexOf("fr") !== -1) {
    return "fr";
  } else {
    return "en";
  }
};

module.exports = {
  getLang,
};
