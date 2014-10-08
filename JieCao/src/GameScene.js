/**
 * Created by xihe on 2014/8/23.
 */
var g_GameStatus={normal:0,stop:1,gameOver:2};
var GameScene   = cc.Scene.extend({
    gameLayer:null,
    btnStart: null,  //开始按钮
    picList : [s_j1,s_j2,s_j3,s_j4],
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
    min : 10,
    sec : 0,
    timeLable :null,
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


        //分数功能 //参数1：字符串  参数2：字体(系统字体)  参数3：文字大小
        this.score = cc.LabelTTF.create("0","Arial",18);
        this.score.setPosition(cc.p(this.winSize.width - 30, this.winSize.height - 21));
        this.score.setColor(cc.c3b(117, 76, 36));//改变颜色
        this.gameLayer.addChild(this.score, 2);

        //时间
        this.timeLable = cc.LabelTTF.create(this.showTime(),"Arial",18);
        this.timeLable.setPosition(cc.p(30, this.winSize.height - 21));
        this.timeLable.setColor(cc.c3b(117, 76, 36));//改变颜色
        this.gameLayer.addChild(this.timeLable, 2);
    },
    startGame:function(){
      this.gameStatus = g_GameStatus.normal;
      this.btnStart.setVisible(false);//隐藏开始按钮
      //开始计时
      this.gameTime = new Date().getTime();
    },
    createJiecao:function(){
        if(this.jieCaoList.length >= this.jieCaoCountLimit)
        return ;
        var index = new Date().getSeconds()%4;
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

        //减少时间
        //更新时间


           //新建“节操”.
        this.count++;
        if(this.count % this.frequency == 0)
        this.createJiecao();
    },
    showTime : function(){
        var second;
        if(this.sec <10){
            second = "0"+this.sec;
        }else{
            second = ""+this.sec;
        }
        return (this.min+" : "+second)
    }
});
