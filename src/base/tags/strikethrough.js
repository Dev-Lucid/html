lucid.html.base.tags.strikethrough = function(){
	lucid.html.tag.call(this);
	this.tag = 's';
};
lucid.html.base.tags.strikethrough.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.strikethrough.prototype.constructor = lucid.html.base.tags.strikethrough;
lucid.html.builder.tags.strikethrough = lucid.html.base.tags.strikethrough;
