import fs from 'fs'
import path from "path"
import { promisify } from "util"
import deepCopySync from 'ncp'
const stat = promisify(fs.stat)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const readDir = promisify(fs.readdir)
const mkDir = promisify(fs.mkdir)

const readPathDeep = async (dirpath: string) => {
    let result_path:string[] = []
    if ((await stat(path.resolve(dirpath))).isFile()) {
        return [path.resolve(dirpath)]
    }
    for (let filepath of (await readDir(dirpath)).map((filename) => path.join(dirpath, filename))) {
        result_path.push.apply(result_path, await readPathDeep(filepath))     
    }
    return result_path
}

export {
    stat,
    readFile,
    writeFile,
    readDir,
    mkDir,
    readPathDeep,
    deepCopySync
}
