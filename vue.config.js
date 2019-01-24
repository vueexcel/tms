// vue.config.js
module.exports = {
    devServer: {
        proxy: 'http://192.168.1.102:8080/'
        // proxy: 'http://127.0.0.1:5000/'
        // proxy: 'http://localhost:8080'
    }
}