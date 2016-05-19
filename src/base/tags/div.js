lucid.html.base.tags.div = function(){
	lucid.html.tag.call(this);
	this.tag = 'div';
};
lucid.html.base.tags.div.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.div.prototype.constructor = lucid.html.base.tags.div;
lucid.html.builder.tags.div = lucid.html.base.tags.div;
