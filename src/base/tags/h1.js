lucid.html.base.tags.h1 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h1';
};
lucid.html.base.tags.h1.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.h1 = lucid.html.base.tags.h1;
