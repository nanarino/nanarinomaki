import rendererAllInterface from '../renderer/rendererAllInterface'
import { Server } from 'http'

export default interface runInterface {
    use: (arg: rendererAllInterface) => void
    initServer: () => Promise<Server>
}
