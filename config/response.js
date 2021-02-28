module.exports = {
    commonError : {
        error : true,
        msg : "Terjadi kesalahan pada server"
    },
    commonErrorMsg : (msg) => {
        return {
            error : true,
            msg : msg
        }
    },
    commonSucces : {
        error : false,
        msg : "Berhasil memuat permintaan ke server"
    },
    commonSuccessMsg : (msg) => {
        return {
            error : false,
            msg : msg
        }
    },
    commonResult : (data) => {
        return {
            error : false,
            msg : "Berhasil memuat data",
            data : data
        }
    }
};