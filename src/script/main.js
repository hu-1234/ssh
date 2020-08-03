// 配置模块-第三方插件
require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min'
    }
})

// 加载模块，引入第三方
require(['jquery'], function($) {
    let modname = $('#currentpage').attr('currentmod'); //获取自定义属相
    if (modname) {
        //判断是否存在自定义属相的值，加载对应的模块
        require([modname], function(modobj) {
            modobj.init();
        })
    }

})