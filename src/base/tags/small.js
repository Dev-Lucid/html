lucid.html.builder.tags.small = function(){
	lucid.html.tag.call(this);
	this.tag = 'small';
};
lucid.html.builder.tags.small.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.small.prototype.constructor = lucid.html.builder.tags.small;
