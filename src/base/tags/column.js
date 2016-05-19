lucid.html.builder.tags.column = function(){
	lucid.html.tag.call(this);
	this.tag = 'col';
};
lucid.html.builder.tags.column.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.column.prototype.constructor = lucid.html.builder.tags.column;

lucid.html.builder.tags.column.prototype.init=function(){
	this.allowedAttributes.push('width');
	this.allowedAttributes.push('span');
	lucid.html.tag.prototype.init.apply(this);
};
