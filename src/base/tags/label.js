lucid.html.builder.tags.label = function(){
	lucid.html.tag.call(this);
	this.tag = 'label';
	this.parameters = ['for', 'child'];
};
lucid.html.builder.tags.label.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.label.prototype.constructor = lucid.html.builder.tags.label;

lucid.html.builder.tags.label.prototype.init=function(){
	this.allowedAttributes.push('for');
	lucid.html.tag.prototype.init.apply(this);
};
