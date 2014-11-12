var GameLayer = cc.Layer.extend({
	oneSprite : null,
	zeroSprite : null,
	onEnter:function(){
		this._super();
		// init one sprite
		this.oneSprite = new InputSprite();
		this.oneSprite.initData(this,res.one_png,1);
		this.oneSprite.setPosition(200, 100);
		this.addChild(this.oneSprite)
		
		// init zero sprite
		this.zeroSprite = new InputSprite();
		this.zeroSprite.initData(this, res.zero_png, 0);
		this.zeroSprite.setPosition(330, 100);
		this.addChild(this.zeroSprite);
	}
});