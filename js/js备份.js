/**
 * Created by hxsd on 2017/2/16.
 */

//$(function () {
//    $navList();  //nav
//    $slideFadeFn();  //slide
//    $tabslideFn();  //tab
//});

//导航栏函数
var $navList = (function () {
    var $menu = null;
    var $popup = null;
    var $dataIndex = null;
    var timer = null;

    //鼠标移入#menu事件
    var $menuMouseEnter = function () {
        $menu = $("#menu").find("li");
        $popup = $("#popup").find("[id*='cate_item']");
        //鼠标移动到li上面
        $menu.hover(
            //鼠标移入事件
            function () {
                //保存每个li上面的data-index属性
                $dataIndex = $(this).attr("data-index");
                $(this).addClass("ac").siblings().removeClass("ac");
                $popup.eq(parseInt($dataIndex) - 1).show().siblings().hide().parents("#popup").show();
                clearInterval(timer)
            },
            //鼠标移出事件
            function () {timer = setTimeout(hidePopupList, 100)}
        );
        $popup.parents("#popup").hover(
            function () {clearInterval(timer)},
            function () {timer = setTimeout(hidePopupList, 100)}
        );
    };
    /**
     * *****************************************************************************
     */
    //hidePopupList定时消失函数
    function hidePopupList() {
        $menu.removeClass("ac");
        $popup.hide().parents("#popup").hide();
    }

    return $menuMouseEnter;
})();

//轮播图slide函数
var $slideFadeFn=(function(){
    var $banner=null;
    var $imgIcon=null;
    var $slideBtn=null;
    var timer=null;
    var num=0;
    var $slideRun=function(){
        $banner=$("#banner").find("li");
        $imgIcon=$("#pic_icon");
        $slideBtn=$("#nav_btn").find("a");
        //生成slide图片的下标
        $creatEleIcon($banner,$imgIcon);
        //初始化banner
        $inIt($imgIcon.find("span"),$banner);
        //鼠标移入slide图片的下标
        $imgIcon.find("span").on("mouseenter",function(){
            $(this).addClass('active').siblings().removeClass("active");
            $banner.eq($(this).index()).fadeIn("slow").siblings().fadeOut("slow");
            num=$(this).index();
        });
        //自动播放函数
        $slideAutoPlay();

        //鼠标点击$slideBtn切换图片
        $slideBtn.eq(0).on("click",function(){
            num--;
            if(num<0){
                num=$banner.length-1;
            }
            $clickbtn();
        });
        $slideBtn.eq(1).on("click",function(){
            num++;
            if(num>$banner.length-1){
                num=0;
            }
            $clickbtn();
        });
        //鼠标移入自动播放暂停
        $banner.parents("#banner")
            .on("mouseenter",function(){clearInterval(timer)})
            .on("mouseleave",function(){timer=setInterval($AutoPlay,1500)})
    };
    /**
     * *****************************************************************************
     */
    function $slideAutoPlay(){
        timer=setInterval($AutoPlay,1500)
    }
    //自动播放函数
    function $AutoPlay(){
        $slideBtn.eq(1).trigger("click");
    }
    //左右按钮函数
    function $clickbtn(){
        $banner.eq(num).stop().fadeIn("slow").siblings().fadeOut("slow");
        $imgIcon.find("span").eq(num).addClass("active").siblings().removeClass("active");
    }

    //生成slide图片的下标
    function $creatEleIcon(obj,parent){
        obj.each(function(index){
            $("<span>").append(index+1).appendTo(parent)
        });
    }
    return $slideRun;
})();

//tab选项卡函数
function $tabslideFn(navParent,conParent){
    var $navbar=$(navParent).find("li");
    var $switchtab=$(conParent).find("div.tabhide");
    var timer=null;
    var num = 1;
        //初始化界面
        $inIt($navbar, $switchtab);
        //鼠标移入导航区域显示对应的内容
        $navbar.hover(
            function () {
                $(this).addClass('active').siblings().removeClass("active");
                $switchtab.eq($(this).index()).finish().fadeIn().siblings().hide();
                num = $(this).index();
            });
        //自动播放函数
        timer = setInterval($AutoPlay, 1500);
        //鼠标移动到内容区域的函数
        $switchtab.hover(
            function () {
                clearInterval(timer)
            },
            function () {
                timer = setInterval($AutoPlay, 1500);
            }
        );
    //定时器的自动播放函数
    function $AutoPlay(){
        if(num>=$navbar.length){num=0}
        $navbar.eq(num).addClass("active").siblings().removeClass("active");
        $switchtab.eq(num).fadeIn("fast").siblings().hide();
        num++;
    }
}

//初始化banner
function $inIt(parentele,conele){
    parentele.eq(0).addClass("active");
    conele.eq(0).css("display","block");
}