lucid.html.builder.tags.blockquote = function(){
	lucid.html.tag.call(this);
	this.tag = 'blockquote';
	this.parameters = ['cite', 'child'];
};
lucid.html.builder.tags.blockquote.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.blockquote.prototype.constructor = lucid.html.builder.tags.blockquote;
