/**
 * Created by xihe on 2014/8/23.
 */
var g_GameStatus={normal:0,stop:1,gameOver:2};
var GameScene   = cc.Scene.extend({
    gameLayer:null,
    btnStart: null,  //开始按钮
    btnRestart: null,//重新开始按钮
    picList : [s_j1,s_j2,s_j3,s_j4,s_j5,s_j6,s_j7,s_j8,s_j9,s_j10,s_j11,s_j12,s_j13,s_j14,s_j15,s_j16],
    newJieCao : null,
    jieCaoList : new Array(),
    count:null,
    frequency : 10,
    jieCaoCountLimit : 15,
    gameStatus : g_GameStatus.stop,
    score : null,
    winSize: cc.size(480, 320),//屏幕大小
    point : 0,  //分数
    gameTime : null,
    min : 0,
    sec : 30,
    timeLabel :null,
    summaryLabel : null,
    onEnter:function(){
        this._super();
        //add layer
        this.gameLayer = cc.Layer.create();
        this.addChild(this.gameLayer);

        // add backgroud
       var bg = cc.Sprite.create(s_bg);
        this.gameLayer.addChild(bg,0);
        //set position
        bg.setAnchorPoint(cc.p(0,0));
        bg.setPosition(cc.p(0,0));
        this.count=0;
        this.schedule(this.update,0);

        //添加开始按钮。
        var startSprite = cc.Sprite.create(s_start);//开始按钮 一般状态
        var selectedSprite = cc.Sprite.create(s_start);// 开始按钮 按下状态
        //cc.MenuItemSprite 参数1：正常状态时显示的Sprite
        // 参数2：摁下选中状态时显示的Sprite 参数3：执行函数 参数4：一般传入this

        //为什么不能用this.startGame()？？
        this.btnStart =cc.MenuItemSprite.create(startSprite,selectedSprite,this.startGame,this);

        var infoMenu = cc.Menu.create(this.btnStart);
        this.gameLayer.addChild(infoMenu, 2);

        //重新开始按钮
        var restartSprite = cc.Sprite.create(s_restart);
        var reselectedSprite = cc.Sprite.create(s_restart);
        this.btnRestart = cc.MenuItemSprite.create(restartSprite,reselectedSprite,this.restart,this);
        var infoMenu2 = cc.Menu.create(this.btnRestart);
        this.gameLayer.addChild(infoMenu2, 2);
        this.btnRestart.setVisible(false);//开始时候隐藏

        //分数功能 //参数1：字符串  参数2：字体(系统字体)  参数3：文字大小
        this.score = cc.LabelTTF.create("0","Arial",18);
        this.score.setPosition(cc.p(this.winSize.width - 30, this.winSize.height - 21));
        this.score.setColor(cc.c3b(117, 76, 36));//改变颜色
        this.gameLayer.addChild(this.score, 2);

        //时间
        this.timeLabel = cc.LabelTTF.create(this.showTime(),"Arial",18);
        this.timeLabel.setPosition(cc.p(30, this.winSize.height - 21));
        this.timeLabel.setColor(cc.c3b(117, 76, 36));//改变颜色
        this.gameLayer.addChild(this.timeLabel, 2);

    },
    startGame:function(){
      this.gameStatus = g_GameStatus.normal;
      this.btnStart.setVisible(false);//隐藏开始按钮
      //开始计时
      this.gameTime = new Date().getTime();
	  cc.log("-----------"+this.gameTime+"-----------------");
    },
    createJiecao:function(){
        if(this.jieCaoList.length >= this.jieCaoCountLimit)
        return ;
        var index = new Date().getTime()% this.picList.length;
        this.newJieCao = new JieCao();
        this.newJieCao.initData(this.picList[index]);
        if(this.jieCaoList.length == 0){
            this.gameLayer.addChild(this.newJieCao,1);
            this.jieCaoList.push(this.newJieCao);
        }
        else{
            var i=0;
            for(;i<this.jieCaoList.length;i++){
                    if(this.newJieCao.checkOverLap(this.jieCaoList[i])){
                        break;
                    }
            }
            if(i == this.jieCaoList.length){
                this.gameLayer.addChild(this.newJieCao,1);
                this.jieCaoList.push(this.newJieCao);
            }
        }


    },
    update:function(dt){
        //游戏为开始的时候才运行。
        if(this.gameStatus == g_GameStatus.gameOver){

            this.over();
            return;
        }
        //重新开始
        if(this.gameStatus == g_GameStatus.stop && this.count!=0){

            this.btnRestart.setVisible(true);
            return;
        }
        if(this.gameStatus != g_GameStatus.normal) return;
           //清除已经点击的“节操”。
        for(i=0;i<this.jieCaoList.length;i++){
//            cc.log("["+i+"] is "+this.jieCaoList[i].isHit);
            if(this.jieCaoList[i].isHit){
                this.jieCaoList.splice(i,1);

                //更新分数
                this.point++;
                this.score.setString(this.point+"");
            }
        }

        //减少时间 1秒更新一次
		if(new Date().getTime() - this.gameTime >= 1000){
			this.decTime( Math.floor((new Date().getTime() - this.gameTime)/1000 ));
			this.gameTime = new Date().getTime();
			//更新时间
			if(this.min < 0 || (this.min ==0 && this.sec == 0)){
			//时间到，游戏结束
				this.gameStatus = g_GameStatus.gameOver;
				this.timeLabel.setString("00 : 00");
				cc.log("++++++++++++"+this.gameTime+"++++++++++++++++");
			}else{
				this.timeLabel.setString(this.showTime());
			}
		}
       
           //新建“节操”.
        this.count++;
        if(this.count % (this.jieCaoList.length+1) == 0)
        this.createJiecao();
    },
    showTime : function(){
        var second;
        if(this.sec <10){
            second = "0"+this.sec;
        }else{
            second = ""+this.sec;
        }
		
		var minutes;
		 if(this.min <10){
            minutes = "0"+this.min;
        }else{
            minutes = ""+this.min;
        }
        return (minutes+" : "+second)
    },
	decTime : function(diff){
		this.sec -= diff;
		while(this.sec < 0){
			this.sec += 60;
			this.min --;
		}
	},

    //游戏结束
    over : function(){
        //清空所以的“节操”
        for(i=0;i<this.jieCaoList.length;i++){
            this.jieCaoList[i].setVisible(false);
        }

        var massage =null;
        if(this.point == 0){
            massage = "你没救了!!!"
        }else if(this.point <= 40){
            massage = "居然让你捡回了一点节操，不要放弃！"
        }else if(this.point <=60){
            massage = "矮油~不错噢！节操还在啊~"
        }else if(this.point <=80){
            massage = "牛逼哄哄！有本事你来超越我啊！"
        }else{
            massage = "哼~凡人，别闹了好吗？这才叫节操！"
        }

        this.summaryLabel = cc.LabelTTF.create(this.point+"分 : "+massage,"Arial",22);
        this.summaryLabel.setPosition(cc.p(240, 220));
        this.summaryLabel.setColor(cc.c3b(117, 76, 36));//改变颜色
        this.gameLayer.addChild(this.summaryLabel, 2);

        this.gameStatus = g_GameStatus.stop;
    },

    //重新开始
    restart :function(){
        //状态恢复
        this.jieCaoList =new Array();
        this.point = 0;
        this.min=0;
        this.sec =30;
        this.count =0;
        this.score.setString("0");
        this.timeLabel.setString(this.showTime());
        this.gameTime = new Date().getTime();
        this.gameStatus =g_GameStatus.normal;
        this.btnRestart.setVisible(false);
        this.summaryLabel.setVisible(false);
    }
});
