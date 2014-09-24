var Ball = cc.Sprite.extend({
    velocity:null,
    radius: 100,
    ctor:function(){
        this._super();
        this.initWithFile(s_ball);//赋予图片元素
        this.initData();
    },
    initData:function(){
        var x = 10-Math.random()*10;
        var y = 10-Math.random()*10;
        this.setPosition(cc.p(240,120));
        this.velocity = cc.p(x,y);
    },
    update:function(dt){
        this.setPosition(cc.pAdd(this.getPosition(), cc.pMult(this.velocity, dt)))
    }
});