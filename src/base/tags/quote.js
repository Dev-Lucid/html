lucid.html.builder.tags.quote = function(){
	lucid.html.tag.call(this);
	this.tag = 'q';
};
lucid.html.builder.tags.quote.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.quote.prototype.constructor = lucid.html.builder.tags.quote;
