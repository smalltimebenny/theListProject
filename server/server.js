const express = require("express")
const app= express()
const PORT = 8000
const cors=require("cors")
require("dotenv").config()
const cookieParser = require("cookie-parser")

require("./config/mongoose.config")
app.use(express.json(), express.urlencoded({extended:true}))
app.use(cors({credentials:true, origin:'http://localhost:3000' }))

app.use(cookieParser())

const AllMyEntryRoutes = require("./routes/entries.routes")
AllMyEntryRoutes(app)

const AllMyListerRoutes = require("./routes/lister.routes")
AllMyListerRoutes(app)

const AllMyListRoutes = require("./routes/lists.routes")
AllMyListRoutes(app)

app.listen(PORT, ()=>console.log(`The server is listening on port ${PORT}.`))