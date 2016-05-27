lucid.html.base.tags.emphasis = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'em';
};
lucid.html.base.tags.emphasis.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.emphasis = lucid.html.base.tags.emphasis;
