lucid.html.base.tags.insert = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'ins';
};
lucid.html.base.tags.insert.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.insert = lucid.html.base.tags.insert;
