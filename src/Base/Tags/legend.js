lucid.html.base.tags.legend = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'legend';
};
lucid.html.base.tags.legend.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.legend = lucid.html.base.tags.legend;
