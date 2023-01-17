const ListerController = require("../controllers/lister.controller")

module.exports = (app) => {
    app.post("/api/registerLister", ListerController.createLister)
    app.post("/api/loginLister", ListerController.loginLister)
    app.get("/api/logoutLister", ListerController.logoutLister)
}