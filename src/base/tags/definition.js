lucid.html.builder.tags.definition = function(){
	lucid.html.tag.call(this);
	this.tag = 'dfn';
};
lucid.html.builder.tags.definition.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.definition.prototype.constructor = lucid.html.builder.tags.definition;
