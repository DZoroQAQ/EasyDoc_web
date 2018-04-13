/*常量区*/
//当前div的对象
var itemObject = $(".item.is-animate.is-active");
//当前indicator对象
var indicatorsObject = $(".indicator.is-active");
//线程变量
var flag = 1;
$(function () {     //初始化，让所有的下滑标绑定滑入事件
    $(".indicator").mouseenter(isMouseOn);
    indicatorsObject.unbind("mouseenter");   //解绑初始化的第一个下滑键的滑入事件
});

function isMouseOn() {
    if(flag === 1){
        flag = 2;
        //下滑标变化
        console.log($(this));
        indicatorChange($(this));


        //界面变化
        itemChange(this);
        setTimeout(function () {
            flag = 1;
        },400);
    }
   else{

    }
}
/*下滑标变化函数*/
function indicatorChange(after) {
    indicatorsObject.mouseenter(isMouseOn);   //重新赋予上一个下滑标的划入时间
    indicatorsObject.removeClass("is-active");//删除上个下滑标的活动状态
    indicatorsObject = after;     //indicatorsObject赋予成当前滑入的下滑标
    console.log(after);
    indicatorsObject.addClass("is-active"); //赋予当前下滑标的活动状态
    indicatorsObject.unbind("mouseenter");  //解绑当前下滑键的滑入事件
}
/*界面变化函数*/
function itemChange(after) {
    var indicatorObjects =  $(".indicator");
    var itemObjects = $(".item");
    var index = indicatorObjects.index(after); //获取当前触发事件的切换行的下标
    itemObjects.attr("class","item");    //将所有的界面item的class全部还原成只有item
    itemObject.addClass("is-animate");      //赋予上一个界面的动画类
    itemObject = itemObjects.eq(index);     //itemObject赋予成当前界面
    itemObject.addClass("is-active is-animate");  //赋予当前准备切换界面的活动类与动画类
    var numberX =getTranslateX(itemObjects.eq(index)); //获得当前要切换成的界面的translateX的值

    if(numberX >0){
        numberX = "-"+numberX;
    }else{
        numberX = Math.abs(numberX);
    }
    console.log(index);
    console.log(numberX);
    var itemSize = itemObjects.length;
    for (var i=0;i<itemSize;i++){
        //将transLateX的值进行相应的增减。
        var originalValue = parseFloat(getTranslateX(itemObjects.eq(i)));
        var nowValue = parseFloat(numberX);
        var valueString = "translateX("+(originalValue+nowValue)+"px)";
        console.log(originalValue+"   "+nowValue+"  "+valueString);
        itemObjects.eq(i).css("transform",valueString);
    }

}

function getTranslateX(i) {
    var text = i.css("transform");
    return text.replace(/[^0-9\-,]/g,'').split(',')[4];
}
//
// function onClickButtonLeft() {
//
//     indicatorChange(indicatorsObject.previousSibling);
//
// }