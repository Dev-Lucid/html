lucid.html.base.tags.h1 = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'h1';
};
lucid.html.base.tags.h1.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.h1 = lucid.html.base.tags.h1;
