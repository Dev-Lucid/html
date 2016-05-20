lucid.html.base.tags.menuitem = function(){
	lucid.html.tag.call(this);
	this.tag = 'menuitem';
	this.allowedAttributes.push('checked');
	this.allowedAttributes.push('default');
	this.allowedAttributes.push('disabled');
	this.allowedAttributes.push('icon');
	this.allowedAttributes.push('label');
	this.allowedAttributes.push('radiogroup');
	this.allowedAttributes.push('type');
};
lucid.html.base.tags.menuitem.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.menuitem = lucid.html.base.tags.menuitem;
