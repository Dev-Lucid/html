lucid.html.builder.tags.subscript = function(){
	lucid.html.tag.call(this);
	this.tag = 'sub';
};
lucid.html.builder.tags.subscript.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.subscript.prototype.constructor = lucid.html.builder.tags.subscript;
