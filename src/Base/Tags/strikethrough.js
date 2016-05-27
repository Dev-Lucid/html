lucid.html.base.tags.strikethrough = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 's';
};
lucid.html.base.tags.strikethrough.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.strikethrough = lucid.html.base.tags.strikethrough;
