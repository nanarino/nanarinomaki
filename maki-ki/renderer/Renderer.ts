import { inject, injectable } from 'tsyringe'
import renderInterface from './renderInterface'


@injectable()
export default class Renderer {
    constructor(
        @inject('renderInterface')
        private preprocessor: renderInterface,
    ) { }
    get ext(): string {
        return this.preprocessor.ext
    }
    async render(data: string) {
        return await this.preprocessor.render(data)
    }
}
