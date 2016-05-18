lucid.html.builder.tags.emphasis = function(){
	lucid.html.tag.call(this);
	this.tag = 'em';
};
lucid.html.builder.tags.emphasis.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.emphasis.prototype.constructor = lucid.html.builder.tags.emphasis;
