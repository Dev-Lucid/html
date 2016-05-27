lucid.html.base.tags.address = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'address';
};
lucid.html.base.tags.address.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.address = lucid.html.base.tags.address;
