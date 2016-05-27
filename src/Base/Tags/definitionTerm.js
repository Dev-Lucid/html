lucid.html.base.tags.definitionTerm = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'dt';
};
lucid.html.base.tags.definitionTerm.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.definitionTerm = lucid.html.base.tags.definitionTerm;
