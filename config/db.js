const dns = require('dns')

dns.setServers(['8.8.8.8', '8.8.4.4'])
const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_LINK)
        console.log('MongoDB ulandi!')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = connectDB