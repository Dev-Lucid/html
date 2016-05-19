lucid.html.base.tags.h2 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h2';
};
lucid.html.base.tags.h2.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.h2.prototype.constructor = lucid.html.base.tags.h2;
lucid.html.builder.tags.h2 = lucid.html.base.tags.h2;
