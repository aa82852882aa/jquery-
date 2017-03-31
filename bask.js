/**
 * Created by hxsd on 2017/3/3.
 */
/**
 * 单个商品的的对象：
 * var product={name:"商品名称",price:"商品价格"}
 *
 * 购物车中每个商品的对象：
 * var item={product:{name:"商品名称",price:"商品价格"},number:"数量"}
 *
 * baskArr 这个数组存在的形式为：
 * baskArr=[
 {product:{name:"商品名称",price:"商品价格"},number:"数量"},
 {product:{name:"商品名称",price:"商品价格"},number:"数量"}
 ]
 */

//创建购物车数组
var bask = [];

//创建购物流程的对象
var shopping = {
    //添加商品的方法.传入商品的数组
    add: function (product) {
        //循环购物车中所有的商品，bask中有商品，则数量添加1，如果没有则加入
        for(var i=0;i<bask.length;i++){
            if(product.name==bask[i].product.name){
                bask[i].number++;
                break;
            }
        }
        bask.push({product:product,number:1});
    },

    //删除商品的方法,传入商品的名称
    remove:function(name){
        for(var i=0;i<bask.length;i++){
            if(name==bask[i].product.name){
                bask.splice(i,1);
                break;
            }
        }
    },
    //显示多有的商品
    showPro:function(){
        return bask;
    },
    //清空购物车
    clearAll:function(){
        bask.length=0;
    }
};