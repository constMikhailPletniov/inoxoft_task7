/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable require-atomic-updates */
/* eslint-disable max-statements */
const { constants, dataEnum, statusEnum } = require('../config');
const { OAuth, Pest } = require('../database');
const { ErrorHandler } = require('../errors/errors.handler');
const jwtService = require('../services/jwt.service');


module.exports = {

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(
                    statusEnum.UNAUTHORIZED,
                    'No token'
                );
            }

            jwtService.verifyTokens(token);

            const dbToken = await OAuth.findOne({ accessToken: token }).
                populate(dataEnum.USER);

            if (!dbToken) {
                throw new ErrorHandler(
                    statusEnum.UNAUTHORIZED,
                    'Invalid Token'
                );
            }
            req.currentUser = dbToken.user;
            next();
        } catch (err) {
            next(err);
        }
    },
    checkId: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);
            const { user_id } = req.params;
            const current = await OAuth.findOne({ accessToken: token }).
                populate(dataEnum.USER);
            const id = current.user._id.toString();
            const param = user_id.toString();
            if (id !== param) {
                throw new ErrorHandler(statusEnum.FORBIDDEN, 'Forbidden');
            }
            res.status(statusEnum.OK);
            next();
        } catch (err) {
            next(err);
        }
    },
    checkPestId: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);
            const { pest_id } = req.params;
            const currentPest = await Pest.findById(pest_id);
            const current = await OAuth.findOne({ accessToken: token }).
                populate(dataEnum.USER);
            const id = current.user._id.toString();
            const param = currentPest.user.toString();
            if (id !== param) {
                throw new ErrorHandler(statusEnum.FORBIDDEN, 'Forbidden');
            }
            res.status(statusEnum.OK);
            next();
        } catch (err) {
            next(err);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {

            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(
                    statusEnum.UNAUTHORIZED,
                    'No token'
                );
            }

            jwtService.verifyTokens(token, 'refresh');

            const tokenFromDB = await OAuth.findOne({ refreshToken: token }).
                populate(dataEnum.USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(
                    statusEnum.UNAUTHORIZED,
                    'Invalid token'
                );
            }

            req.currentUser = tokenFromDB.user;

        } catch (err) {
            next(err);
        }
    }

}
