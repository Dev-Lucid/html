lucid.html.base.tags.summary = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'summary';
};
lucid.html.base.tags.summary.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.summary = lucid.html.base.tags.summary;
