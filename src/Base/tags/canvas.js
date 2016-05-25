lucid.html.base.tags.canvas = function(){
	lucid.html.tag.call(this);
	this.tag = 'canvas';
	this.parameters = ['height', 'width'];
};
lucid.html.base.tags.canvas.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.canvas = lucid.html.base.tags.canvas;
