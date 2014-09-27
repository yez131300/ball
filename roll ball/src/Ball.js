var Ball = cc.Sprite.extend({
    velocity:null,
    radius: 100,
    count :1,
    ctor:function(){
        this._super();
        this.initWithFile(s_ball);//赋予图片元素
        this.initData();
    },
    initData:function(){
        var x = 100-Math.random()*200;
        var y = 100-Math.random()*200;
        this.setPosition(cc.p(240,120));
        this.velocity = cc.p(100,-100);
        this.count = 1;
    },
    update:function(dt){
       this.count++;
        if(this.count%100 == 0){
            var x = 100-Math.random()*200;
            var y = 100-Math.random()*200;
            this.velocity = cc.p(x,y);
        }
        this.checkSide();
        this.setPosition(cc.pAdd(this.getPosition(), cc.pMult(this.velocity, dt)))
    },

    checkSide: function(){
        //为嘛用下边的X,Y就不行了？？？？？？
//            var x = this.getPosition.getX();
//            var y = this.getPosition.getY();

        var pos = this.getPosition();
        var contentSize = this.getContentSize();
        var screenSize = cc.Director.getInstance().getWinSize();
        //右边界
        if(pos.x > screenSize.width - this.radius){
            this.velocity.x  = -Math.abs(this.velocity.x);
        }
        //左边界
        if(pos.x < this.radius){
            this.velocity.x = Math.abs(this.velocity.x);
        }
        //下边界
        if(pos.y < this.radius){
            this.velocity.y = Math.abs(this.velocity.y);
        }
        //上边界
        if(pos.y > screenSize.height-this.radius){
            this.velocity.y = -Math.abs(this.velocity.y);
        }
    }
});