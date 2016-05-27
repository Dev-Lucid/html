lucid.html.base.tags.h2 = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'h2';
};
lucid.html.base.tags.h2.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.h2 = lucid.html.base.tags.h2;
