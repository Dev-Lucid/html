lucid.html.builder.tags.menu = function(){
	lucid.html.tag.call(this);
	this.tag = 'menu';
};
lucid.html.builder.tags.menu.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.menu.prototype.constructor = lucid.html.builder.tags.menu;

lucid.html.builder.tags.menu.prototype.init=function(){
	this.allowedAttributes.push('type');
	this.allowedAttributes.push('label');
	lucid.html.tag.prototype.init.apply(this);
};
