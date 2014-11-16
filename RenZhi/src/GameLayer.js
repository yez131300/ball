var GameLayer = cc.Layer.extend({
	oneSprite : null,
	zeroSprite : null,
	currentInputValue:null,
	numberList : [],
	size:null,
	numberLabel:null,
	count : 0,
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
		
		this.initNumberList();
		
		//init the number label
		this.numberLabel = cc.LabelTTF.create(this.showNumberList(), "Helvetica", 20);
		this.numberLabel.setColor(cc.color(0,0,0));//black color
		this.numberLabel.setPosition(cc.winSize.width/2, cc.winSize.height - 50);
		this.addChild(this.numberLabel);
		
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
//		cc.log("----------------------------"+this.createRandom());
		if(this.count%100 == 0){
		this.updateNumberList();
		this.numberLabel.setString(this.showNumberList());
		}
		this.count++;
	},
	initNumberList : function(){
		this.size = 10;
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
	}
	
});