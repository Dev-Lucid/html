lucid.html.base.tags.columnGroup = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'colgroup';
};
lucid.html.base.tags.columnGroup.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.columnGroup = lucid.html.base.tags.columnGroup;
