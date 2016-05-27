lucid.html.base.tags.sample = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'samp';
};
lucid.html.base.tags.sample.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.sample = lucid.html.base.tags.sample;
