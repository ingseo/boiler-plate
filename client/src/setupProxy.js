const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({ //프론트엔드(포트 3000)에서 request를 줄 때
            target: 'http://localhost:5000', // 포트 5000으로 보내겠다!
            changeOrigin: true,
        })
    );
};