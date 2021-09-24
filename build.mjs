/**
 * @time '2021/09/24'
 * @name 'pug-styl-simple-builder'
 * @author 'kogawananari'
 */


/*******   options   *********/
//输出目录
let output = './dist'
// pug，html目录列表（可递归） 默认cwd（不递归）
let pugDirList = ['./templates']
// css,styl目录列表（可递归） 默认cwd（不递归）
let stylDirList = ['./css']
// 仅拷贝的资源列表（相对，可递归）
let onlyCopyList = ['./js', './img']
// 可额外增加的初始列表（相对）
let pugFileList = ['./index.pug']
let stylFileList = []


import fs from 'fs'
import path from "path"
import { promisify } from "util"
const stat = promisify(fs.stat)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const readDir = promisify(fs.readdir)
const mkDir = promisify(fs.mkdir)
import pug from "pug"
const pugRenderSync = pug.render
import styl from "stylus"
const stylRender = promisify(styl.render)
import ncp from 'ncp'
const cwd = process.cwd()


/*
* dirpath 目录相对路径或绝对路径
* @return 该目录下所有文件和目录的绝对路径列表
*/
const readDirPathDeep = async (dirpath) => {
    let result_path = []
    for (let filepath of (await readDir(dirpath)).map((filename) => path.join(dirpath, filename))) {
        result_path.push(path.resolve(filepath))
        if ((await stat(path.resolve(filepath))).isDirectory()) {
            result_path.push.apply(result_path, await readDirPathDeep(filepath))
        }
    }
    return result_path
}


/******拷贝pug styl并render; 拷贝其他静态目录********/
void async function main() {
    await mkDir(path.join(cwd, output), { recursive: true })


    /**********pug render**********/
    for (let pugDir of pugDirList) {
        await mkDir(path.join(cwd, output, pugDir), { recursive: true })
        let fileList = (await readDirPathDeep(pugDir)).map(filepath => filepath.replace(cwd, ''))
        pugFileList.push.apply(pugFileList, fileList.filter(filename => filename.match(/(\.pug$)|(\.html$)/) !== null))
    }
    if (!(pugFileList && pugFileList?.length)) {
        let pathList = (await readDir(cwd)).map(filename => path.resolve(filename))
        pugFileList = pathList.filter(name => name.match(/(\.pug$)|(\.html$)/) !== null)
    }
    for (let pugFile of pugFileList) {
        let html = pugRenderSync(await readFile(path.join(cwd, pugFile)), { filename: './' })
        await writeFile(path.join(cwd, output, pugFile.replace(/\.pug$/, '.html')), html, { flag: 'w+' })
    }


    /***********styl render***********/
    for (let stylDir of stylDirList) {
        await mkDir(path.join(cwd, output, stylDir), { recursive: true })
        let fileList = (await readDirPathDeep(stylDir)).map(filepath => filepath.replace(cwd, ''))
        stylFileList.push.apply(stylFileList, fileList.filter(filename => filename.match(/(\.css$)|(\.styl$)/) !== null))
    }
    if (!(stylFileList && stylFileList?.length)) {
        let pathList = (await readDir(cwd)).map(filename => path.resolve(filename))
        stylFileList = pathList.filter(name => name.match(/(\.css$)|(\.styl$)/) !== null)
    }
    for (let stylFile of stylFileList) {
        let css = await stylRender((await readFile(path.join(cwd, stylFile))).toString('utf8'))
        await writeFile(path.join(cwd, output, stylFile.replace(/\.styl$/, '.css')), css, { flag: 'w+' })
    }


    /************only copy**********/
    for (let f of onlyCopyList) {
        ncp(f, path.join(output, f))
    }
}()