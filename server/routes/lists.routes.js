const ListController = require("../controllers/lists.controller")

module.exports = app => {
    app.get("/api/list/:id", ListController.getOneList),
    app.post("/api/createList", ListController.createList),
    app.put("/api/list/addToLol/:id", ListController.addToListOfLists),
    app.put("/api/list/removeFromLol/:id", ListController.removeFromListOfLists),
    app.delete("/api/list/:id", ListController.deleteList)
}