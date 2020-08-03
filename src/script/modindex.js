define([], function() {
    return {
        init: function() {
            (function($) {
                const $yli = $('.solid ol li');
                const $picli = $('.solid ul li');
                const $left = $('#left');
                const $right = $('#right');
                const $ul = $('.solid ul');
                //顶部悬浮
                const $topnav = $('.top-nav');
                $(window).on('scroll', function() {
                    let $scroll = $(window).scrollTop();
                    if ($scroll > 80) {
                        $topnav.css({ //滚轮事件之后设置固定定位
                            position: 'fixed',
                            top: 0
                        })
                    } else {
                        $topnav.css({
                            position: 'static'
                        })
                    }
                })


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

                //女士男士优选切换
                const $mclick = $('.chose-nav .mclick');
                const $wclick = $('.chose-nav .wclick');
                const $me = $('.chose-nav ul #me');
                const $wo = $('.chose-nav li #wo');
                const $mwrap = $('.solid-nav ul').eq(0);
                const $wwrap = $('.solid-nav ul').eq(1);



                $wo.hover(function() {
                    $wo.css({
                        color: 'aqua'
                    })
                }, function() {
                    $wo.css({
                        color: '#000'
                    })
                })



                //点击女士
                $wo.on('click', function() {
                        //女士内容显示，男士内容隐藏
                        $wwrap.css({
                            display: 'block'
                        })
                        $mwrap.css({
                                display: 'none'
                            })
                            //男士tab样式
                        $me.hover(function() {
                            $me.css({
                                color: 'aqua'
                            })
                        }, function() {
                            $me.css({
                                color: '#000'
                            })
                        })
                        $wo.hover(function() {
                                $wo.css({
                                    color: '#000'
                                })
                            })
                            //女士tab下边框显示，男士隐藏
                        $wclick.css({
                            borderBottom: '2px solid #000'
                        })
                        $mclick.css({
                            borderBottom: 'none'
                        })
                    })
                    //点击男士
                $me.on('click', function() {
                    //男士显示女士隐藏
                    $wwrap.css({
                        display: 'none'
                    })
                    $mwrap.css({
                        display: 'block'
                    })

                    //移入移出女士tab 
                    $wo.hover(function() {
                        $wo.css({
                            color: 'aqua'
                        })
                    }, function() {
                        $wo.css({
                            color: '#000'
                        })
                    })
                    $me.hover(function() {
                            $me.css({
                                color: '#000'
                            })
                        })
                        //男士下边框显示，女士消失
                    $mclick.css({
                        borderBottom: '2px solid #000'
                    })
                    $wclick.css({
                        borderBottom: 'none'
                    })
                })



                //轮播
                let $solid = $('.solid');
                let $liwidth = $picli.eq(0).width();
                $ul.width($liwidth * $picli.length);
                let $index = 0;
                let autotimer = null;
                $yli.on('click', function() {
                    $index = $(this).index();
                    $yli.eq($index).addClass('active').siblings('li').removeClass('active');
                    $ul.stop(true).animate({
                        left: -$index * $liwidth
                    })
                })
                $right.on('click', function() {
                    $index++;
                    if ($index === $yli.length + 1) {
                        $ul.css({ 'left': '0' });
                        $index = 1;
                    }
                    if ($index === $yli.length) {
                        $yli.eq(0).addClass('active').siblings('li').removeClass('active');
                    } else {
                        $yli.eq($index).addClass('active').siblings('li').removeClass('active');
                    }
                    $ul.stop(true).animate({
                        left: -$index * $liwidth
                    })
                })
                $left.on('click', function() {
                    $index--;
                    if ($index === -1) {
                        $ul.css({ 'left': -$liwidth * ($yli.length) })
                        $index = $yli.length - 1;
                        $yli.eq($yli.length - 1).addClass('active').siblings('li').removeClass('active');
                    } else {
                        $yli.eq($index).addClass('active').siblings('li').removeClass('active');

                    }
                    $ul.stop(true).animate({
                        left: -$index * $liwidth
                    })

                })
                $solid.hover(function() {
                    clearInterval(autotimer)
                }, function() {
                    autotimer = setInterval(function() {
                        $right.click();
                    }, 3000)
                })
                autotimer = setInterval(function() {
                    $right.click();
                }, 3000)


                // 内容下部轮播渲染
                const $firstBox = $('.main-banner .first-box');
                const $twoBox = $('.main-banner .two-box');

                $.ajax({
                        url: 'http://127.0.0.1/practice/bm1/php/data.php',
                        dataType: 'json'
                    }).done(function(data) {
                        let $str = '';
                        let $arr = '';
                        //渲染第一个ul
                        $.each(data.data1, function(index, value) {
                            $str += `
                        <a href="javascript:;">
                        <li>
                            <img src="${value.url}" alt="">
                            <p>${value.title}</p>
                            <div class="money-now">
                                <span class="now">${value.price}</span>
                                <span class="discount">￥${value.discountprice}</span>
                            </div>
                        </li>
                    </a>
                        `;
                        })
                        $firstBox.html($str);
                        //渲染第二个ul
                        $.each(data.data2, function(index, value) {
                            $arr += `
                        <a href="javascript:;">
                        <li>
                            <img src="${value.url}" alt="">
                            <p>${value.title}</p>
                            <div class="money-now">
                                <span class="now">${value.price}</span>
                                <span class="discount">￥${value.discount}</span>
                            </div>
                        </li>
                    </a>
                        `;
                        })
                        $twoBox.html($arr);
                    })
                    //点击下面轮播小圆圈事件，左键头右箭头
                const $l = $('.best-sell-box #le');
                const $r = $('.best-sell-box #ri');
                const $div = $('.qiehuan div');
                const $uls = $('.main-banner ul');
                const $main = $('.swiper-b .main-banner');
                let $uwidth = $uls.width();
                $main.width($uwidth * ($uls.length));
                let $index1 = 0;
                $div.on('click', function() {
                    $index1 = $(this).index();
                    $div.eq($index1).addClass('active').siblings('div').removeClass('active');
                    $main.animate({
                        left: -$uwidth * $index1
                    })
                })
                $r.on('click', function() {
                    $index1++;
                    if ($index1 === $div.length + 1) {
                        $main.css({ 'left': '0' })
                        $index1 = 1;
                    }
                    if ($index1 === $div.length) {
                        $div.eq(0).addClass('active').siblings('div').removeClass('active');
                    } else {
                        $div.eq($index1).addClass('active').siblings('div').removeClass('active');
                    }
                    $main.stop(true).animate({
                        left: -$uwidth * $index1
                    })
                })

                $l.on('click', function() {
                    $index1--;
                    if ($index1 === -1) {
                        $main.css({ 'left': -$uwidth * ($div.length) })
                        $index1 = $div.length - 1;
                        $div.eq($div.length - 1).addClass('active').siblings('div').removeClass('active');
                    } else {
                        $div.eq($index1).addClass('active').siblings('div').removeClass('active');

                    }
                    $main.stop(true).animate({
                        left: -$index1 * $uwidth
                    })
                })

            })(jQuery)
        }
    }
})