const requestResponse = (result) =>{
    const data = {
      error: false,
      msg: 'Berhasil memuat permintaaan',
      result : result
    }
    return data;
  }

  module.exports = { requestResponse }