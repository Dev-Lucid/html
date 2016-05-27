lucid.html.base.tags.cite = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'cite';
};
lucid.html.base.tags.cite.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.cite = lucid.html.base.tags.cite;
