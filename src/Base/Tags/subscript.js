lucid.html.base.tags.subscript = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'sub';
};
lucid.html.base.tags.subscript.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.subscript = lucid.html.base.tags.subscript;
