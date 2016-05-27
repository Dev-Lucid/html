lucid.html.base.tags.caption = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'caption';
	this.allowedAttributes.push('align');
};
lucid.html.base.tags.caption.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.caption = lucid.html.base.tags.caption;
