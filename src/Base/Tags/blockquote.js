lucid.html.base.tags.blockquote = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'blockquote';
	this.parameters = ['cite'];
};
lucid.html.base.tags.blockquote.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.blockquote = lucid.html.base.tags.blockquote;
