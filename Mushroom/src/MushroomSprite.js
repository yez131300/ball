/**
 * Power by  html5中文网(html5china.com)
 * User: 深邃老马
 */
var MushroomSprite = cc.Sprite.extend({
    radius:40,
    //构造函数，当new一个当前的实例时，会执行ctor
    ctor:function(){
        this._super();  //调用父类的同名方法，这里是调用cc.Sprite的ctor
        this.initWithFile(s_mushroom);//赋予图片元素
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
    },
    //判断触摸点是否在图片的区域上
    containsTouchLocation:function (touch) {
        //获取触摸点位置
        var getPoint = touch.getLocation();

        //物体当前区域所在的位置
        var contentSize  =  this.getContentSize();
        var myRect = cc.rect(0, 0, contentSize.width, contentSize.height);
        //getPosition方法是返AnchorPoint那个点。
        myRect.origin.x += this.getPosition().x-this.getContentSize().width/2;
        myRect.origin.y += this.getPosition().y;
        //判断点击是否在区域上
        return cc.Rect.CCRectContainsPoint(myRect, getPoint);
    },
    //刚触摸瞬间
    onTouchBegan:function (touch, event) {
        if (!this.containsTouchLocation(touch)) return false;
        return true;
    },
    //触摸移动
    onTouchMoved:function (touch, event) {
        cc.log("onTouchMoved");
        var touchPoint = touch.getLocation();
        this.setPositionX(touchPoint.x);  //设置X轴位置等于触摸的x位置
    }
});