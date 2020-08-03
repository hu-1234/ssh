define([], function() {
    return {
        init: function() {
            (function($) {

                $.ajax({
                    url: 'http://127.0.0.1/practice/bm1/php/list.php',
                    dataType: 'json'
                }).done(function(data) {
                    const $goodUl = $('.productList ul');
                    let str = '';
                    $.each(data, function(index, value) {
                        str += `<li>
                        <a href="javascript:;"><img src="${value.url}" alt=""></a>
                        <a href="javascript:;" class="gtitle"><span>立减</span>${value.title}</a>
                        <p>￥${value.price}</p>
                    </li>`;
                    })
                    $goodUl.html(str)
                })
            })(jQuery)
        }
    }
})