lucid.html.base.tags.small = function(){
	lucid.html.tag.call(this);
	this.tag = 'small';
};
lucid.html.base.tags.small.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.small = lucid.html.base.tags.small;
