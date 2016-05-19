lucid.html.base.tags.superscript = function(){
	lucid.html.tag.call(this);
	this.tag = 'sup';
};
lucid.html.base.tags.superscript.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.superscript.prototype.constructor = lucid.html.base.tags.superscript;
lucid.html.builder.tags.superscript = lucid.html.base.tags.superscript;
