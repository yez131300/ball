
var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new BgLayer();
        this.addChild(layer,0);
        
        var gameLayer = new GameLayer();
        this.addChild(gameLayer,1);
    }
});

