lucid.html.base.tags.abbreviation = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'abbr';
	this.parameters = ['title'];
};
lucid.html.base.tags.abbreviation.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.abbreviation = lucid.html.base.tags.abbreviation;
