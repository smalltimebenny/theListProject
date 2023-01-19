const EntryController = require("../controllers/entry.controller")
const {authenticate} =require("../config/jwt.config")

module.exports = app => {
    app.get("/api/getBooks", EntryController.findBooks)
    app.get("/api/getMovies", EntryController.findMovies)
    app.get("/api/getMusic", EntryController.findMusic)
    app.get("/api/getEntriesByList/:listName", authenticate, EntryController.findEntriesByList)
    app.post("/api/createEntry", authenticate, EntryController.createEntry)
    app.put("/api/entry/:id", authenticate, EntryController.updateEntry)
    app.patch("/api/entry/rank/:id", authenticate, EntryController.updateJustRank)
    app.delete("/api/entry/:id", authenticate, EntryController.deleteEntry)
}