lucid.html.builder.tags.div = function(){
	lucid.html.tag.call(this);
	this.tag = 'div';
};
lucid.html.builder.tags.div.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.div.prototype.constructor = lucid.html.builder.tags.div;
