lucid.html.builder.tags.header = function(){
	lucid.html.tag.call(this);
	this.tag = 'header';
};
lucid.html.builder.tags.header.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.header.prototype.constructor = lucid.html.builder.tags.header;
