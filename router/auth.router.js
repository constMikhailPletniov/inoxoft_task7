const { Router } = require('express');
const router = new Router();

const { authControl } = require('../controls');
const { authMiddleWare, userMiddleWare } = require('../middlewares');

router.post(
    '/', userMiddleWare.getByDynamicParam('email'),
    userMiddleWare.isUserByIdExist,
    authControl.login
);
router.post('/logout', authMiddleWare.checkAccessToken, authControl.logout);
router.post(
    '/refresh', authMiddleWare.checkRefreshToken,
    authControl.refreshToken
);

module.exports = router;
