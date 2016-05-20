lucid.html.base.tags.caption = function(){
	lucid.html.tag.call(this);
	this.tag = 'caption';
	this.allowedAttributes.push('align');
};
lucid.html.base.tags.caption.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.caption = lucid.html.base.tags.caption;
