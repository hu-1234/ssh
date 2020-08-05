// 配置模块-第三方插件
require.config({
    paths: {
        jquery: 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        jqueryCookie: 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min',
        jqueryLazyload: 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min',



    },
    shim: {
        jqueryLazyload: {
            deps: ['jquery'],
            exports: '$'
        },
    }
})

// 加载模块，引入第三方
require(['jquery', 'jqueryCookie', 'jqueryLazyload'], function($) {
    let modname = $('#currentpage').attr('currentmod'); //获取自定义属相
    if (modname) {
        //判断是否存在自定义属相的值，加载对应的模块
        require([modname], function(modobj) {
            modobj.init();
        })
    }

})