lucid.html.base.tags.subscript = function(){
	lucid.html.tag.call(this);
	this.tag = 'sub';
};
lucid.html.base.tags.subscript.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.subscript.prototype.constructor = lucid.html.base.tags.subscript;
lucid.html.builder.tags.subscript = lucid.html.base.tags.subscript;
