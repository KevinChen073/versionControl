
<a name="VersionControl"></a>

### VersionControl
**Kind**: global class

* [VersionControl](#VersionControl)
    * [new VersionControl()](#new_VersionControl_new)
    * [.constructor(config)](#VersionControl.constructor)
    * [.handleDepsListFromStringToJson()](#VersionControl.handleDepsListFromStringToJson) ⇒ <code>array</code> \| <code>object</code> \| <code>object</code>
    * [.getDeplicateList(depsObjList)](#VersionControl.getDeplicateList) ⇒ <code>array</code> \| <code>object</code> \| <code>object</code>

<a name="new_VersionControl_new"></a>

#### new VersionControl()
deps的分析库（一段bundle、从json中获取deps的list。检测重复。）

<a name="VersionControl.constructor"></a>

#### VersionControl.constructor(config)
**Kind**: static method of [<code>VersionControl</code>](#VersionControl)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> |  |
| config.src | <code>string</code> | bundle字符串或者是json文件的路径 |

<a name="VersionControl.handleDepsListFromStringToJson"></a>

#### VersionControl.handleDepsListFromStringToJson() ⇒ <code>array</code> \| <code>object</code> \| <code>object</code>
处理string类型,获取依赖列表，并把这个改造成json，实例：https://air.alibaba.com/intl/18ac8/mobile/558d2fd8.html?wh_ttid=native

**Kind**: static method of [<code>VersionControl</code>](#VersionControl)
**Returns**: <code>array</code> - depsList<code>object</code> - depsList[].npmName npm包名<code>object</code> - depsList[].npmVersion npm包的版本
**Todo**

- [ ] 把处理g.alicdn改变成通用string
- [ ] 把处理@ali的部分去掉

<a name="VersionControl.getDeplicateList"></a>

#### VersionControl.getDeplicateList(depsObjList) ⇒ <code>array</code> \| <code>object</code> \| <code>object</code>
在列表中查找重复的依赖包

**Kind**: static method of [<code>VersionControl</code>](#VersionControl)
**Returns**: <code>array</code> - deplicateDeps<code>object</code> - deplicateDeps[].npmName npm包名<code>object</code> - deplicateDeps[].npmVersion npm包的版本

| Param | Type | Description |
| --- | --- | --- |
| depsObjList | <code>array</code> | 从hanldeDepsList中获取 |