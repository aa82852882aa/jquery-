/**
 * Created by hxsd on 2017/2/24.
 */
$.fn.$speakServer=(function($){
    var scoketServer=io();
    scoketServer.send("server");
    scoketServer.on("message",function(data){
        console.log(data);
    })

})(jQuery);