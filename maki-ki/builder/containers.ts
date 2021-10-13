import { container } from 'tsyringe'
import { DelayedConstructor } from 'tsyringe/dist/typings/lazy-helpers'
import { constructor } from 'tsyringe/dist/typings/types'
import runInterface from './runInterface'
import DefaultBuilder from './DefaultBuilder'

container.register('runInterface', {
    useClass: DefaultBuilder,
})

export default class Containers {
    static Builder = container
    static override(builder: constructor<runInterface> | DelayedConstructor<runInterface>) {
        Containers.Builder.register('renderInterface', {
            useClass: builder
        })
    }
}
