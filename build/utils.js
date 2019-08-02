const path = require('path');
const os = require('os');


module.exports = {
  resolve(dir) {
    return path.join(__dirname, '..', dir)
  },
  getAddressIp() {
    const inter = os.networkInterfaces();
    const localNet = inter.en0;
    return localNet.find(item => item.family == 'IPv4').address
  }
}

