const router = require('express').Router()
const pesanController = require('../controller/pesan.js')
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

router.post('/addPesanan', (req, res) => {
    pesanController.pesanan(req.params.id, req.body)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.post('/registrasiDriver', (req, res) => {
    pesanController.registrasiDriver(req.body)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.put("/completeUser/:id", uploadUsers, (req, res) => {
    pesanController.lengkapiDataUser(req.params.id, req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.put("/completeDriver/:id", uploadDriver, (req, res) => {
    pesanController.lengkapiDataDriver(req.params.id, req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/getdataPesanan", (req, res) => {
    pesanController.getDataPesanan()
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/getdataPesananDriver/:idDriver", (req, res) => {
    pesanController.getDataPesananDriver(req.params.idDriver)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/getdataPesananUser/:idUser", (req, res) => {
    pesanController.getDataPesananUser(req.params.idUser)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.delete("/deleteDataPesanan/:id", (req, res) => {
    pesanController.deleteDataPesanan(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.put("/updateDataPesanan/:id", (req, res) => {
    pesanController.updatePesanan(req.params.id, req.body)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

module.exports = router