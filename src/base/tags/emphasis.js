lucid.html.base.tags.emphasis = function(){
	lucid.html.tag.call(this);
	this.tag = 'em';
};
lucid.html.base.tags.emphasis.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.emphasis = lucid.html.base.tags.emphasis;
