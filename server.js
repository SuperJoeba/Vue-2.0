const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const compression = require('compression');
const proxy = require('http-proxy-middleware');
const env = process.env.NODE_ENV;

app.use(compression());
app.use(express.static(path.resolve(__dirname, './dist')))
app.use('/mms_api', proxy({
    target: 'https://test.comma.com.cn',
    changeOrigin: true
}))

app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
    res.send(html)
})

if (env === 'production') {
    app.listen(8082);
} else {
    app.listen(8083)
}