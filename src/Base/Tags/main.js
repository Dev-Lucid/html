lucid.html.base.tags.main = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'main';
};
lucid.html.base.tags.main.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.main = lucid.html.base.tags.main;
