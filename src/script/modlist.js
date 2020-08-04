define(['jquery.pagination'], function() {
    return {
        init: function() {
            (function($) {

                // 排序值初始化
                let $array_defaul = [];
                let $array = [];
                let $prev = null;
                let $next = null;

                const $goodUl = $('.productList ul');
                $.ajax({
                    url: 'http://127.0.0.1/practice/BMitem/php/datalist.php',
                    dataType: 'json'
                }).done(function(data) {
                    let $str = '';
                    $.each(data, function(index, value) {
                        $str += `<li>
                        <a href="detalis.html?sid=${value.sid}" target="_blank">
                        <img src="${value.url}" alt="">
                        <a class="gtitle"><span>立减</span>${value.title}</a>
                        <p >￥${value.price}</p>
                        </a>
                    </li>`;
                    })
                    $goodUl.html($str);



                    //存储默认的li和需要排序的li
                    $goodUl.find('li').each(function(index, element) {
                        $array_defaul[index] = $(this);
                        $array[index] = $(this);
                    })



                });
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


                //默认渲染第一页

                $('.page').pagination({
                    pageCount: 2,
                    jump: true,
                    prevContent: '上一页',
                    nextContent: '下一页',
                    callback: function(api) {
                        console.log(api.getCurrent());
                        $.ajax({
                            url: 'http://127.0.0.1/practice/BMitem/php/datalist.php',
                            data: {
                                page: api.getCurrent()
                            },
                            dataType: 'json'
                        }).done(function(data) {
                            let $str = '';
                            $.each(data, function(index, value) {
                                $str += `<li>
                                <a href="detalis.html?sid=${value.sid}" target="_blank">
                                <img src="${value.url}" alt="">
                                <a class="gtitle"><span>立减</span>${value.title}</a>
                                <p>￥${value.price}</p>
                                </a>
                            </li>`;
                            })
                            $goodUl.html($str);
                        })
                    }
                })

                // 左侧二级菜单
                const $item = $('.nav-item');
                // console.log($icx);

                const $navT = $('.left-nav .nav-t');
                let $index = 0;
                $item.on('click', function() {
                        $index = $(this).index();
                        console.log($index);
                        $item.eq($index).find('.icon-xia').css({
                            display: 'none'
                        })
                        $navT.eq($index).css({
                            display: 'none'
                        })
                        $item.eq($index).find('.icon-shang').css({
                            display: 'block'
                        })
                    })
                    // $ics.on('click', function() {
                    //     $icx.css({
                    //         display: 'block'
                    //     })
                    //     $navT.css({
                    //         display: 'block'
                    //     })
                    //     $ics.css({
                    //         display: 'none'
                    //     })
                    // })

            })(jQuery)
        }
    }
})