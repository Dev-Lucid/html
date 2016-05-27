lucid.html.base.tags.listItem = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'li';
};
lucid.html.base.tags.listItem.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.listItem = lucid.html.base.tags.listItem;
