/**
 * Created 2017/2/16.
 */


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
                    $banner.eq($(this).index()).stop().fadeIn("slow").siblings().finish().fadeOut("slow");
                    num=$(this).index();
                });
                //自动播放函数
                clearInterval(timer);
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

//左侧锚点函数
        var $scrollToTop = (function () {
            var $floor = null;
            var $roll = null;

            var scrollRunFn = function () {
                $floor = $("#floor").find("li");
                $roll = $("#roll").find(".floorRoll");

                //创建滚动函数
                $(document).on("scroll", function () {
                    //页面滚动到1000px的位置显示楼层导航，否则消失
                    $(this).scrollTop() >= 1000 ? $floor.parents("#floor").finish().show() : $floor.parents("#floor").finish().hide();
                    var scrollH=$(window).height()/2+$(document).scrollTop();
                    //页面滚动到相应的楼层，相应的楼层导航亮起
                    $floScroll(scrollH);
                });

                function $floScroll(top){
                    $roll.each(function(index){
                        if($(this).offset().top<=top){
                            $floor.eq(index).removeClass().addClass("ac").siblings().removeClass("ac");
                            $roll.find("div.title").eq(index).find("a").addClass("ac").parents("div.floorRoll").siblings().find("div.title").find("a").removeClass("ac")
                        }
                    });
                }
                //楼层导航的点击事件
                $floor.on("click", function () {
                    $(this).addClass("ac").siblings().removeClass("ac");
                    $("html,body").animate({
                        scrollTop: $roll.eq($(this).index()).offset().top
                    },800);
                    $(document).trigger("scroll");
                })
            };

            return scrollRunFn;
        })();

//走马灯函数
        var $marquee=(function(){
            var $zoumadeng=null;
            var step=1;
            var delay=10;
            var timer;
            var $marqueeRun=function(){
                $zoumadeng=$("#zoumadeng");
                //初始化，并且吧第一个ul里面的内容复制到第二个ul里面
                $zoumadeng.find("div.marquee").find("ul").eq(1).html($zoumadeng.find("div.marquee").find("ul").eq(0).html());
                //创建定时器 改变div.marquee的scrollTop值
                timer=setInterval($marqueeAutoRun,delay);
                function $marqueeAutoRun(){
                    $zoumadeng.scrollTop($zoumadeng.scrollTop()+step);
                    if($zoumadeng.scrollTop()>=$zoumadeng.find("ul").eq(0).height()){
                        $zoumadeng.scrollTop(0);
                    }
                }

                //鼠标hover事件
                $zoumadeng.hover(
                    function(){clearInterval(timer)},
                    function(){timer=setInterval($marqueeAutoRun,delay);}
                )

            };
            return $marqueeRun;
        })();


//初始化banner
        function $inIt(parentele,conele){
            parentele.eq(0).addClass("active");
            conele.eq(0).css("display","block");
        }
