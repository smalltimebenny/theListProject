const { authenticate } = require("../config/jwt.config")
const ListerController = require("../controllers/lister.controller")

module.exports = (app) => {
    app.post("/api/registerLister", ListerController.createLister)
    app.post("/api/loginLister", ListerController.loginLister)
    app.get("/api/logoutLister", ListerController.logoutLister)
    app.get("/api/lister/findOne/:_id", ListerController.findOneLister)
    app.get("/api/lister/loggedIn", authenticate, ListerController.getLoggedInLister)
    app.put("/api/lister/addToConsumed/:_id/:entryId/", ListerController.addToConsumed)
    app.put("/api/lister/addToDoNotWant/:_id/:entryId", ListerController.addToDoNotWant)
}