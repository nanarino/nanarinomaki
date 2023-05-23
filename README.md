# ☘ 卷尺转换器

`maki`意为`卷`：把 pug + stylus 编写的多页面输出到`dist`目录。不支持source-map哦。



## Scripts

### watch

```bash
npm run watch
```

提供httpserver并临时编译与html和css同名的pug和styl    
pug只支持绝对路径的include；styl等不支持

### build

```bash
npm run build
```

提供编译以及替换后缀并可配置的拷贝到目标目录



## DI

Renderer，Builder，Watcher，都支持依赖注入。

其中，Renderer容器默认是StylRenderer和PugRenderer。

除此之外还实现了LessRenderer 。

如果要实现其他的Renderer，需要实现renderInterface接口。

```typescript
interface renderInterface {
    ext: string
    render: (arg: string) => Promise<string>
}
```

### override

如果要用LessRenderer覆盖默认的StylRenderer

这需要在resolve之前

```typescript
Containers.override('CSS', LessRenderer)
Containers.CSS.resolve(Renderer)
```



## Other

### /img/

![twemoji](./img/1f914.svg)

twemoji svg来自[twitter: Emoji for everyone](https://github.com/twitter/twemoji)

### vsc config for styl

额外推荐的vscode插件Manta's Stylus Supremacy

```js
"stylusSupremacy.insertColons": false, // 是否插入冒号
"stylusSupremacy.insertSemicolons": false, // 是否插入分号
"stylusSupremacy.insertBraces": false, // 是否插入大括号
"stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
"stylusSupremacy.insertNewLineAroundBlocks": false, // 两个选择器中是否换行
```

