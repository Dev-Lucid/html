lucid.html.builder.tags.preformatted = function(){
	lucid.html.tag.call(this);
	this.tag = 'pre';
};
lucid.html.builder.tags.preformatted.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.preformatted.prototype.constructor = lucid.html.builder.tags.preformatted;
