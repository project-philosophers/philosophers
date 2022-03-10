const error = (message) => {
    const error = {
        "error": message
    }
    return error;
}

module.exports = error;