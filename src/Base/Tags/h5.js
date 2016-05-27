lucid.html.base.tags.h5 = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'h5';
};
lucid.html.base.tags.h5.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.h5 = lucid.html.base.tags.h5;
