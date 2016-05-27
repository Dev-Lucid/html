lucid.html.base.tags.underline = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'u';
};
lucid.html.base.tags.underline.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.underline = lucid.html.base.tags.underline;
