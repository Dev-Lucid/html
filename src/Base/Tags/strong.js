lucid.html.base.tags.strong = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'strong';
};
lucid.html.base.tags.strong.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.strong = lucid.html.base.tags.strong;
