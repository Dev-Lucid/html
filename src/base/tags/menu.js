lucid.html.base.tags.menu = function(){
	lucid.html.tag.call(this);
	this.tag = 'menu';
	this.allowedAttributes.push('type');
	this.allowedAttributes.push('label');
};
lucid.html.base.tags.menu.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.menu = lucid.html.base.tags.menu;
