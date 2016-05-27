lucid.html.base.tags.bold = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'b';
};
lucid.html.base.tags.bold.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.bold = lucid.html.base.tags.bold;
