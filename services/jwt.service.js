/* eslint-disable no-ternary */
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../errors/errors.handler');
const { statusEnum } = require('../config');

module.exports = {
    generateTokens: () => {
        const accessToken = jwt.sign(
            {}, statusEnum.ACCESS_TOKEN_SECRET,
            { expiresIn: '30m' }
        );
        const refreshToken = jwt.sign(
            {}, statusEnum.REFRESH_TOKEN_SECRET,
            { expiresIn: '30d' }
        );
        return {
            accessToken,
            refreshToken
        };
    },
    verifyTokens: (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access'
                ? statusEnum.ACCESS_TOKEN_SECRET
                : statusEnum.REFRESH_TOKEN_SECRET;
            jwt.verify(token, secret);
        } catch (err) {
            throw new ErrorHandler(statusEnum.UNAUTHORIZED, 'Invalid token');
        }

    }
}
