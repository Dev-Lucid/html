lucid.html.base.tags.paragraph = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'p';
};
lucid.html.base.tags.paragraph.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.paragraph = lucid.html.base.tags.paragraph;
