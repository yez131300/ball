var FrontLayer = cc.Layer.extend({
	point:null,
	start:null,
	lable:null,
	onEnter: function() {
		this._super();
		this.label = cc.LabelTTF.create("11111111111111111", "Helvetica", 20);
		this.label.setColor(cc.color(255,0,0));//black color
		this.label.setPosition(cc.winSize.width-50, cc.winSize.height - 20);
		this.addChild(this.label);
		
		this.schedule(this.update,0);
	},
	showPoint : function(){
		this.label.setString(this.point+"");
	},
	setPoint:function(point){
		this.point =point;
		this.start = true;
	},
	update:function(dt){
		cc.log("==========================="+this.point);
		this.showPoint();
		
	}
});