lucid.html.base.tags.h6 = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'h6';
};
lucid.html.base.tags.h6.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.h6 = lucid.html.base.tags.h6;
