 const accessModel = require('../model/access.js')
 const response = require('../config/response.js')
 const bcrypt = require('bcrypt')
 const mongoose = require('mongoose')
 const ObjectId = mongoose.Types.ObjectId
 const { requestResponse } = require("../setup");

 exports.registrasiUser = (data) => 
    new Promise((resolve, reject) => {
        // console.log(data)
        accessModel.findOne({username : data.username})
            .then(access => {
                if(access){
                    resolve(response.commonErrorMsg('Maaf username sudah digunakan...'))
                }else{
                    bcrypt.hash(data.password, 10, (err, hash) => {
                        if(err){
                            reject(response.commonErrorMsg)
                        }else{
                            data.password = hash
                            accessModel.create(data)
                                .then(() => resolve(response.commonSuccessMsg('Selamat anda berhasil terdaftar...')))
                                .catch((err) =>{
                                    console.log(err)
                                    reject(response.commonErrorMsg('Opps registrasi belum berhasil...'))
                                })
                        }
                    })
                }
            }).catch(() => reject(response.commonError))
    })

exports.registrasiDriver = (data) => 
    new Promise((resolve, reject) => {
        // console.log(data)
        accessModel.findOne({username : data.username})
            .then(access => {
                if(access){
                    resolve(response.commonErrorMsg('Maaf username sudah digunakan...'))
                }else{
                    bcrypt.hash(data.password, 10, (err, hash) => {
                        if(err){
                            reject(response.commonErrorMsg)
                        }else{
                            data.password = hash
                            accessModel.create(data)
                                .then(() => resolve(response.commonSuccessMsg('Selamat anda berhasil terdaftar...')))
                                .catch((err) =>{
                                    console.log(err)
                                    reject(response.commonErrorMsg('Opps registrasi belum berhasil...'))
                                })
                        }
                    })
                }
            }).catch(() => reject(response.commonError))
    })

exports.login = (data) => 
    new Promise((resolve, reject) => {
        accessModel.findOne({
            username : data.username
        }).then(access => {
            if(access){
                if(bcrypt.compareSync(data.password, access.password)){
                    resolve(response.commonResult(access))
                }else{
                    reject(response.commonErrorMsg('Maaf password anda salah...'))
                }
            }else{
                reject(response.commonErrorMsg('Maaf username tidak ditemukan...'))
            }
        })
    })

exports.lengkapiDataUser = (id, data, profilephoto) =>
    new Promise(async (resolve, reject) => {
        console.log(data)
        accessModel.updateOne(
            {_id : ObjectId(id)}, {
                profilephoto : profilephoto,
                address : data.address
            }
            ).then(() => {
                accessModel.findOne({ _id: ObjectId(id) })
                .then(result => {
                    resolve(requestResponse(result))
                })
             
        }).catch(err => {
            console.log(err)
            reject(response.commonErrorMsg('Opps... terjadi kesalahan pada server.'))
        })
    })

exports.updateDataUser = (id, data, profilephoto) =>
    new Promise(async (resolve, reject) => {
        console.log(data)
        accessModel.updateOne(
            {_id : ObjectId(id)}, {
                fullname : data.fullname,
                phone : data.phone,
                email : data.email,
                profilephoto : profilephoto,
                address : data.address
            }
            ).then(() => {
                accessModel.findOne({ _id: ObjectId(id) })
                .then(result => {
                    resolve(requestResponse(result))
                })
             
        }).catch(err => {
            console.log(err)
            reject(response.commonErrorMsg('Opps... terjadi kesalahan pada server.'))
        })
    })

exports.lengkapiDataDriver = (id, data, profilephoto) =>
    new Promise(async (resolve, reject) => {
        console.log(data)
        accessModel.updateOne(
            {_id : ObjectId(id)}, {
                profilephoto : profilephoto,
                address : data.address
            }
            ).then(() => {
                accessModel.findOne({ _id: ObjectId(id) })
                .then(result => {
                    resolve(requestResponse(result))
                })
             
        }).catch(err => {
            console.log(err)
            reject(response.commonErrorMsg('Opps... terjadi kesalahan pada server.'))
        })
    })

exports.updateDataDriver = (id, data, profilephoto) =>
    new Promise(async (resolve, reject) => {
        console.log(data)
        accessModel.updateOne(
            {_id : ObjectId(id)}, {
                fullname : data.fullname,
                phone : data.phone,
                email : data.email,
                profilephoto : profilephoto,
                address : data.address
            }
            ).then(() => {
                accessModel.findOne({ _id: ObjectId(id) })
                .then(result => {
                    resolve(requestResponse(result))
                })
             
        }).catch(err => {
            console.log(err)
            reject(response.commonErrorMsg('Opps... terjadi kesalahan pada server.'))
        })
    })

exports.updateDataStatus = (id, data) =>
    new Promise(async (resolve, reject) => {
        console.log(data)
        accessModel.updateOne(
            {_id : ObjectId(id)}, {
                status : data.status
            }
            ).then(() => {
                accessModel.findOne({ _id: ObjectId(id) })
                .then(result => {
                    resolve(requestResponse(result))
                })
             
        }).catch(err => {
            console.log(err)
            reject(response.commonErrorMsg('Opps... terjadi kesalahan pada server.'))
        })
    })

exports.getDataUser = () =>
    new Promise(async (resolve, reject)=>{
        await accessModel.find()
            .then(r =>{
                resolve(response.commonResult(r))
            }).catch(err => {
            response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server')
        })
    })

exports.getDataUserId = (id) =>
    new Promise(async (resolve, reject)=>{
        await accessModel.findOne({
            _id: ObjectId(id)
        })
            .then(r =>{
                resolve(response.commonResult(r))
            }).catch(err => {
                response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server')
            })
    })