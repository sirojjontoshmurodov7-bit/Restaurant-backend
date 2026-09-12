exports.roleMiddleware = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            res.status(403).json({
                message: "Kirishga ruxsat yo'q!"
            })
        }
        next()
    }
}