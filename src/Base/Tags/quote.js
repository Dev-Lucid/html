lucid.html.base.tags.quote = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'q';
};
lucid.html.base.tags.quote.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.quote = lucid.html.base.tags.quote;
