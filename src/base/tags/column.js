lucid.html.base.tags.column = function(){
	lucid.html.tag.call(this);
	this.tag = 'col';
	this.allowedAttributes.push('width');
	this.allowedAttributes.push('span');
};
lucid.html.base.tags.column.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.column = lucid.html.base.tags.column;
