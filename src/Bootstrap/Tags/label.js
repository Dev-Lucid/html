lucid.html.bootstrap.tags.label = function(factory){
	this.factory = factory;
	lucid.html.base.tags.div.apply(this, arguments);
	this.tag = 'label';
	this.parameters = ['for'];
	this.addTrait(lucid.html.bootstrap.traits.Gridable);

};
lucid.html.bootstrap.tags.label.prototype = Object.create(lucid.html.base.tags.div.prototype);
lucid.html.factory.tags.label = lucid.html.bootstrap.tags.label;
