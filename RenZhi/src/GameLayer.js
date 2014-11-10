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
	}
});