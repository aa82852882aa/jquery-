/**
 * Created by Administrator on 2017/2/23 0023.
 */
$(function () {

    $.fn.$init=(function(){
        //隐藏聊天界面
        this.$speakBox=$("#speakBox");
        this.$loginBox=$("#loginBox");
        $speakBox.hide();
        $loginBox.find("button").on("click",function(){
            $loginBox.hide();
            $speakBox.show();
            userName= $loginBox.find("input[name='inUser']").val();
            var conts= '<div class="shopList">' +
                '<span>京东客服:尼古拉斯“二狗子”</span>' +
                '<div class="innerCon">你好：“'+ userName +'  ”我是：京东客服:尼古拉斯“二狗子”，欢迎听我逼逼</div>' +
                '</div>';
            $content.append(conts);
            $scroll();
        });
    })();
    //生成表情包函数
    $.fn.$iconListFn = (function ($) {
        this.$iconList = $("#iconList");
        this.$divIn = $("#divIn");
        var num = 132;
        for (var i = 0; i < num; i++) {
            var cont = '<li><img src="images/expression/' + (i + 1) + '.gif"></li>';
            $iconList.append(cont);
        }
        this.$li = $iconList.find("li");
        $li.on("click", function () {
            var $imgUrl = $(this).find("img").attr("src");
            var $newImg = $("<img src='" + $imgUrl + "'/>");
            $divIn.append($newImg);
        })
    })(jQuery);

    //发送内容
    $.fn.$sendFn = (function ($) {
        this.$send = $("#send");
        this.$content = $("#content");
        this.$expression = $("#expression");
        this.$tools = $("#tools");
        this.$innContent = $("#innContent");
        //初始化
        $expression.hide();
        //点击表情图标
        $tools.find("i")
            .on("click", function () {
                $expression.toggle();
            })
            .on("mouseenter", function () {
                $(this).css({
                        "backgroundPosition": "0 -30px"
                    })
            .on("mouseleave", function () {
                $(this).css({
                    "backgroundPosition": "0 0"
                })
            });
            });
        //点击发送按钮
        $send.on("click", function () {
            var $innerContent = $divIn.html();
            var cont = '<div class="userList">' +
                '<div class="user">'+ userName || 'user' +'</div>' +
                '<div class="speak">' + $innerContent + '</div>' +
                '</div>';
            $content.append(cont);
            $divIn.html("");   //重置输入框的内容
            //内容框滚动条
            $scroll();
            $expression.hide();
        });

        //键盘的点击事件
        $divIn.on("keydown", function (e) {

            if (e.keyCode == 13) {
                e.preventDefault();
                $send.trigger("click");
            }
        });
        //点击上传图片
        this.$loadFile=$("#loadFile");
        $loadFile.on("change",function(){
            var text=$(this).val().slice(12);
            $divIn.append($("<img src='images/"+ text +"'>"));
            $(this).val("");
        });
    })(jQuery);

    //tab切换
    $.fn.$tabChange=(function($){
        this.$tabTop=$("#tabTop");
        $tabTop.find("ul li").on("click",function(){
            if($(this).attr("src")=="ac"){
                return false
            }
            $(this).addClass("ac").siblings().removeClass("ac");
        });
    })(jQuery);

    //创建服务器交互脚步
    $.fn.$scoketServer=(function($){
        var clientSocket=io();
        clientSocket.on("message",function(data){
            if(data.type=="qs"){
                var cont= '<div class="shopList">' +
                    '<span>' + data.nickname + '</span>' +
                    '<dl>' +
                    '<dt>请选择您要咨询的业务</dt>' +
                    '<dd><a href="javascript:;">订单服务</a></dd>' +
                    '<dd><a href="javascript:;">售后服务</a></dd>' +
                    '<dd><a href="javascript:;">配送服务</a></dd>' +
                    '<dd><a href="javascript:;">账户服务</a></dd>' +
                    '<dd><a href="javascript:;">财务服务</a></dd>' +
                    '<dd><a href="javascript:;">意见与建议</a></dd>' +
                    '<dd><a href="javascript:;">一起帮-您的购物助手</a></dd>' +
                    '<dd><a href="javascript:;">虚拟商品</a></dd>' +
                    '<dd><a href="javascript:;">乡村推广员招募</a></dd>' +
                    '</dl>' +
                    '</div>';
                $content.append(cont);
            }else if(data.type=="as"){
                var conts= '<div class="shopList">' +
                    '<span>'+ data.nickname +'</span>' +
                    '<div class="innerCon">'+ data.qs +'</div>' +
                    '</div>';
                $content.append(conts);
            }
            $scroll();
            //$content.scrollTop($content.prop("scrollHeight"));
        });
        //点击发送按钮，给服务器传送数据
        $send.on("click",function(){
            var text=$divIn.text();
            clientSocket.send(text);
        });
        $content.on("click","dd a",function(){
            var txt=$(this).text();
            var cont = '<div class="userList">' +
                '<div class="user">'+ userName +'</div>' +
                '<div class="speak">' + txt + '</div>' +
                '</div>';
            $content.append(cont);
            $scroll();
            clientSocket.send(txt);
        });
    })(jQuery);

    $.fn.$goTop=function($){

        this.$goTopBtnA=$("#goTop");

        $goTopBtnA.on("click",function(){
            $content.animate({
                scrollTop:0
            },500);
        })
    }(jQuery);

    //滚动条函数
    function $scroll(){
        $content.animate({
            scrollTop:$content.prop("scrollHeight")
        },500);
    }
});