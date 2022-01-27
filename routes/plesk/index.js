'use strict';
const api = require('express').Router();
const ControllerPlesk = require('../../controllers/plesk')

module.exports = (()=>{
  api.post('/plesk',
  ControllerPlesk.plesk,
  ControllerPlesk.Postplesk
  );
  return api;
})();
