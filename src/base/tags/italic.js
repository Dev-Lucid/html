lucid.html.base.tags.italic = function(){
	lucid.html.tag.call(this);
	this.tag = 'i';
};
lucid.html.base.tags.italic.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.italic.prototype.constructor = lucid.html.base.tags.italic;
lucid.html.builder.tags.italic = lucid.html.base.tags.italic;
