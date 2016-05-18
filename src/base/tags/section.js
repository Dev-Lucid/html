lucid.html.builder.tags.section = function(){
	lucid.html.tag.call(this);
	this.tag = 'section';
};
lucid.html.builder.tags.section.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.section.prototype.constructor = lucid.html.builder.tags.section;
