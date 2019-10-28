
const dashboard = (req, res) => {
    res.send("it's worked user id " + req.user._id);
}

module.exports = {
    dashboard: dashboard
}