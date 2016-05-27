lucid.html.base.tags.section = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'section';
};
lucid.html.base.tags.section.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.section = lucid.html.base.tags.section;
