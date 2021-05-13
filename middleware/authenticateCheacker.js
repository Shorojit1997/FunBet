const jwt = require('jsonwebtoken');
const { secretToken } = require('../AppToken/AppToken')

// token authentication cheker 
const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const tokenInfo = await jwt.verify(token, secretToken);
            if (tokenInfo) {
                next();
            }
            else {
                return res.status(403).json({
                    isAdminLogin: false,
                    isUserLogin: false,
                    flashMessage: 'Please login your account...'
                });
            }

        } else {
            return res.status(403).json({
                isAdminLogin: false,
                isUserLogin: false,
                flashMessage: 'Please login your account...'
            });
        }

    }
    catch (e) {
        return res.status(403).json({
            isAdminLogin: false,
            isUserLogin: false,
            flashMessage: 'Please login your account...'
        });
    }

};


// session authentication checker 

const isUserAuthenticated = (req, res, next) => {
    if (!req.session.isUserLogin) {
        return res.status(401).json({
            isUserLogin: 'false',
            flashMessage: 'Please login your account '
        })
    }
    next();
}

const isAdminAuthenticated = (req, res, next) => {
    if (!req.session.isAdminLogin) {
        return res.status(401).json({
            isAdminLogin: 'false',
            flashMessage: 'Please login your account '
        })
    }
    next();
}

const isClubAuthenticated = (req, res, next) => {
    if (!req.session.isClubLogin) {
        return res.status(401).json({
            isClubLogin: 'false',
            flashMessage: 'Please login your account '
        })
    }
    next();
}





module.exports = { authenticateJWT, isUserAuthenticated, isAdminAuthenticated ,isClubAuthenticated};