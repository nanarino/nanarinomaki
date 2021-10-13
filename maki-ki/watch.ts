import 'reflect-metadata'
import Watcher from "./watcher/Watcher"
import Containers from "./watcher/containers"
import { HTML, CSS } from "./render"

const watcher = Containers.Watcher.resolve(Watcher)

import input from './tools/input'
import getWlanHost from './tools/getWlanHost'

void async function main() {

    watcher.use({ HTML, CSS })

    const localWlanHost = getWlanHost()
    const port = Number.parseInt(await input(`input port: `)) || 80

    ;(await watcher.initServer()).listen(port)

    console.log(`Server running at \x1b[36mhttp://${localWlanHost}:${port}/\x1b[39m`)
}()