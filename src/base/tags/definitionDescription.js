lucid.html.base.tags.definitionDescription = function(){
	lucid.html.tag.call(this);
	this.tag = 'dd';
};
lucid.html.base.tags.definitionDescription.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.definitionDescription = lucid.html.base.tags.definitionDescription;
