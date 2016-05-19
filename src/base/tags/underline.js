lucid.html.base.tags.underline = function(){
	lucid.html.tag.call(this);
	this.tag = 'u';
};
lucid.html.base.tags.underline.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.underline.prototype.constructor = lucid.html.base.tags.underline;
lucid.html.builder.tags.underline = lucid.html.base.tags.underline;
