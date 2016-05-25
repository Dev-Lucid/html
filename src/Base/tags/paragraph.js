lucid.html.base.tags.paragraph = function(){
	lucid.html.tag.call(this);
	this.tag = 'p';
};
lucid.html.base.tags.paragraph.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.paragraph = lucid.html.base.tags.paragraph;
