lucid.html.builder.tags.caption = function(){
	this.tag = 'caption';
};
lucid.html.builder.tags.caption.prototype = new lucid.html.tag();

lucid.html.builder.tags.caption.prototype.init=function(){
	this.allowedAttributes.push('align');
	this.prototype.init.apply(this);
};
