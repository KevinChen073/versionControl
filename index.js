/**
 * @class VersionControl
 * @desc deps的分析库（一段bundle、从json中获取deps的list。检测重复。）
 */
class VersionControl {
    /**
     * @function VersionControl.constructor
     * @param {object} config
     * @param {string} config.src bundle字符串或者是json文件的路径
     */
    constructor(config) {
        const {src} = config;

        this.bundle = src;
        if (isPath(src)) {
            this.bundle = getSrcSync(src);
        }
    }

    /**
     * @function VersionControl.handleDepsListFromStringToJson
     * @desc 处理string类型,获取依赖列表，并把这个改造成json，实例：https://air.alibaba.com/intl/18ac8/mobile/558d2fd8.html?wh_ttid=native
     * @todo 把处理g.alicdn改变成通用string
     * @todo 把处理@ali的部分去掉
     * @return {array} depsList
     * @return {object} depsList[].npmName npm包名
     * @return {object} depsList[].npmVersion npm包的版本
     */
    handleDepsListFromStringToJson() {
        const response = this.bundle;

        // 从整体String里面获取deps
        var totalDeps = response.match(/\/\/(https:\/\/g.alicdn.com\/code\/npm\/??.*)/)[1];
        var depsList = totalDeps.replace('https://g.alicdn.com/code/npm/??', '').split(',');
        var depsObjList = depsList.map((v)=>{
           var npmInfo = v.match(/([@ali\/]*.*)\/(\d\.\d\.\d)/);
           var npmName = npmInfo[1];
           var npmVersion = npmInfo[2];
           return {
               npmName,
               npmVersion
           }
        }); // 包列表
        return depsObjList;
    }

    /**
     * @function VersionControl.getDeplicateList
     * @desc 在列表中查找重复的依赖包
     * @param {array} depsObjList 从hanldeDepsList中获取
     * @return {array} deplicateDeps
     * @return {object} deplicateDeps[].npmName npm包名
     * @return {object} deplicateDeps[].npmVersion npm包的版本
     */
    getDeplicateList(depsObjList) {
        let deplicateDeps = [];
        depsObjList.forEach((v)=>{
            if (isDeplicate(v)) {
                deplicateDeps.push(v);
            }
        });
        return deplicateDeps;
    }
}

/**
 * @ignore
 * @function getSrcSync 同步获取json文件
 * @param {string} path 待请求的json文件
 * @todo 待完成
 */
function getSrcSync(path) {
    return path;
}

/**
 * @ignore
 * @function isPath 判断是否是路径
 * @param {string} str 待检测的字符串
 */
function isPath(str) {
    if (str.indexOf('.json') > -1) {
        return true;
    }
    return false;
}

/**
 * @ignore
 * @function isDeplicate 判断包是否重复
 * @param {string} v 
 * @param {array} depsObjList 
 * @todo 把这个重复检测改成可配置，或者是只看包名
 */
function isDeplicate(v, depsObjList) {
    depsObjList.forEach((val)=>{
        if (v.npmName === val.npmName) {
            return true;
        }
    });
    return false;
}