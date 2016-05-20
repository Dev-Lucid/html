lucid.html.base.tags.definition = function(){
	lucid.html.tag.call(this);
	this.tag = 'dfn';
};
lucid.html.base.tags.definition.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.definition = lucid.html.base.tags.definition;
