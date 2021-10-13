import runInterface from './runInterface'
import rendererAllInterface from '../renderer/rendererAllInterface'

import { stat, readFile, writeFile, mkDir, readPathDeep, deepCopySync } from '../tools/fs-tools'
import path from "path"

import 'reflect-metadata'
import Containers from '../renderer/containers'
import Renderer from '../renderer/Renderer'

export default class DefaultBuilder implements runInterface {
    HTML?: Renderer
    CSS?: Renderer
    use(renderer: rendererAllInterface): void {
        this.HTML = renderer.HTML
        this.CSS = renderer.CSS
    }
    async run(): Promise<void> {
        if (!(this.HTML instanceof Renderer)) {
            this.HTML = Containers.HTML.resolve(Renderer)
            console.log(`You can user build.use() to override`)
        }
        if (!(this.CSS instanceof Renderer)) {
            this.CSS = Containers.CSS.resolve(Renderer)
            console.log(`You can user build.use() to override`)
        }

        const HTML: Renderer = this.HTML
        const CSS: Renderer = this.CSS
        

        /****************************************可配置项***************************************************/
        //工作目录
        const cwd: string = process.cwd()
        const output: string = './dist'

        // pug，html目录列表（可递归）
        const htmlDirList: string[] = ['./templates', './index.pug', './404.pug']
        // css, styl目录列表（可递归）
        const cssDirList: string[] = ['./css']
        // 仅拷贝的资源列表（相对，可递归）
        const onlyCopyList: string[] = ['./js', './img']
        //初始列表
        const htmlFileList: string[] = []
        const cssFileList: string[] = []


        const copy = async () => {
            /***************************HTML************************** */
            for (let htmlDir of htmlDirList) {
                if ((await stat(htmlDir)).isDirectory()) {
                    await mkDir(path.join(cwd, output, htmlDir), { recursive: true })
                }
                let fileList = (await readPathDeep(htmlDir)).map(filepath => filepath.replace(cwd, ''))
                htmlFileList.push.apply(htmlFileList, fileList.filter(filename => filename.match(new RegExp(`(\\\.${HTML.ext}$)|(\\\.html$)`)) !== null))
            }

            for (let htmlFile of htmlFileList) {
                let html = await HTML.render((await readFile(path.join(cwd, htmlFile))).toString('utf8'))
                await writeFile(path.join(cwd, output, htmlFile.replace(new RegExp(`\\\.${HTML.ext}$`), '.html')), html, { flag: 'w+' })
            }
            /***************************CSS*************************** */
            for (let cssDir of cssDirList) {
                if ((await stat(cssDir)).isDirectory()) {
                    await mkDir(path.join(cwd, output, cssDir), { recursive: true })
                }
                let fileList = (await readPathDeep(cssDir)).map(filepath => filepath.replace(cwd, ''))
                cssFileList.push.apply(cssFileList, fileList.filter(filename => filename.match(new RegExp(`(\\\.${CSS.ext}$)|(\\\.css$)`)) !== null))
            }

            for (let cssFile of cssFileList) {
                let css = await CSS.render((await readFile(path.join(cwd, cssFile))).toString('utf8'))
                await writeFile(path.join(cwd, output, cssFile.replace(new RegExp(`\\\.${CSS.ext}$`), '.css')), css, { flag: 'w+' })
            }

            /****************************Copy**************************** */
            for (let f of onlyCopyList) {
                deepCopySync(f, path.join(output, f), (err) => {
                    err && console.log(err)
                })
            }
        }
        await copy()
    }
}