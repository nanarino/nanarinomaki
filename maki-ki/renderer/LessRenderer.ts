import renderInterface from './renderInterface'
import less from 'less'
export default class LessRenderer implements renderInterface {
    ext:  string = 'less'
    async render(data: string) {
        console.log(await less.render(data))
        return (await less.render(data)).css
    }
}