const EntryController = require("../controllers/entry.controller")

module.exports = app => {
    app.get("/api/getEntriesByList/:listName", EntryController.findEntriesByList)
    app.post("/api/createEntry", EntryController.createEntry)
    app.put("/api/entry/:id", EntryController.updateEntry)
    app.patch("/api/entry/rank/:id", EntryController.updateJustRank)
    app.delete("/api/entry/:id", EntryController.deleteEntry)
}