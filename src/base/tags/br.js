lucid.html.builder.tags.br = function(){
	lucid.html.tag.call(this);
	this.tag = 'br';
	this.allowQuickClose = true;
	this.allowChildren = false;
};
lucid.html.builder.tags.br.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.br.prototype.constructor = lucid.html.builder.tags.br;
