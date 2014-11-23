
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
    	this.frontLayer.setPoint(this.gameLayer.point);  	
    }
});

