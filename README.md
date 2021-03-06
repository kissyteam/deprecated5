# 综述

deprecated5 是一个兼容 KISSY@1.4.x 大部分用法的兼容包，使得在 KISSY@5.0 下仍然可以使用大部分 KISSY@1.4.x 的用法。旨在当项目从1.4.x升级到5.0时更加平稳，愉快。

如要了解 KISSY@5.0 相对 KISSY@1.4.x 具体有哪些变化，请查看 [KISSY5.0主要升级点](https://github.com/kissyteam/deprecated5/blob/master/docs/upgrade.md)

## 用法

引入文件：

```html
<script type="text/javascript" src="//g.alicdn.com/kissy/k/5.0.0/??seed.js,util.js,querystring.js" data-config='{combine:true}'></script>
<script type="text/javascript" src="//g.alicdn.com/kissy/deprecated-5/1.0.1/deprecated.js"></script>
```

## 兼容的用法

1. 仍可使用KISSY.add , KISSY.use , KISSY.config 
2. 仍可使用1.4.x的seed内置的lang类underscore风格的工具函数，如 KISSY.mix , KISSY.param
3. 仍可以直接通过 KISSY（或回调里的 S）直接引用这些模块 S.UA , S.JSON , S.Cookie , S.DOM , S.Anim , S.Base , S.IO , S.io , S.Ajax , S.ajax
4. S.all === Node.all  S.one === Node.one
5. S.namespace 仍可用
6. 仍可通过 KISSY.use('event') 来加载事件处理模块，但不包括手势事件
7. ...


## KISSY5 升级指南

https://github.com/kissyteam/deprecated5/blob/master/docs/upgrade.md