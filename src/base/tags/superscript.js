lucid.html.builder.tags.superscript = function(){
	lucid.html.tag.call(this);
	this.tag = 'sup';
};
lucid.html.builder.tags.superscript.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.superscript.prototype.constructor = lucid.html.builder.tags.superscript;
