lucid.html.base.tags.section = function(){
	lucid.html.tag.call(this);
	this.tag = 'section';
};
lucid.html.base.tags.section.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.section.prototype.constructor = lucid.html.base.tags.section;
lucid.html.builder.tags.section = lucid.html.base.tags.section;
