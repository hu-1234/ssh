define(['jquery.pagination'], function() {
    return {
        init: function() {
            (function($) {



                //置顶
                const $set = $('.right-nav .set');
                $set.on('click', function() {
                    $('html, body').animate({
                        scrollTop: '0px'
                    }, 'fast')
                });


                // 二级导航
                const $aLi = $('.navList li');
                const $hover = $('.nav-hover');
                $aLi.hover(function() {
                    $hover.css({
                        'display': 'block'
                    })
                    $hover.hover(function() {
                        $hover.css({
                            'display': 'block'
                        })
                    }, function() {
                        $hover.css({
                            'display': 'none'
                        })
                    })
                }, function() {
                    $hover.css({
                        'display': 'none'
                    })
                })





                // 排序值初始化
                let $array_defaul = [];
                let $array = [];
                let $prev = null;
                let $next = null;

                const $goodUl = $('.productList ul');

                //默认渲染第一页
                $.ajax({
                    url: 'http://127.0.0.1/practice/BMitem/php/datalist.php',
                    dataType: 'json'
                }).done(function(data) {
                    let $str = '';
                    $.each(data, function(index, value) {
                        $str += `<li>
                        <a href="details.html?sid=${value.sid}" target="_blank" >
                        <img data-original="${value.url}" alt="" class= "lazy" width="215" height="215">
                        <a class="gtitle"><span>立减</span>${value.title}</a>
                        <p >￥${value.price}</p>
                        </a>
                    </li>`;
                    })
                    $goodUl.html($str);

                    //懒加载 
                    $(function() {
                        $('img.lazy').lazyload({ effect: "fadeIn" });
                    })
                    $array_defaul = [];
                    $array = [];
                    $prev = null;
                    $next = null;

                    //存储默认的li和需要排序的li
                    $goodUl.find('li').each(function(index, element) {
                        $array_defaul[index] = $(this);
                        $array[index] = $(this);
                    })



                });

                // 通过页码，渲染后面的分页
                $('.page').pagination({
                        pageCount: 2,
                        jump: true,
                        prevContent: '上一页',
                        nextContent: '下一页',
                        callback: function(api) {
                            $.ajax({
                                url: 'http://127.0.0.1/practice/BMitem/php/datalist.php',
                                data: {
                                    page: api.getCurrent() //获取点击的页码
                                },
                                dataType: 'json'
                            }).done(function(data) {
                                let $str = '';
                                $.each(data, function(index, value) {
                                    $str += `<li>
                                <a href="details.html?sid=${value.sid}" target="_blank">
                                <img data-original="${value.url}" alt="" class="lazy" width="215" height="215">
                                <a class="gtitle"><span>立减</span>${value.title}</a>
                                <p>￥${value.price}</p>
                                </a>
                            </li>`;
                                })
                                $goodUl.html($str);
                                //懒加载 
                                $(function() {
                                    $('img.lazy').lazyload({ effect: "fadeIn" });
                                })


                                $array_defaul = [];
                                $array = [];
                                $prev = null;
                                $next = null;
                                //重新存储默认数组和目前数组
                                $goodUl.find('li').each(function(index, element) {
                                    $array_defaul[index] = $(this);
                                    $array[index] = $(this);
                                })

                            })
                        }
                    })
                    //默认排序
                $('.btn').eq(0).on('click', function() {
                    $.each($array_defaul, function(index, value) {
                        $goodUl.append(value);
                    })
                })


                //降序排列
                $('.btn').eq(1).on('click', function() {
                        for (let i = 0; i < $array.length - 1; i++) {
                            for (let j = 0; j < $array.length - i - 1; j++) {
                                $prev = parseFloat($array[j].find('p').html().substring(1));
                                $next = parseFloat($array[j + 1].find('p').html().substring(1));
                                if ($prev < $next) {
                                    let temp = $array[j];
                                    $array[j] = $array[j + 1];
                                    $array[j + 1] = temp;
                                }
                            }
                        }
                        $.each($array, function(index, value) {
                            $goodUl.append(value);
                        })
                    })
                    //升序排列
                $('.btn').eq(2).on('click', function() {
                    for (let i = 0; i < $array.length - 1; i++) {
                        for (let j = 0; j < $array.length - i - 1; j++) {
                            $prev = parseFloat($array[j].find('p').html().substring(1));
                            $next = parseFloat($array[j + 1].find('p').html().substring(1));
                            if ($prev > $next) {
                                let temp = $array[j];
                                $array[j] = $array[j + 1];
                                $array[j + 1] = temp;
                            }
                        }
                    }
                    $.each($array, function(index, value) {
                        $goodUl.append(value);
                    })
                })


                // 左侧二级菜单
                const $item = $('.nav-item');
                const $navT = $('.left-nav .nav-t');
                let $index = 0;
                let $attr = 0;
                let flag = true;

                // 点击左侧导航菜单，给一个判断
                $item.on('click', function() {
                    $index = $item.index($(this));
                    if ($item.eq($index).find('.icon-xia').css('display') !== 'none') {
                        $item.eq($index).find('.icon-xia').hide();
                        $navT.eq($index).hide();
                        $item.eq($index).find('.icon-shang').show();
                    } else {
                        $item.eq($index).find('.icon-xia').show();
                        $navT.eq($index).show();
                        $item.eq($index).find('.icon-shang').hide();
                    }
                })



            })(jQuery)
        }
    }
})