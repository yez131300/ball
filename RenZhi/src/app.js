
var GameScene = cc.Scene.extend({
	gameLayer:null,
	frontLayer:null,
    onEnter:function () {
        this._super();

        var layer = new BgLayer();
        this.addChild(layer);
        
        this.gameLayer = new GameLayer();
        this.addChild(this.gameLayer);
        
        this.frontLayer = new FrontLayer();
        this.frontLayer.setPoint(this.gameLayer.point);
        this.addChild(this.frontLayer)
        this.schedule(this.update);
    },
    update:function(dt){
    	if(this.gameLayer.gameStatus == 1){
    		// game over
    		this.frontLayer.setPoint("")
    		this.frontLayer.setSummary("Game Over");
    	}else{
    		this.frontLayer.setSummary("");
    		this.frontLayer.setPoint(this.gameLayer.point);  
    	}
    }
});

