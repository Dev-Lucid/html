lucid.html.builder.tags.blockquote = function(){
	this.tag = 'blockquote';
};
lucid.html.builder.tags.blockquote.prototype = new lucid.html.tag();

lucid.html.builder.tags.blockquote.prototype.init=function(){
	this.allowedAttributes.push('cite');
	this.prototype.init.apply(this);
};
