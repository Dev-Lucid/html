lucid.html.base.tags.label = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'label';
	this.parameters = ['for'];
};
lucid.html.base.tags.label.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.label = lucid.html.base.tags.label;
