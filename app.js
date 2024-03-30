require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const errorHandeller = require('./middlewares/errorHandeller.js')
const notFound = require('./middlewares/routeNotFound.js')
const connectDb = require('./db/connectDb')

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')

const hero = require('./routes/heros.js')

app.use(cors({ origin: "*" }))
app.use(helmet())
app.use(xss())

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

app.use('/api/v1/heros', hero)

app.use(errorHandeller)
app.use(notFound)

const port = process.env.PORT || 8080
const start = async () => {
    await connectDb(process.env.MONGO_URL)
    app.listen(port, () => {
        console.log(`server is listening to port ${port}`)
    })
}
start()