lucid.html.base.tags.br = function(){
	lucid.html.tag.call(this);
	this.tag = 'br';
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.base.tags.br.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.br.prototype.constructor = lucid.html.base.tags.br;
lucid.html.builder.tags.br = lucid.html.base.tags.br;
