lucid.html.base.tags.menuitem = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
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
lucid.html.factory.tags.menuitem = lucid.html.base.tags.menuitem;
