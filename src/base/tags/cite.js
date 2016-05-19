lucid.html.base.tags.cite = function(){
	lucid.html.tag.call(this);
	this.tag = 'cite';
};
lucid.html.base.tags.cite.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.cite.prototype.constructor = lucid.html.base.tags.cite;
lucid.html.builder.tags.cite = lucid.html.base.tags.cite;
