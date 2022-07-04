const { createProxyMiddleware } = require('http-proxy-middleware');

const PROXY_HOST = process.env.REACT_APP_PROXY_HOST || 'http://localhost:8000';
module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: PROXY_HOST,
            changeOrigin: true,
        })
    );
};