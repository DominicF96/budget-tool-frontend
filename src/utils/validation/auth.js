// Implement the same schema validation library used by the backend.
export const MIN_PASSWORD_LENGTH = 8;
export const reOneLowercase = new RegExp(/(?=.*[a-z])/);
export const reOneUppercase = new RegExp(/(?=.*[A-Z])/);
export const reOneDigit = new RegExp(/(?=.*\d)/);
export const reOneSpecialChar = new RegExp(/(?=.*\W)/);
export const reEmail = new RegExp(
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
);
export const reCCExp = new RegExp(/(0[1-9]|10|11|12)\/[0-9]{2}/);

const _testAllPasswordRegex = password => {
  return (
    reOneLowercase.test(password) &&
    reOneUppercase.test(password) &&
    reOneDigit.test(password) &&
    reOneSpecialChar.test(password) &&
    password.length >= MIN_PASSWORD_LENGTH
  );
};

export const isPasswordValid = password => {
  return password && _testAllPasswordRegex(password);
};

export const isPasswordInvalid = password => {
  return password && password.length > 0 && !_testAllPasswordRegex(password);
};

export const isPasswordConfirmValid = (password, confirm_password) => {
  return (
    password &&
    confirm_password &&
    password.indexOf(confirm_password) !== -1 &&
    password.length === confirm_password.length
  );
};

export const isPasswordConfirmInvalid = (password, confirm_password) => {
  return (
    password &&
    !(
      password.indexOf(confirm_password) !== -1 &&
      password.length === confirm_password.length
    )
  );
};
