lucid.html.builder.tags.menuitem = function(){
	this.tag = 'menuitem';
};
lucid.html.builder.tags.menuitem.prototype = new lucid.html.tag();

lucid.html.builder.tags.menuitem.prototype.init=function(){
	this.allowedAttributes.push('checked');
	this.allowedAttributes.push('default');
	this.allowedAttributes.push('disabled');
	this.allowedAttributes.push('icon');
	this.allowedAttributes.push('label');
	this.allowedAttributes.push('radiogroup');
	this.allowedAttributes.push('type');
	this.prototype.init.apply(this);
};
