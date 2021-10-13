import { networkInterfaces } from "os"

export default () => {
    let localWlanHost = '127.0.0.1'
    for (let lans of Object.values(networkInterfaces())) {
        if (lans) {
            lans.forEach(details => {
                if (details.family === 'IPv4' && details.address !== '127.0.0.1' && !details.internal) {
                    localWlanHost = details.address
                }
            })
        }
    }
    return localWlanHost
}
