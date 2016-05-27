lucid.html.base.tags.style = function(factory){
	this.factory = factory;
	lucid.html.tag.apply(this, arguments);
	this.tag = 'style';
	this.allowedAttributes.push('scoped');
	this.allowedAttributes.push('type');
	this.parameters = ['media'];
};
lucid.html.base.tags.style.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.factory.tags.style = lucid.html.base.tags.style;
