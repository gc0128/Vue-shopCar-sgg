//vue插件一定暴露一个插件
let myPlugins = {};
myPlugins.install = function(Vue,options){
    // Vue.directives(options,name,(element,params)=>{
    //     element.innerHTML = params.value.toUpperCase();
    // })
}
export default myPlugins;