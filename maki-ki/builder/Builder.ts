import rendererAllInterface from '../renderer/rendererAllInterface'
import runInterface from './runInterface'
import { inject, singleton } from 'tsyringe'

@singleton()
export default class Builder {
    constructor(
            @inject('runInterface')
            private builder: runInterface
        ) {
    }
    use(renderer: rendererAllInterface): void{
        this.builder.use(renderer)
    }
    async run(): Promise<void> {
        await this.builder.run()
    }
}
