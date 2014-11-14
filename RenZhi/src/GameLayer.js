var GameLayer = cc.Layer.extend({
	oneSprite : null,
	zeroSprite : null,
	currentInputValue:null,
	onEnter:function(){
		this._super();
		// init one sprite

		var oneItemPlay = cc.MenuItemSprite.create(cc.Sprite.create(res.one_png),
				cc.Sprite.create(res.one_png),
				this.inputOne, this);
		var oneMenu = cc.Menu.create(oneItemPlay);
		oneMenu.setPosition(200, 100);
		this.addChild(oneMenu);
		
		// init zero sprite
		var zeroItemPlay = cc.MenuItemSprite.create(cc.Sprite.create(res.zero_png),
				cc.Sprite.create(res.zero_png),
				this.inputZero,this);
		var zeroMenu = cc.Menu.create(zeroItemPlay);
		zeroMenu.setPosition(330, 100);
		this.addChild(zeroMenu);
		
		this.schedule(this.update,0);
	},
	inputOne:function(){
		this.currentInputValue =1;
	},
	inputZero:function(){
		this.currentInputValue =0;
	},
	createRandom:function(){
		return Math.round(Math.random());
	},
	update:function(dt){
		cc.log("----------------------------"+this.createRandom());
	}
});