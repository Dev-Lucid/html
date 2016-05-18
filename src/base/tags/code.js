lucid.html.builder.tags.code = function(){
	lucid.html.tag.call(this);
	this.tag = 'code';
};
lucid.html.builder.tags.code.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.code.prototype.constructor = lucid.html.builder.tags.code;
