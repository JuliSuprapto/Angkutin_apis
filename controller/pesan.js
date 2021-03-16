 const accessPesan = require('../model/pesan.js')
 const response = require('../config/response.js')
 const bcrypt = require('bcrypt')
 const mongoose = require('mongoose')
 const ObjectId = mongoose.Types.ObjectId
 const { requestResponse } = require("../setup");

 exports.pesanan = (id ,data) => 
    new Promise((resolve, reject) => {
        // console.log(data)
        accessPesan.findOne({_id : ObjectId(id)})
            .then(access => {
                if(access){
                    resolve(response.commonErrorMsg('Maaf pesanan sudah dilakukan...'))
                }else{
                    accessPesan.create(data)
                        .then(() => resolve(response.commonSuccessMsg('Pesanan sedang diproses...')))
                        .catch((err) =>{
                            console.log(err)
                            reject(response.commonErrorMsg('Opps pesanan belum berhasil...'))
                        })
                    
                }
            }).catch(() => reject(response.commonError))
    })

exports.registrasiDriver = (data) => 
    new Promise((resolve, reject) => {
        // console.log(data)
        accessPesan.findOne({username : data.username})
            .then(access => {
                if(access){
                    resolve(response.commonErrorMsg('Maaf username sudah digunakan...'))
                }else{
                    bcrypt.hash(data.password, 10, (err, hash) => {
                        if(err){
                            reject(response.commonErrorMsg)
                        }else{
                            data.password = hash
                            accessPesan.create(data)
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

exports.lengkapiDataUser = (id, data, profilephoto) =>
    new Promise(async (resolve, reject) => {
        console.log(data)
        accessPesan.updateOne(
            {_id : ObjectId(id)}, {
                profilephoto : profilephoto,
                address : data.address
            }
            ).then(() => {
                accessPesan.findOne({ _id: ObjectId(id) })
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
        accessPesan.updateOne(
            {_id : ObjectId(id)}, {
                profilephoto : profilephoto,
                address : data.address
            }
            ).then(() => {
                accessPesan.findOne({ _id: ObjectId(id) })
                .then(result => {
                    resolve(requestResponse(result))
                })
             
        }).catch(err => {
            console.log(err)
            reject(response.commonErrorMsg('Opps... terjadi kesalahan pada server.'))
        })
    })

exports.getDataPesanan = () =>
    new Promise(async (resolve, reject)=>{
        await accessPesan.find()
            .then(r =>{
                resolve(response.commonResult(r))
            }).catch(err => {
            response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server')
        })
    })

exports.getDataPesananDriver = (id) =>
    new Promise(async (resolve, reject)=>{
        await accessPesan.find({
            _id: ObjectId(id)
            // idDriver : idDriver
        })
            .then(r =>{
                console.log(r[0])
                if(r.length > 0 ){
                    resolve(response.commonResult(r))
                    console.log(response.commonResult(r))
                }else{
                    resolve(response.commonNoData)
                    console.log("kosong")
                }
            }).catch(err => {
                response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server')
            })
    })

exports.getDataPesananUser = (id) =>
    new Promise(async (resolve, reject)=>{
        await accessPesan.findOne({
            _id: ObjectId(id)
            // idUser : idUser
        })
            .then(r =>{
                console.log(r[0])
                if(r){
                    resolve(response.commonResult(r))
                    console.log(response.commonResult(r))
                }else{
                    resolve(response.commonNoData)
                    console.log("kosong")
                }
            }).catch(err => {
                response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server')
            })
    })

exports.deleteDataPesanan = (id) =>
    new Promise(async (resolve, reject) => {
        await accessPesan.deleteOne({
            _id : ObjectId(id)
        })
        .then(() =>{
            resolve(response.commonSuccessMsg('Berhasil Menghapus Data'))
        }).catch(err => {
            resolve(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server'))
        })
    })

exports.updatePesanan = (id, data) =>
    new Promise(async (resolve, reject) => {
        console.log(data)
        accessPesan.updateOne(
            {_id : ObjectId(id)}, {
                status : data.status
            }
            ).then(() => {
                accessPesan.findOne({ _id: ObjectId(id) })
                .then(result => {
                    resolve(requestResponse(result))
                })
             
        }).catch(err => {
            console.log(err)
            reject(response.commonErrorMsg('Opps... terjadi kesalahan pada server.'))
        })
    })