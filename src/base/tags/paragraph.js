lucid.html.builder.tags.paragraph = function(){
	lucid.html.tag.call(this);
	this.tag = 'p';
};
lucid.html.builder.tags.paragraph.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.paragraph.prototype.constructor = lucid.html.builder.tags.paragraph;
