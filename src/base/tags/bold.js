lucid.html.base.tags.bold = function(){
	lucid.html.tag.call(this);
	this.tag = 'b';
};
lucid.html.base.tags.bold.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.bold.prototype.constructor = lucid.html.base.tags.bold;
lucid.html.builder.tags.bold = lucid.html.base.tags.bold;
