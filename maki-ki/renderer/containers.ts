import { container } from 'tsyringe'
import { DelayedConstructor } from 'tsyringe/dist/typings/lazy-helpers'
import { constructor } from 'tsyringe/dist/typings/types'
import renderInterface from './renderInterface'


import PugRenderer from './PugRenderer'
container.register('renderInterface', {
    useClass: PugRenderer,
})


const containerForCSS = container.createChildContainer()
import StylRenderer from './StylRenderer'
containerForCSS.register('renderInterface', {
    useClass: StylRenderer,
})

type renderOptKey = 'HTML' | 'CSS'

export default class Containers {
    static HTML = container
    static CSS = containerForCSS
    static override(type: renderOptKey, renderer: constructor<renderInterface> | DelayedConstructor<renderInterface>) {
        Containers[type].register('renderInterface', {
            useClass: renderer
        })
    }
}
