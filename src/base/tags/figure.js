lucid.html.base.tags.figure = function(){
	lucid.html.tag.call(this);
	this.tag = 'figure';
};
lucid.html.base.tags.figure.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.figure.prototype.constructor = lucid.html.base.tags.figure;
lucid.html.builder.tags.figure = lucid.html.base.tags.figure;
