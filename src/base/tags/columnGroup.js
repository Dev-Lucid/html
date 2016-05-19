lucid.html.base.tags.columnGroup = function(){
	lucid.html.tag.call(this);
	this.tag = 'colgroup';
};
lucid.html.base.tags.columnGroup.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.columnGroup.prototype.constructor = lucid.html.base.tags.columnGroup;
lucid.html.builder.tags.columnGroup = lucid.html.base.tags.columnGroup;
