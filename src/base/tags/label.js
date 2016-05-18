lucid.html.builder.tags.label = function(){
	this.tag = 'label';
	this.parameters = ['for', 'child'];
};
lucid.html.builder.tags.label.prototype = new lucid.html.tag();

lucid.html.builder.tags.label.prototype.init=function(){
	this.allowedAttributes.push('for');
	this.prototype.init.apply(this);
};
