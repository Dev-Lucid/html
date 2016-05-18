lucid.html.builder.tags.menu = function(){
	this.tag = 'menu';
};
lucid.html.builder.tags.menu.prototype = new lucid.html.tag();

lucid.html.builder.tags.menu.prototype.init=function(){
	this.allowedAttributes.push('type');
	this.allowedAttributes.push('label');
	this.prototype.init.apply(this);
};
