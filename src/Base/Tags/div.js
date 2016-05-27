lucid.html.base.tags.div = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'div';
};
lucid.html.base.tags.div.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.div = lucid.html.base.tags.div;
