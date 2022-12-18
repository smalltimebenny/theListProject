const express = require("express")
const app= express()
const PORT = 8000
const cors=require("cors")

require("./config/mongoose.config")
app.use(express.json(), express.urlencoded({extended:true}))
app.use(cors())

const AllMyEntryRoutes = require("./routes/entries.routes")
AllMyEntryRoutes(app)

app.listen(PORT, ()=>console.log(`The server is listening on port ${PORT}.`))