
var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new BgLayer();
        this.addChild(layer);
        
        var gameLayer = new GameLayer();
        this.addChild(gameLayer);
        
        var frontLayer = new FrontLayer();
        //------------pass the point.
        frontLayer.setPoint("22222");
        this.addChild(frontLayer)
    }
});

