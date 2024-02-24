
const routeNotFound = (req, res) => {
    res.status(200).json({success : false, msg : 'not found'})
}

module.exports = routeNotFound
