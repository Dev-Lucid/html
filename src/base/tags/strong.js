lucid.html.builder.tags.strong = function(){
	lucid.html.tag.call(this);
	this.tag = 'strong';
};
lucid.html.builder.tags.strong.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.strong.prototype.constructor = lucid.html.builder.tags.strong;
