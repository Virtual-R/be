module.exports = (type) => (req, res, next) => {
    let time = new Date();
    let utcTime = time.toUTCString();

    if(type === 'long') {
        console.log(`long request: ${req.method} -- ${req.url} -- ${req.url} -- ${utcTime} `)
        next()

    } else if (type === 'short') {
        console.log(`short request: ${req.ip} -- ${req.protocol} -- ${req.url} -- ${req.get("User-Agent")} `)
        next()

    } else {
        console.log(req)
        return
    }     
}