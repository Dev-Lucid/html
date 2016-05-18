lucid.html.builder.tags.span = function(){
	lucid.html.tag.call(this);
	this.tag = 'span';
};
lucid.html.builder.tags.span.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.span.prototype.constructor = lucid.html.builder.tags.span;
