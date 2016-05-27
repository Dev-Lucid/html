lucid.html.base.tags.superscript = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'sup';
};
lucid.html.base.tags.superscript.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.superscript = lucid.html.base.tags.superscript;
