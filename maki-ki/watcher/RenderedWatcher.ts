import runInterface from './runInterface'
import rendererAllInterface from '../renderer/rendererAllInterface'

import { readFile } from '../tools/fs-tools'
import http from 'http'
import path from "path"

import 'reflect-metadata'
import Containers from '../renderer/containers'
import Renderer from '../renderer/Renderer'

export default class RenderedWatcher implements runInterface {
    HTML?: Renderer
    CSS?: Renderer
    use(renderer: rendererAllInterface): void {
        this.HTML = renderer.HTML
        this.CSS = renderer.CSS
    }
    async initServer(): Promise<http.Server> {
        if (!(this.HTML instanceof Renderer)) {
            this.HTML = Containers.HTML.resolve(Renderer)
            console.log(`You can user watch.use() to override`)
        }
        if (!(this.CSS instanceof Renderer)) {
            this.CSS = Containers.CSS.resolve(Renderer)
            console.log(`You can user watch.use() to override`)
        }

        const HTML: Renderer = this.HTML
        const CSS: Renderer = this.CSS

        return http.createServer(async (req, res) => {

            req.url = req.url || ''
            let pathname = path.join(process.cwd(), decodeURIComponent(req.url.split("?")[0]))

            if (path.extname(pathname) == "") {
                pathname += "/";
            }
            if (pathname.charAt(pathname.length - 1) == "/") {
                pathname += "index.html";
            }
            try {//捕获fileNotFound

                let data: Buffer|string

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

                    case `.${HTML.ext}`:
                        data = await readFile(pathname)
                        try {//捕获Pug模板引擎编译错误
                            data = await HTML.render(data.toString('utf8'))
                        } catch (err) {
                            data = (err as Error)?.toString?.()
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
                    case `.${CSS.ext}`:
                        data = await readFile(pathname)
                        try {//捕获Styl预处理器编译错误
                            data = await CSS.render(data.toString('utf8'))
                        } catch (err) {
                            data = (err as Error)?.toString?.()
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
                        data404 = await readFile(`./404.${HTML.ext}`)
                    } catch (err) {
                        res.end(`<h1>404 Not Found</h1>`)
                        return
                    }
                    try {//捕获Pug模板引擎编译错误
                        res.end(await HTML.render(data404.toString('utf8')))
                    } catch (err) {
                        res.end((err as Error)?.toString?.())
                    }
                }
            }
        })
    }
}