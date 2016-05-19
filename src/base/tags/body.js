lucid.html.base.tags.body = function(){
	lucid.html.tag.call(this);
	this.tag = 'body';
};
lucid.html.base.tags.body.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.body.prototype.constructor = lucid.html.base.tags.body;
lucid.html.builder.tags.body = lucid.html.base.tags.body;

lucid.html.base.tags.body.prototype.init=function(){
	this.allowedAttributes.push('align');
	lucid.html.tag.prototype.init.apply(this);
};
