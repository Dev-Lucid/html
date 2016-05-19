lucid.html.builder.tags.cite = function(){
	lucid.html.tag.call(this);
	this.tag = 'cite';
};
lucid.html.builder.tags.cite.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.cite.prototype.constructor = lucid.html.builder.tags.cite;
