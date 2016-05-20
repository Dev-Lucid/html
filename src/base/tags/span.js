lucid.html.base.tags.span = function(){
	lucid.html.tag.call(this);
	this.tag = 'span';
};
lucid.html.base.tags.span.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.span = lucid.html.base.tags.span;
