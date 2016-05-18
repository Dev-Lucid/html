lucid.html.builder.tags.underline = function(){
	lucid.html.tag.call(this);
	this.tag = 'u';
};
lucid.html.builder.tags.underline.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.underline.prototype.constructor = lucid.html.builder.tags.underline;
