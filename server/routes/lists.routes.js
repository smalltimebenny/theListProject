const ListController = require("../controllers/lists.controller")
const {authenticate} =require("../config/jwt.config")

module.exports = app => {
    app.get("/api/list/:id", authenticate, ListController.getOneList),
    app.post("/api/createList", authenticate, ListController.createList),
    app.put("/api/list/addToLol/:id", authenticate, ListController.addToListOfLists),
    app.put("/api/list/removeFromLol/:id", authenticate, ListController.removeFromListOfLists),
    app.delete("/api/list/:id", authenticate, ListController.deleteList)
}