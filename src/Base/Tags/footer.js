lucid.html.base.tags.footer = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'footer';
};
lucid.html.base.tags.footer.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.footer = lucid.html.base.tags.footer;
