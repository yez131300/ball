var GameLayer = cc.Layer.extend({
	oneSprite : null,
	zeroSprite : null,
	currentInputValue:null,
	numberList : [],
	size:null,
	numberLabel:null,
	count : 0,
	updateLatency:60,
	gameStatus:0,   // 0--> normal  1-->over
	renZhiList:[],
	finishAct:true,
	index:0,
	onEnter:function(){
		this._super();
		// init one sprite

		var oneItemPlay = cc.MenuItemSprite.create(cc.Sprite.create(res.one_png),
				cc.Sprite.create(res.one_png),
				this.inputOne, this);
		var oneMenu = cc.Menu.create(oneItemPlay);
		oneMenu.setPosition(200, 80);
		this.addChild(oneMenu);
		
		// init zero sprite
		var zeroItemPlay = cc.MenuItemSprite.create(cc.Sprite.create(res.zero_png),
				cc.Sprite.create(res.zero_png),
				this.inputZero,this);
		var zeroMenu = cc.Menu.create(zeroItemPlay);
		zeroMenu.setPosition(330, 80);
		this.addChild(zeroMenu);
		
		this.initNumberList();
		
		//init the number label
//		this.numberLabel = cc.LabelTTF.create(this.showNumberList(), "Helvetica", 20);
//		this.numberLabel.setColor(cc.color(0,0,0));//black color
//		this.numberLabel.setPosition(cc.winSize.width/2, cc.winSize.height - 50);
//		this.addChild(this.numberLabel);
		
		
		this.initRenzhi();

		this.schedule(this.update);
	},
	update:function(dt){
		if(this.finishAct){
			this.finishAct =false; // 重置标志
			var act = cc.Sequence.create(
					cc.MoveTo(5, cc.p(55, 220)),
					cc.FadeOut.create(5),
					cc.CallFunc.create(this.finishAction,this));
			this.renZhiList[this.index].runAction(act);
			this.index++;
		}
	},
	finishAction:function(){
		this.finishAct =true;
		cc.log("ok---------");
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
	initNumberList : function(){
		this.size = 4;
		for(var i = 0;i<this.size;i++){
			this.numberList[i]=this.createRandom();
		}
	},
	updateNumberList:function(){
		this.numberList[this.size] = this.createRandom();
		for(var i = 0;i<this.size;i++){
			this.numberList[i] = this.numberList[i+1];
		}
	},
	showNumberList:function(){
		var result = "";
		for(var i = 0;i<this.size;i++){
			result+=this.numberList[i];
		}
		return result;
	},
	initRenzhi:function(){
		for(var i = 0;i<this.size;i++){
			var renZhi = new RenZhiSprite();
			if(this.numberList[i] == 1){
				renZhi.initData(res.renOne_png,1);
			}else{
				renZhi.initData(res.renZero_png,0);
			}
			renZhi.setScale(40/100);
			renZhi.setPosition(cc.winSize.width-45*(this.size-i), 220);
			this.renZhiList[i]=renZhi;
			this.addChild(renZhi);
		}
	},
	
});