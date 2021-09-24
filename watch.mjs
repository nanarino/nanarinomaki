/**
 * @time '2021/09/22'
 * @name 'pug-styl-simple-watcher'
 * @author 'kogawananari'
 */


import { networkInterfaces } from "os"
import { promisify } from "util"
import http from "http"
import path from "path"
import fs from "fs"
const readFile = promisify(fs.readFile)
import pug from "pug"
const pugRenderSync = pug.render
import styl from "stylus"
const stylRender = promisify(styl.render)
import { createInterface } from "readline"


// await input(question)
const input = async question => {
    return new Promise((resolve, reject) => {
        const readline = createInterface({
            input: process.stdin,
            output: process.stdout
        })
        readline.question(question, ipt => {
            ipt ? resolve(ipt) : reject('')
            readline.close()
        })
    })
}


//http-server@res   html||pug , css||styl
const server = http.createServer(async (req, res) => {
    let pathname = path.join(process.cwd(), decodeURIComponent(req.url))
    if (path.extname(pathname) == "") {
        pathname += "/";
    }
    if (pathname.charAt(pathname.length - 1) == "/") {
        pathname += "index.html";
    }
    try {//捕获fileNotFound
        let data
        switch (path.extname(pathname)) {
            case ".html":
                try {//捕获fileNotFound
                    data = await readFile(pathname)
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(data)
                    return
                } catch (err) {//进入next CASE
                    pathname = pathname.replace(/\.html$/, '.pug')
                }
            case ".pug":
                data = await readFile(pathname)
                try {//捕获Pug模板引擎编译错误
                    data = pugRenderSync(data, { filename: './' })
                } catch (err) {
                    data = err.toString()
                }
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data)
                break;
            case ".css":
                try {//捕获fileNotFound
                    data = await readFile(pathname)
                    res.writeHead(200, { "Content-Type": "text/css" });
                    res.end(data)
                    return
                } catch (err) {//进入next CASE
                    pathname = pathname.replace(/\.css$/, '.styl')
                }
            case ".styl":
                data = await readFile(pathname)
                try {//捕获Styl预处理器编译错误
                    data = await stylRender(data.toString('utf8'))
                } catch (err) {
                    data = err.toString()
                }
                res.writeHead(200, { "Content-Type": "text/css" });
                res.end(data)
                break;
            case ".js":
                res.writeHead(200, { "Content-Type": "text/javascript" });
                res.end(await readFile(pathname))
                break;
            case ".mjs":
                res.writeHead(200, { "Content-Type": "text/javascript" });
                res.end(await readFile(pathname))
                break;
            case ".ico":
                res.writeHead(200, { "Content-Type": "image/x-ico" });
                res.end(await readFile(pathname))
                break;
            case ".gif":
                res.writeHead(200, { "Content-Type": "image/gif" });
                res.end(await readFile(pathname))
                break;
            case ".jpg":
                res.writeHead(200, { "Content-Type": "image/jpeg" });
                res.end(await readFile(pathname))
                break;
            case ".png":
                res.writeHead(200, { "Content-Type": "image/png" });
                res.end(await readFile(pathname))
                break;
            case ".webp":
                res.writeHead(200, { "Content-Type": "image/webp" });
                res.end(await readFile(pathname))
                break;
            case ".svg":
                res.writeHead(200, { "Content-Type": "image/svg+xml" });
                res.end(await readFile(pathname))
                break;
            default:
                res.writeHead(200, { "Content-Type": "application/octet-stream" });
                res.end(await readFile(pathname))
        }
    } catch (err) {//处理404页
        res.writeHead(200, { "Content-Type": "text/html" });
        try {//捕获fileNotFound
            res.end(await readFile('./404.html'))
        } catch (err) {
            let data404
            try {//捕获fileNotFound
                data404 = await readFile('./404.pug')
            } catch (err) {
                res.end(`<h1>404 Not Found</h1>`)
                return
            }
            try {//捕获Pug模板引擎编译错误
                res.end(pugRenderSync(data404, { filename: './' }))
            } catch (err) {
                res.end(err.toString())
            }
        }
    }
})


void async function main() {
    let localWlanHost = '127.0.0.1', port = 80
    try {
        const ifaces = networkInterfaces();
        for (let lans of Object.values(ifaces)) {
            lans.forEach(details => {
                if (details.family === 'IPv4' && details.address !== '127.0.0.1' && !details.internal) {
                    localWlanHost = details.address;
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
    try {
        port = Number.parseInt(await input(`input port:`))
    } catch (err) {
        console.log(err)
    }
    try {
        server.listen(port);
    } catch (err) {
        console.log(`Error：${err}`)
    }
    console.log(`Server running at \x1b[36mhttp://${localWlanHost}:${port}/\x1b[39m`);
}()