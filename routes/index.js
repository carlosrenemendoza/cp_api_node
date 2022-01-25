
const api = require('express').Router();

module.exports = (()=>{
    api.get('/',(req,res)=>res.send({
        message : 'API_READY',
        code : 200
    }));
    return api;
})();