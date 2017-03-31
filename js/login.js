/**
 * Created by hxsd on 2017/2/28.
 */
$(function(){
    //注册页面判断用户是否被占用，判断两次输入的密码是否相同
    $.fn.$login=(function($){
        //判断两次输入的密码是否相同
        this.$inputError2=$("#inputError2");
        this.$inputError3=$("#inputError3");
        this.$showDanger=$("#showDanger");
        this.$subBtn=$("#subBtn");
        this.$regUser=$("#regUser");
        this.$formInp=$("#formInp");
        this.$regPassword=$("#regPassword");
        this.$rePassword=$("#rePassword");
        this.$register=$("#register");
        this.$inputSuccess2=$("#inputSuccess2");
        //隐藏注册窗口
        $register.hide();
        //点击注册按钮显示注册窗口,并隐藏登录窗口
        $("#regBtn").on("click",function(){
            $register.show();
            $("#loginForm").hide()
        });
        //初始化注册用户框
        function init() {
            $formInp.find("div").each(function () {
                $(this).find("span").hide();
            }).removeClass("has-success");
        }
        init(); //执行初始化

        //判断用户两次输入的密码是否正确
        $inputError3.on("keyup", function () {
            var onBtn;
            if ($inputError2.val() === $inputError3.val()) {
                onBtn = true;
            } else {
                onBtn = false;
            }
            inputTrue(onBtn);
        });

        //密码输入执行的函数
        function inputTrue(b) {
            if (b) {
                $regPassword.addClass("has-success").removeClass("has-error").find("span").last().show().siblings("span").hide();
                $rePassword.addClass("has-success").removeClass("has-error").find("span").last().show().siblings("span").hide();
                $showDanger.html("")
            } else {
                $regPassword.addClass("has-error").removeClass("has-success").find("span").first().show().siblings("span").hide();
                $rePassword.addClass("has-error").removeClass("has-success").find("span").first().show().siblings("span").hide();
                $showDanger.html("密码两次输入的不一致，请重新输入")
            }
        }

        //输入用户名验证用户名是否被占用
        $inputSuccess2.on("keyup",function(){
            $.ajax({
                dataType:"text",   //请求的数据类型
                url: "/users",   //请求的数据接口
                data:{"userName":$inputSuccess2.val()},
                success: function (data) {    //成功时返回的结果
                    test(data);
                },
                error: function () {
                    console.log(data);
                }
            })
        });
        $subBtn.on("click",function(){
            $.post("/registers",$("#formInp"),function(){
                console.log(11);
            })
        });
        //用户输入用户名被占用时
        function test(b){
            if(b=="true"){
                $regUser.removeClass("has-success").addClass("has-error").find("span").last().show().siblings("span").hide()
            }else {
                $regUser.removeClass("has-error").addClass("has-success").find("span").first().show().siblings("span").hide()
            }
        }
    })(jQuery);
});