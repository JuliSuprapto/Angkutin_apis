const router = require('express').Router()
const accessController = require('../controller/access.js')
const multer = require('multer')
const fs = require('fs')

var storageUser = multer.diskStorage({
    filename : function (req, file, cb) {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        cb(null, Date.now() + ext);
    },
    destination : function (req, file, cb) {
        cb(null, './img')
    }
})

var storageDriver = multer.diskStorage({
    filename : function (req, file, cb) {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        cb(null, Date.now() + ext);
    },
    destination : function (req, file, cb) {
        cb(null, './img')
    }
})

var uploadUsers = multer({storage : storageUser}).single("profilephoto")
var uploadDriver = multer({storage : storageDriver}).single("profilephoto")

router.post('/registrasiUser', (req, res) => {
    accessController.registrasiUser(req.body)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.post('/registrasiDriver', (req, res) => {
    accessController.registrasiDriver(req.body)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.post('/login', (req, res) => {
    accessController.login(req.body)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.put("/completeUser/:id", uploadUsers, (req, res) => {
    accessController.lengkapiDataUser(req.params.id, req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.put("/updateUser/:id", uploadUsers, (req, res) => {
    accessController.updateDataUser(req.params.id, req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.put("/completeDriver/:id", uploadDriver, (req, res) => {
    accessController.lengkapiDataDriver(req.params.id, req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.put("/updateDriver/:id", uploadDriver, (req, res) => {
    accessController.updateDataDriver(req.params.id, req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/getdataUser", (req, res) => {
    accessController.getDataUser()
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/getdataUser/:id", (req, res) => {
    accessController.getDataUserId(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

module.exports = router