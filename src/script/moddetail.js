define([], function() {
    return {
        init: function() {
            (function($) {
                let $search = location.search;
                let $num = $search.substr(5);
                $.ajax({
                        url: 'http://127.0.0.1/practice/BMitem/php/detalis.php',
                        data: {
                            sid: $num
                        },
                        dataType: 'json'
                    }).done(function(data) {
                        const $leftBoxPic = $('.content-center .left-box .product-pic img');
                        $leftBoxPic.attr('src', data.url);
                        //渲染详情页下面的小图
                        const $thumbList = $('.product-thumb .thumbList ul');
                        let $pic = (data.picurl).split(',');
                        let $arr = '';
                        $.each($pic, function(index, value) {
                            $arr += `
                        <li>
                            <img src="${value}" alt="">
                        </li>   
                        `
                        })
                        $thumbList.html($arr);

                        //点击小图更换大图
                        const $thubmLi = $('.product-thumb .thumbList ul li');
                        $thubmLi.eq(0).attr('class', 'active');
                        const $picurl = $('.left-box .product-pic img');

                        $thubmLi.on('mouseover', function() {
                            $(this).addClass('active').siblings('li').removeClass('active');
                            let $url = $(this).find('img').attr('src');
                            $picurl.attr('src', $url);
                            $picurl.css({
                                width: '100%'
                            })
                        })


                        // 渲染右边价格框数据

                        const $h = $('.right-box h1');
                        $h.html(data.title);
                        const $leval = $('.details-price .leval');

                        $leval.eq(0).find('span').html(data.price);
                        $leval.eq(1).find('.zhekou').html(data.price);

                    })
                    //商品数量的增和减
                const $num1 = $('.num-goods span');
                const $number = $('.num-goods input');


                // 点击左边减号
                let $val = $number.attr('value');
                $num1.eq(0).on('click', function() {
                        $val--;
                        if ($val < 1) {
                            $val = 1;
                        } else {
                            $number.attr('value', $val)
                        }
                    })
                    //点击右边加号
                $num1.eq(1).on('click', function() {
                    $val++;
                    $number.attr('value', $val)
                })

                // 添加购物车存cookie
                let $arrsid = [];
                let $arrnum = [];
                const $add = $('.addcar span');
                // 提前判断cookie里是否存在cookiesid和cookienum
                $add.on('click', function() {
                    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                        $arrsid = $.cookie('cookiesid').split(',');
                        $arrnum = $.cookie('cookienum').split(',');
                    } else {
                        $arrsid = [];
                        $arrnum = [];
                    }
                    if ($.inArray($num, $arrsid) === -1) {

                        //如果不存在sid
                        $arrsid.push($num);
                        $arrnum.push($number.val());
                        $.cookie('cookiesid', $arrsid, { expires: 7, path: '/' });
                        $.cookie('cookienum', $arrnum, { expires: 7, path: '/' });
                    } else {
                        let $nu = $.inArray($num, $arrsid);
                        $arrnum[$nu] = parseInt($arrnum[$nu]) + parseInt($number.val());
                        $.cookie('cookienum', $arrnum, { expires: 7, path: '/' });
                    }
                });




            })(jQuery)
        }
    }
})