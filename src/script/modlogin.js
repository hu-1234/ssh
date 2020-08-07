define(['sha1'], function() {
    return {
        init: function() {
            (function($) {
                const $btn = $('.button');
                const $user = $('.username');
                const $pass = $('.password');

                $btn.on('click', function() {
                    $.ajax({
                        url: 'http://127.0.0.1/practice/BMitem/php/login.php',
                        type: 'post',
                        data: {
                            username: $user.attr('value'),
                            password: hex_sha1($pass.val())
                        }
                    }).done(function(data) {
                        if (data) {
                            $.cookie('username', $user.val(), { expires: 7, path: '/' });
                            location.href = 'bm.html';
                        } else {
                            alert('你输入的账号或者密码不正确');
                            $pass.attr('value', '');
                        }
                    })
                })


            })(jQuery)
        }
    }
})