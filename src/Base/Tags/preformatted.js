lucid.html.base.tags.preformatted = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'pre';
};
lucid.html.base.tags.preformatted.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.preformatted = lucid.html.base.tags.preformatted;
