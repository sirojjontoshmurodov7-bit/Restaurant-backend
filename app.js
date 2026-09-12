require('dotenv').config()
const express = require('express')
const app = express()
const categoryRoutes = require('./routes/categoryRoutes')
const menuItemRoutes = require('./routes/menuItem')
const statsRoutes = require('./routes/dashboardRoutes.js')
const connectDb = require('./config/db')
const PORT = process.env.PORT || 8000
const path = require('path')

const cors = require('cors')
app.use(cors())
app.use(express.json())

app.use('/api/categories', categoryRoutes)
app.use('/api/menu-items', menuItemRoutes)
app.use('/api/stats', statsRoutes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDb().then(app.listen(PORT, () => console.log(`Server ${PORT}-portda ishga tushdi!`)))