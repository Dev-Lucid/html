lucid.html.base.tags.code = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'code';
};
lucid.html.base.tags.code.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.code = lucid.html.base.tags.code;
