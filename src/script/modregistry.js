define([], function() {
    return {
        init: function() {
            (function($) {

                const $user = $('.username');
                const $pass = $('.password');
                const $email = $('.email');
                const $tel = $('.tel');
                const $span = $('form span');
                const $form = $('.forma');
                let usernameflag = true;
                let passwordflag = true;
                let emialflag = true;
                let telflag = true;

                // 用户名框input 验证用户名
                $user.on('focus', function() {
                    $span.eq(0).html('请输入用户名，最长14个字符或者7个汉字');
                    $span.eq(0).css({
                        color: '#999',
                    });
                });
                $user.on('blur', function() {
                    if ($(this).val()) {
                        let $str = $(this).val();
                        let $reg = /[\u4e00-\u9fa5]/g;
                        let $arr = $str.replace($reg, '**').split('');
                        let $count = 0;
                        $.each($arr, function(index, value) {
                            $count++;
                        })
                        if ($count > 14) {
                            $span.eq(0).html('输入的用户名格式有误');
                            $span.eq(0).css({
                                color: 'red',
                            });
                            usernameflag = false;
                        } else {
                            $.ajax({ //去数据库查找是否重名
                                url: 'http://127.0.0.1/practice/BMitem/php/registry.php',
                                type: 'post',
                                data: {
                                    user: $user.val()
                                }
                            }).done(function(data) {
                                console.log(data);
                                if (data) {
                                    $span.eq(0).html('用户名已经被注册');
                                    $span.eq(0).css({
                                        color: 'red',
                                    });
                                    usernameflag = false;

                                } else {
                                    $span.eq(0).html('√');
                                    $span.eq(0).css({
                                        color: 'green',
                                    });
                                    usernameflag = true;
                                }
                            })
                        }
                    } else {
                        $span.eq(0).html('用户名不能为空');
                        $span.eq(0).css({
                            color: 'red',
                        });
                        usernameflag = false;
                    }

                });



                //密码验证
                $pass.on('focus', function() {
                    $span.eq(1).html('请输入密码(数字字母特殊字符，6-12位)');
                    $span.eq(1).css({
                        color: '#999',
                    });

                });

                $pass.on('input', function() {
                    if ($(this).val().length >= 6 && $(this).val().length <= 12) {
                        let strhtml = $(this).val();
                        let reg = /[0-9]/g;
                        let str = /[a-z]/g;
                        let arr = /[A-Z]/g;
                        let other = /[\W_]/g;
                        let coun = 0;
                        if (reg.test(strhtml)) {
                            coun++;
                        }
                        if (str.test(strhtml)) {
                            coun++;
                        }
                        if (arr.test(strhtml)) {
                            coun++;
                        }
                        if (other.test(strhtml)) {
                            coun++;
                        }
                        switch (coun) {
                            case 1:
                                $span.eq(1).html('弱');
                                $span.eq(1).css({
                                    color: 'red',
                                });
                                passwordflag = false;
                                break;
                            case 2: //case穿透
                            case 3:
                                $span.eq(1).html('中');
                                $span.eq(1).css({
                                    color: 'orange',
                                });
                                passwordflag = true;
                                break;
                            case 4:
                                $span.eq(1).html('强');
                                $span.eq(1).css({
                                    color: 'green',
                                });
                                passwordflag = true;
                                break;
                        }
                    } else {
                        $span.eq(1).html('密码格式不正确');
                        $span.eq(1).css({
                            color: 'red',
                        });
                        passwordflag = false;
                    }
                });

                $pass.on('blur', function() {
                    if ($(this).val()) {
                        if (passwordflag) {
                            $span.eq(1).html('√');
                            $span.eq(1).css({
                                color: 'green',
                            });
                            passwordflag = true;
                        }
                    } else {
                        $span.eq(1).html('密码不能为空');
                        $span.eq(1).css({
                            color: 'red',
                        });
                        passwordflag = false;
                    }
                })



                //邮箱验证
                $email.on('focus', function() {
                    $span.eq(2).html('请输入邮箱');
                    $span.eq(2).css({
                        color: '#999',
                    });
                    emailflag = false;
                })
                $email.on('blur', function() {
                    if ($(this).val()) {
                        let reg = /^\w+\@(\w+)\.(\w+)$/;
                        if (reg.test($(this).val())) {
                            $span.eq(2).html('√');
                            $span.eq(2).css({
                                color: 'green',
                            });
                            emailflag = true;
                        } else {
                            $span.eq(2).html('邮箱格式不对');
                            $span.eq(2).css({
                                color: 'red',
                            });
                            emailflag = false;

                        }

                    } else {
                        $span.eq(2).html('邮箱不能为空');
                        $span.eq(2).css({
                            color: 'red',
                        });
                        emailflag = false;
                    }
                });

                //手机验证
                $tel.on('focus', function() {
                    $span.eq(3).html('请输入手机号码');
                    $span.eq(3).css({
                        color: '#999',
                    });
                    telflag = false;
                })
                $tel.on('blur', function() {
                    if ($(this).val()) {
                        let reg = /1[3578]\d{9}/;
                        if (reg.test($(this).val())) {
                            $span.eq(3).html('√');
                            $span.eq(3).css({
                                color: 'green',
                            });
                            telflag = true;
                        } else {
                            $span.eq(3).html('手机号码不对');
                            $span.eq(3).css({
                                color: 'red',
                            });
                            telflag = false;
                        }

                    } else {
                        $span.eq(3).html('邮箱不能为空');
                        $span.eq(3).css({
                            color: 'red',
                        });
                        telflag = false;
                    }
                })

                $form.on('submit', function() {
                    if (!$user.val()) {
                        $span.eq(0).html('用户名不能为空');
                        $span.eq(0).css({
                            color: 'red',
                        });
                        usernameflag = false;
                    };
                    if (!$pass.val()) {
                        $span.eq(1).html('密码不能为空');
                        $span.eq(1).css({
                            color: 'red',
                        });
                        passwordflag = false;
                    };
                    if (!$email.val()) {
                        $span.eq(2).html('邮箱不能为空');
                        $span.eq(2).css({
                            color: 'red',
                        });
                        emailflag = false;
                    };
                    if (!$tel.val()) {
                        $span.eq(3).html('手机号码不能为空');
                        $span.eq(3).css({
                            color: 'red',
                        });
                        telflag = false;
                    }
                    if (!usernameflag || !passwordflag || !emailflag || !emailflag) {
                        return false;
                    }
                })

            })(jQuery)
        }
    }
})