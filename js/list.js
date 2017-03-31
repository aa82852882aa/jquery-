/**
 * Created by hxsd on 2017/2/18.
 */

var $imgListFn=(function(){
    var $Magnifier=null;
    var $MagnifierBigPic=null;
    var $picList=null;
    var $scrollBox=null;
    var $movestep=null;
    var $moveSpan=null;

    var $imgListRun=function(){
        $Magnifier=$("#Magnifier");
        $MagnifierBigPic=$("#MagnifierBigPic");
        $picList=$("#picList");
        $scrollBox=$("#scrollbox");
        $moveSpan=$Magnifier.find("span.maspan");

        //鼠标移动到底部，小图改变class同时 大图改为相应的图片
        $picList.find("li").hover(function(){
            $(this).addClass("ac").siblings().removeClass("ac");
            $Magnifier.find("img").attr("src",$(this).find("img").attr("src"));
        });
        //鼠标点击左右按钮 移动下发的小图

        //动态改变ul的宽度
        $movestep=$scrollBox.find("li").width();
        $scrollBox.find("ul").width($movestep * $scrollBox.find("li").length);

        //a.next的点击事件
        $picList.find("a.next")
            .on("click",function(){
            $scrollBox.animate({
                    scrollLeft:$scrollBox.scrollLeft()+$movestep
            },"fast");
        }).siblings()
            .on("click",function(){
            $scrollBox.animate({
                    scrollLeft:$scrollBox.scrollLeft()-$movestep
            },"fast");
        });
        //放大镜效果
        $Magnifier.on("mousemove", function (e) {

            $moveSpan.show();
            $MagnifierBigPic.show();
            //设置span.maspan的位置
            var x= e.pageX-$moveSpan.width()/2-$(this).offset().left;
            var y= e.pageY-$moveSpan.height()/2-$(this).offset().top;
            //获得span在div上移动的最大距离
            var maxX=$Magnifier.width()-$moveSpan.width();
            var maxY=$Magnifier.height()-$moveSpan.height();
            if(x<=0)x=0;
            if(y<=0)y=0;
            if(x>=maxX)x=maxX;
            if(y>maxY)y=maxY;
            $moveSpan.css({
                left:x,top:y
            });
            //计算span在div上移动的比例
            var $ratioX=x/maxX;
            var $ratioY=y/maxY;
            //设置大图在div上的移动
            $MagnifierBigPic.find("img").css({
                left:($MagnifierBigPic.width()-$MagnifierBigPic.find("img").width())*$ratioX,
                top:($MagnifierBigPic.height()-$MagnifierBigPic.find("img").height())*$ratioY
            });
            e.stopPropagation();
        }).on("mouseout",function(e){
            $moveSpan.hide();
            $MagnifierBigPic.hide();
            e.stopPropagation();
        });
    };
    return $imgListRun;
})();

var $addessChange=(function(){
    var $addressId=null;
    var $addressmenu=null;
    var $menutop=null;
    var $bottlist=null;
    var $chuncolor=null;
    var $selectBtnTop=null;
    var $btnXuanze=null;
    var $baitiao=null;
    var $subNum=null;
    var timer;
    var hidetimer;
    var num=1;

    var $addessChangeRun=function(){
        $addressmenu=$("#addrdown");
        $addressId=$("#addrssId");
        $menutop=$("#menutop");
        $bottlist=$("#bottlist");
        $chuncolor=$("#chuncolor");
        $selectBtnTop=$("#selectBtnTop");
        $btnXuanze=$("#btnXuanze");
        $baitiao=$("#baitiao");
        $subNum=$("#subNum");

        //初始化界面
        $addressmenu.hide();
        //鼠标移入事件
        $addressId.hover(
            function(){$addressmenu.show();},
            function(){timer=setTimeout($hideAdd,100)}
        );
        function $hideAdd(){$addressmenu.hide();}
        //鼠标移动到子菜单上
        $addressmenu.hover(
            function(){clearTimeout(timer)},
            function(){timer=setTimeout($hideAdd,100)}
        );
        //子菜单选项卡函数
        $menutop.find("li").on("click",function(){
            $(this).addClass("ac").siblings().removeClass("ac");
            $bottlist.find("div.list").eq($(this).index()).show().siblings("div.list").hide();
        });
        //点击关闭按钮隐藏子菜单
        $("#closebtn").on("click",function(){$addressmenu.hide();});
        //动态添加chuncolor的高度
        $chuncolor.height($selectBtnTop.height());
        //创建选择颜色的函数
        $selectBtnTop.find("div.list").on("click",function(){
            $(this).addClass("ac").siblings().removeClass("ac")
        });
        //增值保值的函数
        //初始化
        var $listRadio=$btnXuanze.find("div.suoyou").find("div.list_radio");
        $listRadio.hide();
        //点击按钮
        $btnXuanze.find("div.list")
            .on("click",function(){
                $(this).toggleClass("ac");
                $listRadio.find("input:radio[name='list"+ ($(this).index()+1) +"']").eq(0).attr("checked",true)
            })
            .hover(
            function(){
                clearTimeout(hidetimer);
                $listRadio.eq($(this).index()).show().siblings("div.list_radio").hide();
            },
            function(){hidetimer=setTimeout($hideListMenu,100);}
        );

        //白条函数
        $baitiao.find("a.list").on("click",function(){
            $(this).addClass("ac").siblings("a.list").removeClass("ac");
        });
        //购买数量函数
        $subNum.find("a").eq(0).on("click", function () {
            num++;
            $(this).siblings("span").html(num);
        });
        $subNum.find("a").eq(1).on("click", function () {
            if(num==1){return false}
            num--;
            $(this).siblings("span").html(num);
        });
        //定时器函数
        function $hideListMenu(){$listRadio.hide()}
        $listRadio.hover(
            function(){clearTimeout(hidetimer)},
            function(){hidetimer=setTimeout($hideListMenu,100);}
        )
    };
    return $addessChangeRun;
})();

//配件搭配函数
var $matchTab=(function(){
    var $com_nav=null;
    var $scrolltab=null;

    var $matchTabRun=function(){

        $com_nav=$("#com_nav").find("li");
        $scrolltab=$("#scrolltab").find("div.tab_list");

        $com_nav.on("click",function(){
            $(this).addClass("ac").siblings().removeClass("ac");
            $scrolltab.eq($(this).index()).show().siblings().hide();
        })
    };
    return $matchTabRun;
})();
