var GameLayer = cc.Layer.extend({
	oneSprite : null,
	zeroSprite : null,
	currentValue:[],
	numberList : [],
	size:null,
	numberLabel:null,
	count : 0,
	updateLatency:60,
	gameStatus:0,   // 0--> normal  1-->over
	renZhiList:[],
	finishAct:false,
	point:0,
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
		
		
		this.size = 4;
	
		
		//init the number label
		this.numberLabel = cc.LabelTTF.create(this.showCurrentValueList(), "Helvetica", 20);
		this.numberLabel.setColor(cc.color(0,0,0));//black color
		this.numberLabel.setPosition(cc.winSize.width/2, cc.winSize.height - 50);
		this.addChild(this.numberLabel);
		
		
		

		this.schedule(this.update);
		
	},
	update:function(dt){
		if(this.gameStatus == 1) return;
		if(this.renZhiList.length == 0){
			this.updateRenZhi();
			this.finishAct = false;
		}
		for(var i = 0;i<this.renZhiList.length;i++){			
			var act1 = cc.Sequence.create(
					cc.moveBy(0.0001,cc.p(-1, 0)),
					cc.CallFunc.create(this.occurRenZhi,this));
			
			this.renZhiList[i].runAction(act1);
			
		}
		if(this.renZhiList[0].x <= 20){
			this.finishAct = true;
			this.removeRenzhi();
			if(this.renZhiList.length == 0){
				if(this.checkResult() == true){
					this.point ++;
				}else{
					this.gameStatus =1;
				}
				
			}
			
		}
		
	},
	removeRenzhi:function(){
		this.removeChild(this.renZhiList[0], true);
		this.renZhiList.splice(0, 1);
	},
	inputOne:function(){
		this.currentValue.push(1);
		this.numberLabel.setString(this.showCurrentValueList());
	},
	inputZero:function(){
		this.currentValue.push(0);
		this.numberLabel.setString(this.showCurrentValueList());
	},
	createRandom:function(){
		return Math.round(Math.random());
	},
	updateRenZhi:function(){
		if(this.gameStatus == 1) return;
			if(this.renZhiList.length<this.size){
				var num = this.createRandom();
				this.numberList.push(num);
				var renZhi = new RenZhiSprite();
				if(num == 1){
					renZhi.initData(res.renOne_png,1);
				}else{
					renZhi.initData(res.renZero_png,0);
				}
				renZhi.setScale(40/100);
				renZhi.setPosition(cc.winSize.width-20, 220)
				this.addChild(renZhi);
				this.renZhiList.push(renZhi);
				
			}
	},
	showCurrentValueList:function(){
		var result = "";
		for(var i = 0;i<this.currentValue.length;i++){
			result+=this.currentValue[i];
		}
		return result;
	},
	occurRenZhi : function(){
		if(this.renZhiList.length > this.size) return
		var lastRanzhi = this.renZhiList[this.renZhiList.length-1];
		var lastX  = lastRanzhi.x;
		if((cc.winSize.width-20) -lastX >= 40 && !this.finishAct){
			this.updateRenZhi();
		}
	},
	checkResult : function () {
		if(this.currentValue.length != this.size) return false;
		for(var i = 0;i<this.size;i++){
			if(this.numberList[i] != this.currentValue[i])
				return false;
		}
		return true;
	}
});