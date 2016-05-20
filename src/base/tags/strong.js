lucid.html.base.tags.strong = function(){
	lucid.html.tag.call(this);
	this.tag = 'strong';
};
lucid.html.base.tags.strong.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.strong = lucid.html.base.tags.strong;
