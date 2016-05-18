lucid.html.builder.tags.bold = function(){
	lucid.html.tag.call(this);
	this.tag = 'b';
};
lucid.html.builder.tags.bold.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.bold.prototype.constructor = lucid.html.builder.tags.bold;
