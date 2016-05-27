lucid.html.base.tags.definitionDescription = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'dd';
};
lucid.html.base.tags.definitionDescription.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.definitionDescription = lucid.html.base.tags.definitionDescription;
