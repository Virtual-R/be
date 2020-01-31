const server = require('./api/server')

const PORT = process.env.PORT || 5000;

server.get('/', (req, res, next) => {
    res.json({
        message: 'Virtual Reality Funding project API.'
    })
})

server.use((err, req, res, next) => {
    console.log("Error: ", err)
    res.status(500).json({
        message: "Something went horribly wrong."
    })
})

server.listen(PORT, () => {
    console.log(`\n** Running on http://localhost:${PORT}... **\n`)
})