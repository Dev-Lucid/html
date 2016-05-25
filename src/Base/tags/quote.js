lucid.html.base.tags.quote = function(){
	lucid.html.tag.call(this);
	this.tag = 'q';
};
lucid.html.base.tags.quote.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.quote = lucid.html.base.tags.quote;
