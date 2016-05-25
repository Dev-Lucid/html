lucid.html.base.tags.style = function(){
	lucid.html.tag.call(this);
	this.tag = 'style';
	this.allowedAttributes.push('scoped');
	this.allowedAttributes.push('type');
	this.parameters = ['media'];
};
lucid.html.base.tags.style.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.style = lucid.html.base.tags.style;
