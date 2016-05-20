lucid.html.base.tags.h3 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h3';
};
lucid.html.base.tags.h3.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.h3 = lucid.html.base.tags.h3;
