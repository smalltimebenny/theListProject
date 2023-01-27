const EntryController = require("../controllers/entry.controller")
const {authenticate} =require("../config/jwt.config")

module.exports = app => {
    app.get("/api/getBooks", EntryController.findBooks)
    app.get("/api/getMovies", EntryController.findMovies)
    app.get("/api/getMusic", EntryController.findMusic)
    app.get("/api/getEntriesByList/:listName", authenticate, EntryController.findEntriesByList)
    app.post("/api/createEntry", EntryController.createEntry)
    app.patch("/api/entry/:id", EntryController.updateEntry)
    app.patch("/api/entry/rank/:id", EntryController.updateJustRank)
    app.delete("/api/entry/:id", EntryController.deleteEntry)
    app.get("/api/entry/findOne/:_id", EntryController.findOneEntry)
    app.get("/api/entry/findEntriesByLister/:_id", EntryController.findEntriesByLister )
}