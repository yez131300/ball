var BgLayer = cc.Layer.extend({
	onEnter:function(){
		this._super();
		cc.log("--------------");
		var bg = cc.Sprite.create();
		bg.initWithFile(res.bg_png);
		var windowSize = cc.director.getWinSize();
		bg.setPosition(windowSize.width/2, windowSize.height/2);
		this.addChild(bg);
	}
});