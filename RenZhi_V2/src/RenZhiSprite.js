var RenZhiSprite = cc.Sprite.extend({
	value : null,
	ctor:function(){
		this._super();
//		cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
	},
	initData:function(pic,value){
		this.initWithFile(pic);
		this.value =value;
	},
//	move:function(time,point){ // time ---> 移动时间
//		var action = cc.MoveTo.create(time,point);
//		this.runAction(action);
//	},
//	fadeOut:function(time){ // time--> 淡出时间 秒
//		var action = cc.FadeOut.create(time);
//		this.runAction(action);
//	}
});
