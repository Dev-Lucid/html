lucid.html.builder.tags.caption = function(){
	lucid.html.tag.call(this);
	this.tag = 'caption';
};
lucid.html.builder.tags.caption.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.caption.prototype.constructor = lucid.html.builder.tags.caption;

lucid.html.builder.tags.caption.prototype.init=function(){
	this.allowedAttributes.push('align');
	lucid.html.tag.prototype.init.apply(this);
};
