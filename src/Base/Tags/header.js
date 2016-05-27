lucid.html.base.tags.header = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'header';
};
lucid.html.base.tags.header.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.header = lucid.html.base.tags.header;
