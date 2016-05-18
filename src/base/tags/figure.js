lucid.html.builder.tags.figure = function(){
	lucid.html.tag.call(this);
	this.tag = 'figure';
};
lucid.html.builder.tags.figure.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.figure.prototype.constructor = lucid.html.builder.tags.figure;
