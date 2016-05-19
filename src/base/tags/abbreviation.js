lucid.html.builder.tags.abbreviation = function(){
	lucid.html.tag.call(this);
	this.tag = 'abbr';
	this.parameters = ['title'];
};
lucid.html.builder.tags.abbreviation.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.abbreviation.prototype.constructor = lucid.html.builder.tags.abbreviation;
