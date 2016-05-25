lucid.html.base.tags.definitionTerm = function(){
	lucid.html.tag.call(this);
	this.tag = 'dt';
};
lucid.html.base.tags.definitionTerm.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.definitionTerm = lucid.html.base.tags.definitionTerm;
