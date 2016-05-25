lucid.html.base.tags.body = function(){
	lucid.html.tag.call(this);
	this.tag = 'body';
	this.allowedAttributes.push('align');
};
lucid.html.base.tags.body.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.body = lucid.html.base.tags.body;
