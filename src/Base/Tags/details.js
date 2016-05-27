lucid.html.base.tags.details = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'details';
};
lucid.html.base.tags.details.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.details = lucid.html.base.tags.details;
