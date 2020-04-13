let spotify = require('./spotify.js')
exports.cookieWare = async (req, res, next) => {
    console.log('CHECKING COOKIES')
    if (!req.cookies.token) {
        try {
            let token = await spotify.getToken()
            res.cookie("token", token, { expire: 3600000 + Date.now() });
            next()
        }
        catch (error) {
            console.log(error)
            next()
        }
    }
    next()
}