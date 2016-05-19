lucid.html.base.tags.abbreviation = function(){
	lucid.html.tag.call(this);
	this.tag = 'abbr';
	this.parameters = ['title'];
};
lucid.html.base.tags.abbreviation.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.abbreviation.prototype.constructor = lucid.html.base.tags.abbreviation;
lucid.html.builder.tags.abbreviation = lucid.html.base.tags.abbreviation;
