const { authenticate } = require("../config/jwt.config")
const ListerController = require("../controllers/lister.controller")

module.exports = (app) => {
    app.post("/api/registerLister", ListerController.createLister)
    app.post("/api/loginLister", ListerController.loginLister)
    app.get("/api/logoutLister", ListerController.logoutLister)
    // app.get("api/lister/findOne/:email", ListerController.findOneLister)
    app.get("/api/lister/loggedIn", authenticate, ListerController.getLoggedInLister)
}