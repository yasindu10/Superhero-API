const CustomErrorHandeller = require('../errors/custom-error-handellers')

const errorHandeller = (err, req, res, next) => {
    if(err instanceof CustomErrorHandeller) {
        console.log(`custom error ${err.message}`)
        return res.status(200).json({success : false, msg : err.message})
    }

    console.log(`system error ${err.message}`)
    res.status(200).json({success : false, msg : err.message})
}

module.exports = errorHandeller
