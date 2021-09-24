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

可以直接在代码里使用.html和.styl （include除外）
