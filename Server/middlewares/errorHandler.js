module.exports = function errorHandler (err, req, res, next){
    let status;
    let message;

    switch (err.name){
        default:
            console.log(err)
            status =  500
            message = `Internal Server Error`
        break
    }

    res.status(status).json({message})
}