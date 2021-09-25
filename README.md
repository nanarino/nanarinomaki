# pug-styl-simple

简易的原始人工具



## /watch.mjs

提供httpserver并临时编译与html和css同名的pug和styl



## /build.js

提供编译以及替换后缀并可配置的拷贝到目标目录



## 依赖

- nodejs14+
- ncp  pug  stylus



## 事项

### /img/

twemoji svg来自[twitter: Emoji for everyone](https://github.com/twitter/twemoji)

### /components/

include pug 无需在build时编译文件

### /templates/\*.pug，/404.pug，/css/\*.styl

当html文件不存在的时候会重定向为pug，css同理

可以直接在代码里使用.html和.css （include除外）



## vsc插件配置

额外推荐的vscode插件配置：

Manta's Stylus Supremacy

```js
"stylusSupremacy.insertColons": false, // 是否插入冒号
"stylusSupremacy.insertSemicolons": false, // 是否插入分好
"stylusSupremacy.insertBraces": false, // 是否插入大括号
"stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
"stylusSupremacy.insertNewLineAroundBlocks": false, // 两个选择器中是否换行
```

