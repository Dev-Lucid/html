lucid.html.base.tags.h4 = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'h4';
};
lucid.html.base.tags.h4.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.h4 = lucid.html.base.tags.h4;
