lucid.html.base.tags.column = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'col';
	this.allowedAttributes.push('width');
	this.allowedAttributes.push('span');
};
lucid.html.base.tags.column.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.column = lucid.html.base.tags.column;
