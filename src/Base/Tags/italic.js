lucid.html.base.tags.italic = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'i';
};
lucid.html.base.tags.italic.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.italic = lucid.html.base.tags.italic;
