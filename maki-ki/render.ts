import 'reflect-metadata'
import Renderer from './renderer/Renderer'
import Containers from './renderer/containers'

/**如果想用Less覆盖默认的Styl
 * 
 *   import LessRenderer from './renderer/LessRenderer'
 *   Containers.override('CSS', LessRenderer)
 *   覆盖需要在resolve之前
**/
const CSS = Containers.CSS.resolve(Renderer)



/**如果想用当前未实现的Renderer来覆盖默认的Pug 如 EjsRenderer
 *
 *   首先需要实现renderInterface接口
 *   再覆盖 Containers.override('HTML', EjsRenderer)
 * 
**/
const HTML = Containers.HTML.resolve(Renderer)


export {
    HTML, CSS
}

/*
import {readFile} from './tools/fs-tools'
void async function test() {
    // cd .. 再运行
    console.log(await HTML.render((await readFile('./website/index.pug')).toString('utf8')))
}()*/

