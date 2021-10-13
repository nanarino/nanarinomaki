import rendererAllInterface from '../renderer/rendererAllInterface'
import runInterface from './runInterface'
import { inject, singleton } from 'tsyringe'
import { Server } from 'http'

@singleton()
export default class Watcher {
    constructor(
            @inject('runInterface')
            private watcher: runInterface
        ) {
    }
    use(renderer: rendererAllInterface): void{
        this.watcher.use(renderer)
    }
    async initServer(): Promise<Server> {
        return await this.watcher.initServer()
    }
}
