lucid.html.base.tags.menu = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'menu';
	this.allowedAttributes.push('type');
	this.allowedAttributes.push('label');
};
lucid.html.base.tags.menu.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.menu = lucid.html.base.tags.menu;
