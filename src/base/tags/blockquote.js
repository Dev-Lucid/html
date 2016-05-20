lucid.html.base.tags.blockquote = function(){
	lucid.html.tag.call(this);
	this.tag = 'blockquote';
	this.parameters = ['cite'];
};
lucid.html.base.tags.blockquote.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.blockquote = lucid.html.base.tags.blockquote;
