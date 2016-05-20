lucid.html.base.tags.header = function(){
	lucid.html.tag.call(this);
	this.tag = 'header';
};
lucid.html.base.tags.header.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.header = lucid.html.base.tags.header;
