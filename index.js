const express = require('express')
const posts = require('./data/posts.js')
const postsRouter = require('./routers/posts.js')
const categoryRouter = require('./routers/category.js')
const app = express()
const port = 3000
const notFound = require('./middlewares/notFound.js')
const errorsHandler = require('./middlewares/errorsHandler.js')
const cors = require('cors')

app.use(cors())
app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server del mio blog')
})

app.get('/bacheca', (req, res) => {
    console.log(req.query.limit);
    res.json({
        result: posts.slice(0, req.query.limit),
        count: posts.length,
    })
})
app.use('/posts', postsRouter)
app.use('/category', categoryRouter)

app.use(errorsHandler)
app.use(notFound)


app.listen(port, () => {
    console.log(port)
})