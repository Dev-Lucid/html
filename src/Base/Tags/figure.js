lucid.html.base.tags.figure = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'figure';
};
lucid.html.base.tags.figure.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.figure = lucid.html.base.tags.figure;
