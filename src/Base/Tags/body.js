lucid.html.base.tags.body = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'body';
	this.allowedAttributes.push('align');
};
lucid.html.base.tags.body.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.body = lucid.html.base.tags.body;
