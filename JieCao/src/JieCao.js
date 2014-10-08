/**
 * Created by xihe on 2014/10/5.
 */
var JieCao = cc.Sprite.extend({
    pic : null,
    x:null,
    y:null,
    isHit:null,
    ctor:function(){
        this._super();
        this.isHit =false;
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
    },
    initData : function(picture){
        this.pic=picture;
        this.initWithFile(this.pic);
        this.x =Math.round(Math.random()*400);
        this.y=Math.round(Math.random()*250);
        this.setAnchorPoint(0,0);
        this.setPosition(this.x,this.y);
    },
    onTouchBegan:function (touch, event) {
//            cc.log("click---------");
        if(this.isHitOnThis(touch)){
            this.setVisible(false);
            this.isHit = true;
        }

    },
    checkOverLap: function(other){
        if(other == null){
            return false
        }else if(other.x > this.x+80 || this.x > other.x+80){
            return false;
        }else if(other.y > this.y+40 || this.y > other.y+40){
            return false;
        }else return true
    },
    isHitOnThis : function(touch){
        //获取触摸点位置
        var getPoint = touch.getLocation();
        if(getPoint.x >= this.x && getPoint.x <= this.x+80
            && getPoint.y >=this.y && getPoint.y <= this.y+40){
            return true
        }else return false;
    }
    });