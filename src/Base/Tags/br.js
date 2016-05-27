lucid.html.base.tags.br = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'br';
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.base.tags.br.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.br = lucid.html.base.tags.br;
