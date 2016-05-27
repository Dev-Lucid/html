lucid.html.base.tags.definition = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'dfn';
};
lucid.html.base.tags.definition.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.definition = lucid.html.base.tags.definition;
