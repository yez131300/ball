var InputSprite = cc.Sprite.extend({
	gameScene:null,
	picture:null,
	value:null,
//	width:null,
//	height:null,
	ctor:function(){
		this._super();
//		cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
	},
	initData:function(scene,pic,value){
		this.gameScene = scene;
		this.picture = pic;
		this.value=value;
		this.initWithFile(this.picture);
		this.width = this.getContentSize().width;
		this.height =this.getContentSize().height;

	}
});
