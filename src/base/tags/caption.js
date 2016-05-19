lucid.html.base.tags.caption = function(){
	lucid.html.tag.call(this);
	this.tag = 'caption';
};
lucid.html.base.tags.caption.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.caption.prototype.constructor = lucid.html.base.tags.caption;
lucid.html.builder.tags.caption = lucid.html.base.tags.caption;

lucid.html.base.tags.caption.prototype.init=function(){
	this.allowedAttributes.push('align');
	lucid.html.tag.prototype.init.apply(this);
};
