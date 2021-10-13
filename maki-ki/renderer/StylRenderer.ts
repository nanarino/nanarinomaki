import renderInterface from './renderInterface'
import { promisify } from "util"
import styl from "stylus"
type render = (arg: string) => Promise<string>
const stylRender: render = promisify(styl.render)
export default class StylRenderer implements renderInterface {
    ext: string = 'styl'
    async render(data: string) {
        return await stylRender(data)
    }
}