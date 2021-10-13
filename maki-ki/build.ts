import 'reflect-metadata'
import Builder from "./builder/Builder"
import Containers from "./builder/containers"
import { HTML, CSS } from "./render"
const builder = Containers.Builder.resolve(Builder)

void function main() {
    builder.use({ HTML, CSS })
    builder.run()
}()
