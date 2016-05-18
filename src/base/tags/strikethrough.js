lucid.html.builder.tags.strikethrough = function(){
	lucid.html.tag.call(this);
	this.tag = 's';
};
lucid.html.builder.tags.strikethrough.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.strikethrough.prototype.constructor = lucid.html.builder.tags.strikethrough;
