const jwt = require('jsonwebtoken')

exports.checkLogin = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_KEY)

        req.userData = decoded
        next()
    }
    catch (err) {
        return res.status(401).json({
            message: "Auth failure !"
        })
    }
}