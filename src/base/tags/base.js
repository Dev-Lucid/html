lucid.html.base.tags.base = function(){
	lucid.html.tag.call(this);
	this.tag = 'base';
	this.parameters = ['href', 'target'];
};
lucid.html.base.tags.base.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.base.prototype.constructor = lucid.html.base.tags.base;
lucid.html.builder.tags.base = lucid.html.base.tags.base;
