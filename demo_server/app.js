// 1.导入服务器
const express = require('express')
// 2.创建web服务器
const app = express()
// 3.托管静态资源
app.use(express.static('./dist'))
// 3.启动web服务器（80为端口号）
app.listen(80,() => {
    console.log('server running at http://127.0.0.2')
})