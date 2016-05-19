lucid.html.base.tags.label = function(){
	lucid.html.tag.call(this);
	this.tag = 'label';
	this.parameters = ['for'];
};
lucid.html.base.tags.label.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.label.prototype.constructor = lucid.html.base.tags.label;
lucid.html.builder.tags.label = lucid.html.base.tags.label;
