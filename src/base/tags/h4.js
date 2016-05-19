lucid.html.base.tags.h4 = function(){
	lucid.html.tag.call(this);
	this.tag = 'h4';
};
lucid.html.base.tags.h4.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.h4.prototype.constructor = lucid.html.base.tags.h4;
lucid.html.builder.tags.h4 = lucid.html.base.tags.h4;
