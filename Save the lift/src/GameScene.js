/**
 * Created by xihe on 2014/8/23.
 */
var GameScene   = cc.Scene.extend({
    zeroSprite:null,
    oneSprite:null,
    onEnter:function() {
        this._super();
        //add layer
        this.gameLayer = cc.Layer.create();
        this.addChild(this.gameLayer);

        // add backgroud
        var bg = cc.Sprite.create(s_bg);
        this.gameLayer.addChild(bg, 0);
        //set position
        bg.setAnchorPoint(cc.p(0, 0));
        bg.setPosition(cc.p(0, 0));

        //set zero
        this.zeroSprite = new InputSprite();
        this.zeroSprite.initData(this,s_zero,0);
        this.zeroSprite.setPosition(200,100);
        this.addChild(this.zeroSprite);

        //set one
        this.oneSprite = new InputSprite();
        this.oneSprite.initData(this,s_one,1);
        this.oneSprite.setPosition(330,100);
        this.addChild(this.oneSprite);
    }


});
