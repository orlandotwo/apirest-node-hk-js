const getCurrentDate = () => {
    const date  = new Date();
    const currentDate = date.toLocaleDateString();
    const currentTime = date.toTimeString();
    const currentNumberDate = Date.now()/1000;

    const resp = {
        date,
        currentDate,
        currentTime,
        currentNumberDate
    }
    //console.log(resp)
    return resp;
}


module.exports = {
    getCurrentDate
}