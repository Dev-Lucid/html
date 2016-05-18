lucid.html.builder.tags.italic = function(){
	lucid.html.tag.call(this);
	this.tag = 'i';
};
lucid.html.builder.tags.italic.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.italic.prototype.constructor = lucid.html.builder.tags.italic;
