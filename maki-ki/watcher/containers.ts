import { container } from 'tsyringe'
import { DelayedConstructor } from 'tsyringe/dist/typings/lazy-helpers'
import { constructor } from 'tsyringe/dist/typings/types'
import runInterface from './runInterface'
import RenderedWatcher from './RenderedWatcher'

container.register('runInterface', {
    useClass: RenderedWatcher,
})

export default class Containers {
    static Watcher = container
    static override(watcher: constructor<runInterface> | DelayedConstructor<runInterface>) {
        Containers.Watcher.register('renderInterface', {
            useClass: watcher
        })
    }
}
