lucid.html.base.tags.span = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'span';
};
lucid.html.base.tags.span.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.span = lucid.html.base.tags.span;
