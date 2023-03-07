const express = require('express')
const route = express.Router();
const controller = require('./controller')


route.post("/register",controller.storeData);
route.get("/getdata",controller.displayData)
route.delete("/delete/:id",controller.deleteData)
route.put("/update/:id",controller.updateData)
module.exports = route;