var http = require('http');
var qs = require('querystring');
http.createServer(function (request,response) {
    request.setEncoding('utf-8');
    response.setHeader('Access-Control-Allow-Origin','*');


    var requestData = '';
    request.on('data',function (dataChunk) {
        requestData += dataChunk;
    });
    request.on('end',function () {
        var requestObj = JSON.parse(requestData);
        //发送到掌游宝的数据
        var zybRequestData = qs.stringify(requestObj);
        // 设置发送请求的配置项
        var options = {
            host:'yxzj.service.zhangyoubao.com',
            path:'/service/rest',
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length' : zybRequestData.length
            }
        }

        //创建一个请求对象
        var req = http.request(options,function (zybRes) {
            var zybResData = '';
            zybRes.on('data',function (zybDataChunk) {
                zybResData += zybDataChunk;
            });
            zybRes.on('end',function () {
                response.end(zybResData);
            });
        }).on('error',function (e) {
            response.end(e.message);
        });
        // 把数据写入请求对象
        req.write(zybRequestData);
        //发起请求
        req.end();
    });
}).listen(9999);
console.log('服务已经启动，端口9999');