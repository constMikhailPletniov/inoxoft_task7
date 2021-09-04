/* eslint-disable prefer-regex-literals */
/* eslint-disable require-unicode-regexp */
module.exports = {
    CURRENT_YEAR: new Date().getFullYear(),
    // eslint-disable-next-line max-len
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    // eslint-disable-next-line max-len
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/)
};
