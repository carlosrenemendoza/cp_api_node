'use strict';
const environment = require('../config/environment')
const { Client } = require('pg');

exports._query = (query)=>{
    console.log("conexion",environment.connectionString);
    return new Promise((resolve,rejected)=>{
        const client = new Client({
            connectionString: environment.connectionString
        })
        client.connect()
        client.query(query,(err,resp)=>{
            client.end()
            if(err) rejected(err)
            else resolve(resp)
        })
    })
}