/**
 * Created by hxsd on 2017/2/23.
 */

$(function(){
        var search=location.search.slice(1);
        var url="/search?va=" + search;

        $.getJSON(url,function(data){

            for(var i=0;i<data.length;i++){
                var $li=$("<li>");
                var cont='<li class="col-md-3">'+
                    '<div class="pic"><img src="'+ data[i].image +'"></div>'+
                    '<p>'+ data[i].price +'</p>'+
                    '<p>'+ data[i].msg +'<span>'+ data[i].type +'</span><span>'+ data[i].list +'</span></p>'+
                    '<p>'+ data[i].shop + '</p>'+
                    '</li>';
                $li.append(cont).appendTo($("#row"));
            }
        })
});
