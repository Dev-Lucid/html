lucid.html.base.tags.small = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'small';
};
lucid.html.base.tags.small.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.small = lucid.html.base.tags.small;
