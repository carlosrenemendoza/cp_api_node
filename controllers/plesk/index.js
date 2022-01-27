"use strict";
const db = require("../../db");
const request = require("request");
const axios = require("axios");
const moment = require("moment");
const Joi = require("@hapi/joi");
const format = require("pg-format");
const async = require("async");
const shell = require("shelljs");
const fs = require("fs");
const path = require("path");
// var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
shell.config.silent = true;

let Sandbox = 'https://wppsandbox.mit.com.mx/gen'
/*==================================================
= conexion plesk   =
===================================================*/

exports.plesk = async (req, res, next) => {

  let filePath = path.join(__dirname, "../../utils/base.xml");
  console.log("filePath", filePath);

  fs.readFile(filePath, "utf8", function (err, data) {
    console.log("data", data);
    if (err) {
      return res.status(500).send({
        message: "INTERNAL_DB_SERVER",
        error: err,
        customMessage: "DB ERROR",
        code: 500,
      });
    } else {
      var originalString = data;
      var key = "5DCC67393750523CD165F17E1EFADD21";
      var ciphertext = CryptoJS.AES.encrypt(originalString, key).toString();
      console.log("ciphertext: " + ciphertext);
      req.ciphertext = ciphertext
      next();
    }
  });

  try {
  } catch (error) {
    console.log("error-->", error);
    res.status(500).send({
      message: "plesk  error",
      error: error,
    });
  }
};

exports.Postplesk = async (req, res, next) => {
  console.log("entre a la funcion Postplesk");
  console.log("req.ciphertext",req.ciphertext);

  let xmlPay = `<pgs>
  <data0>Cadena fija asignada al comercio</data0>
  <data>${req.ciphertext}</data>
</pgs>`
  try {
    let response = await axios.post(`${Sandbox}?xml=${xmlPay}`);
    console.log("response",response);
  } catch (error) {
    console.log('error ¡¡',error);
  }


}
