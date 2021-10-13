import renderInterface from './renderInterface'
import pug from "pug"
import path from 'path'
export default class PugRenderer implements renderInterface {
    ext: string = 'pug'
    async render(data: string) {
        return pug.render(data, {
            /***************************pug可配置项************************************/
            basedir: path.resolve('./'),
            filename: path.resolve('./index.pug')
        })
    }
}
