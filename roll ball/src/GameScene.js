/**
 * Created by xihe on 2014/8/23.
 */
var GameScene   = cc.Scene.extend({
    gameLayer:null,
    ball:null,
    onEnter:function(){
        this._super();
        //add layer
        this.gameLayer = cc.Layer.create();
        this.addChild(this.gameLayer);

        // add backgroud
       var bg = cc.Sprite.create(s_bg);
        this.gameLayer.addChild(bg,0);

        //set position
        bg.setAnchorPoint(cc.p(0,0));
        bg.setPosition(cc.p(0,0));

         this.ball =new Ball();
         this.gameLayer.addChild(this.ball,1);

        this.schedule(this.update,0);
    },
    update:function(dt){
       this.ball.update(dt);
    }
});
/*
var GameScene = cc.Scene.extend({
    gameLayer:null,
    onEnter:function () {
        this._super();//调用父类的同名方法，这里是调用cc.Scene的onEnter
        //一般在这里自己写进入场景后的操作
        //添加Layer
        this.gameLayer = cc.Layer.create();
        this.addChild(this.gameLayer);
        //添加背景
        var bg = cc.Sprite.create(s_forest1);
        this.gameLayer.addChild(bg,0);

        bg.setAnchorPoint(cc.p(0,0));
        bg.setPosition(cc.p(0,0));
    }
});
*/