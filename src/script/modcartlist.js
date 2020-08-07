define([], function() {
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



                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    $arrsid = $.cookie('cookiesid').split(',');
                    $arrnum = $.cookie('cookienum').split(',');
                    for (let i = 0; i < $arrsid.length; i++) {
                        rendercar($arrsid[i], $arrnum[i]);
                    }
                }
                const $c = $('.content-c');

                function rendercar(sid, num) {
                    $.ajax({
                        url: 'http://127.0.0.1/practice/BMitem/php/data.php',
                        dataType: 'json',
                    }).done(function(data) {
                        let $str = '';
                        $.each(data.data3, function(index, value) {
                            if (value.sid === sid) {
                                $str += `
                            <ul class="goodslist">
                            <li style="width: 62px;padding-top: 50px;">
                                <input type="checkbox" class = "check">
                            </li>
                            <li style="width: 350px;" class="imgt">
                                <div class="imgbox">
                                    <a href="javascript:;"><img src="${value.url}" alt=""></a>
                                </div>
                                <div class="p-title">
                                    <a href="">${value.title}</a>
                                </div>

                            </li>
                            <li style="width:175px;padding-top: 50px;">
                                <span>￥${value.price}</span>
                            </li>
                            <li style="width:175px" class="yk">
                                <div class="num-box">
                                    <span>-</span>
                                    <input type="text" value="${num}">
                                    <span>+</span>
                                </div>
                                <div class="yl">余量有限</div>
                            </li>
                            <li style="width: 175px;padding-top: 50px;" class="xj">
                                <span>￥${num*(value.price)}</span>
                            </li>
                            <li style="width: 191px;padding-top: 50px;">
                                <a href="">收藏</a>
                                <span>|</span>
                                <a href="">移出</a>
                            </li>
                        </ul>
                    </div>
                            `;
                                $c.before($str);

                                //设置商品数量和小计
                                const $xjSpan = $('.goodslist .xj span');
                                const $numBoxSpan = $('.num-box span');
                                const $numBoxInput = $('.num-box input');
                                //点击y右键加
                                let $sailnumber = $numBoxInput.attr('value');
                                console.log($sailnumber);
                                $numBoxSpan.eq(1).on('click', function() {
                                    $sailnumber++;
                                    $numBoxInput.attr('value', $sailnumber);
                                })
                                $numBoxSpan.eq(0).on('click', function() {
                                    $sailnumber--;
                                    if ($sailnumber < 1) {
                                        $sailnumber = 1
                                    } else {
                                        $numBoxInput.attr('value', $sailnumber);
                                    }

                                })

                                //全选
                                const $allselect = $('.content-t input');

                            }

                        })

                        //计算总金额
                        // const $one = $('.one .hon');
                        // const $two = $('.two .hon');


                        // $xjSpan.each(function() {
                        //     let sum = 0;
                        //     let all = parseInt($(this).html().substring(1));
                        //     sum += all;
                        // })


                    })

                }


            })(jQuery)
        }
    }
})