import rendererAllInterface from '../renderer/rendererAllInterface'

export default interface runInterface {
    use: (arg:rendererAllInterface) => void
    run: () => Promise<void>
}
