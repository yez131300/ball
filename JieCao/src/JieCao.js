/**
 * Created by xihe on 2014/10/5.
 */
var JieCao = cc.Sprite.extend({
    pic : null,
    x:null,
    y:null,
    isHit:null,
    width:null,
    height:null,
    ctor:function(){
        this._super();
        this.isHit =false;
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
    },
    initData : function(picture){
        this.pic=picture;
        this.initWithFile(this.pic);
        this.width = this.getContentSize().width;
        this.height =this.getContentSize().height;
        this.x =Math.round(Math.random()*(480-this.width));
        this.y=Math.round(Math.random()*(290-this.height));
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
        }else if(other.x > this.x+this.width || this.x > other.x+other.width){
            return false;
        }else if(other.y > this.y+this.height || this.y > other.y+other.height){
            return false;
        }else return true
    },
    isHitOnThis : function(touch){
        //获取触摸点位置
        var getPoint = touch.getLocation();
        if(getPoint.x >= this.x && getPoint.x <= this.x+this.width
            && getPoint.y >=this.y && getPoint.y <= this.y+this.height){
//            cc.log("----------------------------"+this.getContentSize().width +"  :  "+this.getContentSize().height);
            return true
        }else return false;
    }
    });