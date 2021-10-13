export default interface renderInterface {
    ext: string
    render: (arg: string) => Promise<string>
}